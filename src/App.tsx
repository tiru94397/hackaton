"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "./components/DashboardLayout";
import { ChatInterface } from "./components/ChatInterface";
import { CyberpunkBackground } from "./components/CyberpunkBackground";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import {
  Sparkles,
  Cpu,
  Zap,
  Wrench,
  Bell,
  Moon,
  Layout,
} from "lucide-react";
import { AuthModal } from "./components/AuthModal";
import { useAuth } from "./hooks/useAuth";
import { Scene3D } from "./components/Scene3D";
import { Canvas } from "@react-three/fiber";
import { MouseTrail } from "./components/MouseTrail";

/* -------------------------------------------------------------
   SETTINGS SECTION
------------------------------------------------------------- */
const SettingsSection: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    aiTools: true,
    devMode: false,
    performanceBoost: true,
    compactLayout: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("vf_advanced_settings_v1");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings.darkMode]);

  useEffect(() => {
    localStorage.setItem("vf_advanced_settings_v1", JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings, label: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${label} ${settings[key] ? "Disabled" : "Enabled"}`, {
      description: "Settings updated",
    });
  };

  const resetSettings = () => {
    const defaults = {
      darkMode: true,
      notifications: true,
      aiTools: true,
      devMode: false,
      performanceBoost: true,
      compactLayout: false,
    };
    setSettings(defaults);
    localStorage.setItem("vf_advanced_settings_v1", JSON.stringify(defaults));
    toast.info("Settings reset to default");
  };

  const options = [
    { key: "darkMode", label: "Dark Mode", icon: <Moon className="w-5 h-5 text-cyan-400" /> },
    { key: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5 text-yellow-400" /> },
    { key: "aiTools", label: "Enable AI Tools", icon: <Cpu className="w-5 h-5 text-pink-400" /> },
    { key: "devMode", label: "Developer Mode", icon: <Wrench className="w-5 h-5 text-green-400" /> },
    { key: "performanceBoost", label: "Performance Boost", icon: <Zap className="w-5 h-5 text-orange-400" /> },
    { key: "compactLayout", label: "Compact Layout", icon: <Layout className="w-5 h-5 text-blue-400" /> },
  ] as const;

  return (
    <motion.div
      className="p-8 text-white"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6 tracking-tight flex items-center gap-2">
        ⚙️ AI System Control Panel
      </h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {options.map((opt) => (
          <motion.div
            key={opt.key}
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-between bg-gray-800/50 px-5 py-4 rounded-2xl border border-gray-700 hover:border-cyan-400/40 transition-all backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-3">
              {opt.icon}
              <span className="text-gray-300">{opt.label}</span>
            </div>
            <input
              type="checkbox"
              checked={settings[opt.key]}
              onChange={() => toggleSetting(opt.key, opt.label)}
              className="accent-cyan-400 w-5 h-5 cursor-pointer"
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetSettings}
        className="mt-8 px-6 py-2.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl hover:bg-cyan-500/30 transition"
      >
        🧼 Reset to Default
      </motion.button>
    </motion.div>
  );
};

/* -------------------------------------------------------------
   MAIN APP
------------------------------------------------------------- */
export default function App() {
  const user = useAuth();
  const [activeView, setActiveView] = useState<"home" | "chat" | "settings" | "factory" | "models">("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.overflow = "hidden"; // 🚫 Disable global scroll
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("virtualFactoryAuth");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    }
  }, []);

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

  const handleLogout = useCallback(() => {
    localStorage.removeItem("virtualFactoryAuth");
    localStorage.removeItem("virtualFactoryUser");
    setIsAuthenticated(false);
    setShowAuthModal(true);
    toast.info("Logged out", { description: "See you next time!" });
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "chat":
        return (
          <div className="flex flex-col w-full h-full px-3 md:px-8 py-4 md:py-6">
            <div className="flex-1 overflow-hidden rounded-2xl bg-gray-900/40 border border-cyan-400/20 shadow-lg backdrop-blur-md">
              <ChatInterface backendUrl="https://backend1-4-kx23.onrender.com" />
            </div>
          </div>
        );

      case "settings":
        return <SettingsSection />;

      case "factory":
        return (
          <div className="w-full h-[80vh] bg-[#020617] rounded-2xl overflow-hidden border border-cyan-400/30">
            <Canvas camera={{ position: [8, 6, 10], fov: 55 }}>
              <Scene3D isLoading={false} machineType="robot" />
            </Canvas>
          </div>
        );

      case "models":
        return (
          <motion.div
            className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/60 border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover:border-cyan-400/60 transition-all backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">System Overview</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>🧠 Model: <span className="text-cyan-300">Perplexity Core</span></li>
                <li>⚙️ Status: <span className="text-green-400">Operational</span></li>
                <li>💾 Memory: <span className="text-yellow-300">62% used</span></li>
                <li>🌍 Connections: <span className="text-cyan-200">Backend Active</span></li>
              </ul>
            </div>

            <div className="bg-gray-900/60 border border-yellow-500/30 rounded-2xl p-6 shadow-lg hover:border-yellow-400/60 transition-all backdrop-blur-sm col-span-full lg:col-span-1">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">AI Metrics</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex justify-between"><span>Query Speed</span><span className="text-cyan-300">87ms</span></div>
                <div className="flex justify-between"><span>Response Accuracy</span><span className="text-green-300">98%</span></div>
                <div className="flex justify-between"><span>Active Agents</span><span className="text-pink-300">3 running</span></div>
                <div className="flex justify-between"><span>Energy Consumption</span><span className="text-yellow-300">12.4 kJ</span></div>
              </div>
            </div>

            <div className="col-span-full bg-gray-900/60 border border-purple-500/30 rounded-2xl p-6 shadow-lg hover:border-purple-400/60 transition-all backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Virtual Factory Vision</h3>
              <p className="text-gray-300 text-sm">
                The <span className="text-cyan-300">Virtual Factory AI</span> aims to simulate intelligent production systems — combining LLM reasoning, 3D visualization, and real-time analytics.
              </p>
            </div>
          </motion.div>
        );

      case "home":
default:
  return (
    <motion.div
      className="p-6 md:p-10 text-white select-none h-full flex flex-col justify-center items-center bg-gradient-to-b from-background to-muted/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          ⚡ Virtual Factory AI Dashboard
        </h2>

        <p className="text-gray-400 mb-10 text-base md:text-lg leading-relaxed">
          Welcome back, Operator! Choose an action below to begin creating, exploring, or optimizing your Virtual Factory.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Open AI Chat",
              desc: "Talk with your Virtual Factory Assistant",
              icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
              onClick: () => setActiveView("chat"),
              color: "from-cyan-500/30 via-cyan-400/10 to-transparent",
            },
            {
              title: "System Settings",
              desc: "Control appearance, AI tools & preferences",
              icon: <Wrench className="w-6 h-6 text-green-400" />,
              onClick: () => setActiveView("settings"),
              color: "from-green-500/30 via-green-400/10 to-transparent",
            },
            {
              title: "3D Factory",
              desc: "Explore the futuristic 3D Factory view",
              icon: <Cpu className="w-6 h-6 text-pink-400" />,
              onClick: () => setActiveView("factory"),
              color: "from-pink-500/30 via-pink-400/10 to-transparent",
            },
            {
              title: "AI Builder",
              desc: "Generate new tools & workflows using prompts",
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              onClick: () => toast.info("Coming soon! 🚀 AI Builder under development"),
              color: "from-yellow-500/30 via-yellow-400/10 to-transparent",
            },
            {
              title: "System Report",
              desc: "View your AI system performance & analytics",
              icon: <Layout className="w-6 h-6 text-blue-400" />,
              onClick: () => toast.info("System report is being prepared..."),
              color: "from-blue-500/30 via-blue-400/10 to-transparent",
            },
            {
              title: "Logout",
              desc: "End current session safely",
              icon: <Bell className="w-6 h-6 text-red-400" />,
              onClick: handleLogout,
              color: "from-red-500/30 via-red-400/10 to-transparent",
            },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              onClick={item.onClick}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`text-left bg-gradient-to-br ${item.color}
              border border-gray-700/70 rounded-2xl p-6 flex flex-col gap-2 
              hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/10
              transition-all backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
    }
  }
  if (!isAuthenticated && !user) {
    return (
      <>
        <div className="h-screen w-screen bg-background text-white relative overflow-hidden">
          <CyberpunkBackground />
          <MouseTrail />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        </div>
        <Toaster position="bottom-right" />
      </>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-background text-white overflow-hidden">
      <CyberpunkBackground />
      <MouseTrail />
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
    </div>
  );
}
