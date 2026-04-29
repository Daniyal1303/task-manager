"use client";
import { useState } from "react";

const tasks = [
  { id: 1, title: "Design new landing page", assignee: "Sarah K.", status: "In Progress", priority: "High", due: "Apr 30", progress: 65 },
  { id: 2, title: "Fix authentication bug", assignee: "Mike R.", status: "Todo", priority: "Critical", due: "Apr 28", progress: 0 },
  { id: 3, title: "Write API documentation", assignee: "Priya S.", status: "Done", priority: "Medium", due: "Apr 25", progress: 100 },
  { id: 4, title: "Setup CI/CD pipeline", assignee: "Tom W.", status: "In Progress", priority: "High", due: "May 2", progress: 40 },
  { id: 5, title: "User testing session", assignee: "Anna B.", status: "Todo", priority: "Low", due: "May 5", progress: 0 },
  { id: 6, title: "Database optimization", assignee: "James L.", status: "In Review", priority: "High", due: "Apr 29", progress: 80 },
  { id: 7, title: "Mobile responsive fixes", assignee: "Sarah K.", status: "In Progress", priority: "Medium", due: "May 1", progress: 55 },
  { id: 8, title: "Security audit", assignee: "Mike R.", status: "Todo", priority: "Critical", due: "May 7", progress: 0 },
];

const statusColor: Record<string, { bg: string; color: string }> = {
  "In Progress": { bg: "#dbeafe", color: "#2563eb" },
  "Todo": { bg: "#f3f4f6", color: "#6b7280" },
  "Done": { bg: "#d1fae5", color: "#059669" },
  "In Review": { bg: "#fef3c7", color: "#d97706" },
};

const priorityColor: Record<string, { bg: string; color: string }> = {
  "Critical": { bg: "#fee2e2", color: "#dc2626" },
  "High": { bg: "#fce7f3", color: "#be185d" },
  "Medium": { bg: "#e0e7ff", color: "#4338ca" },
  "Low": { bg: "#f0fdf4", color: "#15803d" },
};

export default function TableView() {
  const [selected, setSelected] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(t => t.id));
  };

  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Task Management</h1>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Track and manage your team&apos;s tasks</p>
      </div>

      {/* Controls */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              style={{
                width: "100%", padding: "8px 12px 8px 36px",
                border: "1px solid #e5e7eb", borderRadius: "8px",
                fontSize: "14px", outline: "none", color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{
              padding: "8px 16px", borderRadius: "8px",
              border: "1px solid #e5e7eb", background: "white",
              color: "#374151", fontSize: "13px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </button>
            <button style={{
              padding: "8px 16px", borderRadius: "8px",
              background: "linear-gradient(135deg, #6c63ff, #a855f7)",
              color: "white", fontSize: "13px", cursor: "pointer",
              border: "none", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add Task
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: "12px 20px", textAlign: "left", width: "40px" }}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll} style={{ accentColor: "#6c63ff" }} />
              </th>
              {["Task", "Assignee", "Status", "Priority", "Due Date", "Progress"].map(h => (
                <th key={h} style={{
                  padding: "12px 16px", textAlign: "left",
                  fontSize: "12px", fontWeight: 600, color: "#6b7280",
                  letterSpacing: "0.5px", textTransform: "uppercase",
                }}>
                  {h}
                </th>
              ))}
              <th style={{ padding: "12px 16px", width: "48px" }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task, idx) => {
              const isSelected = selected.includes(task.id);
              const sc = statusColor[task.status];
              const pc = priorityColor[task.priority];
              return (
                <tr key={task.id} style={{
                  borderTop: "1px solid #f3f4f6",
                  background: isSelected ? "rgba(108,99,255,0.04)" : idx % 2 === 0 ? "white" : "#fafafa",
                  transition: "background 0.15s",
                }}
                  onMouseOver={e => !isSelected && ((e.currentTarget as HTMLElement).style.background = "#f9fafb")}
                  onMouseOut={e => !isSelected && ((e.currentTarget as HTMLElement).style.background = idx % 2 === 0 ? "white" : "#fafafa")}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <input type="checkbox" checked={isSelected}
                      onChange={() => setSelected(isSelected ? selected.filter(s => s !== task.id) : [...selected, task.id])}
                      style={{ accentColor: "#6c63ff" }} />
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#111827", fontWeight: 500 }}>
                    {task.title}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #f093fb, #f5576c)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", color: "white", fontWeight: 700,
                      }}>
                        {task.assignee.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span style={{ fontSize: "13px", color: "#374151" }}>{task.assignee}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      background: sc.bg, color: sc.color,
                      padding: "4px 10px", borderRadius: "20px",
                      fontSize: "12px", fontWeight: 500,
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      background: pc.bg, color: pc.color,
                      padding: "4px 10px", borderRadius: "20px",
                      fontSize: "12px", fontWeight: 500,
                    }}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>{task.due}</td>
                  <td style={{ padding: "14px 16px", minWidth: "120px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, height: "6px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{
                          width: `${task.progress}%`, height: "100%",
                          background: task.progress === 100 ? "#10b981" : "linear-gradient(90deg, #6c63ff, #a855f7)",
                          borderRadius: "99px",
                          transition: "width 0.3s",
                        }} />
                      </div>
                      <span style={{ fontSize: "12px", color: "#9ca3af", minWidth: "32px" }}>{task.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#9ca3af", padding: "4px", borderRadius: "6px",
                    }}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div style={{
          padding: "14px 20px", borderTop: "1px solid #f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          color: "#9ca3af", fontSize: "13px",
        }}>
          <span>{selected.length > 0 ? `${selected.length} selected` : `${filtered.length} tasks`}</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3].map(p => (
              <button key={p} style={{
                width: "32px", height: "32px", borderRadius: "6px",
                border: p === 1 ? "none" : "1px solid #e5e7eb",
                background: p === 1 ? "linear-gradient(135deg, #6c63ff, #a855f7)" : "white",
                color: p === 1 ? "white" : "#374151",
                fontSize: "13px", cursor: "pointer", fontWeight: p === 1 ? 600 : 400,
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
