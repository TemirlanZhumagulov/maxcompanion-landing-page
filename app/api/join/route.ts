import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Payload = {
  email: string;
  whatsapp?: string;
  telegram?: string;
  user_note?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, whatsapp, telegram, user_note } = (await req.json()) as Payload;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    // Get client info
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const ua = req.headers.get("user-agent") || "unknown";

    const { error } = await supabase.from("waitlist_signups").insert([
      { 
        email, 
        whatsapp: whatsapp || null, 
        telegram: telegram || null, 
        user_note: user_note || null,
        source: "landing",
        ip,
        ua
      },
    ]);

    if (error) {
      // Handle unique constraint violation (duplicate email)
      if (error.code === "23505") {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}



