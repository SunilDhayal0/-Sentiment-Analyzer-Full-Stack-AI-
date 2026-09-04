// Conversation summary + emotion intensity bars.
import React from "react";
import { C } from "../theme.js";
import { Panel } from "./ui.jsx";

export default function SummaryCard({ summary, emotions }) {
  return (
    <>
      <Panel label="Conversation summary">
        <p style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.65, margin: 0 }}>{summary}</p>
      </Panel>

      <Panel label="Emotions detected">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {emotions.map((e, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                <span style={{ color: C.ink, fontWeight: 500 }}>{e.label}</span>
                <span style={{ color: C.inkSoft, fontVariantNumeric: "tabular-nums" }}>{Math.round(e.intensity * 100)}%</span>
              </div>
              <div style={{ height: 5, background: C.paperDim, borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${e.intensity * 100}%`, background: C.signal, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
