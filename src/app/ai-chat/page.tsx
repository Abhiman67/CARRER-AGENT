"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AiChatPage() {
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!msg.trim()) return;
    const userMsg = { role: "user", content: msg };
    setHistory((prev) => [...prev, userMsg]);
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-career-chat-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msg, userEmail: "daddy@email.com" }),
      });

      const data = await res.json();
      let parsedResult;

      try {
        parsedResult = JSON.parse(data.result);
        const formatted = parsedResult
          .map(
            (step: { title: string; description: string }) =>
              `• ${step.title}\n${step.description}`
          )
          .join("\n\n");
        setHistory((prev) => [...prev, { role: "assistant", content: formatted }]);
      } catch {
        setHistory((prev) => [...prev, { role: "assistant", content: data.result }]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history, loading]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fdfaf6] to-[#f0ece6] text-[#2f2f2f] font-sans">
      <div className="flex justify-end items-center gap-4 px-8 pt-8">
        <a
          href="/"
          className="bg-white/30 backdrop-blur-md border border-[#d6cfc3] px-5 py-2 rounded-full shadow hover:bg-white/50 transition text-sm font-medium text-blue-800"
        >
          Home
        </a>
        <button
          onClick={() => {
            setHistory([]);
            setMsg("");
          }}
          className="bg-white/30 backdrop-blur-md border border-[#d6cfc3] px-5 py-2 rounded-full shadow hover:bg-white/50 transition text-sm font-medium text-blue-800"
        >
          New Chat
        </button>
      </div>
      <div ref={chatRef} className="flex-1 overflow-y-auto px-8 py-10 space-y-8 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-white/30 backdrop-blur-md border border-[#d6cfc3] px-6 py-3 rounded-full shadow text-xl font-semibold text-[#3e3e3e]">
            Chat with a Career Expert
          </div>
        </div>
        <p className="text-center text-[#6f6f6f] text-lg mb-4">
          Ask any career-related questions and receive personalized advice powered by AI.
        </p>

        {history.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-6 py-4 rounded-2xl max-w-full whitespace-pre-wrap shadow ${
              msg.role === "user"
                ? "bg-blue-700 text-white hover:bg-blue-800 transition"
                : "bg-white/60 backdrop-blur-md border border-[#e0d4c8] text-[#2f2f2f] hover:shadow-md transition"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-[#6f6f6f] italic text-center">Thinking...</div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-4 mb-4">
        <div className="bg-white/50 border border-[#e0d4c8] rounded-xl shadow-md px-6 py-4 text-sm text-[#4e4e4e] space-y-3 transition hover:shadow-lg backdrop-blur">
          <div>💡 Try asking things like:</div>
          <div className="flex flex-wrap gap-2">
            {[
              "How do I prepare for data analyst interviews?",
              "Top skills needed for product management",
              "Roadmap to become a software developer"
            ].map((text, index) => (
              <button
                key={index}
                onClick={() => setMsg(text)}
                className="bg-white/70 hover:bg-white border border-[#d6cfc3] rounded-full px-4 py-2 text-sm transition text-[#3e3e3e] shadow-sm"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#fdfaf6] to-[#f7f3ed] border-t border-[#d6cfc3] px-8 py-5 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Input
            placeholder="Type your message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-white/30 backdrop-blur-md border border-[#d6cfc3] rounded-full px-6 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 text-[#2f2f2f]"
          />
          <Button
            onClick={handleSend}
            disabled={loading}
            className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 shadow transition"
          >
            ➤
          </Button>
        </div>
      </div>
    </div>
  );
}