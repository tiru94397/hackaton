import { Github, Linkedin, Mail, Trophy, Send, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed!", {
        description: "You'll receive our latest updates and features.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-cyan-950/5 border-t border-cyan-400/10 mt-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400">Stay Updated</span>
          </div>
          <h3 className="text-2xl md:text-3xl mb-3 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Join Our Newsletter
          </h3>
          <p className="text-foreground/60 mb-6">
            Get the latest updates on new features, AI improvements, and exclusive tips
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-accent/50 border-cyan-400/20 focus:border-cyan-400/50 rounded-full"
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white rounded-full px-6 shadow-lg shadow-cyan-400/20"
            >
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50">
                <div className="w-4 h-4 border-2 border-white rounded-sm" />
              </div>
              <span className="font-mono bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Virtual Factory AI
              </span>
            </div>
            <p className="text-foreground/60 mb-4 max-w-sm italic">
              "Design machines with AI. Like ChatGPT, but for 3D industrial systems."
            </p>
            <p className="text-foreground/60 mb-4 max-w-sm text-sm">
              Create, visualize, and export complete machine designs with specifications using conversational AI.
            </p>
            
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 border border-cyan-400/20 rounded-full">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Built for Hackathon 2025</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#generate" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Generate
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#docs" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Docs
                </a>
              </li>

            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#license" className="text-foreground/60 hover:text-cyan-400 transition-colors">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} Virtual Factory AI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300 border border-border hover:border-cyan-400/30"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-300 border border-border hover:border-blue-500/30"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300 border border-border hover:border-purple-500/30"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@machineai.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-green-500/10 hover:text-green-500 transition-all duration-300 border border-border hover:border-green-500/30"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
