export interface ModuleTab {
  id: string;
  label: string;
}

export default function ModuleTabs({
  tabs,
  activeId,
  onChange,
}: {
  tabs: ModuleTab[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-slate-200 mb-4 flex-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeId === tab.id
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
