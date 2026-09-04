// All network calls to our own backend live here — components never call
// fetch() directly. The backend (FastAPI) is what actually talks to n8n.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function analyzeTranscript(transcript) {
  const res = await fetch(`${BASE_URL}/api/sentiment/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      detail = body.detail || body.error || detail;
    } catch (_) { /* ignore parse errors */ }
    throw new Error(detail);
  }

  return res.json();
}

export function login(username, password) {
  // Demo-only client-side check, matching the assignment's "basic auth is fine".
  // Swap this for a real POST /api/auth/login call against the backend
  // if you need actual authentication.
  return username === "admin" && password === "admin";
}
