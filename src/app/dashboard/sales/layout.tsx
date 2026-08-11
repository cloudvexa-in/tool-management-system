import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const SalesModuleShell = dynamic(
  () => import("@/modules/sales/SalesModuleShell"),
  {
    loading: () => <ModuleSkeleton />,
  },
);

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SalesModuleShell>{children}</SalesModuleShell>;
}
