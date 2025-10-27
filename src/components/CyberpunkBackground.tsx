import { motion } from "framer-motion";

export function CyberpunkBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Neon Gradient Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-700/20 via-purple-700/10 to-pink-600/10 blur-3xl"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      {/* Moving light orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-cyan-500/30 rounded-full mix-blend-screen blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 80, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-screen blur-3xl"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 100, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
}
