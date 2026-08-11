import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  enabledModules: z.array(z.string()),
  graph: z.any().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await prisma.organization.update({
    where: { id: session.user.organizationId },
    data: {
      enabledModules: parsed.data.enabledModules,
      onboardingGraph: parsed.data.graph ?? undefined,
      onboardingStep: "employee-setup",
    },
  });

  return NextResponse.json({ ok: true });
}
