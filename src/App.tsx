import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "./components/DashboardLayout";
import { DualPanelView } from "./components/DualPanelView";
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

  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Check authentication status
  useEffect(() => {
    const loggedIn = localStorage.getItem("virtualFactoryAuth");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  // Check Ollama connection (ping backend)
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
          toast.error("Ollama Connection Failed", {
            description: "Check your backend or Ollama server",
          });
        }
      } catch (error) {
        setOllamaConnected(false);
        toast.error("Ollama Connection Failed", {
          description: "Check your backend or Ollama server",
        });
      }
    };

    checkConnection();
  }, [isAuthenticated, modelName]);

  // Authentication
  const handleLogin = useCallback((email: string, password: string) => {
    // Demo authentication
    console.log("Login:", email, password);
    localStorage.setItem("virtualFactoryAuth", "true");
    localStorage.setItem("virtualFactoryUser", email);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    toast.success("Welcome to Virtual Factory AI!", {
      description: "Authentication successful",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    });
  }, []);

  // Generate machine using Ollama API
  const generateMachine = useCallback(async (query: string) => {
    setIsGenerating(true);
    toast.info("AI Processing...", { description: "Generating your machine design" });

    try {
      const response = await fetch("http://localhost:4000/api/ollama/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await response.json();

      const lowerQuery = query.toLowerCase();
      const isDrone =
        lowerQuery.includes("drone") ||
        lowerQuery.includes("quadcopter") ||
        lowerQuery.includes("uav");

      const machineType = isDrone ? "drone" : "robot";

      const generatedMachine: MachineData = {
        type: machineType,
        name: `Ollama AI ${machineType.charAt(0).toUpperCase() + machineType.slice(1)}`,
        description: data.completion || "AI generated machine description",
        specifications: [],
        assembly: [],
      };

      setMachineData(generatedMachine);
      toast.success("Machine Generated!", { description: `${generatedMachine.name} is ready` });
    } catch (error) {
      console.error(error);
      toast.error("AI generation failed", { description: "Check your backend or Ollama server" });
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleMachineTypeChange = useCallback((type: string) => {
    toast.info(`Switched to ${type} category`, { description: "Filter applied" });
  }, []);

  const handleSearch = useCallback((query: string) => {
    generateMachine(query);
  }, [generateMachine]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("virtualFactoryAuth");
    localStorage.removeItem("virtualFactoryUser");
    setIsAuthenticated(false);
    setShowAuthModal(true);
    toast.info("Logged out successfully", { description: "See you next time!" });
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="text-center max-w-2xl">
              <motion.div
                className="text-6xl md:text-8xl mb-6"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                🏭
              </motion.div>
              <h2 className="text-2xl md:text-4xl mb-4 font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Welcome to Virtual Factory AI
              </h2>
              <p className="text-base md:text-lg text-gray-400 mb-8 px-4">
                Design industrial machines with AI. Start a conversation or browse the model gallery.
              </p>
              <Button
                onClick={() => setActiveView("chat")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </div>
          </motion.div>
        );

      case "chat":
        return (
          <DualPanelView
            isGenerating={isGenerating}
            onGenerate={generateMachine}
            machineData={machineData}
            onChangeType={handleMachineTypeChange}
          />
        );

      case "models":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full overflow-y-auto"
          >
            <div className="mb-4 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                Model Gallery
              </h2>
              <p className="text-sm md:text-base text-gray-400">Browse pre-generated machine designs</p>
            </div>
            <MachineGallery onSelectExample={generateMachine} />
          </motion.div>
        );

      case "3d-view":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full overflow-y-auto"
          >
            <div className="mb-4 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                3D Viewer
              </h2>
              <p className="text-sm md:text-base text-gray-400">Interactive 3D model visualization</p>
            </div>
            {machineData ? (
              <div className="h-[calc(100%-100px)]">
                <MachineCanvas 
                  isLoading={isGenerating}
                  machineType={machineData.type}
                />
              </div>
            ) : (
              <div className="h-[400px] md:h-[600px] flex items-center justify-center glass-panel rounded-xl md:rounded-2xl border border-cyan-400/20">
                <div className="text-center">
                  <Box className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-cyan-400 opacity-50" />
                  <p className="text-gray-400">Generate a machine to view it in 3D</p>
                  <Button
                    onClick={() => setActiveView("chat")}
                    className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Creating
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        );

      case "settings":
        return <SettingsView />;

      default:
        return null;
    }
  };

  // Don't render dashboard until authenticated
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-background">
          <CyberpunkBackground />
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => {}} // Prevent closing without auth
            onLogin={handleLogin}
          />
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
        onSearch={handleSearch}
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
 