import { prisma } from "@/lib/prisma";
import { DASHBOARD_MODULES } from "@/config/dashboardModules";

const ACTIONS = ["view", "manage"] as const;

async function main() {
  for (const mod of DASHBOARD_MODULES) {
    for (const action of ACTIONS) {
      const key = `${mod.key}.${action}`;
      await prisma.permission.upsert({
        where: { key },
        update: {
          moduleKey: mod.key,
          action,
          label: `${action === "view" ? "View" : "Manage"} ${mod.label}`,
        },
        create: {
          key,
          moduleKey: mod.key,
          action,
          label: `${action === "view" ? "View" : "Manage"} ${mod.label}`,
        },
      });
    }
  }

  const count = await prisma.permission.count();
  console.log(`Seeded permissions. Total permission rows: ${count}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
