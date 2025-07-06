from transformers import pipeline

chatbot = pipeline("text-generation", model="microsoft/DialoGPT-medium")

def generate_response(prompt: str) -> str:
    result = chatbot(prompt, max_length=100, pad_token_id=50256)
    return result[0]['generated_text']
