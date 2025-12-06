from email import message
from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import traceback
import uuid
from fastapi.middleware.cors import CORSMiddleware
from services.aiService import generate_response

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

@app.post("/api/ai-generate")
async def ai_generate(request_body: dict = Body(...)):
    try:
        print(f"Request body: {request_body}")
        # Get the user prompt from the frontend
        messages = request_body.get("data")
        if not messages:
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Clean messages (remove timestamp, keep only role + content)
        cleaned_messages = [
            {"role": msg["role"], "content": msg["content"]}
            for msg in messages
        ]

        print(f"Cleaned messages: {cleaned_messages}")

        try :
            response = await generate_response(cleaned_messages)

        except Exception as e:
            print(f"Error generating ai content: {str(e)}")
            traceback.print_exc()
            raise HTTPException(
                status_code=500, 
                detail=f"Error generating AI content: {str(e)}"
            )

        return response
        

    except Exception as e:
        print(f"Error generating ai content: {str(e)}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error generating AI content: {str(e)}"
    )
