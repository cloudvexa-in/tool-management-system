import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
  orgName: z.string().min(1),
  industry: z.string().optional(),
  size: z.string().optional(),
  region: z.string().optional(),
  adminName: z.string().min(1),
  adminEmail: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { orgName, industry, size, region, adminName, adminEmail, password } =
    parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 },
    );
  }

  const passwordHash = await hash(password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: orgName,
        industry,
        size,
        region,
        onboardingStep: "rbac-setup",
      },
    });

    const user = await tx.user.create({
      data: {
        organizationId: organization.id,
        name: adminName,
        email: adminEmail,
        passwordHash,
      },
    });

    const role = await tx.role.create({
      data: { organizationId: organization.id, name: "Owner" },
    });

    const permissions = await tx.permission.findMany({ select: { id: true } });
    await tx.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId: role.id,
        permissionId: permission.id,
      })),
    });

    await tx.userRole.create({
      data: { userId: user.id, roleId: role.id },
    });

    return { organizationId: organization.id, userId: user.id };
  });

  return NextResponse.json(result, { status: 201 });
}
