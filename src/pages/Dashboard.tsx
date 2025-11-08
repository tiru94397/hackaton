"use client";
import { useState } from "react";
import { DashboardLayout } from "src/components/DashboardLayout";
import { HeroSection } from "src/components/HeroSection";
import { InputPanel } from "src/components/InputPanel";
import { MachineDisplay } from "src/components/MachineDisplay";
import { ChatSection } from "src/components/ChatSection";
import { SettingsSection } from "src/components/SettingsSection";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <DashboardLayout
      activeView={activeView}
      onViewChange={setActiveView}
      ollamaConnected={true}
      modelName="Virtual Factory AI"
    >
      {activeView === "dashboard" && (
        <div className="flex flex-col gap-8">
          <HeroSection />
          <InputPanel />
          <MachineDisplay
            isGenerating={false}
            machineData={{
              type: "robot",
              name: "Test Robot",
              description:
                "A test AI-generated robot for debugging layout and UI.",
              specifications: [
                "Metal Frame",
                "AI Core",
                "Sensor Suite",
                "Battery Pack",
              ],
              assembly: [
                "Attach arms",
                "Connect sensors",
                "Install AI core",
                "Power calibration",
              ],
            }}
          />
        </div>
      )}

      {activeView === "chat" && <ChatSection />}

      {activeView === "settings" && <SettingsSection />}
    </DashboardLayout>
  );
}
