"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddEntryDialog } from "@/components/add-entry-dialog";
import { cn } from "@/lib/utils";
import CopyRight from "./copy-right";

type Entry = {
  id: number;
  title: string;
  type: string;
  hours: number;
};

type Day = {
  id: string;
  label: string;
  entries: Entry[];
};

const initialDays: Day[] = [
  {
    id: "apr-28",
    label: "Apr 28",
    entries: [
      { id: 1, title: "Homepage Development", type: "Development", hours: 4 },
      { id: 2, title: "Homepage Development", type: "Development", hours: 4 },
    ],
  },
  {
    id: "apr-27",
    label: "Apr 27",
    entries: [
      { id: 3, title: "Homepage Development", type: "Development", hours: 3 },
      { id: 4, title: "Homepage Development", type: "Development", hours: 4 },
      { id: 5, title: "Homepage Development", type: "Development", hours: 1 },
    ],
  },
  {
    id: "apr-26",
    label: "Apr 26",
    entries: [
      { id: 6, title: "Homepage Development", type: "Development", hours: 2 },
      { id: 7, title: "Homepage Development", type: "Development", hours: 3 },
      { id: 8, title: "Homepage Development", type: "Development", hours: 3 },
    ],
  },
  {
    id: "apr-25",
    label: "Apr 25",
    entries: [
      { id: 9, title: "Homepage Development", type: "Development", hours: 4 },
      { id: 10, title: "Homepage Development", type: "Development", hours: 3 },
    ],
  },
];

export default function ListView() {
  const [days] = useState<Day[]>(initialDays);
  const [open, setOpen] = useState(false);

  const totalMinutes = days.reduce(
    (acc, d) => acc + d.entries.reduce((s, e) => s + e.hours * 60, 0),
    0,
  );
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-500">This week</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            This week&apos;s timesheet
          </h1>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Total hours
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {hours} hr {minutes.toString().padStart(2, "0")} min{" "}
            <span className="text-slate-400">/ 40</span>
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        {days.map((day, idx) => (
          <DayBlock
            key={day.id}
            day={day}
            isLast={idx === days.length - 1}
            onAdd={() => setOpen(true)}
          />
        ))}
      </Card>

      <CopyRight />

      <AddEntryDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

function DayBlock({
  day,
  isLast,
  onAdd,
}: {
  day: Day;
  isLast: boolean;
  onAdd: () => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className={cn(!isLast && "border-b border-slate-200")}>
      <div className="flex">
        <div className="w-32 shrink-0 border-r border-slate-200 bg-slate-50 px-6 py-4">
          <p className="text-sm font-semibold text-slate-700">{day.label}</p>
        </div>
        <div className="flex-1 divide-y divide-slate-200">
          {day.entries.map((entry) => (
            <div
              key={entry.id}
              onMouseEnter={() => setHovered(entry.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "flex items-center gap-4 px-6 py-3 transition-colors",
                hovered === entry.id && "bg-blue-50",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {entry.title}
                </p>
              </div>
              <span className="hidden text-xs font-medium text-slate-500 sm:inline">
                {entry.type}
              </span>
              <span className="w-14 text-right text-sm font-semibold text-slate-900">
                {entry.hours} hr
              </span>
              <div className="flex w-20 justify-end">
                {hovered === entry.id ? (
                  <Button variant="link" size="sm">
                    Edit
                  </Button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          ))}
          <button
            onClick={onAdd}
            className="flex w-full items-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add new task
          </button>
        </div>
      </div>
    </div>
  );
}
