from email import message
import re
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
from supabase import create_client
from pydantic import BaseModel
from typing import Optional

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

# Create supabase client
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

# Pydantic model for form submission
class FormSubmit(BaseModel):
    name: Optional[str] = None
    email: str
    business: Optional[str] = None
    marketing: bool
    terms: bool

# Re-usable logic for splitting name
def parse_name(full_name: str):
    if not full_name:
        return None, None
    
    parts = full_name.strip().split(' ', 1)
    
    if len(parts) == 1:
        return parts[0], None
    else:
        return parts[0], parts[1]

async def stream_generator(messages):
    try:
        for chunk in generate_response(messages):
            yield chunk
            await asyncio.sleep(0.01)
    except Exception as e:
        print(f"Error during stream: {str(e)}")
        traceback.print_exc()
        yield f"\n\n[Error: {str(e)}]"


@app.post("/api/form-submit")
async def form_submit(data: FormSubmit):
    try:
        
        first_name, last_name = parse_name(data.name)

        user_check = supabase.table("leads").select("*").eq("email", data.email).execute()

        if not user_check.data:
            new_user = supabase.table("leads").insert({
                "first_name": first_name,
                "last_name": last_name,
                "email": data.email,
                "business": data.business,
                "used_chatbot": True,
                "marketing_opt_in": data.marketing,
                "terms_agreement": data.terms,
                "source": "Website Chatbot",
                "last_contacted": 'now()',
                "last_contacted_method": "Website Chatbot"
            }).execute()
            
            print(f"Data added successfully: {new_user.data}")
            
            return {"success": "New user added"}

        user = user_check.data[0]

        updated_data = {
            "used_chatbot": True,
            "marketing_opt_in": data.marketing,
            "last_contacted": "now()",
            "last_contacted_method": "Website Chatbot"
        }

        # Only updated business, first_name and last_name if they have values (do not overright data with Null values)
        if data.business and len(data.business) > 0:
            updated_data["business"] = data.business
        
        if first_name and len(first_name) > 0:
            updated_data["first_name"] = first_name
        
        if last_name and len(last_name) > 0:
            updated_data["last_name"] = last_name

        updated_user = supabase.table("leads").update(updated_data).eq('id', user['id']).execute()
        

        print(f"User details updated: {updated_user.data}")
        
        return {"success": "User details updated"}

            
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error submitting form content: {str(e)}"
    )


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
