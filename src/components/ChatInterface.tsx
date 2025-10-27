import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Props {
  backendUrl: string;
}

export function ChatInterface({ backendUrl }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Tiru AI (Perplexity). Ask me anything or describe a machine, and I'll respond instantly.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const res = await fetch(`${backendUrl}/api/perplexity/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input.trim() }),
      });
      const text = await res.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Error: Failed to get response from server.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(err);
    } finally {
      setInput("");
      setIsGenerating(false);
    }
  };

  const quickPrompts = [
    "Industrial robotic arm for welding",
    "Autonomous delivery drone",
    "Precision CNC machine",
    "Collaborative robot for assembly",
  ];

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 p-3 md:p-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} relative`}
          >
            <motion.div
              className={`max-w-[85%] md:max-w-[70%] rounded-xl md:rounded-2xl p-3 md:p-4 relative overflow-hidden ${
                message.role === "user"
                  ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/60 ml-4 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  : "bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-purple-500/40 mr-4 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <motion.div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className="text-xs text-purple-400 font-['Orbitron']">Tiru AI</span>
                </div>
              )}
              <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
              <span className="text-xs text-muted-foreground mt-2 block">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </motion.div>
          </motion.div>
        ))}
        {isGenerating && <div className="text-purple-400 text-sm">Generating response...</div>}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-3 md:px-4 pb-2 md:pb-3">
          <p className="text-xs text-muted-foreground mb-2">Quick prompts:</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full glass-panel neon-hover transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-cyan-400/30 relative overflow-hidden flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Tiru AI anything..."
          className="flex-1 bg-background/60 border border-cyan-400/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/60 focus:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
          disabled={isGenerating}
        />
        <Button type="submit" disabled={!input.trim() || isGenerating}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
