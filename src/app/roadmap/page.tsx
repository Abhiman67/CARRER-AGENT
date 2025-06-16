"use client";
const iconMap: { [key: string]: string } = {
  learn: "📘",
  read: "📚",
  build: "🛠️",
  project: "💻",
  code: "💡",
  practice: "🎯",
  resume: "📄",
  interview: "🎤",
  plan: "🗺️",
  meditate: "🧘",
  deploy: "🚀",
  evaluate: "📊",
};

const getStepIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  for (const keyword in iconMap) {
    if (lowerTitle.includes(keyword)) {
      return iconMap[keyword];
    }
  }
  return "✅"; // Default icon
};
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";

// import Sidebar from your components if not already globally available
// import Sidebar from "@/components/sidebar";

export default function RoadmapPage() {
  const [goal, setGoal] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const exportRef = useRef(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setSteps([]);
    try {
      const res = await fetch("/api/roadmap-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const data = await res.json();
      const roadmap = data.steps || [];
      setSteps(roadmap);
    } catch (err) {
      console.error("Error generating or saving roadmap:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-[#0f172a] dark:to-[#1e293b] p-6">
      {/* <Sidebar /> */}
      {/* If Sidebar is already globally present, remove this line */}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
            🗺️ Career Roadmap Generator
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Generate step-by-step plans to reach your career goals.
          </p>
        </div>
        <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 rounded-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Become a backend developer"
              className="flex-1"
            />
            <Button
              className="px-6 py-2 text-base bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300 dark:disabled:bg-blue-900"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Thinking..." : "Generate"}
            </Button>
          </div>
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              className="text-sm font-medium border border-blue-600 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg transition"
              onClick={() => {
                setGoal("");
                setSteps([]);
              }}
            >
              🔄 Start Over
            </Button>
          </div>
          {steps.length > 0 && (
            <div
              ref={exportRef}
              className="space-y-6 relative border-l-2 border-zinc-200 dark:border-zinc-700 pl-6 mt-4"
            >
              {steps.map((step: any, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[11px] top-2 w-5 h-5 bg-blue-500 rounded-full animate-pulse shadow-md" />
                  <div className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 p-5 rounded-xl shadow-lg transition-all hover:scale-[1.01]">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {getStepIcon(step.title)} Step {idx + 1}: {step.title}
                    </h3>
                    <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">
                      {step.description}
                    </p>
                    {step.duration && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-2">
                        ⏳ Duration: {step.duration}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {steps.length > 0 && (
            <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-center">
              <Button
                variant="default"
                className="px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white"
                onClick={async () => {
                  if (!exportRef.current) return;
                  const dataUrl = await toPng(exportRef.current, {
                    skipFonts: true,
                    cacheBust: true,
                  });
                  const link = document.createElement("a");
                  link.download = "career-roadmap.png";
                  link.href = dataUrl;
                  link.click();
                }}
              >
                📸 Export as Image
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}