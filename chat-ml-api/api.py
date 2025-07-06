from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import generate_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def get_response(data: dict):
    user_input = data.get("prompt", "")
    response = generate_response(user_input)
    return {"response": response}
