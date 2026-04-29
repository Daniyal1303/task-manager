"use client";
import { useState } from "react";

const items = [
  {
    id: 1,
    title: "Design new landing page",
    desc: "Create wireframes and high-fidelity mockups for the marketing site redesign",
    status: "In Progress",
    priority: "High",
    assignee: "Sarah K.",
    due: "Apr 30",
    comments: 4,
    attachments: 2,
  },
  {
    id: 2,
    title: "Fix authentication bug",
    desc: "Users getting logged out unexpectedly after token refresh — investigate JWT handling",
    status: "Todo",
    priority: "Critical",
    assignee: "Mike R.",
    due: "Apr 28",
    comments: 7,
    attachments: 0,
  },
  {
    id: 3,
    title: "Write API documentation",
    desc: "Document all REST endpoints with examples, request/response schemas, and error codes",
    status: "Done",
    priority: "Medium",
    assignee: "Priya S.",
    due: "Apr 25",
    comments: 2,
    attachments: 1,
  },
  {
    id: 4,
    title: "Setup CI/CD pipeline",
    desc: "Configure GitHub Actions to run tests, linting, and deploy to staging automatically",
    status: "In Progress",
    priority: "High",
    assignee: "Tom W.",
    due: "May 2",
    comments: 3,
    attachments: 3,
  },
  {
    id: 5,
    title: "User testing session",
    desc: "Conduct usability tests with 5 participants for the new onboarding flow",
    status: "Todo",
    priority: "Low",
    assignee: "Anna B.",
    due: "May 5",
    comments: 1,
    attachments: 0,
  },
  {
    id: 6,
    title: "Database optimization",
    desc: "Profile slow queries and add indexes; target p95 latency under 50ms",
    status: "In Review",
    priority: "High",
    assignee: "James L.",
    due: "Apr 29",
    comments: 5,
    attachments: 1,
  },
];

const statusColor: Record<string, { bg: string; color: string; dot: string }> =
  {
    "In Progress": { bg: "#dbeafe", color: "#2563eb", dot: "#3b82f6" },
    Todo: { bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" },
    Done: { bg: "#d1fae5", color: "#059669", dot: "#10b981" },
    "In Review": { bg: "#fef3c7", color: "#d97706", dot: "#f59e0b" },
  };

const priorityBorder: Record<string, string> = {
  Critical: "#dc2626",
  High: "#be185d",
  Medium: "#4338ca",
  Low: "#15803d",
};

const avatarColors = [
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #fa709a, #fee140)",
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  "linear-gradient(135deg, #fda085, #f6d365)",
];

export default function ListView() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "In Progress", "Todo", "Done", "In Review"];
  const filtered =
    filter === "All" ? items : items.filter((i) => i.status === filter);

  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            Task List
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            {filtered.length} tasks · Updated just now
          </p>
        </div>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6c63ff, #a855f7)",
            color: "white",
            fontSize: "13px",
            cursor: "pointer",
            border: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(108,99,255,0.3)",
          }}
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Task
        </button>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "20px",
          background: "white",
          padding: "6px",
          borderRadius: "10px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          width: "fit-content",
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: "7px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: f === filter ? 600 : 400,
              background:
                f === filter
                  ? "linear-gradient(135deg, #6c63ff, #a855f7)"
                  : "transparent",
              color: f === filter ? "white" : "#6b7280",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((item, idx) => {
          const sc = statusColor[item.status];
          const expanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: expanded
                  ? "0 4px 20px rgba(108,99,255,0.15), 0 1px 3px rgba(0,0,0,0.06)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
                border: `1px solid ${expanded ? "#a78bfa" : "#f3f4f6"}`,
                overflow: "hidden",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onClick={() => setExpandedId(expanded ? null : item.id)}
            >
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.status === "Done"}
                  readOnly
                  style={{
                    accentColor: "#6c63ff",
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Main info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#111827",
                        textDecoration:
                          item.status === "Done" ? "line-through" : "none",
                        opacity: item.status === "Done" ? 0.6 : 1,
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        background: sc.bg,
                        color: sc.color,
                        padding: "2px 8px",
                        borderRadius: "99px",
                        fontSize: "11px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: sc.dot,
                          display: "inline-block",
                        }}
                      />
                      {item.status}
                    </span>
                  </div>
                  {!expanded && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "500px",
                      }}
                    >
                      {item.desc}
                    </p>
                  )}
                </div>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: avatarColors[idx % avatarColors.length],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      {item.assignee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span style={{ fontSize: "13px", color: "#374151" }}>
                      {item.assignee}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#9ca3af",
                      fontSize: "13px",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {item.due}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      color: "#9ca3af",
                      fontSize: "12px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                      {item.comments}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                      </svg>
                      {item.attachments}
                    </span>
                  </div>

                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    style={{
                      transform: expanded ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Expanded */}
              {expanded && (
                <div
                  style={{
                    padding: "0 20px 20px",
                    borderTop: "1px solid #f9fafb",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "16px",
                      paddingTop: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      style={{
                        padding: "7px 14px",
                        borderRadius: "7px",
                        fontSize: "13px",
                        background: "linear-gradient(135deg, #6c63ff, #a855f7)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      Edit Task
                    </button>
                    <button
                      style={{
                        padding: "7px 14px",
                        borderRadius: "7px",
                        fontSize: "13px",
                        background: "white",
                        color: "#374151",
                        border: "1px solid #e5e7eb",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                    <button
                      style={{
                        padding: "7px 14px",
                        borderRadius: "7px",
                        fontSize: "13px",
                        background: "white",
                        color: "#dc2626",
                        border: "1px solid #fecaca",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
