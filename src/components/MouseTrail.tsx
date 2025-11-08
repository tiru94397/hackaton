"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  // Predefined gradient colors (cyberpunk palette)
  const colors = [
    "rgba(34,211,238,0.9)", // cyan-400
    "rgba(59,130,246,0.9)", // blue-500
    "rgba(147,51,234,0.9)", // purple-600
  ];

  useEffect(() => {
    const handleResize = () => setIsEnabled(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let particleId = 0;
    let lastTime = Date.now();
    const throttleDelay = 35;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const color = colors[Math.floor(Math.random() * colors.length)];

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        color,
      };

      setParticles((prev) => {
        const updated = [...prev, newParticle];
        return updated.slice(-14); // keep last few
      });

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full mix-blend-screen"
            style={{
              left: p.x,
              top: p.y,
              background: `radial-gradient(circle, ${p.color}, transparent 70%)`,
              boxShadow: `0 0 10px ${p.color}`,
            }}
            initial={{ scale: 1.4, opacity: 0.9 }}
            animate={{
              scale: [1.4, 0.8, 0],
              opacity: [0.9, 0.5, 0],
              y: [-2, -8, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
