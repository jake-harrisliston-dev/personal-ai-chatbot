from dotenv import load_dotenv
import anthropic
from .aiServiceSystemPrompt import system_prompt
import json

load_dotenv()

client = anthropic.Anthropic()   

def generate_response(messages):  
    try: 
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system=system_prompt,
            messages=messages,
            tools=[
                {
                    "name": "open_booking_modal",
                    "description": "Open the booking modal where users can book a consultation with Jake. Call when conversation has progressed and user is likely to book a meeting with Jake.",
                    "input_schema": {
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                }
            ],
        ) as stream:
            for event in stream:
                # If the chunk is text, send for frontend to parse and display
                if event.type == "content_block_delta":
                    if event.delta.type == "text_delta":
                        data = {"type": "response", "content": event.delta.text}
                        yield f"data: {json.dumps(data)}\n\n"
                
                # If the chunk is tool use, send for frontend to parse and use
                elif event.type == "content_block_start":
                    if hasattr(event, "content_block"):
                        if event.content_block.type == "tool_use":
                            data = {"type": "tool_use", "name": "open_booking_modal"}
                            yield f"data: {json.dumps(data)}\n\n"
    except Exception as e: 
        print(f"Error in generate_response_stream: {str(e)}")
        raise
