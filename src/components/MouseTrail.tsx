import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on larger screens
    setIsEnabled(window.innerWidth > 768);

    const handleResize = () => {
      setIsEnabled(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let particleId = 0;
    let lastTime = Date.now();
    const throttleDelay = 50; // Only create particle every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => {
        // Keep only last 10 particles
        const updated = [...prev, newParticle];
        return updated.slice(-10);
      });

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent)",
            }}
            initial={{
              scale: 1,
              opacity: 0.8,
            }}
            animate={{
              scale: 0,
              opacity: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
