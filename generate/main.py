from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = "tiiuae/falcon-rw-1b"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
generator = pipeline("text-generation", model=model, tokenizer=tokenizer, device=0 if torch.cuda.is_available() else -1)

class PromptRequest(BaseModel):
    bot: str
    prompt: str
    context: str = ""

@app.post("/generate")
async def generate(req: PromptRequest):
    full_prompt = f"[Bot: {req.bot}]\nContext:\n{req.context}\n\nPrompt:\n{req.prompt}\n\n-"

    output = generator(full_prompt, max_length=400, do_sample=True, temperature=0.75)[0]['generated_text']

    thoughts, response = [], ""
    for line in output.splitlines():
        if line.strip().startswith('-'):
            thoughts.append(line.strip('- ').strip())
        elif line.strip().lower().startswith('response:'):
            response = line.split(':', 1)[1].strip()

    if not thoughts or not response:
        thoughts = ["Could not parse thought 1", "Could not parse thought 2", "Could not parse thought 3"]
        response = "Fallback response. Model failed to format correctly."

    return { "thoughts": thoughts[:3], "response": response }

