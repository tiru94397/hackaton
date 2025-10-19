import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Zap, Sparkles, FileDown, Settings, Book, Command } from "lucide-react";
import { Input } from "./ui/input";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute?: (command: string) => void;
}

const commands = [
  {
    id: "generate-robot",
    icon: Zap,
    title: "Generate Robotic Arm",
    description: "Create an industrial robotic arm",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "generate-drone",
    icon: Sparkles,
    title: "Generate Drone",
    description: "Create an autonomous drone",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "export-stl",
    icon: FileDown,
    title: "Export as STL",
    description: "Download 3D model in STL format",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: "settings",
    icon: Settings,
    title: "Open Settings",
    description: "Adjust preferences and options",
    gradient: "from-green-500 to-cyan-400",
  },
  {
    id: "docs",
    icon: Book,
    title: "Documentation",
    description: "View guides and tutorials",
    gradient: "from-cyan-400 to-green-500",
  },
];

export function CommandPalette({ isOpen, onClose, onExecute }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onExecute?.(filteredCommands[selectedIndex].id);
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose, onExecute]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Command input */}
          <div className="relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl" />
            <div className="relative bg-card/90 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-1">
                <Command className="w-5 h-5 text-cyan-400" />
                <Input
                  autoFocus
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="text-xs text-muted-foreground pl-8">
                Use ↑↓ to navigate, ↵ to select, ESC to close
              </div>
            </div>
          </div>

          {/* Command list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card/90 backdrop-blur-xl border border-cyan-400/20 rounded-2xl overflow-hidden shadow-2xl max-h-[400px] overflow-y-auto"
          >
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No commands found</p>
              </div>
            ) : (
              <div className="p-2">
                {filteredCommands.map((cmd, index) => {
                  const Icon = cmd.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <motion.button
                      key={cmd.id}
                      onClick={() => {
                        onExecute?.(cmd.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/40"
                          : "hover:bg-accent/50 border border-transparent"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${cmd.gradient} bg-opacity-10`}>
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={isSelected ? "text-cyan-400" : "text-foreground"}>
                            {cmd.title}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{cmd.description}</p>
                      </div>
                      {isSelected && (
                        <motion.div
                          layoutId="selected-indicator"
                          className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
