"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("/api/get-history");
      const data = await res.json();
      setHistory(data.records || []);
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-[#f9f9f9]">
      <h1 className="text-3xl font-bold mb-6 text-center">📜 Roadmap History</h1>
      <div className="space-y-4 max-w-4xl mx-auto">
        {history.map((item, idx) => (
          <Card key={idx} className="p-4 border rounded-xl bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-800 mb-2">
              Roadmap #{idx + 1}
            </h2>
            <ul className="list-disc ml-5 text-zinc-600">
              {item.content.map((step: any, i: number) => (
                <li key={i}>{step.title}</li>
              ))}
            </ul>
            <p className="text-xs text-zinc-400 mt-2">🕒 {new Date(item.createdAt).toLocaleString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}