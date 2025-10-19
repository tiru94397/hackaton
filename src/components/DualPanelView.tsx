import { motion } from "motion/react";
import { ChatInterface } from "./ChatInterface";
import { MachineViewer3D } from "./MachineViewer3D";
import { MachineSpecsPanel } from "./MachineSpecsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Box, FileText, Layers } from "lucide-react";

interface DualPanelViewProps {
  isGenerating: boolean;
  onGenerate: (query: string) => void;
  machineData: {
    type: "robot" | "drone";
    name: string;
    description: string;
    specifications: string[];
    assembly: string[];
  } | null;
  onChangeType: (type: string) => void;
}

export function DualPanelView({
  isGenerating,
  onGenerate,
  machineData,
  onChangeType,
}: DualPanelViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
      {/* Left: Chat Interface */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-panel rounded-xl md:rounded-2xl border border-cyan-400/30 overflow-hidden relative min-h-[400px] lg:min-h-0"
      >
        {/* Holographic header */}
        <div className="absolute top-0 left-0 right-0 h-12 md:h-14 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 border-b border-cyan-400/20 flex items-center px-4 md:px-6 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm md:text-base font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Chat Interface
            </span>
          </div>
        </div>

        {/* Chat content with top padding */}
        <div className="h-full pt-12 md:pt-14">
          <ChatInterface onGenerate={onGenerate} isGenerating={isGenerating} />
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t-2 border-r-2 border-cyan-400/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b-2 border-l-2 border-cyan-400/30 pointer-events-none" />
      </motion.div>

      {/* Right: Machine Output with Tabs */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-panel rounded-xl md:rounded-2xl border border-cyan-400/30 overflow-hidden relative min-h-[400px] lg:min-h-0"
      >
        {/* Holographic header */}
        <div className="absolute top-0 left-0 right-0 h-12 md:h-14 bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-cyan-500/10 border-b border-cyan-400/20 flex items-center px-4 md:px-6 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-purple-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <span className="text-sm md:text-base font-['Orbitron'] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Machine Output
            </span>
          </div>
        </div>

        {/* Tabbed content */}
        <div className="h-full pt-12 md:pt-14 p-3 md:p-6">
          <Tabs defaultValue="3d-model" className="h-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-cyan-400/20">
              <TabsTrigger
                value="3d-model"
                className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 data-[state=active]:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs md:text-sm"
              >
                <Box className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                <span className="hidden md:inline">3D Model</span>
                <span className="md:hidden ml-1">3D</span>
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 data-[state=active]:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs md:text-sm"
              >
                <FileText className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                <span className="hidden md:inline">Specs</span>
                <span className="md:hidden ml-1">Specs</span>
              </TabsTrigger>
              <TabsTrigger
                value="assembly"
                className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 data-[state=active]:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs md:text-sm"
              >
                <Layers className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                <span className="hidden md:inline">Assembly</span>
                <span className="md:hidden ml-1">Asm</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="3d-model" className="h-[calc(100%-60px)] mt-4">
              {machineData ? (
                <MachineViewer3D
                  machineType={machineData.type}
                  isGenerating={isGenerating}
                />
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-cyan-400/20 rounded-xl">
                  <div className="text-center">
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="text-6xl mb-4"
                    >
                      🤖
                    </motion.div>
                    <p className="text-cyan-400/60 font-['Orbitron']">
                      Generate a machine to view 3D model
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="specs" className="h-[calc(100%-60px)] mt-4 overflow-y-auto">
              {machineData ? (
                <div className="space-y-4">
                  <div className="glass-panel p-4 rounded-xl border border-cyan-400/20">
                    <h3 className="text-lg mb-2 text-cyan-400 font-['Orbitron']">
                      {machineData.name}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {machineData.description}
                    </p>
                  </div>

                  <div className="glass-panel p-4 rounded-xl border border-cyan-400/20">
                    <h4 className="text-sm mb-3 text-cyan-400 font-['Orbitron']">
                      Specifications
                    </h4>
                    <div className="space-y-2">
                      {machineData.specifications.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300">{spec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-cyan-400/20 rounded-xl">
                  <p className="text-cyan-400/60 font-['Orbitron']">
                    No specifications available
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="assembly" className="h-[calc(100%-60px)] mt-4 overflow-y-auto">
              {machineData ? (
                <div className="glass-panel p-4 rounded-xl border border-cyan-400/20">
                  <h4 className="text-sm mb-3 text-cyan-400 font-['Orbitron']">
                    Assembly Instructions
                  </h4>
                  <div className="space-y-3">
                    {machineData.assembly.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-cyan-400/10 hover:border-cyan-400/30 transition-all"
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center flex-shrink-0 font-['Orbitron'] text-xs text-cyan-400">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-cyan-400/20 rounded-xl">
                  <p className="text-cyan-400/60 font-['Orbitron']">
                    No assembly instructions available
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-purple-400/30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-400/30 pointer-events-none" />
      </motion.div>
    </div>
  );
}
