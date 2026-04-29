import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const text = variant === "light" ? "text-white" : "text-slate-900";
  const accent = variant === "light" ? "text-blue-200" : "text-blue-600";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg",
          variant === "light" ? "bg-white/15" : "bg-blue-600"
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      </div>
      <span className={cn("text-lg font-bold tracking-tight", text)}>
        tick<span className={accent}>tock</span>
      </span>
    </div>
  );
}
