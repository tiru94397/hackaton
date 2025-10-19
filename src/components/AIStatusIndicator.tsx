import { motion, AnimatePresence } from "motion/react";
import { Brain, Zap, CheckCircle } from "lucide-react";

interface AIStatusIndicatorProps {
  status: "idle" | "processing" | "complete";
  message?: string;
}

export function AIStatusIndicator({ status, message }: AIStatusIndicatorProps) {
  if (status === "idle") return null;

  const statusConfig = {
    processing: {
      icon: Brain,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/30",
    },
    complete: {
      icon: CheckCircle,
      color: "green",
      gradient: "from-green-400 to-emerald-500",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        className="fixed bottom-24 right-8 z-50"
      >
        <div className={`flex items-center gap-3 px-6 py-4 ${config.bgColor} backdrop-blur-xl border ${config.borderColor} rounded-2xl shadow-2xl`}>
          {/* Animated icon */}
          <motion.div
            className={`p-2 rounded-xl bg-gradient-to-br ${config.gradient}`}
            animate={
              status === "processing"
                ? {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }
                : { scale: [0.8, 1.2, 1] }
            }
            transition={
              status === "processing"
                ? {
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                  }
                : { duration: 0.5 }
            }
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>

          {/* Status text */}
          <div className="flex flex-col">
            <span className={`text-sm font-medium text-${config.color}-400`}>
              {status === "processing" ? "AI Processing" : "Complete"}
            </span>
            {message && (
              <span className="text-xs text-foreground/60">{message}</span>
            )}
          </div>

          {/* Pulse indicator for processing */}
          {status === "processing" && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-10 rounded-2xl blur-xl`} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
