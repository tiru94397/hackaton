import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Layers } from "lucide-react";
import { useState } from "react";
import { GalleryModal } from "./GalleryModal";

interface MachineExample {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  gradient: string;
}

const exampleMachines: MachineExample[] = [
  {
    id: "1",
    name: "Industrial Robotic Arm",
    description: "6-axis precision manipulation system",
    category: "Robotics",
    image: "🤖",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "2",
    name: "Autonomous Drone",
    description: "AI-powered quadcopter with sensors",
    category: "Aviation",
    image: "🚁",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "3",
    name: "3D Printer",
    description: "High-resolution additive manufacturing",
    category: "Manufacturing",
    image: "🖨️",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: "4",
    name: "CNC Mill",
    description: "Multi-axis subtractive machining",
    category: "Manufacturing",
    image: "⚙️",
    gradient: "from-green-500 to-cyan-400",
  },
  {
    id: "5",
    name: "Conveyor System",
    description: "Automated material transport",
    category: "Logistics",
    image: "📦",
    gradient: "from-cyan-400 to-green-500",
  },
  {
    id: "6",
    name: "Assembly Robot",
    description: "Collaborative manufacturing assistant",
    category: "Automation",
    image: "🦾",
    gradient: "from-blue-500 to-cyan-400",
  },
];

interface MachineGalleryProps {
  onSelectExample: (query: string) => void;
}

export function MachineGallery({ onSelectExample }: MachineGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<{
    name: string;
    type: "robot" | "drone";
    description: string;
    tags: string[];
  } | null>(null);

  const handleMachineClick = (machine: MachineExample) => {
    setSelectedMachine({
      name: machine.name,
      type: machine.name.toLowerCase().includes("drone") ? "drone" : "robot",
      description: machine.description,
      tags: [machine.category, "AI-Generated", "Industrial"],
    });
  };

  return (
    <section id="explore" className="py-20 px-4 lg:px-8 bg-gradient-to-b from-background via-cyan-950/5 to-background relative overflow-hidden">
      {/* Enhanced Background effects */}
      <motion.div 
        className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particle sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-20, -60, -20],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500">Example Machines</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Explore AI-Generated Designs
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Get inspired by these pre-generated machine designs or create your own
          </p>
        </motion.div>

        {/* Gallery Grid with floating effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {exampleMachines.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              onHoverStart={() => setHoveredId(machine.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
            >
              <Card 
                className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] h-full cursor-pointer"
                onClick={() => handleMachineClick(machine)}
              >
                {/* 3D Hover Effect Background with enhanced parallax */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${machine.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                  animate={hoveredId === machine.id ? {
                    scale: [1, 1.08, 1],
                    rotate: [0, 3, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Floating particle trail on hover */}
                {hoveredId === machine.id && [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      bottom: "10%",
                    }}
                    animate={{
                      y: [-10, -60],
                      x: [0, (i - 2) * 10],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Image/Icon Section with enhanced 3D rotating effect */}
                <div className="relative h-48 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 flex items-center justify-center overflow-hidden">
                  {/* Animated grid background */}
                  <motion.div 
                    className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={hoveredId === machine.id ? { 
                      backgroundPosition: ["0px 0px", "20px 20px"] 
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Enhanced Radial glow with pulse */}
                  <motion.div 
                    className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={hoveredId === machine.id ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Rotating holographic ring */}
                  {hoveredId === machine.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ width: "80%", height: "80%", margin: "auto" }}
                    />
                  )}
                  
                  {/* Machine icon with enhanced 3D transform and glow */}
                  <motion.span 
                    className="text-7xl relative z-10 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                    animate={hoveredId === machine.id ? {
                      scale: [1, 1.2, 1.15],
                      rotateY: [0, 360],
                      filter: [
                        "drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))",
                        "drop-shadow(0 0 40px rgba(59, 130, 246, 0.8))",
                        "drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))",
                      ]
                    } : {}}
                    transition={{ 
                      scale: { duration: 0.6, type: "spring" },
                      rotateY: { duration: 1.8, ease: "easeInOut" },
                      filter: { duration: 1.5, repeat: Infinity }
                    }}
                  >
                    {machine.image}
                  </motion.span>
                  
                  {/* Category badge with neon glow */}
                  <motion.div 
                    className={`absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r ${machine.gradient} bg-opacity-20 backdrop-blur-md border border-cyan-400/40 rounded-full text-xs shadow-lg`}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                    }}
                  >
                    {machine.category}
                  </motion.div>

                  {/* 3D Preview indicator */}
                  <motion.div 
                    className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-cyan-400/30 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 10 }}
                    animate={hoveredId === machine.id ? { y: 0 } : { y: 10 }}
                  >
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-400">3D Preview</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                    {machine.name}
                  </h3>
                  <p className="text-foreground/60 mb-4 text-sm leading-relaxed">
                    {machine.description}
                  </p>
                  
                  <Button
                    onClick={() => onSelectExample(machine.name)}
                    className="w-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 border border-cyan-400/30 hover:from-cyan-400/20 hover:to-blue-600/20 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group/btn transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10">Try This Machine</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform relative z-10" />
                  </Button>
                </div>

                {/* Enhanced corner accents with glow */}
                <motion.div 
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/70 transition-all duration-500"
                  animate={hoveredId === machine.id ? {
                    boxShadow: ["0 0 0 rgba(6, 182, 212, 0)", "0 0 10px rgba(6, 182, 212, 0.5)", "0 0 0 rgba(6, 182, 212, 0)"]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/70 transition-all duration-500"
                  animate={hoveredId === machine.id ? {
                    boxShadow: ["0 0 0 rgba(6, 182, 212, 0)", "0 0 10px rgba(6, 182, 212, 0.5)", "0 0 0 rgba(6, 182, 212, 0)"]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/70 transition-all duration-500"
                  animate={hoveredId === machine.id ? {
                    boxShadow: ["0 0 0 rgba(6, 182, 212, 0)", "0 0 10px rgba(6, 182, 212, 0.5)", "0 0 0 rgba(6, 182, 212, 0)"]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/70 transition-all duration-500"
                  animate={hoveredId === machine.id ? {
                    boxShadow: ["0 0 0 rgba(6, 182, 212, 0)", "0 0 10px rgba(6, 182, 212, 0.5)", "0 0 0 rgba(6, 182, 212, 0)"]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-accent"
          >
            Load More Examples
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={!!selectedMachine}
        onClose={() => setSelectedMachine(null)}
        machine={selectedMachine}
      />
    </section>
  );
}
