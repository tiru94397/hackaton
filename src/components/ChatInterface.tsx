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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Virtual Factory AI assistant. Describe any machine you'd like to create, and I'll generate a complete 3D model with specifications. Try something like 'Design a robotic welding arm' or 'Create an autonomous delivery drone'.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
      const response = await fetch("http://localhost:4000/api/ollama/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input.trim() }),
      });

      const data = await response.json();

      // ✅ Extract only the plain answer text
      let aiText = "";
      if (typeof data === "string") {
        aiText = data;
      } else if (data.completion) {
        aiText = data.completion;
      } else {
        aiText = JSON.stringify(data); // fallback, but usually unnecessary
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiText,
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

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 p-3 md:p-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } relative`}
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
                  <span className="text-xs text-purple-400 font-['Orbitron']">
                    Virtual Factory AI
                  </span>
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
                onClick={() => handleQuickPrompt(prompt)}
                className="text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full glass-panel neon-hover transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-4 border-t border-cyan-400/30 relative overflow-hidden flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your machine..."
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
