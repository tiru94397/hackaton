import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Lock, Mail, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // For demo purposes, just call onLogin
    onLogin(email, password);
    
    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Animated particles in background */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md mx-4 glass-panel rounded-xl md:rounded-2xl border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden"
          >
            {/* Holographic shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 group"
            >
              <X className="w-4 h-4 text-red-400 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Header */}
            <div className="relative p-6 md:p-8 pb-4 md:pb-6 border-b border-cyan-400/20">
              <motion.div
                className="flex items-center justify-center gap-3 mb-2"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <Sparkles className="w-6 h-6 text-white relative z-10" />
                </div>
              </motion.div>
              <h2 className="text-xl md:text-2xl text-center font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Virtual Factory AI
              </h2>
              <p className="text-xs md:text-sm text-center text-cyan-400/60 mt-1 font-mono">
                J.A.R.V.I.S Interface v2.0
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="relative p-4 md:p-6 pb-0">
              <div className="flex gap-2 mb-6 p-1 bg-black/40 rounded-xl border border-cyan-400/20">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 rounded-lg font-['Orbitron'] transition-all duration-300 relative overflow-hidden ${
                    isLogin
                      ? "bg-cyan-400/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                      : "text-gray-400 hover:text-cyan-400"
                  }`}
                >
                  {isLogin && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-cyan-400/20 rounded-lg"
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Login
                  </span>
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 rounded-lg font-['Orbitron'] transition-all duration-300 relative overflow-hidden ${
                    !isLogin
                      ? "bg-purple-400/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      : "text-gray-400 hover:text-purple-400"
                  }`}
                >
                  {!isLogin && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-purple-400/20 rounded-lg"
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Register
                  </span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="fullName" className="text-cyan-400 flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <div className="relative group">
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required={!isLogin}
                          className="bg-background/60 border-cyan-400/30 focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-lg border-2 border-cyan-400/0 group-focus-within:border-cyan-400/20 pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <Label htmlFor="email" className="text-cyan-400 flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/60 border-cyan-400/30 focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-cyan-400/0 group-focus-within:border-cyan-400/20 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-cyan-400 flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-background/60 border-cyan-400/30 focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-cyan-400/0 group-focus-within:border-cyan-400/20 pointer-events-none"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="confirmPassword" className="text-cyan-400 flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4" />
                        Confirm Password
                      </Label>
                      <div className="relative group">
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required={!isLogin}
                          className="bg-background/60 border-cyan-400/30 focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-lg border-2 border-cyan-400/0 group-focus-within:border-cyan-400/20 pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 font-['Orbitron'] flex items-center justify-center gap-2">
                    {isLogin ? (
                      <>
                        <Shield className="w-4 h-4" />
                        Access System
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 pt-4 border-t border-cyan-400/20 mt-6">
              <p className="text-xs text-center text-gray-400">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-purple-400 hover:text-purple-300 font-['Orbitron'] transition-colors"
                    >
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-cyan-400 hover:text-cyan-300 font-['Orbitron'] transition-colors"
                    >
                      Login here
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-400/30 pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
