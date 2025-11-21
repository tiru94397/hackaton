"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Toaster, toast } from "sonner";

import {
  Moon,
  Bell,
  Cpu,
  Wrench,
  Zap,
  Layout,
  Sparkles,
} from "lucide-react";

import { DashboardLayout } from "./components/DashboardLayout";
import ChatInterface from "./components/ChatInterface";
import { CyberpunkBackground } from "./components/CyberpunkBackground";
import { MouseTrail } from "./components/MouseTrail";
import { AIEnvironmentProvider } from "./context/AIEnvironmentContext";

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------
type Views = "home" | "chat" | "settings" | "factory" | "models";

type SettingsState = {
  darkMode: boolean;
  notifications: boolean;
  aiTools: boolean;
  devMode: boolean;
  performanceBoost: boolean;
  compactLayout: boolean;
};

// ------------------------------------------------------
// BOOT SCREEN
// ------------------------------------------------------
function BootScreen() {
  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 text-cyan-300 font-mono text-sm space-y-3"
    >
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="text-lg"
      >
        Booting Virtual Factory Core...
      </motion.div>

      <motion.div className="overflow-hidden h-20 w-[320px] bg-gray-900/60 border border-cyan-500/20 rounded-md p-2 text-left text-xs leading-4">
        <p>&gt; Loading AI Modules</p>
        <p>&gt; Connecting Neural Mesh</p>
        <p>&gt; Power Core Online ✅</p>
        <p>&gt; Launching Interface...</p>
      </motion.div>

      <motion.div
        animate={{ width: ["0%", "85%", "100%"] }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
        className="h-1 bg-cyan-400 rounded-full mt-4 w-1/2"
      />
    </motion.div>
  );
}

// ------------------------------------------------------
// SETTINGS VIEW
// ------------------------------------------------------
function SettingsSection(): JSX.Element {
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: true,
    notifications: true,
    aiTools: true,
    devMode: false,
    performanceBoost: true,
    compactLayout: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("vf_settings_v1");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings.darkMode]);

  useEffect(() => {
    localStorage.setItem("vf_settings_v1", JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof SettingsState, label: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast(`${label} toggled`, { description: "Settings updated." });
  };

  const opts = [
    {
      key: "darkMode",
      label: "Dark Mode",
      icon: <Moon className="w-5 h-5 text-cyan-400" />,
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5 text-yellow-400" />,
    },
    {
      key: "aiTools",
      label: "AI Tools",
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
    },
    {
      key: "devMode",
      label: "Developer Mode",
      icon: <Wrench className="w-5 h-5 text-green-400" />,
    },
    {
      key: "performanceBoost",
      label: "Performance Boost",
      icon: <Zap className="w-5 h-5 text-orange-400" />,
    },
    {
      key: "compactLayout",
      label: "Compact Layout",
      icon: <Layout className="w-5 h-5 text-blue-400" />,
    },
  ] as const;

  return (
    <motion.div
      className="p-8 text-white"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6">⚙️ AI System Control Panel</h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {opts.map((opt) => (
          <motion.div
            key={opt.key}
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-between bg-gray-800/50 px-5 py-4 rounded-2xl border border-gray-700 hover:border-cyan-400/40 transition-all"
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
    </motion.div>
  );
}

// ------------------------------------------------------
// 3D SCENE
// ------------------------------------------------------
function Scene3D(): JSX.Element {
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (sphereRef.current) {
      sphereRef.current.position.y = 1 + Math.sin(t * 1.5) * 0.3;
      sphereRef.current.rotation.y = t * 0.5;
    }

    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t) * 5;
      lightRef.current.position.z = Math.cos(t) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight
        ref={lightRef}
        position={[5, 6, 5]}
        intensity={2}
        color="#00ffff"
      />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#020202" roughness={0.8} />
      </mesh>

      <mesh ref={sphereRef} position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.7}
        />
      </mesh>
    </>
  );
}

