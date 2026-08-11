import { UserCog } from "lucide-react";

export interface RoleOption {
  id: string;
  label: string;
}

export default function RoleSelect({
  roles,
  value,
  onChange,
}: {
  roles: RoleOption[];
  value: string;
  onChange: (roleId: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5">
      <UserCog className="h-3.5 w-3.5 text-slate-400 flex-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
        title="View as role (MVP simulation)"
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
}
