// KPI strip + talk ratio + key topics + action items.
// Talk ratio and volatility are computed here in the app layer (not asked
// of the AI) — deterministic facts vs. the model's judgment calls.
import React, { useMemo } from "react";
import { User } from "lucide-react";
import { C } from "../theme.js";
import { KpiCard, Panel, chip } from "./ui.jsx";

function computeTalkRatio(sentences) {
  const bySpeaker = {};
  let totalWords = 0;
  let hasSpeakers = false;
  sentences.forEach((s) => {
    const words = s.text.trim().split(/\s+/).filter(Boolean).length;
    totalWords += words;
    const speaker = s.speaker || "Unlabeled";
    if (s.speaker) hasSpeakers = true;
    bySpeaker[speaker] = (bySpeaker[speaker] || 0) + words;
  });
  if (!hasSpeakers) return null;
  return Object.entries(bySpeaker).map(([name, words]) => ({
    name, words, pct: totalWords ? Math.round((words / totalWords) * 100) : 0,
  }));
}

function computeVolatility(sentences) {
  if (!sentences.length) return 0;
  const scores = sentences.map((s) => s.score);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((a, b) => a + (b - mean) ** 2, 0) / scores.length;
  return Math.sqrt(variance);
}

export function KpiStrip({ result }) {
  const { csat_estimate, agent_empathy_score, sentences } = result;
  const volatility = useMemo(() => computeVolatility(sentences), [sentences]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
      <KpiCard label="CSAT estimate" value={`${csat_estimate.toFixed(1)} / 5`} accent={C.signal} />
      <KpiCard label="Agent empathy score" value={`${Math.round(agent_empathy_score)}`} sub="out of 100" />
      <KpiCard label="Sentiment volatility" value={volatility.toFixed(2)} sub={volatility > 0.5 ? "Rollercoaster call" : "Fairly steady"} />
      <KpiCard label="Utterances analyzed" value={sentences.length} />
    </div>
  );
}

export function TalkRatioPanel({ sentences }) {
  const talkRatio = useMemo(() => computeTalkRatio(sentences), [sentences]);
  if (!talkRatio) return null;
  return (
    <Panel label="Talk ratio">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {talkRatio.map((t) => (
          <div key={t.name}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: C.ink, fontWeight: 500 }}>
                <User size={12} /> {t.name}
              </span>
              <span style={{ color: C.inkSoft }}>{t.pct}% · {t.words} words</span>
            </div>
            <div style={{ height: 5, background: C.paperDim, borderRadius: 99 }}>
              <div style={{ height: "100%", width: `${t.pct}%`, background: C.signal, borderRadius: 99, opacity: 0.85 }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function TopicsAndActions({ key_topics, action_items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <Panel label="Key topics">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {key_topics.map((t, i) => <span key={i} style={chip}>{t}</span>)}
        </div>
      </Panel>
      <Panel label="Action items">
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12.5, color: C.ink, lineHeight: 1.8 }}>
          {action_items.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </Panel>
    </div>
  );
}
