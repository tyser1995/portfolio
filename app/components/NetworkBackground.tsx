"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Packet {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const NODE_COUNT = 400;
    const MAX_DIST = 90;
    const MOUSE_RADIUS = 140;
    const nodes: Node[] = [];
    const packets: Packet[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Init nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Spawn data packets periodically
    const spawnPacket = () => {
      const fromIdx = Math.floor(Math.random() * NODE_COUNT);
      let toIdx = Math.floor(Math.random() * NODE_COUNT);
      while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * NODE_COUNT);
      packets.push({ fromIdx, toIdx, progress: 0, speed: 0.007 + Math.random() * 0.007 });
    };
    const packetInterval = setInterval(spawnPacket, 200);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const w = canvas.width;
      const h = canvas.height;

      // --- Spatial grid for O(n) connection lookup ---
      const cellSize = MAX_DIST;
      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;
      const grid: number[][] = Array.from({ length: cols * rows }, () => []);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const cx = Math.floor(node.x / cellSize);
        const cy = Math.floor(node.y / cellSize);
        const cellIdx = cy * cols + cx;
        if (cellIdx >= 0 && cellIdx < grid.length) grid[cellIdx].push(i);
      }

      // --- Update nodes ---
      for (const node of nodes) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.65;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        node.vx *= 0.97;
        node.vy *= 0.97;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > w) { node.x = w; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > h) { node.y = h; node.vy *= -1; }
      }

      // --- Draw connections via spatial grid ---
      const checked = new Set<number>();

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const cx = Math.floor(a.x / cellSize);
        const cy = Math.floor(a.y / cellSize);

        // Check 3x3 neighbourhood
        for (let ny = cy - 1; ny <= cy + 1; ny++) {
          for (let nx = cx - 1; nx <= cx + 1; nx++) {
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
            const cell = grid[ny * cols + nx];
            for (const j of cell) {
              if (j <= i) continue;
              const key = i * NODE_COUNT + j;
              if (checked.has(key)) continue;
              checked.add(key);

              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < MAX_DIST) {
                const fade = 1 - dist / MAX_DIST;
                const midX = (a.x + b.x) / 2;
                const midY = (a.y + b.y) / 2;
                const mDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
                const boost = mDist < MOUSE_RADIUS ? (1 - mDist / MOUSE_RADIUS) * 0.4 : 0;
                const alpha = fade * 0.3 + boost;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
              }
            }
          }
        }
      }

      // --- Draw data packets ---
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) { packets.splice(p, 1); continue; }

        const from = nodes[pkt.fromIdx];
        const to = nodes[pkt.toIdx];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > MAX_DIST * 1.4) { packets.splice(p, 1); continue; }

        const px = from.x + dx * pkt.progress;
        const py = from.y + dy * pkt.progress;

        const grd = ctx.createRadialGradient(px, py, 0, px, py, 5);
        grd.addColorStop(0, "rgba(255,255,255,0.95)");
        grd.addColorStop(0.4, "rgba(56,189,248,0.7)");
        grd.addColorStop(1, "rgba(56,189,248,0)");
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fill();
      }

      // --- Draw nodes ---
      for (const node of nodes) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < MOUSE_RADIUS ? 1 - dist / MOUSE_RADIUS : 0;
        const pulse = Math.sin(frame * 0.02 + node.pulsePhase) * 0.4 + 0.6;
        const alpha = 0.55 + pulse * 0.25 + nearMouse * 0.3;

        if (nearMouse > 0.2) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12 * nearMouse);
          glow.addColorStop(0, `rgba(129,140,248,${nearMouse * 0.4})`);
          glow.addColorStop(1, "rgba(129,140,248,0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12 * nearMouse, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + nearMouse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(packetInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
