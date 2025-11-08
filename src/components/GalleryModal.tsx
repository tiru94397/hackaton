import { X, Download, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { MachineViewer3D } from "./MachineViewer3D";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  machine: {
    name: string;
    type: "robot" | "drone";
    description: string;
    tags: string[];
  } | null;
}

export function GalleryModal({ isOpen, onClose, machine }: GalleryModalProps) {
  if (!machine) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden glass-panel border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {machine.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* 3D Viewer */}
          <div className="h-[400px]">
            <MachineViewer3D machineType={machine.type} isGenerating={false} />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-muted-foreground mb-2">Description</h4>
              <p className="text-sm leading-relaxed">{machine.description}</p>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {machine.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="text-sm text-muted-foreground mb-3">AI Suggestions</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg bg-black/20 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-sm">
                  Optimize for weight reduction
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg bg-black/20 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-sm">
                  Add payload capacity
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg bg-black/20 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-sm">
                  Improve power efficiency
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
