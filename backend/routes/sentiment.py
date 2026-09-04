from fastapi import APIRouter, HTTPException

from models.sentiment import TranscriptRequest
from services.n8n_service import analyze_transcript, N8nServiceError

router = APIRouter(prefix="/api/sentiment", tags=["sentiment"])


@router.post("/analyze")
async def analyze(payload: TranscriptRequest):
    try:
        result = await analyze_transcript(payload.transcript)
    except N8nServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
    return result


@router.get("/health")
async def health():
    return {"status": "ok"}
