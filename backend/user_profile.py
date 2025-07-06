import json
from pathlib import Path
from typing import Dict

DATA_PATH = Path("backend/user_profiles.json")

class UserProfileManager:
    def __init__(self):
        if not DATA_PATH.exists():
            DATA_PATH.write_text(json.dumps({}))
        self._load()

    def _load(self):
        with open(DATA_PATH, "r") as f:
            self.data = json.load(f)

    def _save(self):
        with open(DATA_PATH, "w") as f:
            json.dump(self.data, f, indent=2)

    def update_profile(self, user_id: str, prompt: str, bot: str, emotion: str):
        profile = self.data.get(user_id, {
            "prompts": [],
            "emotions": {},
            "bot_usage": {},
            "interaction_count": 0
        })

        profile["prompts"].append(prompt)
        profile["emotions"][emotion] = profile["emotions"].get(emotion, 0) + 1
        profile["bot_usage"][bot] = profile["bot_usage"].get(bot, 0) + 1
        profile["interaction_count"] += 1

        self.data[user_id] = profile
        self._save()

    def get_profile(self, user_id: str) -> Dict:
        return self.data.get(user_id, {})
