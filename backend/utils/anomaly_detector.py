import numpy as np
from typing import List
from scipy.stats import zscore
from sklearn.metrics.pairwise import cosine_distances

class AnomalyDetector:
    def __init__(self, history_embeddings: List[List[float]]):
        self.history_embeddings = np.array(history_embeddings)

    def is_anomalous(self, current_embedding: List[float], threshold: float = 2.5) -> bool:
        if len(self.history_embeddings) < 5:
            return False  # Not enough history to judge

        current_embedding = np.array(current_embedding).reshape(1, -1)
        distances = cosine_distances(current_embedding, self.history_embeddings)[0]

        z_scores = zscore(distances)
        if np.isnan(z_scores).any():
            return False

        return np.abs(z_scores).max() > threshold
