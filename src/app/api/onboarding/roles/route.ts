import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  roles: z.array(
    z.object({
      name: z.string().min(1),
      permissionKeys: z.array(z.string()),
    }),
  ),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const organizationId = session.user.organizationId;

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  for (const roleInput of parsed.data.roles) {
    const role = await prisma.role.upsert({
      where: { organizationId_name: { organizationId, name: roleInput.name } },
      update: {},
      create: { organizationId, name: roleInput.name },
    });

    const permissions = await prisma.permission.findMany({
      where: { key: { in: roleInput.permissionKeys } },
      select: { id: true },
    });

    await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
    if (permissions.length > 0) {
      await prisma.rolePermission.createMany({
        data: permissions.map((p) => ({ roleId: role.id, permissionId: p.id })),
      });
    }
  }

  await prisma.organization.update({
    where: { id: organizationId },
    data: { onboardingStep: "workflow-builder" },
  });

  return NextResponse.json({ ok: true });
}
