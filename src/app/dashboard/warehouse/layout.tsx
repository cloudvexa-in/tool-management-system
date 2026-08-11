import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const WarehouseModuleShell = dynamic(
  () => import("@/modules/warehouse/WarehouseModuleShell"),
  { loading: () => <ModuleSkeleton /> },
);

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WarehouseModuleShell>{children}</WarehouseModuleShell>;
}
