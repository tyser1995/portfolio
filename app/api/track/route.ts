import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function parseUserAgent(ua: string) {
  const browser =
    /Edg\//.test(ua)
      ? "Edge"
      : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /Chrome\//.test(ua)
      ? "Chrome"
      : /Firefox\//.test(ua)
      ? "Firefox"
      : /Safari\//.test(ua)
      ? "Safari"
      : "Other";

  const os =
    /Windows NT/.test(ua)
      ? "Windows"
      : /Mac OS X/.test(ua)
      ? "macOS"
      : /Android/.test(ua)
      ? "Android"
      : /iPhone|iPad/.test(ua)
      ? "iOS"
      : /Linux/.test(ua)
      ? "Linux"
      : "Other";

  const device = /Mobi|Android|iPhone/.test(ua)
    ? "mobile"
    : /iPad|Tablet/.test(ua)
    ? "tablet"
    : "desktop";

  return { browser, os, device };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, referrer, screen_width, screen_height, session_id } = body;

    // Get IP — Vercel sets x-forwarded-for
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Vercel edge location headers
    const country = req.headers.get("x-vercel-ip-country") || null;
    const region = req.headers.get("x-vercel-ip-country-region") || null;
    const city = req.headers.get("x-vercel-ip-city") || null;

    const ua = req.headers.get("user-agent") || "";
    const { browser, os, device } = parseUserAgent(ua);

    const { error } = await supabaseAdmin.from("page_views").insert({
      page,
      ip_address: ip,
      country,
      region,
      city,
      user_agent: ua,
      browser,
      os,
      device_type: device,
      referrer: referrer || null,
      screen_width: screen_width || null,
      screen_height: screen_height || null,
      session_id: session_id || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
