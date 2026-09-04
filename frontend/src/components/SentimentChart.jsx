// Two chart views over the analysis result: trend over time, and category breakdown.
import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ReferenceLine
} from "recharts";
import { C } from "../theme.js";
import { SectionLabel } from "./ui.jsx";

export function SentimentTrendChart({ sentences }) {
  const trend = useMemo(
    () => sentences.map((s, i) => ({ i: i + 1, score: Number(s.score.toFixed(2)) })),
    [sentences]
  );
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 6, padding: "20px 20px 8px" }}>
      <SectionLabel>Sentiment trend</SectionLabel>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={trend} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.signal} stopOpacity={0.35} />
              <stop offset="100%" stopColor={C.signal} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={C.hairline} vertical={false} />
          <XAxis dataKey="i" tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={{ stroke: C.hairline }} tickLine={false} />
          <YAxis domain={[-1, 1]} tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={false} tickLine={false} />
          <ReferenceLine y={0} stroke={C.hairline} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: `1px solid ${C.hairline}` }} />
          <Area type="monotone" dataKey="score" stroke={C.signal} fill="url(#trendFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SentimentBreakdownChart({ sentences }) {
  const breakdown = useMemo(() => {
    const counts = { Positive: 0, Negative: 0, Neutral: 0 };
    sentences.forEach((s) => { counts[s.sentiment] = (counts[s.sentiment] || 0) + 1; });
    return [
      { name: "Positive", value: counts.Positive, color: C.positive },
      { name: "Negative", value: counts.Negative, color: C.negative },
      { name: "Neutral", value: counts.Neutral, color: C.neutral },
    ].filter((d) => d.value > 0);
  }, [sentences]);

  return (
    <div style={{ background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 6, padding: "20px 20px 8px" }}>
      <SectionLabel>Sentiment breakdown</SectionLabel>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72} paddingAngle={3}>
            {breakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: `1px solid ${C.hairline}` }} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: -4 }}>
        {breakdown.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.inkSoft }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: d.color }} />
            {d.name} · {d.value}
          </div>
        ))}
      </div>
    </div>
  );
}
