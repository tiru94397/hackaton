"use client";

import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Canvas, useThree } from "@react-three/fiber";
import { Scene3D } from "./Scene3D";
import { Suspense, useCallback } from "react";

// Three.js exporters
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { saveAs } from "file-saver";

interface MachineViewer3DProps {
  machineType: "robot" | "drone";
  isGenerating: boolean;
}

/* -------------------------------------------------------
   Hook Component: SceneExporter (used INSIDE Canvas)
------------------------------------------------------- */
function SceneExporterControls({ onExport }: { onExport: (format: string) => void }) {
  return (
    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex flex-wrap gap-2 justify-start z-10">
      {["stl", "obj", "gltf"].map((format) => (
        <Button
          key={format}
          size="sm"
          onClick={() => onExport(format)}
          className="bg-black/60 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500/20 text-xs md:text-sm"
        >
          <Download className="w-3 h-3 mr-1 md:mr-2" />
          {format.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   Hook: useSceneExport (shared logic)
------------------------------------------------------- */
function useSceneExport() {
  const { scene } = useThree();

  return useCallback(
    (format: string) => {
      try {
        const fileName = `GeethaFactory_${Date.now()}.${format}`;
        let blob: Blob | null = null;

        switch (format) {
          case "stl": {
            const exporter = new STLExporter();
            const stlStr = exporter.parse(scene);
            blob = new Blob([stlStr], { type: "model/stl" });
            break;
          }
          case "obj": {
            const exporter = new OBJExporter();
            const objStr = exporter.parse(scene);
            blob = new Blob([objStr], { type: "model/obj" });
            break;
          }
          case "gltf":
          default: {
            const exporter = new GLTFExporter();
            exporter.parse(
              scene,
              (result) => {
                const output =
                  result instanceof ArrayBuffer
                    ? result
                    : JSON.stringify(result, null, 2);
                const glbBlob = new Blob([output], {
                  type: "model/gltf-binary",
                });
                saveAs(glbBlob, fileName);
                toast.success(`Exported as GLTF`, {
                  description: `${fileName} downloaded successfully.`,
                });
              },
              { binary: true }
            );
            return;
          }
        }

        if (blob) {
          saveAs(blob, fileName);
          toast.success(`Exported as ${format.toUpperCase()}`, {
            description: `${fileName} downloaded successfully.`,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error(`Failed to export ${format.toUpperCase()}`);
      }
    },
    [scene]
  );
}

/* -------------------------------------------------------
   ExportToolbar — inside Canvas to access useThree
------------------------------------------------------- */
function ExportToolbar({ isGenerating }: { isGenerating: boolean }) {
  const handleExport = useSceneExport();
  if (isGenerating) return null;
  return <SceneExporterControls onExport={handleExport} />;
}

/* -------------------------------------------------------
   MAIN COMPONENT — MachineViewer3D
------------------------------------------------------- */
export function MachineViewer3D({ machineType, isGenerating }: MachineViewer3DProps) {
  return (
    <div className="relative w-full h-full bg-black/20 rounded-xl md:rounded-2xl overflow-hidden border border-cyan-500/20">
      {/* 3D Canvas */}
      <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
        <Canvas
          shadows
          camera={{ position: [5, 5, 5], fov: 50 }}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene3D isLoading={isGenerating} machineType={machineType} />
          </Suspense>

          {/* ✅ Export toolbar injected here (has access to scene) */}
          <ExportToolbar isGenerating={isGenerating} />
        </Canvas>
      </div>

      {/* Decorative overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full circuit-pattern opacity-20" />
      </div>
    </div>
  );
}
