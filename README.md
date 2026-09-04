# Sentiment Analyzer — Full Stack + AI

🔗 **Live Demo:** [https://frontend-coral-two-nysxkmqweu.vercel.app](https://frontend-coral-two-nysxkmqweu.vercel.app)  
🔑 **Demo Credentials:** Username: `admin` | Password: `admin`

Upload a call transcript → get overall + sentence-level sentiment, emotion
detection, a summary, and a set of KPIs, shown in a dashboard.

```
Browser (React)  →  FastAPI backend  →  n8n webhook  →  Claude  →  n8n parses JSON
      ↑                                                                  │
      └──────────────────── dashboard renders result ◄────────────────┘
```

Three layers, three jobs:
- **frontend/** — presentation only (login, upload, charts, transcript view).
- **backend/** — a small FastAPI service that authenticates/validates requests
  from the UI and forwards them to n8n. This is what your deployed frontend
  actually talks to; it never touches the LLM directly.
- **n8n/** — the orchestration workflow: builds the prompt, calls Claude,
  parses the JSON, returns it. This is where you'd swap models later.

## Run everything locally, in order

### 1. n8n (must be running first — everything else depends on it)

    docker run -it --rm -p 5678:5678 n8nio/n8n

Open http://localhost:5678 → **Workflows → Import from File** → select
`n8n/sentiment_workflow.json`.

Add credentials: **Credentials → New → HTTP Header Auth**, name it to match
what the "Claude - Analyze Sentiment" node expects, and paste in an Anthropic
API key from console.anthropic.com.

Click **Active** (top right) to turn the workflow on. Click the Webhook node
to confirm the URL — by default it's:

    http://localhost:5678/webhook/sentiment-analyze

### 2. Backend

    cd backend
    python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
    pip install -r requirements.txt
    # edit .env if your n8n webhook URL or allowed origins differ from the defaults
    uvicorn main:app --reload --port 8000

Check it's up: http://localhost:8000 should return `{"status": "ok", ...}`.

Test the whole pipeline without the UI:

    curl -X POST http://localhost:8000/api/sentiment/analyze \
      -H "Content-Type: application/json" \
      -d "{\"transcript\": \"$(cat ../sample_data/negative_call.txt | tr '\n' ' ')\"}"

### 3. Frontend

    cd frontend
    npm install
    cp .env.example .env    # VITE_API_BASE_URL=http://localhost:8000 by default
    npm run dev

Open http://localhost:5173, log in with `admin` / `admin`, and either paste
one of the files from `sample_data/` or click "Use a sample transcript".

## Deploying

- **Frontend** → Vercel or Netlify (`npm run build`, both auto-detect Vite).
  Set `VITE_API_BASE_URL` to your deployed backend's URL as an environment variable.
- **Backend** → any host that runs a Python ASGI app (Render, Railway, Fly.io,
  a VM with `uvicorn`/`gunicorn`). Set `N8N_WEBHOOK_URL` and `ALLOWED_ORIGINS`
  as environment variables there instead of committing `.env`.
- **n8n** → n8n Cloud, or self-hosted (Docker/Railway/Render). Use the
  *production* webhook URL (not the test URL shown while editing) once active.

## Why a backend sits between the UI and n8n

The assignment's architecture is UI → n8n → AI. A browser can call an n8n
webhook directly, but n8n webhooks are usually left open, so anyone who reads
your frontend's JS could hit your webhook directly and run up your Claude
bill. The FastAPI layer gives you a place to add real auth, rate limiting, and
input validation in front of n8n — small now, but it's the seam you'd want in
a real deployment. If you'd rather keep it to exactly two hops for the
assignment, you can point `services/api.js` straight at the n8n webhook URL
and drop `backend/` entirely — the JSON contract is identical either way.

## Sample data

`sample_data/` has three ready-to-use transcripts (`positive_call.txt`,
`negative_call.txt`, `mixed_call.txt`) for testing without needing a real
recording.
