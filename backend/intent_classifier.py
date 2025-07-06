from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

MODEL_NAME = "joeddav/distilbert-base-uncased-go-emotions-student"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

INTENT_LABELS = [
    "Question", "Statement", "Command", "Complaint", "Greeting", "Request", 
    "Feedback", "Opinion", "Clarification", "Sarcasm", "Other"
]

def detect_intent(text: str) -> str:
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        logits = model(**inputs).logits
        probs = F.softmax(logits, dim=1)
        top_idx = torch.argmax(probs, dim=1).item()
    return INTENT_LABELS[top_idx] if top_idx < len(INTENT_LABELS) else "Unknown"
