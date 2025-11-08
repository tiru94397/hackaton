"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsSection() {
  const [theme, setTheme] = useState("dark");
  const [aiModel, setAiModel] = useState("gpt-5");
  const [animations, setAnimations] = useState(true);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("vf-theme");
    const savedModel = localStorage.getItem("vf-model");
    const savedAnim = localStorage.getItem("vf-anim");

    if (savedTheme) setTheme(savedTheme);
    if (savedModel) setAiModel(savedModel);
    if (savedAnim) setAnimations(savedAnim === "true");

    document.documentElement.classList.toggle("dark", savedTheme !== "light");
  }, []);

  // 🪄 Animate theme switch with ripple
  const toggleTheme = (newTheme: string) => {
    setRipple(true);
    setTimeout(() => setRipple(false), 700);

    if (newTheme === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");

    setTheme(newTheme);
    localStorage.setItem("vf-theme", newTheme);
  };

  const saveSettings = () => {
    localStorage.setItem("vf-model", aiModel);
    localStorage.setItem("vf-anim", String(animations));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 md:p-10 w-full overflow-hidden"
    >
      {/* 🔮 Ripple Animation Layer */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400/40 rounded-full blur-2xl"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 300, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        ⚙️ Settings
      </h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>

        {/* 🧠 GENERAL */}
        <TabsContent value="general">
          <Card className="bg-gray-900/50 border-cyan-900/30 dark:bg-gray-800/60">
            <CardContent className="space-y-6 p-8">
              <div className="flex justify-between items-center">
                <span className="text-lg">Enable Animations</span>
                <Switch checked={animations} onCheckedChange={setAnimations} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🎨 APPEARANCE */}
        <TabsContent value="appearance">
          <Card className="bg-gray-900/50 border-cyan-900/30 dark:bg-gray-800/60">
            <CardContent className="space-y-6 p-8">
              <div className="flex justify-between items-center">
                <span className="text-lg">Theme Mode</span>
                <select
                  value={theme}
                  onChange={(e) => toggleTheme(e.target.value)}
                  className="bg-black text-cyan-400 border border-cyan-700 rounded-md px-3 py-2"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🤖 AI SETTINGS */}
        <TabsContent value="ai">
          <Card className="bg-gray-900/50 border-cyan-900/30 dark:bg-gray-800/60">
            <CardContent className="space-y-8 p-6">
  <div className="flex justify-between items-center">
    <span>Enable Animations</span>
    <Switch checked={animations} onCheckedChange={setAnimations} />
  </div>
</CardContent>

          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-10">
        <Button
          onClick={saveSettings}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-lg"
        >
          💾 Save Settings
        </Button>
      </div>
    </motion.div>
  );
}
