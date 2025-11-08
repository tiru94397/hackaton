import { motion } from "motion/react";
import { Zap, Brain, Cpu, Layers, Download, Share2 } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Brain,
    title: "Real-Time 3D Design",
    description: "Watch your machines come to life in real-time as our AI processes your natural language descriptions into fully realized 3D models.",
    gradient: "from-cyan-400 to-blue-500",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Instant AI Chat",
    description: "Conversational interface powered by advanced AI. Simply describe what you need, and get instant feedback with intelligent suggestions.",
    gradient: "from-blue-500 to-purple-600",
    delay: 0.1,
  },
  {
    icon: Cpu,
    title: "Smart Optimization",
    description: "AI automatically optimizes your designs for structural integrity, weight distribution, and manufacturing efficiency.",
    gradient: "from-purple-600 to-pink-500",
    delay: 0.2,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/5 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Industry-leading AI technology meets intuitive design to bring your machine concepts to life
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <Card className="group relative p-8 bg-card/50 backdrop-blur-sm border-cyan-400/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden h-full neon-hover">
                  {/* Animated neon glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="absolute inset-0 neon-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon with enhanced glow */}
                  <div className="relative mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 shadow-lg group-hover:shadow-2xl transition-shadow duration-500`}>
                      <Icon className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30 rounded-2xl blur-2xl group-hover:blur-3xl group-hover:opacity-60 transition-all duration-500`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl mb-4 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed text-base">
                    {feature.description}
                  </p>

                  {/* Corner accents with glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0l1.545 6.455L20 8l-6.455 1.545L12 16l-1.545-6.455L4 8l6.455-1.545L12 0z" />
      <path d="M19 12l.91 3.09L23 16l-3.09.91L19 20l-.91-3.09L15 16l3.09-.91L19 12z" />
    </svg>
  );
}
