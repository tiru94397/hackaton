"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type EnvironmentMode = "normal" | "low" | "critical" | "fast";

interface EnvironmentContextType {
  mode: EnvironmentMode;
  setMode: (mode: EnvironmentMode) => void;
  intensity: number;
}

const EnvironmentContext = createContext<EnvironmentContextType | null>(null);

export function AIEnvironmentProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<EnvironmentMode>("normal");

  const intensity =
    mode === "low" ? 0.4 : mode === "critical" ? 2 : mode === "fast" ? 1.8 : 1;

  return (
    <EnvironmentContext.Provider value={{ mode, setMode, intensity }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useAIEnvironment() {
  const ctx = useContext(EnvironmentContext);
  if (!ctx) throw new Error("useAIEnvironment must be used within AIEnvironmentProvider");
  return ctx;
}
