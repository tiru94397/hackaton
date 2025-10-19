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
    <section className="relative min-h-[700px] md:min-h-[800px] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background with holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/5 to-background" />
      
      {/* Holographic Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_50%,black,transparent)] animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Holographic Orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
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
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* AI Badge with holographic effect */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 border border-cyan-400/30 rounded-full mb-8 backdrop-blur-sm">
            <Brain className="w-5 h-5 text-cyan-400 animate-pulse" style={{ animationDuration: '2s' }} />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
            Create 3D Machines
            <br />
            <span className="relative inline-block">
              with AI Magic
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform your ideas into stunning 3D machine models. Just describe what you want, and watch our AI bring it to life in seconds.
          </p>
        </motion.div>

        {/* Enhanced Search Bar with holographic glow */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative group">
            {/* Holographic glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 group-focus-within:opacity-40 transition-all duration-500" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
            
            <div className="relative flex items-center gap-3 bg-card/90 backdrop-blur-xl border-2 border-cyan-400/20 rounded-3xl p-3 shadow-2xl shadow-cyan-400/10">
              <div className="pl-3">
                <Search className="w-6 h-6 text-cyan-400" />
              </div>
              <Input
                type="text"
                placeholder="Describe your machine... (e.g., 'futuristic robotic arm' or 'delivery drone')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-muted-foreground/50"
              />
              <Button
                type="submit"
                disabled={isGenerating || !searchQuery.trim()}
                size="lg"
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 text-white rounded-2xl px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.form>

        {/* Feature Pills with neon accents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <div className="group px-5 py-2.5 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-sm hover:bg-cyan-400/20 transition-all cursor-default backdrop-blur-sm">
            <span className="text-cyan-400">⚡ Instant Generation</span>
          </div>
          <div className="group px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm hover:bg-blue-500/20 transition-all cursor-default backdrop-blur-sm">
            <span className="text-blue-400">🎯 Ultra High Detail</span>
          </div>
          <div className="group px-5 py-2.5 bg-purple-600/10 border border-purple-600/30 rounded-full text-sm hover:bg-purple-600/20 transition-all cursor-default backdrop-blur-sm">
            <span className="text-purple-400">🔄 Interactive 3D</span>
          </div>
          <div className="group px-5 py-2.5 bg-green-500/10 border border-green-500/30 rounded-full text-sm hover:bg-green-500/20 transition-all cursor-default backdrop-blur-sm">
            <span className="text-green-400">💾 Export Ready</span>
          </div>
        </motion.div>

        {/* Keyboard Shortcut Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/30 backdrop-blur-sm border border-border rounded-full text-xs text-muted-foreground">
            <span>Press</span>
            <kbd className="px-2 py-1 bg-background/50 border border-cyan-400/20 rounded text-cyan-400 font-mono">
              ⌘K
            </kbd>
            <span>or</span>
            <kbd className="px-2 py-1 bg-background/50 border border-cyan-400/20 rounded text-cyan-400 font-mono">
              Ctrl+K
            </kbd>
            <span>for quick commands</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
