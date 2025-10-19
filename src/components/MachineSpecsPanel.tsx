import { useState } from "react";
import { ChevronDown, ChevronUp, Package, Wrench, Ruler, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

interface MachineData {
  type: "robot" | "drone";
  name: string;
  description: string;
  specifications: string[];
  assembly: string[];
}

interface MachineSpecsPanelProps {
  machineData: MachineData | null;
  onChangeType: (type: "industrial" | "robotics" | "automotive" | "aerospace" | "custom") => void;
}

export function MachineSpecsPanel({ machineData, onChangeType }: MachineSpecsPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!machineData) {
    return (
      <div className="w-full h-full flex items-center justify-center glass-panel rounded-xl md:rounded-2xl p-6 md:p-8">
        <div className="text-center space-y-3 md:space-y-4">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center">
            <Package className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">No machine generated yet</p>
          <p className="text-xs md:text-sm text-muted-foreground">Use the chat to create your first design</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col glass-panel rounded-xl md:rounded-2xl overflow-hidden">
      {/* Machine Type Tabs */}
      <div className="border-b border-border/50 p-3 md:p-4">
        <Tabs defaultValue="robotics" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 h-auto">
            <TabsTrigger value="industrial" onClick={() => onChangeType("industrial")} className="text-xs md:text-sm px-1 md:px-3 py-1.5 md:py-2">
              <span className="hidden md:inline">Industrial</span>
              <span className="md:hidden">Ind</span>
            </TabsTrigger>
            <TabsTrigger value="robotics" onClick={() => onChangeType("robotics")} className="text-xs md:text-sm px-1 md:px-3 py-1.5 md:py-2">
              <span className="hidden md:inline">Robotics</span>
              <span className="md:hidden">Rob</span>
            </TabsTrigger>
            <TabsTrigger value="automotive" onClick={() => onChangeType("automotive")} className="text-xs md:text-sm px-1 md:px-3 py-1.5 md:py-2">
              <span className="hidden md:inline">Automotive</span>
              <span className="md:hidden">Auto</span>
            </TabsTrigger>
            <TabsTrigger value="aerospace" onClick={() => onChangeType("aerospace")} className="text-xs md:text-sm px-1 md:px-3 py-1.5 md:py-2">
              <span className="hidden md:inline">Aerospace</span>
              <span className="md:hidden">Aero</span>
            </TabsTrigger>
            <TabsTrigger value="custom" onClick={() => onChangeType("custom")} className="text-xs md:text-sm px-1 md:px-3 py-1.5 md:py-2">
              <span className="hidden md:inline">Custom</span>
              <span className="md:hidden">Cust</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4">
        {/* Machine Name */}
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {machineData.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-2 md:px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-300">
              {machineData.type === "robot" ? "Robotic System" : "Aerial Vehicle"}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="border border-border/50 rounded-lg md:rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection("description")}
            className="w-full flex items-center justify-between p-4 bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-cyan-400" />
              <span>Description</span>
            </div>
            {expandedSection === "description" ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSection === "description" && (
            <div className="p-4 bg-black/10 animate-in slide-in-from-top-2 duration-300">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {machineData.description}
              </p>
            </div>
          )}
        </div>

        {/* Specifications Section */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection("specifications")}
            className="w-full flex items-center justify-between p-4 bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-blue-400" />
              <span>Technical Specifications</span>
            </div>
            {expandedSection === "specifications" ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSection === "specifications" && (
            <div className="p-4 bg-black/10 space-y-2 animate-in slide-in-from-top-2 duration-300">
              {machineData.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                >
                  <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{spec}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assembly Instructions Section */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection("assembly")}
            className="w-full flex items-center justify-between p-4 bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-purple-400" />
              <span>Assembly Instructions</span>
            </div>
            {expandedSection === "assembly" ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSection === "assembly" && (
            <div className="p-4 bg-black/10 space-y-2 animate-in slide-in-from-top-2 duration-300">
              {machineData.assembly.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-300">{index + 1}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
