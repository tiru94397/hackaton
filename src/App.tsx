import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "./components/DashboardLayout";
import { ChatInterface } from "./components/ChatInterface";
import { CyberpunkBackground } from "./components/CyberpunkBackground";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { AuthModal } from "./components/AuthModal";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const user = useAuth(); // Custom Firebase hook (or null if not logged)
  const [activeView, setActiveView] = useState("chat");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Check for stored session
  useEffect(() => {
    const loggedIn = localStorage.getItem("virtualFactoryAuth");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  // Login handler
  const handleLogin = useCallback((email: string) => {
    localStorage.setItem("virtualFactoryAuth", "true");
    localStorage.setItem("virtualFactoryUser", email);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    toast.success("Welcome!", {
      description: "Authentication successful",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    });
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    localStorage.removeItem("virtualFactoryAuth");
    localStorage.removeItem("virtualFactoryUser");
    setIsAuthenticated(false);
    setShowAuthModal(true);
    toast.info("Logged out", { description: "See you next time!" });
  }, []);

  // Render main dashboard content
  const renderView = () => {
    switch (activeView) {
      case "chat":
        return (
          <ChatInterface backendUrl="https://backend1-4-kx23.onrender.com" />
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Select a view
          </div>
        );
    }
  };

  // If not logged in
  if (!isAuthenticated && !user) {
    return (
      <>
        <div className="min-h-screen bg-background text-white relative overflow-hidden">
          <CyberpunkBackground />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
        <Toaster position="bottom-right" />
      </>
    );
  }

  // If logged in — Dashboard
  return (
    <>
      <DashboardLayout
        activeView={activeView}
        onViewChange={setActiveView}
        onSearch={() => {}}
        onLogout={handleLogout}
        ollamaConnected={false}
        modelName="Perplexity"
      >
        {renderView()}
      </DashboardLayout>
      <Toaster position="bottom-right" />
    </>
  );
}
