"""Thin client for the n8n webhook that actually talks to the LLM.

Keeping this in its own module means the API route doesn't need to know
anything about HTTP, timeouts, or error shapes from n8n — it just calls
`analyze_transcript(text)` and gets back a dict or an exception.
"""
import os
import httpx

N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL", "http://localhost:5678/webhook/sentiment-analyze")
REQUEST_TIMEOUT_SECONDS = float(os.getenv("N8N_TIMEOUT_SECONDS", "60"))


class N8nServiceError(Exception):
    """Raised when the n8n workflow can't be reached or returns an error."""


async def analyze_transcript(transcript: str) -> dict:
    async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT_SECONDS) as client:
        try:
            response = await client.post(N8N_WEBHOOK_URL, json={"transcript": transcript})
        except httpx.RequestError as exc:
            raise N8nServiceError(f"Could not reach n8n at {N8N_WEBHOOK_URL}: {exc}") from exc

        if response.status_code >= 400:
            raise N8nServiceError(
                f"n8n returned {response.status_code}: {response.text[:300]}"
            )

        try:
            return response.json()
        except ValueError as exc:
            raise N8nServiceError("n8n did not return valid JSON") from exc
