import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAIEnvironment } from "../context/AIEnvironmentContext";

// ---------------------------
// IMAGE GENERATOR (Pollinations API)
// ---------------------------
async function generateFreeImage(prompt: string) {
  try {
    const encoded = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Pollinations responded with error");

    const blob = await res.blob();
    return { url: URL.createObjectURL(blob) };
  } catch (err) {
    console.error("❌ Image generation failed:", err);
    return null;
  }
}

// ---------------------------
// TYPES
// ---------------------------
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

interface Props {
  backendUrl: string;
}

// ---------------------------
// MAIN COMPONENT
// ---------------------------
export default function ChatInterface({ backendUrl }: Props) {
  const { setMode } = useAIEnvironment();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hey Operator! I’m your <b>Virtual Factory AI Assistant</b>. Describe anything — I’ll respond and even generate visuals for you.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      messages.forEach((msg) => {
        if (msg.imageUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(msg.imageUrl);
        }
      });
    };
  }, [messages]);

  // ---------------------------
  // SUBMIT HANDLER
  // ---------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const query = input.trim();

    const userMsg: Message = {
      id: `${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      // Backend request
      const res = await fetch(`${backendUrl}/api/perplexity/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      let text: string;
      try {
        text = await res.text();
      } catch {
        text = "🤖 Unexpected response format.";
      }

      const aiMsg: Message = {
        id: `${Date.now() + 1}`,
        role: "assistant",
        content: text || "🤖 Sorry, I couldn’t process that request.",
        timestamp: new Date(),
      };

      // IMAGE DETECTION
      const isVisual = /(image|show|draw|visualize|generate|picture|design|look like)/i.test(
        query
      );

      if (isVisual) {
        const img = await generateFreeImage(query);
        if (img?.url) aiMsg.imageUrl = img.url;
      }

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat Error:", err);

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now() + 2}`,
          role: "assistant",
          content: "❌ Error: Could not connect to AI servers.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setInput("");
      setIsGenerating(false);
    }
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-2xl border border-cyan-400/20 overflow-hidden">
      {/* CHAT WINDOW */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[85%] md:max-w-[70%] text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-cyan-600/30 border border-cyan-400/30 text-cyan-100"
                  : "bg-purple-700/20 border border-purple-500/30 text-purple-200"
              }`}
            >
              {/* IMAGE */}
              {m.imageUrl && (
                <motion.div
                  className="relative mb-3 cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setFullscreenImage(m.imageUrl!)}
                >
                <img
                  src={m.imageUrl}
                  alt="AI Visual"
                  className="rounded-xl w-full max-h-[220px] object-cover border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://dummyimage.com/600x400/000/fff&text=Image+Not+Available";
                  }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                </motion.div>
              )}

              {/* TEXT */}
              <div
                dangerouslySetInnerHTML={{
                  __html: m.content
                    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                    .replace(/\*(.*?)\*/g, "<i>$1</i>")
                    .replace(/\n/g, "<br/>"),
                }}
              />

              <span className="text-xs text-gray-400 block mt-1">
                {m.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </motion.div>
        ))}

        {isGenerating && (
          <p className="text-purple-400 text-xs animate-pulse">
            🤖 Generating response...
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-cyan-400/30 flex items-center gap-2 bg-gray-900/40 backdrop-blur-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask or describe something..."
          className="flex-1 bg-black/40 border border-cyan-400/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400/60 text-gray-200"
          disabled={isGenerating}
        />

        <Button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className="bg-cyan-600/50 hover:bg-cyan-600/70 border border-cyan-400/30"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {/* FULLSCREEN IMAGE VIEWER */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
          >
            <motion.img
              src={fullscreenImage}
              alt="Full View"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-[95%] max-h-[95%] rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.4)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
