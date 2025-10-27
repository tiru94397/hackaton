import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeroSectionProps {
  onGenerate: (query: string) => void;
  isGenerating: boolean;
}

export function HeroSection({ onGenerate, isGenerating }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) onGenerate(searchQuery);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[600px] text-center px-6 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-cyan-900/10" />

      {/* Soft Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Neon Glow (lighter than multiple orbs) */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[100px] rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm sm:text-base">
            AI-Powered 3D Generator
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
          Generate 3D Machines with AI
        </h1>

        <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Describe your machine idea — our AI builds a 3D model with precision and speed.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="flex items-center gap-2 bg-card border border-cyan-400/20 rounded-2xl p-2 shadow-xl">
          <Search className="w-5 h-5 ml-3 text-cyan-400/80" />
          <Input
            type="text"
            placeholder="Describe a machine idea..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm sm:text-base"
          />
          <Button
            type="submit"
            disabled={isGenerating || !searchQuery.trim()}
            className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white rounded-xl px-4 sm:px-6 py-2 transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </motion.form>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mt-8 text-sm text-cyan-300/80"
      >
        <span className="px-4 py-1 bg-cyan-400/10 rounded-full">⚡ Instant</span>
        <span className="px-4 py-1 bg-cyan-400/10 rounded-full">🎯 High Detail</span>
        <span className="px-4 py-1 bg-cyan-400/10 rounded-full">🔄 Interactive 3D</span>
      </motion.div>
    </section>
  );
}
