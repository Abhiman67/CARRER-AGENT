import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { goal } = await req.json();
    console.log("🧠 Received goal:", goal);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
       
content: `You are a career mentor. When given a goal, respond ONLY with a valid JSON array like:
[
  { "title": "Learn HTML", "description": "Start with HTML and CSS basics", "duration": "2 weeks" },
  { "title": "Master JavaScript", "description": "Understand ES6 and DOM", "duration": "3 weeks" }
]

Each item must include a "duration" field estimating how long that step might take.
Respond ONLY with valid JSON.`
          },
          {
            role: "user",
            content: `My goal is: ${goal}.`,
          },
        ],
      }), 
    });

    const data = await response.json();
    console.log("📦 OpenRouter response:", JSON.stringify(data, null, 2));

    const rawText = data.choices?.[0]?.message?.content;

    console.log("📝 Raw AI response:", rawText);
    const steps = JSON.parse(rawText ?? "[]");

    return NextResponse.json({ steps });
  } catch (error) {
    console.error("🔥 Roadmap API Error:", error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}