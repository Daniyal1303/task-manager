"use client";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "delete" | "edit" | "confirm";
}

function Modal({ isOpen, onClose, type }: ModalProps) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("");

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(17, 24, 39, 0.6)",
      backdropFilter: "blur(4px)",
      animation: "fadeIn 0.15s ease",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: type === "delete" || type === "confirm" ? "400px" : "520px",
        animation: "slideUp 0.2s ease",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: type === "delete" ? "linear-gradient(135deg, #fff1f2, #fff)" : "linear-gradient(135deg, #f5f3ff, #fff)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: type === "delete"
                ? "linear-gradient(135deg, #fecaca, #fca5a5)"
                : "linear-gradient(135deg, #6c63ff, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {type === "delete" ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
              ) : type === "edit" ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              )}
            </div>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                {type === "create" ? "Create New Task" : type === "delete" ? "Delete Task" : type === "edit" ? "Edit Task" : "Confirm Action"}
              </h2>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "1px" }}>
                {type === "delete" ? "This action cannot be undone" : "Fill in the task details below"}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "none", border: "1px solid #e5e7eb",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6b7280",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {type === "delete" ? (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "#fee2e2", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth="2">
                  <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Are you sure?</h3>
              <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
                You&apos;re about to delete <strong>&quot;Fix authentication bug&quot;</strong>. This action is permanent and cannot be undone.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                  Task Title <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="Enter task title..."
                  style={{
                    width: "100%", padding: "10px 14px",
                    border: "1px solid #e5e7eb", borderRadius: "8px",
                    fontSize: "14px", outline: "none", color: "#111827",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target.style.border = "1px solid #a78bfa")}
                  onBlur={e => (e.target.style.border = "1px solid #e5e7eb")}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe the task..."
                  rows={3}
                  style={{
                    width: "100%", padding: "10px 14px",
                    border: "1px solid #e5e7eb", borderRadius: "8px",
                    fontSize: "14px", outline: "none", color: "#111827",
                    resize: "none", fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target.style.border = "1px solid #a78bfa")}
                  onBlur={e => (e.target.style.border = "1px solid #e5e7eb")}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                    Assignee
                  </label>
                  <input
                    value={assignee} onChange={e => setAssignee(e.target.value)}
                    placeholder="Team member"
                    style={{
                      width: "100%", padding: "10px 14px",
                      border: "1px solid #e5e7eb", borderRadius: "8px",
                      fontSize: "14px", outline: "none", color: "#111827",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.target.style.border = "1px solid #a78bfa")}
                    onBlur={e => (e.target.style.border = "1px solid #e5e7eb")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                    Priority
                  </label>
                  <select
                    value={priority} onChange={e => setPriority(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 14px",
                      border: "1px solid #e5e7eb", borderRadius: "8px",
                      fontSize: "14px", outline: "none", color: "#111827",
                      background: "white", cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    {["Critical", "High", "Medium", "Low"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                  Due Date
                </label>
                <input
                  type="date" value={due} onChange={e => setDue(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px",
                    border: "1px solid #e5e7eb", borderRadius: "8px",
                    fontSize: "14px", outline: "none", color: "#111827",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target.style.border = "1px solid #a78bfa")}
                  onBlur={e => (e.target.style.border = "1px solid #e5e7eb")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid #f3f4f6",
          display: "flex", justifyContent: "flex-end", gap: "8px",
          background: "#fafafa",
        }}>
          <button onClick={onClose} style={{
            padding: "10px 20px", borderRadius: "8px",
            border: "1px solid #e5e7eb", background: "white",
            color: "#374151", fontSize: "14px", fontWeight: 500, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onClose} style={{
            padding: "10px 20px", borderRadius: "8px",
            background: type === "delete"
              ? "linear-gradient(135deg, #dc2626, #b91c1c)"
              : "linear-gradient(135deg, #6c63ff, #a855f7)",
            color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer",
            border: "none",
            boxShadow: type === "delete" ? "0 4px 12px rgba(220,38,38,0.3)" : "0 4px 12px rgba(108,99,255,0.3)",
          }}>
            {type === "delete" ? "Delete Task" : type === "edit" ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}

export default function ModalDemo() {
  const [openModal, setOpenModal] = useState<"create" | "delete" | "edit" | "confirm" | null>(null);

  const modalButtons = [
    { type: "create" as const, label: "Create Task", icon: "➕", desc: "Add a new task to your project", color: "linear-gradient(135deg, #6c63ff, #a855f7)", shadow: "rgba(108,99,255,0.3)" },
    { type: "edit" as const, label: "Edit Task", icon: "✏️", desc: "Modify an existing task's details", color: "linear-gradient(135deg, #3b82f6, #2563eb)", shadow: "rgba(59,130,246,0.3)" },
    { type: "delete" as const, label: "Delete Task", icon: "🗑️", desc: "Permanently remove a task", color: "linear-gradient(135deg, #ef4444, #dc2626)", shadow: "rgba(239,68,68,0.3)" },
  ];

  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Modal Components</h1>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Interactive modal dialogs for your application</p>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {modalButtons.map(btn => (
          <div key={btn.type} style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onClick={() => setOpenModal(btn.type)}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${btn.shadow}`;
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
            }}
          >
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: btn.color, marginBottom: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px",
            }}>
              {btn.icon}
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", marginBottom: "6px" }}>{btn.label}</h3>
            <p style={{ fontSize: "13px", color: "#9ca3af", lineHeight: 1.5 }}>{btn.desc}</p>
            <button style={{
              marginTop: "16px",
              padding: "8px 16px", borderRadius: "8px",
              background: btn.color,
              color: "white", fontSize: "13px", fontWeight: 600,
              border: "none", cursor: "pointer",
              boxShadow: `0 4px 12px ${btn.shadow}`,
            }}>
              Open Modal →
            </button>
          </div>
        ))}
      </div>

      {/* Preview section */}
      <div style={{
        background: "white", borderRadius: "16px", padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
      }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>Component Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {[
            "Backdrop blur on overlay",
            "Smooth slide-up animation",
            "Close on outside click",
            "Form validation ready",
            "Keyboard accessible",
            "Mobile responsive",
            "Custom icon headers",
            "Danger state styling",
          ].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151" }}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%",
                background: "#d1fae5",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="3">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              {f}
            </div>
          ))}
        </div>
      </div>

      {openModal && (
        <Modal isOpen={true} type={openModal} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}
