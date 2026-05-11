"use client";

import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-text-primary">Sereni</span>
        </div>
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Sereni. Your wellness, your journey.
        </p>
        <div className="flex items-center gap-6 text-sm text-text-muted">
          <span className="hover:text-text-secondary transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-text-secondary transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-text-secondary transition-colors cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
}
