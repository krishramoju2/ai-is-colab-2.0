from transformers import pipeline

# Load zero-shot classification model (suitable for scoring prompt intent, clarity, and coherence)
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

# Define scoring labels and their weightings
SCORING_LABELS = {
    "clear": 0.4,
    "coherent": 0.3,
    "specific": 0.2,
    "engaging": 0.1
}

def score_prompt(prompt: str) -> float:
    """
    Returns a prompt quality score between 0 and 1.
    """
    candidate_labels = list(SCORING_LABELS.keys())
    result = classifier(prompt, candidate_labels)

    # Normalize and weight the scores
    label_scores = {label: 0.0 for label in candidate_labels}
    for label, score in zip(result['labels'], result['scores']):
        if label in label_scores:
            label_scores[label] = score

    weighted_score = sum(label_scores[label] * weight for label, weight in SCORING_LABELS.items())

    return round(weighted_score, 3)  # e.g., 0.843
