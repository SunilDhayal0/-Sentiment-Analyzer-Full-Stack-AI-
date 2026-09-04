"""Pydantic models mirroring the JSON contract returned by the n8n workflow."""
from typing import List, Optional
from pydantic import BaseModel, Field


class TranscriptRequest(BaseModel):
    transcript: str = Field(..., min_length=1, description="Raw call transcript text")


class SentenceSentiment(BaseModel):
    text: str
    sentiment: str  # "Positive" | "Negative" | "Neutral"
    score: float
    speaker: Optional[str] = None


class Emotion(BaseModel):
    label: str
    intensity: float


class SentimentResponse(BaseModel):
    overall_sentiment: str
    overall_confidence: float
    sentences: List[SentenceSentiment]
    emotions: List[Emotion]
    summary: str
    resolution_status: str
    escalation_risk: str
    csat_estimate: float
    agent_empathy_score: float
    key_topics: List[str]
    action_items: List[str]
