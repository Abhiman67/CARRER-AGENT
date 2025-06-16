import { db } from "@/lib/db";
import { historyTable } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { sessionClaims } = await auth();
    const email = sessionClaims?.email as string;

    const records = await db
      .select()
      .from(historyTable)
      .where(eq(historyTable.userEmail, email));

    return NextResponse.json({ records });
  } catch (err) {
    console.error("History Fetch Error:", err);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}