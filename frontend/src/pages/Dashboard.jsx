import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, PhoneCall } from "lucide-react";
import { C, FONTS } from "../theme.js";
import FileUpload from "../components/FileUpload.jsx";
import SentimentCard from "../components/SentimentCard.jsx";
import { SentimentTrendChart, SentimentBreakdownChart } from "../components/SentimentChart.jsx";
import SentenceTable from "../components/SentenceTable.jsx";
import { KpiStrip, TalkRatioPanel, TopicsAndActions } from "../components/KPICards.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import { analyzeTranscript } from "../services/api.js";

function TopBar({ onLogout }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.hairline}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PhoneCall size={17} color={C.signal} />
        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink }}>Call Sentiment</span>
      </div>
      {onLogout && (
        <button onClick={onLogout} style={{ fontSize: 12.5, fontWeight: 600, color: C.signal, background: "none", border: `1px solid ${C.hairline}`, borderRadius: 4, padding: "7px 14px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
          Analyze another
        </button>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("upload"); // upload | analyzing | done
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async (transcript) => {
    setError("");
    setStatus("analyzing");
    try {
      const r = await analyzeTranscript(transcript);
      setResult(r);
      setStatus("done");
    } catch (e) {
      setError(e.message || "Something went wrong analyzing this transcript.");
      setStatus("upload");
    }
  };

  const reset = () => { setResult(null); setStatus("upload"); setText(""); };
  const logout = () => { localStorage.removeItem("isAuthenticated"); navigate("/"); };

  return (
    <div style={{ minHeight: "100vh", background: C.paper }}>
      <style>{FONTS}</style>

      {status === "analyzing" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "Inter, sans-serif" }}>
          <Loader2 size={26} color={C.signal} className="spin" />
          <div style={{ color: C.inkSoft, fontSize: 14 }}>Reading the transcript and scoring sentiment…</div>
          <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {status === "upload" && (
        <>
          <TopBar />
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px", fontFamily: "Inter, sans-serif" }}>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 30, fontWeight: 600, color: C.ink, margin: "0 0 8px" }}>
              Upload a conversation
            </h1>
            <p style={{ color: C.inkSoft, fontSize: 14.5, margin: "0 0 32px", lineHeight: 1.6 }}>
              Drop in a .txt transcript, or paste one below. Lines like "Agent:" and
              "Customer:" are picked up automatically for speaker-level metrics.
            </p>
            <FileUpload value={text} onChange={setText} onAnalyze={handleAnalyze} error={error} />
          </div>
        </>
      )}

      {status === "done" && result && (
        <>
          <TopBar onLogout={reset} />
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 24px 80px", fontFamily: "Inter, sans-serif" }}>
            <SentimentCard result={result} />
            <KpiStrip result={result} />
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 20, marginBottom: 24 }}>
              <SentimentTrendChart sentences={result.sentences} />
              <SentimentBreakdownChart sentences={result.sentences} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <SummaryCard summary={result.summary} emotions={result.emotions} />
                <TalkRatioPanel sentences={result.sentences} />
                <TopicsAndActions key_topics={result.key_topics} action_items={result.action_items} />
              </div>
              <SentenceTable sentences={result.sentences} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
