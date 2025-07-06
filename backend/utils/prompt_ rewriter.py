from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

# Load the T5-based model
MODEL_NAME = "google/flan-t5-large"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

# Define a prompt rewriting pipeline
rewriter = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

def rewrite_prompt(original_prompt: str) -> str:
    """
    Rewrites the input prompt into a more clear, complete, and model-friendly version.
    Example:
      Input:  "fish moon laser?"
      Output: "Are moon lasers affecting fish migration?"
    """
    input_text = f"Rewrite this prompt to be clear and specific: {original_prompt}"
    
    try:
        result = rewriter(input_text, max_length=64, do_sample=True, temperature=0.7)[0]['generated_text']
        return result.strip()
    except Exception as e:
        print(f"[PromptRewriter] Error rewriting prompt: {e}")
        return original_prompt
