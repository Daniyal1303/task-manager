"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Status = "COMPLETED" | "INCOMPLETE" | "MISSING";

const sheets: { id: number; week: number; range: string; status: Status }[] = [
  { id: 1, week: 1, range: "1 - 5 January, 2023", status: "COMPLETED" },
  { id: 2, week: 2, range: "8 - 12 January, 2023", status: "COMPLETED" },
  { id: 3, week: 3, range: "15 - 19 January, 2023", status: "INCOMPLETE" },
  { id: 4, week: 4, range: "22 - 26 January, 2023", status: "COMPLETED" },
  { id: 5, week: 5, range: "29 January - 2 February, 2023", status: "MISSING" },
  { id: 6, week: 6, range: "5 - 9 February, 2023", status: "COMPLETED" },
  { id: 7, week: 7, range: "12 - 16 February, 2023", status: "INCOMPLETE" },
];

const statusTone: Record<
  Status,
  { tone: "success" | "warning" | "danger"; label: string }
> = {
  COMPLETED: { tone: "success", label: "COMPLETED" },
  INCOMPLETE: { tone: "warning", label: "INCOMPLETE" },
  MISSING: { tone: "danger", label: "MISSING" },
};

const actionLabel: Record<Status, string> = {
  COMPLETED: "View",
  INCOMPLETE: "Update",
  MISSING: "Create",
};

export default function TableView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | Status>("ALL");

  const rows = sheets.filter((s) => {
    const matchQuery = s.range.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "ALL" || s.status === filter;
    return matchQuery && matchFilter;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <p className="text-sm text-slate-500">Timesheets</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Your Timesheets
        </h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-1 items-center gap-3">
            <div className="relative w-full max-w-xs">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="9" r="6" />
                <path d="M14 14l4 4" strokeLinecap="round" />
              </svg>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search week..."
                className="pl-9"
              />
            </div>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="max-w-[180px]"
            >
              <option value="ALL">All status</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
              <option value="MISSING">Missing</option>
            </Select>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3">Week #</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((s) => {
                const meta = statusTone[s.status];
                return (
                  <tr key={s.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {s.week}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.range}</td>
                    <td className="px-6 py-4">
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="link" size="sm">
                        {actionLabel[s.status]}
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No timesheets match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CardFooter>
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-900">{rows.length}</span> of{" "}
            {sheets.length} weeks
          </p>
          <Pagination />
        </CardFooter>
      </Card>

      <p className="mt-6 text-center text-xs text-slate-400">
        © 2024 ticktock company. All rights reserved.
      </p>
    </div>
  );
}

function Pagination() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Previous
      </Button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={cn(
            "h-8 w-8 rounded-md text-sm font-medium transition-colors",
            p === page
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          {p}
        </button>
      ))}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setPage((p) => Math.min(3, p + 1))}
      >
        Next
      </Button>
    </div>
  );
}
