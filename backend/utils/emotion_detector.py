# backend/utils/emotion_detector.py

from transformers import pipeline

emotion_model = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

def detect_emotion(text: str) -> str:
    scores = emotion_model(text)[0]
    top = sorted(scores, key=lambda x: x["score"], reverse=True)[0]
    return top["label"]
