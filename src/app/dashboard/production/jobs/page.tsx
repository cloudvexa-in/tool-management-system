import dynamic from "next/dynamic";

const JobsView = dynamic(() => import("@/modules/production/views/JobsView"));

export default function Page() {
  return <JobsView />;
}
