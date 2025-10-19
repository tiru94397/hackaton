import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Sparkles, Mic } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onGenerate: (query: string) => void;
  isGenerating: boolean;
}

export function ChatInterface({ onGenerate, isGenerating }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Virtual Factory AI assistant. Describe any machine you'd like to create, and I'll generate a complete 3D model with specifications. Try something like 'Design a robotic welding arm' or 'Create an autonomous delivery drone'.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    onGenerate(input.trim());

    // Simulate AI thinking
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Great! I'm analyzing your request and generating a ${input.toLowerCase().includes('drone') ? 'drone' : 'robotic arm'} design. The 3D model and specifications will appear below shortly. This includes optimized components, materials, and assembly instructions.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  const quickPrompts = [
    "Industrial robotic arm for welding",
    "Autonomous delivery drone",
    "Precision CNC machine",
    "Collaborative robot for assembly",
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Container - removed header since it's now in DualPanelView */}
      <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 p-3 md:p-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} relative`}
          >
            {/* Particle trail effect */}
            <motion.div
              className={`absolute ${message.role === "user" ? "right-0" : "left-0"} w-1 h-full bg-gradient-to-b ${
                message.role === "user" 
                  ? "from-cyan-400/40 to-transparent" 
                  : "from-purple-400/40 to-transparent"
              }`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            <motion.div
              className={`max-w-[85%] md:max-w-[70%] rounded-xl md:rounded-2xl p-3 md:p-4 relative overflow-hidden ${
                message.role === "user"
                  ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/60 ml-4 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  : "bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-purple-500/40 mr-4 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
              }`}
              whileHover={{ 
                scale: 1.01, 
                boxShadow: message.role === "user" 
                  ? "0 0 35px rgba(6, 182, 212, 0.5)" 
                  : "0 0 35px rgba(168, 85, 247, 0.4)" 
              }}
            >
              {/* Holographic shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />
              
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(168, 85, 247, 0.5)",
                        "0 0 20px rgba(236, 72, 153, 0.7)",
                        "0 0 10px rgba(168, 85, 247, 0.5)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className="text-xs text-purple-400 font-['Orbitron']">Virtual Factory AI</span>
                </div>
              )}
              <p className="text-sm md:text-base leading-relaxed relative z-10">{message.content}</p>
              <span className="text-xs text-muted-foreground mt-2 block relative z-10">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              
              {/* Corner accents - user = cyan, AI = purple */}
              <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r ${
                message.role === "user" ? "border-cyan-400/40" : "border-purple-400/40"
              }`} />
              <div className={`absolute bottom-0 left-0 w-8 h-8 border-b border-l ${
                message.role === "user" ? "border-cyan-400/40" : "border-purple-400/40"
              }`} />
            </motion.div>
          </motion.div>
        ))}
        
        {isGenerating && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-purple-500/40 max-w-[80%] md:max-w-[70%] rounded-2xl p-4 mr-4 relative overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              {/* Holographic shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <motion.div 
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(236, 72, 153, 0.7)",
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
                <span className="text-xs text-purple-400 font-['Orbitron']">Virtual Factory AI</span>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-purple-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-purple-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-purple-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
                <span className="text-sm text-purple-400 ml-2 font-['Orbitron']">Generating 3D Model...</span>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-purple-400/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-purple-400/40" />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="px-3 md:px-4 pb-2 md:pb-3">
          <p className="text-xs text-muted-foreground mb-2">Quick prompts:</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full glass-panel neon-hover transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form with extreme neon effects */}
      <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-cyan-400/30 relative overflow-hidden">
        {/* Animated glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="flex gap-2 relative">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your machine..."
              className="w-full bg-background/60 border border-cyan-400/30 rounded-lg md:rounded-xl px-3 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base focus:outline-none focus:border-cyan-500/60 focus:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all backdrop-blur-md font-['Poppins'] placeholder:text-muted-foreground/50"
              disabled={isGenerating}
            />
            {/* Input pulse animation when focused */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-focus-within:border-cyan-400/40 pointer-events-none"
              animate={input ? {
                boxShadow: [
                  "0 0 0 0 rgba(6, 182, 212, 0)",
                  "0 0 0 4px rgba(6, 182, 212, 0.1)",
                  "0 0 0 0 rgba(6, 182, 212, 0)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          {/* Voice Input Button */}
          <Button
            type="button"
            disabled={isGenerating}
            className="rounded-xl px-4 bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mic className="w-4 h-4 text-purple-400" />
            </motion.div>
          </Button>
          
          {/* Send Button */}
          <Button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="rounded-xl px-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <Send className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
}
