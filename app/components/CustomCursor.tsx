"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 8;

const PARTICLE_COLORS = [
  "#38bdf8", // sky
  "#818cf8", // violet
  "#fb923c", // orange
  "#fde047", // yellow
  "#f472b6", // pink
  "#34d399", // emerald
  "#ffffff", // white
];

function spawnExplosion(x: number, y: number) {
  const COUNT = 20;

  for (let i = 0; i < COUNT; i++) {
    const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4;
    const speed = 60 + Math.random() * 90;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const size = 4 + Math.random() * 6;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const duration = 450 + Math.random() * 300;
    const isSharp = Math.random() > 0.5; // circle or spark

    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 99998;
      left: ${x}px;
      top: ${y}px;
      width: ${isSharp ? size * 0.5 : size}px;
      height: ${isSharp ? size * 2 : size}px;
      background: ${color};
      border-radius: ${isSharp ? "2px" : "50%"};
      transform: translate(-50%, -50%) rotate(${angle}rad);
      box-shadow: 0 0 6px ${color};
      transition: none;
    `;
    document.body.appendChild(el);

    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = elapsed / duration;

      if (t >= 1) {
        el.remove();
        return;
      }

      const eased = 1 - t * t; // ease out quad
      const px = x + vx * t;
      const py = y + vy * t + 40 * t * t; // slight gravity
      const opacity = eased;
      const scale = eased * 0.9 + 0.1;

      el.style.left = `${px}px`;
      el.style.top = `${py}px`;
      el.style.opacity = `${opacity}`;
      el.style.transform = `translate(-50%, -50%) rotate(${angle + t * Math.PI * 2}rad) scale(${scale})`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  // Shockwave ring
  const ring = document.createElement("div");
  ring.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 99997;
    left: ${x}px;
    top: ${y}px;
    width: 10px;
    height: 10px;
    border: 2px solid rgba(56,189,248,0.9);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(ring);

  let ringStart: number | null = null;
  const animateRing = (ts: number) => {
    if (!ringStart) ringStart = ts;
    const t = (ts - ringStart) / 500;
    if (t >= 1) { ring.remove(); return; }
    const s = 1 + t * 5;
    ring.style.transform = `translate(-50%, -50%) scale(${s})`;
    ring.style.opacity = `${1 - t}`;
    requestAnimationFrame(animateRing);
  };
  requestAnimationFrame(animateRing);
}

export default function CustomCursor() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: -300, y: -300 });
  const prevPos = useRef({ x: -300, y: -300 });
  const angle = useRef(-45);
  const isMoving = useRef(false);
  const exploding = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -300, y: -300 }))
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      if (Math.sqrt(dx * dx + dy * dy) > 2) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        isMoving.current = true;
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => { isMoving.current = false; }, 250);
      }

      trail.current = [{ x: pos.current.x, y: pos.current.y }, ...trail.current.slice(0, TRAIL_LENGTH - 1)];
      prevPos.current = { ...pos.current };
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = () => {
      spawnExplosion(pos.current.x, pos.current.y);

      // Brief hide + reappear of rocket
      exploding.current = true;
      const rocket = rocketRef.current;
      if (rocket) {
        rocket.style.opacity = "0";
        rocket.style.transform += " scale(1.6)";
      }
      setTimeout(() => {
        exploding.current = false;
        if (rocket) rocket.style.opacity = "1";
      }, 350);
    };

    let raf: number;
    const loop = () => {
      const rocket = rocketRef.current;
      if (rocket && !exploding.current) {
        rocket.style.left = `${pos.current.x}px`;
        rocket.style.top = `${pos.current.y}px`;
        rocket.style.transform = `translate(-50%, -50%) rotate(${angle.current}deg)`;

        const flame = rocket.querySelector<SVGPathElement>("#rocket-flame");
        if (flame) flame.style.opacity = isMoving.current ? "1" : "0";
      }

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = trail.current[i];
        const progress = 1 - i / TRAIL_LENGTH;
        el.style.left = `${t.x}px`;
        el.style.top = `${t.y}px`;
        el.style.opacity = isMoving.current && !exploding.current ? `${progress * 0.65}` : "0";
        const size = progress * 7;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      });

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <>
      {/* Flame trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            background: "radial-gradient(circle, #fb923c, #fde047)",
            transform: "translate(-50%, -50%)",
            left: -300,
            top: -300,
          }}
        />
      ))}

      {/* Rocket */}
      <div
        ref={rocketRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: -300,
          top: -300,
          filter: "drop-shadow(0 0 7px rgba(56,189,248,0.85))",
          transition: "opacity 0.15s ease, transform 0.15s ease",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rocketBodyGrad" x1="12" y1="2" x2="12" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="rocketFlameGrad" x1="12" y1="18" x2="12" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Flame (visible when moving) */}
          <path
            id="rocket-flame"
            d="M9.5 18.5 Q12 25 14.5 18.5 Q12 21.5 9.5 18.5Z"
            fill="url(#rocketFlameGrad)"
            style={{ opacity: 0, transition: "opacity 0.12s" }}
          />

          {/* Left fin */}
          <path d="M8 13.5 L3.5 19 L8.5 16.5Z" fill="#818cf8" opacity="0.9" />
          {/* Right fin */}
          <path d="M16 13.5 L20.5 19 L15.5 16.5Z" fill="#818cf8" opacity="0.9" />

          {/* Body */}
          <path
            d="M12 2 C9 6 7 10 7 14 C7 16.5 8.5 18.5 10.5 19.2 L12 17.5 L13.5 19.2 C15.5 18.5 17 16.5 17 14 C17 10 15 6 12 2Z"
            fill="url(#rocketBodyGrad)"
          />

          {/* Porthole outer */}
          <circle cx="12" cy="11" r="2.4" fill="white" fillOpacity="0.95" />
          {/* Porthole inner */}
          <circle cx="12" cy="11" r="1.3" fill="#0ea5e9" />
        </svg>
      </div>
    </>
  );
}
