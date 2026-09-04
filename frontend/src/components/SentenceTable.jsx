// Scrollable transcript with per-sentence sentiment tags.
import React from "react";
import { C } from "../theme.js";
import { SentimentTag, Panel } from "./ui.jsx";

export default function SentenceTable({ sentences }) {
  return (
    <Panel label="Transcript, sentence by sentence">
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 560, overflowY: "auto", paddingRight: 4 }}>
        {sentences.map((s, i) => (
          <div
            key={i}
            style={{
              borderLeft: `2px solid ${s.sentiment === "Positive" ? C.positive : s.sentiment === "Negative" ? C.negative : C.hairline}`,
              paddingLeft: 10,
            }}
          >
            {s.speaker && (
              <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 600, marginBottom: 2 }}>{s.speaker}</div>
            )}
            <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.5, marginBottom: 3 }}>{s.text}</div>
            <SentimentTag sentiment={s.sentiment} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
