import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

from groq import Groq
from pinecone import Pinecone
import google.generativeai as genai

# ======================================================
# LOAD ENV
# ======================================================

load_dotenv()

# ======================================================
# FLASK APP
# ======================================================

app = Flask(__name__)
CORS(app)

# ======================================================
# GROQ CLIENT
# ======================================================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ======================================================
# GEMINI OPTIONAL
# ======================================================

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

# ======================================================
# PINECONE
# ======================================================

pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)

index = pc.Index(
    os.getenv("PINECONE_INDEX")
)

# ======================================================
# HOME ROUTE
# ======================================================

@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "AI Healthcare Assistant Running"
    })

# ======================================================
# AI AGENT
# ======================================================

@app.route("/api/agent", methods=["POST"])
def ai_agent():

    try:

        data = request.get_json()

        query = data.get("query", "")

        current_vitals = data.get("current_vitals", {})

        temperature = current_vitals.get("temperature", "N/A")
        heart_rate = current_vitals.get("heart_rate", "N/A")
        spo2 = current_vitals.get("spo2", "N/A")
        ecg = current_vitals.get("ecg", [])

        # ==================================================
        # SIMPLE PROMPT
        # ==================================================

        final_prompt = f"""
You are an advanced AI healthcare assistant.

Analyze the patient vitals carefully.

CURRENT PATIENT DATA:

Temperature: {temperature}
Heart Rate: {heart_rate}
SpO2: {spo2}
ECG Data: {ecg}

USER QUESTION:
{query}

Your response should include:

1. Health analysis
2. Possible issues
3. Recommendations
4. Emergency warning if needed

Rules:
- Be concise and professional
- Never claim a confirmed diagnosis
- Mention emergency risk if vitals are dangerous
- Give medically cautious advice
"""

        # ==================================================
        # GROQ RESPONSE
        # ==================================================

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": final_prompt
                }
            ],
            temperature=0.2,
        )

        ai_reply = completion.choices[0].message.content

        return jsonify({
            "success": True,
            "reply": ai_reply,
            "model_used": "Groq"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ======================================================
# MAIN
# ======================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000))
    )