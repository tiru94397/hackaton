import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "./components/DashboardLayout";
import { ChatInterface } from "./components/ChatInterface";
import { MachineGallery } from "./components/MachineGallery";
import { MachineCanvas } from "./components/MachineCanvas";
import { AuthModal } from "./components/AuthModal";
import { CyberpunkBackground } from "./components/CyberpunkBackground";
import { SettingsView } from "./components/SettingsView";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Box, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";

interface MachineData {
  type: "robot" | "drone";
  name: string;
  description: string;
  specifications: string[];
  assembly: string[];
}

export default function App() {
  const [activeView, setActiveView] = useState("chat");
  const [isGenerating, setIsGenerating] = useState(false);
  const [machineData, setMachineData] = useState<MachineData | null>(null);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [modelName] = useState("llama3");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Check auth
  useEffect(() => {
    const loggedIn = localStorage.getItem("virtualFactoryAuth");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  // Check backend / Ollama connection
  useEffect(() => {
    if (!isAuthenticated) return;
    const checkConnection = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/ollama/status");
        if (res.ok) {
          setOllamaConnected(true);
          toast.success("Ollama Connected", { description: `Model: ${modelName}` });
        } else {
          setOllamaConnected(false);
          toast.error("Ollama Connection Failed", { description: "Check backend" });
        }
      } catch {
        setOllamaConnected(false);
        toast.error("Ollama Connection Failed", { description: "Check backend" });
      }
    };
    checkConnection();
  }, [isAuthenticated, modelName]);

  // Demo login
  const handleLogin = useCallback((email: string, password: string) => {
    localStorage.setItem("virtualFactoryAuth", "true");
    localStorage.setItem("virtualFactoryUser", email);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    toast.success("Welcome!", {
      description: "Authentication successful",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("virtualFactoryAuth");
    localStorage.removeItem("virtualFactoryUser");
    setIsAuthenticated(false);
    setShowAuthModal(true);
    toast.info("Logged out", { description: "See you next time!" });
  }, []);

  // Render views
  const renderView = () => {
    switch (activeView) {
      case "chat":
        return <ChatInterface backendUrl="http://localhost:4000" />;
      case "models":
        return <MachineGallery onSelectExample={() => {}} />;
      case "3d-view":
        return machineData ? (
          <MachineCanvas isLoading={isGenerating} machineType={machineData.type} />
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl">
            <Box className="w-16 h-16 text-cyan-400 opacity-50" />
            <p className="text-gray-400 ml-2">Generate a machine to view 3D</p>
          </div>
        );
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-background">
          <CyberpunkBackground />
          <AuthModal isOpen={showAuthModal} onClose={() => {}} onLogin={handleLogin} />
        </div>
        <Toaster position="bottom-right" />
      </>
    );
  }

  return (
    <>
      <DashboardLayout
        activeView={activeView}
        onViewChange={setActiveView}
        onSearch={() => {}}
        onLogout={handleLogout}
        ollamaConnected={ollamaConnected}
        modelName={modelName}
      >
        {renderView()}
      </DashboardLayout>
      <Toaster position="bottom-right" />
    </>
  );
}
