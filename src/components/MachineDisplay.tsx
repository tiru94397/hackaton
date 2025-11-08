import { MachineCanvas } from "./MachineCanvas";
import { CyberpunkLoader } from "./CyberpunkLoader";
import { Card } from "./ui/card";
import { ChevronDown, ChevronUp, Cpu, Zap, Settings, Download, FileDown, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";

interface MachineDisplayProps {
  isGenerating: boolean;
  machineData: {
    type: "robot" | "drone" | null;
    name: string;
    description: string;
    specifications: string[];
    assembly: string[];
  } | null;
}

export function MachineDisplay({ isGenerating, machineData }: MachineDisplayProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}...`, {
      description: "Your 3D model will be downloaded shortly",
    });
  };

  // Don't render section at all if there's no data and not generating
  if (!machineData && !isGenerating) {
    return null;
  }

  return (
    <section className="py-16 px-4 lg:px-8 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        key="machine-display"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-4">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400">AI Machine Preview</span>
          </div>
          <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Your AI-Generated Machine
          </h2>
        </div>

        {/* 3D Canvas - Only render when we have data or are generating */}
        <div className="mb-12 relative">
          <MachineCanvas
            isLoading={isGenerating}
            machineType={machineData?.type || null}
          />
          
          {/* Loading overlay */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-3xl"
            >
              <CyberpunkLoader text="Generating Machine" size="lg" />
            </motion.div>
          )}
        </div>

        {/* Machine Info with Tabs */}
        {machineData && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <Button 
                onClick={() => handleExport("STL")}
                className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white shadow-lg shadow-cyan-400/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export STL
              </Button>
              <Button 
                onClick={() => handleExport("OBJ")}
                variant="outline" 
                className="border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/50"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Export OBJ
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-500/30 hover:bg-blue-500/10"
                onClick={() => toast.success("Shared to clipboard!")}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-500/30 hover:bg-purple-500/10"
                onClick={() => toast.success("Saved to library!")}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>

            {/* Tabbed Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-accent/50 p-1">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="specifications"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="assembly"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  Assembly
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-cyan-400/20 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl shadow-lg shadow-cyan-400/30">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl mb-3">{machineData.name}</h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {machineData.description}
                      </p>
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Type</p>
                          <p className="capitalize">{machineData.type}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Components</p>
                          <p>{machineData.specifications.length}</p>
                        </div>
                        <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Assembly Steps</p>
                          <p>{machineData.assembly.length}</p>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <p className="text-green-400">Ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-3">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-cyan-400/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <h4>Technical Specifications</h4>
                  </div>
                  <div className="space-y-3">
                    {machineData.specifications.map((spec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                        <p className="flex-1 text-foreground/80">{spec}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="assembly" className="space-y-3">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-cyan-400/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-5 h-5 text-blue-500" />
                    <h4>Assembly Instructions</h4>
                  </div>
                  <div className="space-y-3">
                    {machineData.assembly.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/30">
                          <span className="text-sm text-white">{index + 1}</span>
                        </div>
                        <p className="flex-1 text-foreground/80 pt-0.5">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Legacy Collapsible Sections - Removed */}

          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