// ------------------------------------------------------
// CHAT + 3D SPLIT VIEW
// ------------------------------------------------------
function ChatAndScene(): JSX.Element {
  return (
    <div className="flex flex-row w-full h-full px-4 py-4 gap-4">
      <div className="flex-1 bg-gray-900/40 border border-cyan-400/20 rounded-2xl overflow-hidden">
        <ChatInterface backendUrl="https://backend1-4-kx23.onrender.com" />
      </div>

      <div className="flex-1 bg-[#020617] border border-cyan-400/30 rounded-2xl relative overflow-hidden">
        <Canvas camera={{ position: [8, 6, 10], fov: 55 }}>
          <Scene3D />
        </Canvas>

        <div className="absolute bottom-6 left-6 bg-gray-900/70 text-cyan-300 px-4 py-2 border border-cyan-500/30 rounded-xl">
          3D Interaction Active
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// FACTORY VIEW
// ------------------------------------------------------
function FactoryView() {
  return (
    <div className="relative h-[80vh] bg-[#020617] border border-cyan-400/30 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [8, 6, 10], fov: 55 }}>
        <Scene3D />
      </Canvas>

      <div className="absolute bottom-6 left-6 bg-gray-900/70 text-cyan-300 px-4 py-2 border border-cyan-500/30 rounded-xl">
        🤖 <span className="animate-pulse">
          Analyzing production line efficiency...
        </span>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// HOME VIEW (LOGOUT FIXED)
// ------------------------------------------------------
function HomeView({
  onLogout,
  onNavigate,
}: {
  onLogout: () => void;
  onNavigate: (v: Views) => void;
}) {
  const items = [
    {
      title: "Open AI Chat",
      desc: "Talk with your Virtual Factory Assistant",
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      onClick: () => onNavigate("chat"),
      color: "from-cyan-500/30 via-cyan-400/10",
    },
    {
      title: "System Settings",
      desc: "Control appearance & preferences",
      icon: <Wrench className="w-6 h-6 text-green-400" />,
      onClick: () => onNavigate("settings"),
      color: "from-green-500/30 via-green-400/10",
    },
    {
      title: "3D Factory",
      desc: "Explore futuristic factory systems",
      icon: <Cpu className="w-6 h-6 text-pink-400" />,
      onClick: () => onNavigate("factory"),
      color: "from-pink-500/30 via-pink-400/10",
    },
    {
      title: "AI Builder",
      desc: "Create workflows using prompts",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      onClick: () => toast.info("AI Builder coming soon 🚀"),
      color: "from-yellow-500/30 via-yellow-400/10",
    },
    {
      title: "System Report",
      desc: "View analytics & system overview",
      icon: <Layout className="w-6 h-6 text-blue-400" />,
      onClick: () => toast.info("Reports loading..."),
      color: "from-blue-500/30 via-blue-400/10",
    },
    {
      title: "Logout",
      desc: "End current session safely",
      icon: <Bell className="w-6 h-6 text-red-400" />,
      onClick: onLogout,
      color: "from-red-500/30 via-red-400/10",
    },
  ];

  return (
    <motion.div
      className="p-6 md:p-10 text-white select-none h-full flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          ⚡ Virtual Factory Dashboard
        </h2>

        <p className="text-gray-400 mb-10 text-lg">
          Welcome back, Operator! Choose an action to begin.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.button
              key={i}
              onClick={item.onClick}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              className={`text-left bg-gradient-to-br ${item.color} 
              border border-gray-700/60 rounded-2xl p-6 flex flex-col gap-2
              hover:border-cyan-400/40 transition backdrop-blur-md`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------
// MAIN APP
// ------------------------------------------------------
export default function App() {
  const [activeView, setActiveView] = useState<Views>("home");
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setIsBooting(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // LOGOUT FUNCTION
  const handleLogout = useCallback(() => {
    toast("Session ended", {
      description: "You can log in again anytime.",
    });
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "chat":
        return <ChatAndScene />;
      case "settings":
        return <SettingsSection />;
      case "factory":
        return <FactoryView />;
      default:
        return (
          <HomeView
            onLogout={handleLogout}
            onNavigate={(v) => setActiveView(v)}
          />
        );
    }
  };

  return (
    <AIEnvironmentProvider>
      <div className="relative h-screen w-screen bg-background text-white overflow-hidden">
        <CyberpunkBackground />
        <MouseTrail />

        <AnimatePresence>
          {isBooting ? (
            <BootScreen />
          ) : (
            <DashboardLayout
              activeView={activeView}
              onViewChange={setActiveView}
              onSearch={() => {}}
              onLogout={handleLogout}
              ollamaConnected={true}
              modelName="Perplexity"
            >
              {renderView()}
            </DashboardLayout>
          )}
        </AnimatePresence>

        <Toaster position="bottom-right" />
      </div>
    </AIEnvironmentProvider>
  );
}
