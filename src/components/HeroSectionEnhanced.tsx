import { Search, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { motion } from "motion/react";

interface HeroSectionEnhancedProps {
  onGenerate: (query: string) => void;
  isGenerating: boolean;
}

export function HeroSectionEnhanced({ onGenerate, isGenerating }: HeroSectionEnhancedProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onGenerate(searchQuery);
    }
  };

  return (
    <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden py-16 bg-gradient-to-b from-black via-[#030712] to-black">
      {/* Subtle gradient pulse */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_75%)]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Two glowing orbs for depth */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating dots — 6 total */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6 backdrop-blur-sm">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-sm">
              Powered by AI
            </span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          <h1 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold leading-tight">
            Create 3D Machines <br /> with AI Magic
          </h1>

          <p className="text-base md:text-lg text-gray-400 mb-8">
            Describe your futuristic idea — AI will turn it into stunning 3D creations.
          </p>
        </motion.div>

        {/* Input Bar */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <div className="flex items-center bg-[#0f172a]/70 border border-cyan-400/20 rounded-2xl px-3 py-2 backdrop-blur-sm w-full sm:w-[400px]">
            <Search className="w-5 h-5 text-cyan-400 mr-2" />
            <Input
              type="text"
              placeholder="e.g. cyberpunk hover drone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-gray-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isGenerating || !searchQuery.trim()}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white rounded-2xl px-6 py-2 transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-1 animate-pulse" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-1" /> Generate
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
