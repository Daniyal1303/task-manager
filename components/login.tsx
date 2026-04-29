"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a4e 0%, #16213e 40%, #0f3460 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "48px", height: "48px",
            background: "linear-gradient(135deg, #6c63ff, #a855f7)",
            borderRadius: "12px",
            margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>Welcome back</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Sign in to your account</p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "8px" }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => (e.target.style.border = "1px solid #6c63ff")}
              onBlur={e => (e.target.style.border = "1px solid rgba(255,255,255,0.15)")}
            />
          </div>

          <div>
            <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => (e.target.style.border = "1px solid #6c63ff")}
              onBlur={e => (e.target.style.border = "1px solid rgba(255,255,255,0.15)")}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "13px", cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: "#6c63ff" }} />
              Remember me
            </label>
            <a href="#" style={{ color: "#a78bfa", fontSize: "13px", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>

          <button
            onClick={() => {}}
            style={{
              background: "linear-gradient(135deg, #6c63ff, #a855f7)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "8px",
              transition: "opacity 0.2s",
              width: "100%",
            }}
            onMouseOver={e => ((e.target as HTMLElement).style.opacity = "0.9")}
            onMouseOut={e => ((e.target as HTMLElement).style.opacity = "1")}
          >
            Sign in
          </button>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "24px" }}>
          Don&apos;t have an account?{" "}
          <a href="#" style={{ color: "#a78bfa", textDecoration: "none" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
