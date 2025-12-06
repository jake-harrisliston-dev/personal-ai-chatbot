from dotenv import load_dotenv
import anthropic

load_dotenv()

client = anthropic.Anthropic()

async def generate_response(messages):
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        messages=messages
    )

    return message.content