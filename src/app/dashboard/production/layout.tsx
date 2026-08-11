import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const ProductionModuleShell = dynamic(
  () => import("@/modules/production/ProductionModuleShell"),
  { loading: () => <ModuleSkeleton /> },
);

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductionModuleShell>{children}</ProductionModuleShell>;
}
