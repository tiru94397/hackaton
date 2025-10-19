import { motion } from "motion/react";

interface CyberpunkLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function CyberpunkLoader({ text = "Processing", size = "md" }: CyberpunkLoaderProps) {
  const sizes = {
    sm: { outer: 40, inner: 30, stroke: 2 },
    md: { outer: 60, inner: 45, stroke: 3 },
    lg: { outer: 80, inner: 60, stroke: 4 },
  };

  const { outer, inner, stroke } = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width: outer, height: outer }}>
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-cyan-400/30"
          style={{ borderWidth: stroke }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className={`absolute top-0 left-1/2 w-${stroke} h-${stroke * 2} bg-cyan-400 rounded-full -translate-x-1/2`} />
        </motion.div>

        {/* Middle rotating ring */}
        <motion.div
          className="absolute rounded-full border-blue-500/40"
          style={{ 
            inset: (outer - inner) / 2,
            borderWidth: stroke 
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className={`absolute top-0 left-1/2 w-${stroke} h-${stroke * 2} bg-blue-500 rounded-full -translate-x-1/2`} />
        </motion.div>

        {/* Inner pulsing core */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
          style={{ 
            inset: (outer - inner) / 2 + stroke * 2,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glowing center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            boxShadow: [
              "0 0 10px rgba(6, 182, 212, 0.8)",
              "0 0 20px rgba(6, 182, 212, 1)",
              "0 0 10px rgba(6, 182, 212, 0.8)",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting particles */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
            style={{
              transformOrigin: `0 ${-outer / 2 + 5}px`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      {text && (
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm text-cyan-400">{text}</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-cyan-400">.</span>
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            <span className="text-cyan-400">.</span>
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            <span className="text-cyan-400">.</span>
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
