# Frontend

React (Vite) app: login → upload transcript → sentiment dashboard.

## Run

    npm install
    cp .env.example .env    # point VITE_API_BASE_URL at your backend
    npm run dev

Opens on http://localhost:5173. Requires the backend (and n8n behind it) to be running for the "Analyze sentiment" button to work — see the root README for the full order to start things in.

## Structure

- `src/components/` — presentational pieces (Login form, upload box, charts, tables, KPI cards).
- `src/pages/` — route-level components that own state and call the API (`Login.jsx`, `Dashboard.jsx`).
- `src/services/api.js` — the only file that calls `fetch`.
- `src/theme.js` — shared colors/fonts.
