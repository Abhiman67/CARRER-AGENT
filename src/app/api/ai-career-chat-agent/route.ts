import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { prompt, userEmail } = await req.json();

    // 1. Call OpenRouter API
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();

    if (!data.choices?.[0]?.message?.content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    const reply = data.choices[0].message.content;

    // 2. Save to DB
    // await db.insert(history).values({
    //   userEmail: userEmail,
    //   content: JSON.stringify([
    //     { role: "user", content: prompt },
    //     { role: "assistant", content: reply },
    //   ]),
    // });

    return NextResponse.json({ result: reply });
  } catch (err) {
    console.error("🔥 Error in API:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}