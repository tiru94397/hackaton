import { ReactNode } from "react";
import { motion } from "motion/react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { StatusBar } from "./StatusBar";
import { CyberpunkBackground } from "./CyberpunkBackground";

interface DashboardLayoutProps {
  children: ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  ollamaConnected: boolean;
  modelName: string;
}

export function DashboardLayout({
  children,
  activeView,
  onViewChange,
  onSearch,
  onLogout,
  ollamaConnected,
  modelName,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Cyberpunk Animated Background */}
      <CyberpunkBackground />

      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={onViewChange} />

      {/* Main Dashboard Area */}
      <div className="pl-0 md:pl-20 relative z-10">
        {/* Header */}
        <DashboardHeader onSearch={onSearch} onLogout={onLogout} />

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-16 pb-12 md:pb-16 min-h-screen"
        >
          {/* Content padding */}
          <div className="p-3 md:p-6 h-[calc(100vh-7rem)] md:h-[calc(100vh-7rem)]">{children}</div>
        </motion.main>

        {/* Status Bar */}
        <StatusBar ollamaConnected={ollamaConnected} modelName={modelName} />
      </div>

      {/* Floating particles for immersion */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
