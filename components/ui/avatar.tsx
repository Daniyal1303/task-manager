import * as React from "react";
import { cn } from "@/lib/utils";

const palette = [
  "bg-orange-500",
  "bg-brand-600",
  "bg-emerald-600",
  "bg-pink-500",
  "bg-amber-500",
  "bg-violet-600",
];

function pick(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return palette[Math.abs(h) % palette.length];
}

export function Avatar({
  name,
  size = 28,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white",
        pick(name),
        className
      )}
    >
      {initials}
    </span>
  );
}
