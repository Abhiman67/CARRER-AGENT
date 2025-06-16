import { db } from "@/lib/db"; // your drizzle client
import { historyTable } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
//import { auth } from "@clerk/nextjs/server";
import { usersTable } from "@/lib/schema";

const userId = "demo-user";
const userEmail = "demo@example.com";



export async function POST(req: Request) {
  try {
    const { steps } = await req.json();
    const { userId, sessionClaims } = await auth();
    const userEmail = sessionClaims?.email as string;

    if (!steps || !Array.isArray(steps)) {
      return NextResponse.json({ error: "Invalid steps" }, { status: 400 });
    }

    await db.insert(historyTable).values({
      recordId: uuidv4(),
      content: steps,
      userEmail,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB Save Error:", error);
    return NextResponse.json({ error: "Failed to save roadmap" }, { status: 500 });
  }
}