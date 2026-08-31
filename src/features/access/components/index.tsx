"use client";
import { useState } from "react";
import { Check, Power, ShieldCheck } from "lucide-react";
import { ROLE_LABELS, USER_ROLES, type UserRole } from "@/types/role";
import type { AccessModule, StaffUser } from "../types";

export const demoUsers: StaffUser[] = [
  {
    id: "user-001",
    name: "Ayesha Khan",
    email: "ayesha@totalstore.pk",
    role: USER_ROLES.STORE_MANAGER,
    isActive: true,
    locationName: "Phoenix Store",
  },
  {
    id: "user-002",
    name: "Bilal Ahmed",
    email: "bilal@totalstore.pk",
    role: USER_ROLES.FINANCE_USER,
    isActive: true,
    locationName: "Phoenix Store",
  },
  {
    id: "user-003",
    name: "Sara Ali",
    email: "sara@totalstore.pk",
    role: USER_ROLES.INVENTORY_USER,
    isActive: false,
    locationName: "Main Warehouse",
  },
];
const modules: AccessModule[] = [
  "AUTH",
  "CATALOGUE",
  "BANKING",
  "SALES",
  "PAYROLL",
  "SETTINGS",
];

export function UsersList() {
  const [users, setUsers] = useState(demoUsers);
  const update = (id: string, change: Partial<StaffUser>) =>
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, ...change } : user)),
    );
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border p-5">
        <h2 className="font-bold">Staff users</h2>
        <p className="mt-1 text-xs text-muted">
          Assign roles and activate or deactivate accounts. New registration
          stays in the Auth module.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-surface-secondary text-xs uppercase text-muted">
            <tr>
              <th className="px-5 py-4">User</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted">{user.email}</p>
                </td>
                <td className="px-5 py-4">{user.locationName}</td>
                <td className="px-5 py-4">
                  <select
                    value={user.role}
                    onChange={(event) =>
                      update(user.id, { role: event.target.value as UserRole })
                    }
                    className="h-9 rounded-xl border border-border px-3"
                  >
                    {Object.entries(ROLE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                  >
                    {user.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() =>
                      update(user.id, { isActive: !user.isActive })
                    }
                    title={user.isActive ? "Deactivate" : "Activate"}
                    className="inline-flex size-9 items-center justify-center rounded-xl border border-border"
                  >
                    <Power className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PermissionsManager() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0].id);
  const [grants, setGrants] = useState<Record<string, boolean>>({
    "PAYROLL:VIEW": true,
    "PAYROLL:MANAGE": true,
    "SETTINGS:VIEW": false,
  });
  return (
    <section className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-3">
        <ShieldCheck className="size-5 text-primary" />
        <div>
          <h2 className="font-bold">Roles & permissions</h2>
          <p className="text-xs text-muted">
            Role defaults plus individual VIEW and MANAGE overrides.
          </p>
        </div>
      </div>
      <label className="mt-6 block text-sm font-semibold">
        User
        <select
          value={selectedUser}
          onChange={(event) => setSelectedUser(event.target.value)}
          className="mt-2 h-11 w-full max-w-md rounded-xl border border-border px-4"
        >
          {demoUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} — {ROLE_LABELS[user.role]}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted">
              <th className="py-3">Module</th>
              <th>View</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module} className="border-b border-border">
                <td className="py-4 font-semibold">{module}</td>
                {(["VIEW", "MANAGE"] as const).map((action) => {
                  const key = `${module}:${action}`;
                  return (
                    <td key={action}>
                      <button
                        onClick={() =>
                          setGrants((current) => ({
                            ...current,
                            [key]: !current[key],
                          }))
                        }
                        className={`inline-flex size-9 items-center justify-center rounded-xl border ${grants[key] ? "border-primary bg-primary text-white" : "border-border"}`}
                      >
                        {grants[key] && <Check className="size-4" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
