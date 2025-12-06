from email import message
from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import traceback
import uuid
from fastapi.middleware.cors import CORSMiddleware
from services.aiService import generate_response
from fastapi.responses import StreamingResponse
import asyncio

load_dotenv()

app = FastAPI()

# CORS for frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def stream_generator(messages):
    try:
        for chunk in generate_response(messages):
            yield f"{chunk}"
            await asyncio.sleep(0.00001)
    except Exception as e:
        print(f"Error during stream: {str(e)}")
        traceback.print_exc()
        yield f"\n\n[Error: {str(e)}]"

@app.post("/api/ai-generate")
async def ai_generate(request_body: dict = Body(...)):
    try:
        # Get the user prompt from the frontend
        messages = request_body.get("data")
        if not messages:
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Ensure messages is an array
        if not isinstance(messages, list):
            raise HTTPException(status_code=400, detail="Messages must be an array")

        # Clean messages (remove timestamp, keep only role + content)
        try: 
            cleaned_messages = [
                {"role": msg["role"], "content": msg["content"]}
                for msg in messages
            ]
        except (KeyError, TypeError) as e:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid message format: {str(e)}"
            )

        return StreamingResponse(
            stream_generator(cleaned_messages),
            media_type="text/plain",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
    
    except HTTPException:
        raise
        

    except Exception as e:
        print(f"Error generating ai content: {str(e)}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error generating AI content: {str(e)}"
    )
