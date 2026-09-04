// Hero card: overall sentiment, confidence, resolution/escalation badges, waveform.
import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { C } from "../theme.js";
import { Badge } from "./ui.jsx";

export default function SentimentCard({ result }) {
  const { overall_sentiment, overall_confidence, sentences, resolution_status, escalation_risk } = result;
  const overallColor =
    overall_sentiment === "Positive" ? C.positive : overall_sentiment === "Negative" ? C.negative : C.neutral;
  const riskColor = escalation_risk === "High" ? C.negative : escalation_risk === "Medium" ? C.warn : C.positive;

  return (
    <div style={{ background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 6, padding: "28px 28px 20px", marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 12.5, color: C.inkSoft, marginBottom: 6 }}>Overall sentiment</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 36, fontWeight: 700, color: overallColor }}>
              {overall_sentiment}
            </span>
            <span style={{ fontSize: 13, color: C.inkSoft, fontVariantNumeric: "tabular-nums" }}>
              {Math.round(overall_confidence * 100)}% confidence
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {resolution_status === "Resolved" ? (
            <Badge icon={<CheckCircle2 size={13} />} text="Resolved" color={C.positive} />
          ) : (
            <Badge icon={<AlertTriangle size={13} />} text={resolution_status} color={C.warn} />
          )}
          <Badge text={`${escalation_risk} escalation risk`} color={riskColor} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 44, marginTop: 22 }}>
        {sentences.map((s, i) => {
          const h = 6 + Math.abs(s.score) * 34;
          const col = s.sentiment === "Positive" ? C.positive : s.sentiment === "Negative" ? C.negative : C.neutral;
          return (
            <div
              key={i}
              title={`${i + 1}. ${s.sentiment} (${s.score.toFixed(2)})`}
              style={{ width: `calc(${100 / sentences.length}% - 2px)`, height: h, background: col, borderRadius: 1, opacity: 0.85 }}
            />
          );
        })}
      </div>
      <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 8 }}>
        Sentiment across the call, in order spoken
      </div>
    </div>
  );
}
