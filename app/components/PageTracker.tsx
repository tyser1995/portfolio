"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getOrCreateSessionId() {
  const key = "portfolio_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || null,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        session_id: sessionId,
      }),
    }).catch(() => {
      // silently fail — tracking should never break the UI
    });
  }, [pathname]);

  return null;
}
