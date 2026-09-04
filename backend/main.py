import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.sentiment import router as sentiment_router

load_dotenv()

app = FastAPI(title="Sentiment Analyzer API")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sentiment_router)


@app.get("/")
async def root():
    return {"status": "ok", "service": "sentiment-analyzer-backend"}
