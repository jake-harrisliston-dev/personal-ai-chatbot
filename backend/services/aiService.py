from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import anthropic

load_dotenv()

client = anthropic.Anthropic()

async def generate_response(user_prompt):
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )
    print(f"\n\nContent from aiService: {message.content}\n\n")
    return message.content