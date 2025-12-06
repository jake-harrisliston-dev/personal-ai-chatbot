from dotenv import load_dotenv
import anthropic
from .aiServiceSystemPrompt import system_prompt

load_dotenv()

client = anthropic.Anthropic()   

def generate_response(messages):  
    try: 
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system=system_prompt,
            messages=messages
        ) as stream:
            for text in stream.text_stream:
                yield text
    except Exception as e: 
        print(f"Error in generate_response_stream: {str(e)}")
        raise

