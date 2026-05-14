import { X, Send, Mic, Bot, Loader2 } from "lucide-react";

import API from "../../services/axios";

import { useState, useEffect, useRef } from "react";

const AIChatWindow = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",

      content:
        "Hello. I am your AI medical assistant. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  // ====================================
  // AUTO SCROLL
  // ====================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ====================================
  // LOAD HISTORY
  // ====================================

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await API.get("/ai/history");

        if (data.messages?.length > 0) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.log("History Error:", error);
      }
    };

    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  // ====================================
  // SEND MESSAGE
  // ====================================

  const handleSend = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const currentMessage = message.trim();

    // ====================================
    // USER MESSAGE
    // ====================================

    const userMessage = {
      role: "user",

      content: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    setLoading(true);

    try {
      const { data } = await API.post(
        "/ai/chat",
        {
          message: currentMessage,
        },
        {
          timeout: 180000,
        },
      );

      // ====================================
      // AI RESPONSE
      // ====================================

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",

          content: data.reply || "No response generated.",
        },
      ]);
    } catch (error) {
      console.log("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",

          content: "AI server currently unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ====================================
  // CLOSE IF NOT OPEN
  // ====================================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-xl flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-[#020617] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col">
        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Bot size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-cyan-400">
                MEDICAL AI ASSISTANT
              </h2>

              <p className="text-gray-400 text-sm">Groq + Pinecone AI</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* CHAT BODY */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-5 py-4 rounded-3xl border ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-black border-cyan-400"
                    : "bg-slate-900/70 text-white border-slate-700"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {/* LOADER */}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900/70 text-white border border-slate-700 px-5 py-4 rounded-3xl flex items-center gap-3">
                <Loader2 size={22} className="animate-spin text-cyan-400" />

                <div>
                  <p className="font-semibold">
                    AI is analyzing your health data...
                  </p>

                  <p className="text-sm text-gray-400">
                    Please wait. This may take up to 2–3 minutes.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}

        <div className="p-5 border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-md">
          <div className="flex gap-4 items-center">
            {/* INPUT */}

            <input
              type="text"
              value={message}
              disabled={loading}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleSend();
                }
              }}
              placeholder={
                loading
                  ? "Waiting for AI response..."
                  : "Ask the AI medical assistant..."
              }
              className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 disabled:opacity-50"
            />

            {/* MIC */}

            <button
              type="button"
              disabled={loading}
              className="w-14 h-14 rounded-2xl bg-slate-800 text-cyan-400 flex items-center justify-center disabled:opacity-50"
            >
              <Mic size={24} />
            </button>

            {/* SEND */}

            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="w-14 h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black flex items-center justify-center transition"
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <Send size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatWindow;
