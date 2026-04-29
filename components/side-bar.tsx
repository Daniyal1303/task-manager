"use client";

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  {
    id: "table", label: "Table View",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M3 10h18M3 14h18M10 4v16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"/>
      </svg>
    )
  },
  {
    id: "list", label: "List View",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
      </svg>
    )
  },
  {
    id: "modal", label: "Modal",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>
      </svg>
    )
  },
];

export default function Sidebar({ currentView, onNavigate }: Props) {
  return (
    <aside style={{
      width: "220px",
      background: "#1e1e3f",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      boxShadow: "2px 0 20px rgba(0,0,0,0.2)",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, #6c63ff, #a855f7)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>TaskFlow</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Dashboard</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontWeight: 600, letterSpacing: "1px", padding: "8px 8px 4px", textTransform: "uppercase" }}>
          Views
        </div>
        {navItems.map(item => {
          const active = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: active ? "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(168,85,247,0.2))" : "transparent",
                color: active ? "#a78bfa" : "rgba(255,255,255,0.5)",
                fontSize: "14px",
                fontWeight: active ? 600 : 400,
                textAlign: "left",
                width: "100%",
                transition: "all 0.2s",
                borderLeft: active ? "2px solid #a78bfa" : "2px solid transparent",
              }}
              onMouseOver={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                }
              }}
              onMouseOut={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <div style={{
          width: "32px", height: "32px",
          background: "linear-gradient(135deg, #f093fb, #f5576c)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0,
        }}>M</div>
        <div>
          <div style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>Masood Waseer</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Admin</div>
        </div>
      </div>
    </aside>
  );
}
