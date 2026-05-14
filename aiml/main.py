import os

from dotenv import load_dotenv

from flask import Flask, request, jsonify

from flask_cors import CORS

from langchain_groq import ChatGroq

from langchain_google_genai import ChatGoogleGenerativeAI

from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_core.prompts import ChatPromptTemplate

from langchain_pinecone import PineconeVectorStore

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
# LOAD GROQ MODEL
# ======================================================

print("⚡ Loading Groq Model...")

groq_llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),

    model_name="llama-3.3-70b-versatile",

    temperature=0.2,
)

# ======================================================
# LOAD GEMINI MODEL
# ======================================================

# OPTIONAL FALLBACK MODEL
# CURRENTLY NOT USED DUE TO QUOTA ISSUES

print("🧠 Loading Gemini Model...")

gemini_llm = ChatGoogleGenerativeAI(
    google_api_key=os.getenv("GOOGLE_API_KEY"),

    model="gemini-2.0-flash",

    temperature=0.2,
)

# ======================================================
# EMBEDDINGS
# ======================================================

print("📦 Loading Embeddings...")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ======================================================
# PINECONE VECTOR DB
# ======================================================

print("🌲 Connecting Pinecone...")

vector_db = PineconeVectorStore(
    index_name=os.getenv("PINECONE_INDEX"),

    embedding=embeddings,
)

# ======================================================
# PROMPT TEMPLATE
# ======================================================

prompt = ChatPromptTemplate.from_template(
    """
You are an advanced AI healthcare assistant.

Analyze the patient vitals carefully.

CURRENT PATIENT DATA:

Temperature: {temperature}

Heart Rate: {heart_rate}

SpO2: {spo2}

ECG Data: {ecg}

PREVIOUS MEDICAL MEMORY:
{memory}

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
# AI AGENT ROUTE
# ======================================================

@app.route("/api/agent", methods=["POST"])
def ai_agent():

    try:

        data = request.get_json()

        # ==================================================
        # USER QUERY
        # ==================================================

        query = data.get(
            "query",
            ""
        )

        # ==================================================
        # CURRENT VITALS
        # ==================================================

        current_vitals = data.get(
            "current_vitals",
            {}
        )

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

        ecg = current_vitals.get(
            "ecg",
            []
        )

        # ==================================================
        # SEARCH MEMORY
        # ==================================================

        try:

            docs = vector_db.similarity_search(
                query,
                k=3
            )

            memory = "\n".join([
                doc.page_content
                for doc in docs
            ])

        except Exception as memory_error:

            print(
                "❌ Memory Search Error:",
                memory_error
            )

            memory = "No previous memory found."

        # ==================================================
        # FINAL PROMPT
        # ==================================================

        final_prompt = prompt.format(
            temperature=temperature,

            heart_rate=heart_rate,

            spo2=spo2,

            ecg=ecg,

            memory=memory,

            query=query,
        )

        # ==================================================
        # USE GROQ
        # ==================================================

        try:

            print("⚡ Using Groq...")

            response = groq_llm.invoke(
                final_prompt
            )

            ai_reply = response.content

            used_model = "Groq"

            print("✅ Groq response received")

        except Exception as groq_error:

            print(
                "❌ Groq Failed:",
                groq_error
            )

            ai_reply = (
                "AI service temporarily unavailable. "
                "Please try again later."
            )

            used_model = "Unavailable"

        # ==================================================
        # SAVE MEMORY
        # ==================================================

        try:

            vector_db.add_texts([
                f"""
Query: {query}

Temperature: {temperature}

Heart Rate: {heart_rate}

SpO2: {spo2}

AI Response:
{ai_reply}
"""
            ])

        except Exception as save_error:

            print(
                "❌ Vector Save Error:",
                save_error
            )

        # ==================================================
        # RETURN RESPONSE
        # ==================================================

        return jsonify({
            "success": True,

            "reply": ai_reply,

            "model_used": used_model,
        })

    except Exception as e:

        print(
            "❌ SERVER ERROR:",
            str(e)
        )

        return jsonify({
            "success": False,

            "message": str(e),
        }), 500

# ======================================================
# MAIN
# ======================================================

if __name__ == "__main__":

    print(
        "🚀 Starting AI Healthcare Server..."
    )

    app.run(
        host="0.0.0.0",

        port=int(
            os.environ.get("PORT", 8000)
        ),

        debug=True,
    )