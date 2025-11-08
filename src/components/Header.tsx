"use client";
import { Search } from "lucide-react";

export function DashboardHeader({
  onSearch,
  onLogout,
}: {
  onSearch?: (query: string) => void;
  onLogout?: () => void;
}) {
  return (
    <header className="fixed top-0 left-20 right-0 bg-background/60 backdrop-blur-md border-b border-cyan-400/20 h-16 flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-3">
        <Search className="w-5 h-5 text-cyan-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-sm text-foreground placeholder-muted-foreground"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <button
        onClick={onLogout}
        className="text-sm text-cyan-400 hover:text-cyan-300 transition"
      >
        Logout
      </button>
    </header>
  );
}
