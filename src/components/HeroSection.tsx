import { Search, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onGenerate: (query: string) => void;
  isGenerating: boolean;
}

export function HeroSection({ onGenerate, isGenerating }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onGenerate(searchQuery);
    }
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-cyan-950/10 dark:to-cyan-950/20" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full blur-sm"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-2 h-2 bg-green-400 rounded-full blur-sm"
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400">AI-Powered 3D Generation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Generate 3D Machines
            <br />
            with AI
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
            Describe any machine you can imagine, and our AI will create a detailed 3D model with full specifications
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative flex items-center gap-2 bg-card border border-border rounded-2xl p-2 shadow-2xl">
              <div className="pl-4">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Describe the machine you want to generate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <Button
                type="submit"
                disabled={isGenerating || !searchQuery.trim()}
                className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white rounded-xl px-6 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Machine
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.form>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <div className="px-4 py-2 bg-accent/50 rounded-full text-sm">
            ⚡ Instant Generation
          </div>
          <div className="px-4 py-2 bg-accent/50 rounded-full text-sm">
            🎯 High Detail
          </div>
          <div className="px-4 py-2 bg-accent/50 rounded-full text-sm">
            🔄 Interactive 3D
          </div>
        </motion.div>
      </div>
    </section>
  );
}
