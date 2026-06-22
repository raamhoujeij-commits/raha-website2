import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

function readWaitlist(): { name: string; email: string; joinedAt: string }[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeWaitlist(data: unknown[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const list = readWaitlist();

    const alreadyExists = list.some(
      (entry) => entry.email.toLowerCase() === email.toLowerCase()
    );
    if (alreadyExists) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    list.push({ name: name.trim(), email: email.trim().toLowerCase(), joinedAt: new Date().toISOString() });
    writeWaitlist(list);

    return NextResponse.json({ success: true, message: "Added to waitlist." });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET() {
  const list = readWaitlist();
  return NextResponse.json({ count: list.length, entries: list });
}
