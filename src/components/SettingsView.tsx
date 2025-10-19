import { motion } from "motion/react";
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Globe, 
  Database,
  Shield,
  Zap,
  Download,
  Eye
} from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function SettingsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full overflow-y-auto"
    >
      <div className="mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Settings
        </h2>
        <p className="text-sm md:text-base text-gray-400">Manage your preferences and configuration</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-black/40 border border-cyan-400/20">
          <TabsTrigger value="general" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
            <Settings className="w-4 h-4 mr-2 hidden md:inline" />
            <span className="text-xs md:text-sm">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
            <Palette className="w-4 h-4 mr-2 hidden md:inline" />
            <span className="text-xs md:text-sm">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
            <Zap className="w-4 h-4 mr-2 hidden md:inline" />
            <span className="text-xs md:text-sm">AI Model</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
            <Shield className="w-4 h-4 mr-2 hidden md:inline" />
            <span className="text-xs md:text-sm">Privacy</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="font-['Orbitron']">Profile Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  defaultValue="Engineer_01"
                  className="mt-2 bg-background/40 border-cyan-400/20"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your@email.com" 
                  defaultValue="user@virtualfactory.ai"
                  className="mt-2 bg-background/40 border-cyan-400/20"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-blue-400" />
              <h3 className="font-['Orbitron']">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Machine Generation Complete</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get notified when your 3D model is ready
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-cyan-400/20" />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Notifications</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Alerts when exports are complete
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-cyan-400/20" />
              <div className="flex items-center justify-between">
                <div>
                  <Label>System Updates</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    News about new features and updates
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="font-['Orbitron']">Visual Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Theme Mode</Label>
                <Select defaultValue="dark">
                  <SelectTrigger className="mt-2 bg-background/40 border-cyan-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark (Cyberpunk)</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Accent Color</Label>
                <Select defaultValue="cyan">
                  <SelectTrigger className="mt-2 bg-background/40 border-cyan-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cyan">Cyan</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-cyan-400/20" />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Animations</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enable cyberpunk effects and transitions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Particle Effects</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Floating particles and glows
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Reduce Motion</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimize animations for accessibility
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-green-400" />
              <h3 className="font-['Orbitron']">3D Viewer Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Rotate Models</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically rotate 3D previews
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>High Quality Rendering</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Better visuals, higher GPU usage
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AI Model Settings */}
        <TabsContent value="ai" className="space-y-4">
          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-['Orbitron']">Ollama Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>API Endpoint</Label>
                <Input 
                  placeholder="http://localhost:4000/api/ollama"
                  defaultValue="http://localhost:4000/api/ollama"
                  className="mt-2 bg-background/40 border-cyan-400/20 font-mono text-sm"
                />
              </div>
              <div>
                <Label>Model Selection</Label>
                <Select defaultValue="llama3.2">
                  <SelectTrigger className="mt-2 bg-background/40 border-cyan-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama3.2">Llama 3.2</SelectItem>
                    <SelectItem value="llama3.1">Llama 3.1</SelectItem>
                    <SelectItem value="mistral">Mistral</SelectItem>
                    <SelectItem value="codellama">Code Llama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-cyan-400/20" />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Stream Responses</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Show AI responses in real-time
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Cache Results</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Save generated designs locally
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="font-['Orbitron']">Generation Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Temperature</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="70"
                    className="flex-1"
                  />
                  <span className="text-sm text-cyan-400 font-mono w-12">0.7</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher values = more creative, Lower = more precise
                </p>
              </div>
              <div>
                <Label>Max Tokens</Label>
                <Input 
                  type="number"
                  defaultValue="2048"
                  className="mt-2 bg-background/40 border-cyan-400/20"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy & Security */}
        <TabsContent value="privacy" className="space-y-4">
          <Card className="p-4 md:p-6 glass-panel border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="font-['Orbitron']">Privacy & Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Help improve the app with usage data
                  </p>
                </div>
                <Switch />
              </div>
              <Separator className="bg-cyan-400/20" />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Cloud Sync</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sync designs across devices
                  </p>
                </div>
                <Switch />
              </div>
              <Separator className="bg-cyan-400/20" />
              <div>
                <Label>Data Storage</Label>
                <p className="text-xs text-muted-foreground mt-2 mb-4">
                  All designs are stored locally. No data is sent to external servers.
                </p>
                <Button variant="outline" className="w-full border-cyan-400/30 hover:bg-cyan-400/10">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 glass-panel border-red-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-red-400" />
              <h3 className="font-['Orbitron'] text-red-400">Danger Zone</h3>
            </div>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-red-400/30 hover:bg-red-400/10 text-red-400"
              >
                Clear All Cache
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-400/30 hover:bg-red-400/10 text-red-400"
              >
                Reset All Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-400/30 hover:bg-red-400/10 text-red-400"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
