# backend/memory/vector_store.py

import os
import faiss
import json
import numpy as np

DATA_FILE = "backend/data/memory_store.json"
INDEX_FILE = "backend/data/vector.index"

DIMENSIONS = 384  # for all-MiniLM-L6-v2

class VectorStore:
    def __init__(self):
        self.index = faiss.IndexFlatL2(DIMENSIONS)
        self.metadata = []

        if os.path.exists(DATA_FILE) and os.path.exists(INDEX_FILE):
            with open(DATA_FILE, "r") as f:
                self.metadata = json.load(f)
            self.index = faiss.read_index(INDEX_FILE)

    def save(self):
        with open(DATA_FILE, "w") as f:
            json.dump(self.metadata, f, indent=2)
        faiss.write_index(self.index, INDEX_FILE)

    def add(self, embedding: np.ndarray, prompt: str):
        self.index.add(np.array([embedding]).astype("float32"))
        self.metadata.append({"prompt": prompt})
        self.save()

    def search(self, embedding: np.ndarray, top_k: int = 3):
        if self.index.ntotal == 0:
            return []
        distances, indices = self.index.search(np.array([embedding]).astype("float32"), top_k)
        return [self.metadata[i]["prompt"] for i in indices[0] if i < len(self.metadata)]

store = VectorStore()
