"use client";
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
  perplexityConnected: boolean;
  modelName: string;
}

export function DashboardLayout({
  children,
  activeView,
  onViewChange,
  onSearch,
  onLogout,
  perplexityConnected,
  modelName,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background */}
      <CyberpunkBackground />

      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onViewChange={onViewChange} />

      {/* Main Area */}
      <div className="pl-0 md:pl-20 relative z-10">
        <DashboardHeader onSearch={onSearch} onLogout={onLogout} />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-16 pb-12 md:pb-16 min-h-screen"
        >
          <div className="p-3 md:p-6 h-[calc(100vh-7rem)] overflow-y-auto">
            {children}
          </div>
        </motion.main>

        <StatusBar
          perplexityConnected={perplexityConnected}
          modelName={modelName}
        />
      </div>

      {/* Floating light particles for aesthetic effect */}
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
