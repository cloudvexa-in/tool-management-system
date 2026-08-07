"use client";

import { useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface EmployeesRolesProps {
  onNext: () => void;
  onBack: () => void;
}

export default function EmployeesRoles({
  onNext,
  onBack,
}: EmployeesRolesProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "Production",
    role: "Operator",
  });

  const addEmployee = () => {
    if (!form.name || !form.email) return;

    setEmployees([
      ...employees,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({
      name: "",
      email: "",
      department: "Production",
      role: "Operator",
    });
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-3xl font-bold text-gray-900">Employees & Roles</h2>

      <p className="mt-2 text-gray-500">
        Add employees, assign departments and roles.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Employee Name</label>

          <input
            className="w-full rounded-lg border p-3"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Email</label>

          <input
            className="w-full rounded-lg border p-3"
            placeholder="john@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Department</label>

          <select
            className="w-full rounded-lg border p-3"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value,
              })
            }
          >
            <option>Production</option>
            <option>Quality</option>
            <option>Design</option>
            <option>Maintenance</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Role</label>

          <select
            className="w-full rounded-lg border p-3"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Supervisor</option>
            <option>Operator</option>
          </select>
        </div>
      </div>

      <button
        onClick={addEmployee}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        + Add Employee
      </button>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">Name</th>

              <th className="border px-4 py-3 text-left">Email</th>

              <th className="border px-4 py-3 text-left">Department</th>

              <th className="border px-4 py-3 text-left">Role</th>

              <th className="border px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border py-8 text-center text-gray-400"
                >
                  No employees added yet.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border px-4 py-3">{employee.name}</td>

                  <td className="border px-4 py-3">{employee.email}</td>

                  <td className="border px-4 py-3">{employee.department}</td>

                  <td className="border px-4 py-3">{employee.role}</td>

                  <td className="border px-4 py-3 text-center">
                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="rounded-xl border px-8 py-3">
          ← Previous
        </button>

        <button
          onClick={onNext}
          className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
