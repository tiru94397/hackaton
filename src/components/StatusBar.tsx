import { motion } from "motion/react";
import { Wifi, WifiOff, Cpu, Activity, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface StatusBarProps {
   TiruConnected: boolean;
  modelName: string;
}

export function StatusBar({  TiruConnected, modelName }: StatusBarProps) {
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(68);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Simulate CPU/Memory monitoring
  useEffect(() => {
    const updateStats = () => {
      setCpuUsage(Math.floor(30 + Math.random() * 40));
      setMemoryUsage(Math.floor(50 + Math.random() * 30));
    };

    const interval = setInterval(updateStats, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="fixed bottom-0 left-0 md:left-20 right-0 h-10 md:h-12 glass-panel border-t border-cyan-400/20 z-30"
    >
      {/* Animated top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="h-full px-3 md:px-6 flex items-center justify-between gap-2 md:gap-4">
        {/* Left:  Tiru Status */}
        <div className="flex items-center gap-2 md:gap-6">
          <motion.div
            className="flex items-center gap-1 md:gap-2"
            animate={ TiruConnected ? {} : { opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            { TiruConnected ? (
              <Wifi className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
            ) : (
              <WifiOff className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
            )}
            <span
              className={`text-xs md:text-sm font-mono hidden sm:inline ${
                 TiruConnected ? "text-green-400" : "text-red-400"
              }`}
            >
              { TiruConnected ? "Connected" : "Disconnected"}
            </span>
            { TiruConnected && (
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>

          <div className="h-4 md:h-6 w-px bg-cyan-400/20 hidden sm:block" />

          {/* Model Name - Hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-1 md:gap-2">
            <Cpu className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
            <span className="text-xs md:text-sm text-cyan-400 font-mono">{modelName}</span>
          </div>
        </div>

        {/* Center: System Stats - Hidden on mobile, shown on md+ */}
        <div className="hidden md:flex items-center gap-6">
          {/* CPU Usage */}
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400 font-mono">CPU:</span>
            <div className="w-20 h-2 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${cpuUsage}%` }}
                animate={{ width: `${cpuUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-purple-400 font-mono w-10 text-right">
              {cpuUsage}%
            </span>
          </div>

          {/* Memory Usage */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400 font-mono">MEM:</span>
            <div className="w-20 h-2 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ width: `${memoryUsage}%` }}
                animate={{ width: `${memoryUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-blue-400 font-mono w-10 text-right">
              {memoryUsage}%
            </span>
          </div>
        </div>

        {/* Right: Compact stats on mobile, Time on desktop */}
        <div className="flex items-center gap-2">
          {/* Mobile: Compact CPU/MEM indicators */}
          <div className="flex md:hidden items-center gap-2">
            <Activity className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-purple-400 font-mono">{cpuUsage}%</span>
            <Zap className="w-3 h-3 text-blue-400 ml-1" />
            <span className="text-xs text-blue-400 font-mono">{memoryUsage}%</span>
          </div>

          {/* Desktop: Time */}
          <motion.div
            className="hidden md:block text-xs text-cyan-400 font-mono"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {time}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
