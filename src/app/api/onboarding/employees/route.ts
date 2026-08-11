import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { z } from "zod";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  employees: z.array(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      roleName: z.string().min(1),
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

  const created: string[] = [];
  const skipped: { email: string; reason: string }[] = [];

  for (const employee of parsed.data.employees) {
    const existing = await prisma.user.findUnique({
      where: { email: employee.email },
    });
    if (existing) {
      skipped.push({ email: employee.email, reason: "Email already exists" });
      continue;
    }

    const role = await prisma.role.findUnique({
      where: {
        organizationId_name: { organizationId, name: employee.roleName },
      },
    });
    if (!role) {
      skipped.push({
        email: employee.email,
        reason: `Unknown role "${employee.roleName}"`,
      });
      continue;
    }

    const tempPassword = randomBytes(9).toString("base64url");
    const passwordHash = await hash(tempPassword, 10);

    const user = await prisma.user.create({
      data: {
        organizationId,
        name: employee.name,
        email: employee.email,
        passwordHash,
        mustResetPassword: true,
      },
    });
    await prisma.userRole.create({
      data: { userId: user.id, roleId: role.id },
    });
    created.push(employee.email);
  }

  return NextResponse.json({ created, skipped });
}
