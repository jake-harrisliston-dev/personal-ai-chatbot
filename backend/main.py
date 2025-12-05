from email import message
from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import traceback
import uuid
from fastapi.middleware.cors import CORSMiddleware

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
        # Get sessionId from frontend
        sessionId = request_body.get("sessionId")
        if not sessionId:
            sessionId = str(uuid.uuid4())
        
        # Get the user prompt from the frontend
        user_prompt = request_body.get("message")
        if not user_prompt or len(user_prompt.strip()) == 0:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        

        print(f"Session ID: {sessionId} \n Message: {user_prompt}")

        

    except Exception as e:
        print(f"Error generating ai content: {str(e)}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error generating AI content: {str(e)}"
    )
