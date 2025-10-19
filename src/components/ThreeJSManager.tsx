import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThreeJSContextType {
  canvasActive: boolean;
  setCanvasActive: (active: boolean) => void;
}

const ThreeJSContext = createContext<ThreeJSContextType | null>(null);

export function ThreeJSProvider({ children }: { children: ReactNode }) {
  const [canvasActive, setCanvasActive] = useState(false);

  return (
    <ThreeJSContext.Provider value={{ canvasActive, setCanvasActive }}>
      {children}
    </ThreeJSContext.Provider>
  );
}

export function useThreeJS() {
  const context = useContext(ThreeJSContext);
  if (!context) {
    throw new Error("useThreeJS must be used within ThreeJSProvider");
  }
  return context;
}
