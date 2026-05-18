import os

from dotenv import load_dotenv

from flask import Flask, request, jsonify

from flask_cors import CORS

from groq import Groq

import google.generativeai as genai

# ============================================
# OPTIONAL PINECONE IMPORT
# ============================================

try:
    from pinecone import Pinecone
except Exception:
    Pinecone = None

# ============================================
# LOAD ENV
# ============================================

load_dotenv()

# ============================================
# FLASK APP
# ============================================

app = Flask(__name__)

CORS(app)

# ============================================
# ENV VARIABLES
# ============================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

PINECONE_INDEX = os.getenv("PINECONE_INDEX")

PORT = int(os.environ.get("PORT", 8000))

# ============================================
# VALIDATE GROQ
# ============================================

if not GROQ_API_KEY:
    raise Exception("Missing GROQ_API_KEY")

# ============================================
# GROQ CLIENT
# ============================================

client = Groq(
    api_key=GROQ_API_KEY
)

# ============================================
# GEMINI OPTIONAL
# ============================================

if GOOGLE_API_KEY:
    genai.configure(
        api_key=GOOGLE_API_KEY
    )

# ============================================
# OPTIONAL PINECONE
# ============================================

pc = None

index = None

try:

    if Pinecone and PINECONE_API_KEY and PINECONE_INDEX:

        pc = Pinecone(
            api_key=PINECONE_API_KEY
        )

        index = pc.Index(PINECONE_INDEX)

        print("✅ Pinecone Connected")

    else:

        print("⚠️ Pinecone Disabled")

except Exception as e:

    print("❌ Pinecone Error:", str(e))

# ============================================
# HOME ROUTE
# ============================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "success": True,
        "message": "AI Healthcare Assistant Running",
        "status": "online"
    })

# ============================================
# HEALTH CHECK
# ============================================

@app.route("/health", methods=["GET"])
def health_check():

    return jsonify({
        "success": True,
        "server": "healthy"
    })

# ============================================
# AI AGENT
# ============================================

@app.route("/api/agent", methods=["POST"])
def ai_agent():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON payload received"
            }), 400

        # ====================================
        # USER QUERY
        # ====================================

        query = data.get("query", "").strip()

        if not query:
            return jsonify({
                "success": False,
                "message": "Query is required"
            }), 400

        # ====================================
        # PATIENT PROFILE
        # ====================================

        patient_profile = data.get("patient_profile", {})

        age = patient_profile.get("age", "N/A")

        gender = patient_profile.get("gender", "N/A")

        disease_history = patient_profile.get(
            "diseaseHistory",
            []
        )

        weight = patient_profile.get("weight", "N/A")

        height = patient_profile.get("height", "N/A")

        # ====================================
        # CURRENT VITALS
        # ====================================

        current_vitals = data.get("current_vitals", {})

        temperature = current_vitals.get(
            "temperature",
            "N/A"
        )

        heart_rate = current_vitals.get(
            "heart_rate",
            "N/A"
        )

        spo2 = current_vitals.get(
            "spo2",
            "N/A"
        )

        status = current_vitals.get(
            "status",
            "normal"
        )

        ecg = current_vitals.get(
            "ecg",
            []
        )

        # ====================================
        # LIMIT ECG
        # ====================================

        if isinstance(ecg, list):
            ecg = ecg[-30:]
        else:
            ecg = []

        # ====================================
        # CHAT HISTORY
        # ====================================

        chat_history = data.get(
            "chat_history",
            []
        )

        formatted_history = ""

        for msg in chat_history[-6:]:

            role = msg.get("role", "user")

            content = msg.get("content", "")

            formatted_history += (
                f"{role.upper()}: {content}\n"
            )

        # ====================================
        # BUILD PROMPT
        # ====================================

        final_prompt = f"""
You are an advanced AI healthcare assistant.

Analyze the patient vitals carefully.

PATIENT PROFILE:
- Age: {age}
- Gender: {gender}
- Weight: {weight}
- Height: {height}
- Disease History: {disease_history}

CURRENT VITALS:
- Temperature: {temperature}
- Heart Rate: {heart_rate}
- SpO2: {spo2}
- Status: {status}

ECG DATA (recent samples):
{ecg}

RECENT CHAT HISTORY:
{formatted_history}

USER QUESTION:
{query}

Your response must include:

1. Health analysis
2. Possible concerns
3. Recommendations
4. Emergency warning if needed

Rules:
- Never claim confirmed diagnosis
- Stay medically cautious
- Be concise and professional
- Mention emergency risk if vitals are dangerous
- Avoid hallucinations
"""

        # ====================================
        # GROQ API CALL
        # ====================================

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a professional AI healthcare assistant."
                    )
                },
                {
                    "role": "user",
                    "content": final_prompt
                }
            ],

            temperature=0.2,

            max_tokens=700,
        )

        ai_reply = (
            completion
            .choices[0]
            .message
            .content
        )

        # ====================================
        # RESPONSE
        # ====================================

        return jsonify({
            "success": True,
            "reply": ai_reply,
            "model_used": "Groq Llama 3.3 70B"
        })

    except Exception as e:

        print("❌ AI Error:", str(e))

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# ============================================
# MAIN
# ============================================

if __name__ == "__main__":

    print("🚀 AI Healthcare Assistant Started")

    app.run(
        host="0.0.0.0",
        port=PORT
    )
