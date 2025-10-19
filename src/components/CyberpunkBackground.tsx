import { motion } from "motion/react";

export function CyberpunkBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Enhanced Base gradient with more layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-cyan-950/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.05),transparent_50%)]" />
      
      {/* Animated grid layers */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 circuit-pattern"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Larger grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'grid-move 30s linear infinite reverse'
          }}
        />
      </div>

      {/* Enhanced Floating orbs with more intense glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.4, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      {/* Additional pink accent orb */}
      <motion.div
        className="absolute top-3/4 right-1/3 w-64 h-64 bg-pink-500/6 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Enhanced Scanline effect with multiple lines */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.6)]"
        animate={{
          top: ["-2px", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        animate={{
          top: ["-1px", "100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Enhanced Corner decorations with glow */}
      <motion.div 
        className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-cyan-400/20"
        animate={{
          borderColor: ["rgba(6, 182, 212, 0.2)", "rgba(6, 182, 212, 0.4)", "rgba(6, 182, 212, 0.2)"],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-blue-500/20"
        animate={{
          borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(59, 130, 246, 0.4)", "rgba(59, 130, 246, 0.2)"],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-40 h-40 border-b-2 border-l-2 border-purple-600/20"
        animate={{
          borderColor: ["rgba(168, 85, 247, 0.2)", "rgba(168, 85, 247, 0.4)", "rgba(168, 85, 247, 0.2)"],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-pink-500/20"
        animate={{
          borderColor: ["rgba(236, 72, 153, 0.2)", "rgba(236, 72, 153, 0.4)", "rgba(236, 72, 153, 0.2)"],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      {/* Enhanced Floating particles with variety */}
      {[...Array(25)].map((_, i) => {
        const colors = ['bg-cyan-400', 'bg-blue-500', 'bg-purple-600', 'bg-pink-500'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${color} rounded-full shadow-[0_0_6px_currentColor]`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -70, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,100 Q250,100 250,250 T500,400 L1000,400"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M1920,200 Q1600,200 1600,400 T1200,600 L800,600"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
