// Drag/drop + file-picker + paste box for the transcript.
import React, { useCallback, useRef } from "react";
import { Upload, FileText, AlertTriangle } from "lucide-react";
import { C } from "../theme.js";
import { primaryButton } from "./ui.jsx";

export const SAMPLE = `Agent: Thanks for calling in, how can I help you today?
Customer: I've been trying to get a refund for three weeks and nobody has helped me.
Agent: I'm really sorry to hear that. Let me pull up your account right now.
Customer: This is honestly ridiculous, I was told twice this would be resolved already.
Agent: I understand the frustration, and I can see the two prior tickets. I'm going to fix this myself today.
Customer: Okay... I appreciate that, I just don't want to be transferred again.
Agent: You won't be. I've processed the refund and you'll see it in three to five business days.
Customer: Thank you, that actually makes me feel a lot better.
Agent: Of course. Is there anything else I can help with?
Customer: No, that's everything. Thanks for finally sorting this out.`;

export default function FileUpload({ value, onChange, onAnalyze, error }) {
  const fileInput = useRef(null);
  const [fileName, setFileName] = React.useState("");

  const handleFile = useCallback((file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsText(file);
  }, [onChange]);

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInput.current?.click()}
        style={{ border: `1.5px dashed ${C.hairline}`, borderRadius: 6, padding: "28px 24px", textAlign: "center", cursor: "pointer", background: "#fff", marginBottom: 20 }}
      >
        <Upload size={20} color={C.signal} style={{ marginBottom: 8 }} />
        <div style={{ fontSize: 13.5, color: C.ink, fontWeight: 500 }}>
          {fileName ? fileName : "Click to choose a .txt file, or drag it here"}
        </div>
        <input ref={fileInput} type="file" accept=".txt" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste the transcript text here"
        rows={9}
        style={{ width: "100%", boxSizing: "border-box", padding: 14, fontSize: 13.5, fontFamily: "Inter, sans-serif", border: `1px solid ${C.hairline}`, borderRadius: 4, resize: "vertical", background: "#fff", lineHeight: 1.6 }}
      />

      <button
        onClick={() => onChange(SAMPLE)}
        style={{ fontSize: 12.5, color: C.signal, background: "none", border: "none", cursor: "pointer", padding: "8px 0", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
      >
        Use a sample transcript
      </button>

      {error && (
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", color: C.negative, fontSize: 13, marginTop: 4, background: "#FBEEEC", padding: "10px 12px", borderRadius: 4 }}>
          <AlertTriangle size={15} style={{ marginTop: 1, flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={() => onAnalyze(value)}
        disabled={!value.trim()}
        style={{ ...primaryButton, width: "auto", padding: "12px 28px", marginTop: 24, opacity: value.trim() ? 1 : 0.4, cursor: value.trim() ? "pointer" : "not-allowed" }}
      >
        <FileText size={15} /> Analyze sentiment
      </button>
    </div>
  );
}
