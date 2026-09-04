// Small shared presentational primitives reused by multiple components.
import React from "react";
import { C } from "../theme.js";

export function SentimentTag({ sentiment, size = "sm" }) {
  const color =
    sentiment === "Positive" ? C.positive : sentiment === "Negative" ? C.negative : C.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "Inter, sans-serif",
        fontSize: size === "sm" ? 12 : 14,
        fontWeight: 600,
        color,
        letterSpacing: "0.01em",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 99, background: color, display: "inline-block" }} />
      {sentiment}
    </span>
  );
}

export function KpiCard({ label, value, sub, accent }) {
  return (
    <div style={{ border: `1px solid ${C.hairline}`, borderRadius: 4, padding: "16px 18px", background: "#fff", minWidth: 0 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.inkSoft, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 600, color: accent || C.ink, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>
        {value}
      </div>
      {sub && <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.inkSoft, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

export function Badge({ icon, text, color }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color, background: `${color}14`, padding: "6px 11px", borderRadius: 99 }}>
      {icon}{text}
    </span>
  );
}

export function SectionLabel({ children }) {
  return <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 4 }}>{children}</div>;
}

export function Panel({ label, children }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 6, padding: "18px 20px" }}>
      <SectionLabel>{label}</SectionLabel>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}

export const inputStyle = {
  width: "100%", boxSizing: "border-box", padding: "10px 12px", fontSize: 14,
  border: `1px solid ${C.hairline}`, borderRadius: 4, fontFamily: "Inter, sans-serif",
  outline: "none", background: C.paper,
};

export const primaryButton = {
  padding: "11px 0", background: C.signal, color: "#fff", border: "none", borderRadius: 4,
  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
};

export const chip = {
  fontSize: 12, color: C.ink, background: C.paperDim, padding: "5px 10px",
  borderRadius: 99, fontWeight: 500,
};
