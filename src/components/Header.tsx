import { Moon, Sun, User, Menu, X, Search, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSearch?: (query: string) => void;
}

export function Header({ darkMode, toggleDarkMode, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-400/20 shadow-lg shadow-cyan-400/10">
      {/* Animated scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced holographic effect */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 15px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.3)",
                  "0 0 25px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)",
                  "0 0 15px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Holographic shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-5 h-5 border-2 border-white rounded-md relative z-10" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-['Orbitron'] text-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[holographic-shift_3s_ease_infinite]">
                Tiru AI
              </span>
              <motion.span 
                className="text-[10px] text-cyan-400/60 font-mono tracking-wider"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                v2.0.ALPHA
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop Navigation & Search with enhanced neon effects */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-foreground/80 hover:text-cyan-400 transition-all duration-300 relative group font-['Orbitron']">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300" />
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400 blur-sm opacity-0 group-hover:opacity-100"
                style={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a href="#home" className="text-foreground/80 hover:text-cyan-400 transition-all duration-300 relative group font-['Orbitron']">
              Generate
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300" />
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400 blur-sm opacity-0 group-hover:opacity-100"
                style={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a href="#gallery" className="text-foreground/80 hover:text-cyan-400 transition-all duration-300 relative group font-['Orbitron']">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300" />
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400 blur-sm opacity-0 group-hover:opacity-100"
                style={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a href="#docs" className="text-foreground/80 hover:text-cyan-400 transition-all duration-300 relative group font-['Orbitron']">
              Docs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300" />
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400 blur-sm opacity-0 group-hover:opacity-100"
                style={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a href="#ai-lab" className="text-foreground/80 hover:text-purple-400 transition-all duration-300 relative group font-['Orbitron']">
              AI Lab
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300" />
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-purple-400 blur-sm opacity-0 group-hover:opacity-100"
                style={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>

            {/* Desktop Search Bar with neon glow */}
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                type="text"
                placeholder="Search machines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2 w-48 bg-background/40 border border-cyan-400/20 focus:border-cyan-400/60 focus:w-72 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 rounded-full backdrop-blur-md"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/5 opacity-0 group-focus-within:opacity-100 -z-10 blur-md transition-opacity"
              />
            </form>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notification Bell with enhanced pulse effect */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 relative group"
            >
              <Bell className="h-5 w-5" />
              <motion.div
                className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(6, 182, 212, 0.7)",
                    "0 0 0 6px rgba(6, 182, 212, 0)",
                    "0 0 0 0 rgba(6, 182, 212, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 relative overflow-hidden group"
            >
              <motion.div
                animate={{ rotate: darkMode ? 0 : 180 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-cyan-400" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 relative group"
            >
              <User className="h-5 w-5" />
              {/* Live status indicator */}
              <motion.div
                className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-background rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden py-3 border-t border-border animate-in slide-in-from-top-2 duration-300">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search machines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-accent/50 border-cyan-400/20 focus:border-cyan-400/50 rounded-full"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-foreground/80 hover:text-cyan-400 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#generate"
                className="text-foreground/80 hover:text-cyan-400 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Generate
              </a>
              <a
                href="#gallery"
                className="text-foreground/80 hover:text-cyan-400 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#docs"
                className="text-foreground/80 hover:text-cyan-400 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
