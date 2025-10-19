import { motion, AnimatePresence } from "motion/react";
import { Home, MessageSquare, Box, Eye, Settings, Layers, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "models", icon: Box, label: "Models" },
  { id: "3d-view", icon: Eye, label: "3D View" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 w-12 h-12 rounded-xl glass-panel border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-400/10 transition-all"
        >
          <AnimatePresence mode="wait">
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6 text-cyan-400" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu className="w-6 h-6 text-cyan-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: isMobile ? -100 : 0, opacity: isMobile ? 0 : 1 }}
        animate={{
          x: isMobile && !isMobileOpen ? -100 : 0,
          opacity: isMobile && !isMobileOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, type: "spring", damping: 25 }}
        className={`fixed left-0 top-0 h-screen w-20 glass-panel border-r border-cyan-400/20 z-40 flex flex-col items-center py-8 ${
          isMobile ? "shadow-2xl" : ""
        }`}
      >
        {/* Logo */}
        <motion.div
          className={`${isMobile ? "mb-8 mt-12" : "mb-12"} relative`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <Layers className="w-6 h-6 text-white relative z-10" />
          </div>
          <motion.div
            className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                  isActive
                    ? "bg-cyan-400/20 border border-cyan-400/50"
                    : "bg-transparent border border-cyan-400/0 hover:border-cyan-400/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect */}
                {(isActive || isHovered) && (
                  <motion.div
                    layoutId={isMobile ? "sidebar-glow-mobile" : "sidebar-glow"}
                    className="absolute inset-0 bg-cyan-400/10 rounded-xl blur-lg"
                    initial={false}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId={isMobile ? "active-indicator-mobile" : "active-indicator"}
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"
                    initial={false}
                  />
                )}

                {/* Icon */}
                <Icon
                  className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                    isActive
                      ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      : "text-gray-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  }`}
                />

                {/* Tooltip - Desktop only */}
                {!isMobile && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-20 px-3 py-2 glass-panel rounded-lg border border-cyan-400/30 whitespace-nowrap"
                  >
                    <span className="text-sm text-cyan-400 font-['Orbitron']">
                      {item.label}
                    </span>
                  </motion.div>
                )}

                {/* Corner accents */}
                {isActive && (
                  <>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400/50" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400/50" />
                  </>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom indicator */}
        <motion.div
          className="mt-auto"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-10 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
        </motion.div>
      </motion.aside>
    </>
  );
}
