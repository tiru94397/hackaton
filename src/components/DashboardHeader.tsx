import { motion } from "motion/react";
import { Search, Bell, User, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
  onLogout?: () => void;
}

export function DashboardHeader({ onSearch, onLogout }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setSearchQuery("");
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 md:left-20 right-0 h-16 glass-panel border-b border-cyan-400/20 z-30"
    >
      {/* Animated scanline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="h-full px-4 md:px-6 flex items-center justify-between relative">
        {/* Left: Title - Hidden on mobile, shown on md+ */}
        <div className="hidden md:flex items-center gap-4">
          <div>
            <h1 className="text-xl font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Virtual Factory AI
            </h1>
            <motion.p
              className="text-xs text-cyan-400/60 font-mono"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              J.A.R.V.I.S Interface v2.0
            </motion.p>
          </div>
        </div>

        {/* Mobile: Compact Title */}
        <div className="flex md:hidden items-center ml-14">
          <h1 className="font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            VF AI
          </h1>
        </div>

        {/* Center: Search */}
        <form onSubmit={handleSearch} className="relative group flex-1 max-w-md mx-2 md:mx-8">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60 group-focus-within:text-cyan-400 transition-colors" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 md:pl-11 pr-4 py-2 w-full bg-background/40 border border-cyan-400/20 focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 rounded-xl backdrop-blur-md text-sm md:text-base"
          />
          <motion.div
            className="absolute inset-0 rounded-xl bg-cyan-400/5 opacity-0 group-focus-within:opacity-100 -z-10 blur-md transition-opacity"
          />
        </form>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Fullscreen toggle - Hidden on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="hidden md:flex rounded-xl hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 relative overflow-hidden group"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 relative"
          >
            <Bell className="h-4 w-4 md:h-5 md:w-5" />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
                boxShadow: [
                  "0 0 0 0 rgba(6, 182, 212, 0.7)",
                  "0 0 0 6px rgba(6, 182, 212, 0)",
                  "0 0 0 0 rgba(6, 182, 212, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="rounded-xl hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 relative"
            title="Logout"
          >
            <User className="h-4 w-4 md:h-5 md:w-5" />
            {/* Live status indicator */}
            <motion.div
              className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 border-2 border-background rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
