// Presentational login form. Auth logic/navigation lives in pages/Login.jsx.
import React, { useState } from "react";
import { Lock, PhoneCall } from "lucide-react";
import { C } from "../theme.js";
import { inputStyle, primaryButton } from "./ui.jsx";

export default function Login({ onSubmit, error }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit(user, pass);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.paper, fontFamily: "Inter, sans-serif" }}>
      <form onSubmit={submit} style={{ width: 360, padding: "40px 36px", background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <PhoneCall size={20} color={C.signal} strokeWidth={2} />
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 19, color: C.ink }}>Call Sentiment</span>
        </div>
        <p style={{ color: C.inkSoft, fontSize: 13.5, margin: "6px 0 28px", lineHeight: 1.5 }}>
          Sign in to review a conversation transcript.
        </p>

        <label style={{ fontSize: 12.5, color: C.inkSoft, display: "block", marginBottom: 6 }}>Username</label>
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin" style={inputStyle} />

        <label style={{ fontSize: 12.5, color: C.inkSoft, display: "block", margin: "16px 0 6px" }}>Password</label>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••" style={inputStyle} />

        {error && <div style={{ color: C.negative, fontSize: 12.5, marginTop: 10 }}>{error}</div>}

        <button type="submit" style={{ ...primaryButton, width: "100%", marginTop: 24 }}>
          <Lock size={14} /> Sign in
        </button>

        <p style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 18, lineHeight: 1.5 }}>
          Demo credentials — username <strong>admin</strong>, password <strong>admin</strong>.
        </p>
      </form>
    </div>
  );
}
