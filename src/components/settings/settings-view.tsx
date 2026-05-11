"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
        enabled ? "bg-accent" : "bg-surface-tertiary"
      )}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ duration: 0.2 }}
        className="w-5 h-5 rounded-full bg-white absolute top-0.5"
      />
    </button>
  );
}

export function SettingsView() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Settings</h1>
        <p className="text-text-secondary">Personalize your Sereni experience.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Profile */}
        <motion.div variants={item}>
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 px-1">Profile</h2>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-2xl text-white font-bold">
                S
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Sereni User</h3>
                <p className="text-sm text-text-muted">Member since May 2026</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-muted mb-1.5 block">Display Name</label>
                <Input defaultValue="Sereni User" />
              </div>
              <div>
                <label className="text-sm text-text-muted mb-1.5 block">Email</label>
                <Input defaultValue="user@example.com" type="email" />
              </div>
              <Button size="sm">Save Changes</Button>
            </div>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div variants={item}>
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 px-1">Preferences</h2>
          <Card className="divide-y divide-border">
            {[
              { icon: Bell, label: "Push Notifications", desc: "Daily reminders & insights", toggle: notifications, onToggle: () => setNotifications(!notifications) },
              { icon: Volume2, label: "Sound Effects", desc: "Ambient sounds & feedback", toggle: soundEffects, onToggle: () => setSoundEffects(!soundEffects) },
              { icon: Moon, label: "Dark Mode", desc: "Always use dark theme", toggle: darkMode, onToggle: () => setDarkMode(!darkMode) },
              { icon: Palette, label: "Reduced Motion", desc: "Minimize animations", toggle: reducedMotion, onToggle: () => setReducedMotion(!reducedMotion) },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-secondary flex items-center justify-center">
                    <pref.icon className="w-4 h-4 text-text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{pref.label}</p>
                    <p className="text-xs text-text-muted">{pref.desc}</p>
                  </div>
                </div>
                <Toggle enabled={pref.toggle} onToggle={pref.onToggle} />
              </div>
            ))}
          </Card>
        </motion.div>

        {/* AI Companion */}
        <motion.div variants={item}>
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 px-1">AI Companion</h2>
          <Card className="divide-y divide-border">
            {[
              { icon: User, label: "AI Personality", value: "Gentle Guide" },
              { icon: Globe, label: "Language", value: "English" },
              { icon: Shield, label: "Data & Privacy", value: "" },
              { icon: HelpCircle, label: "Help & Support", value: "" },
            ].map((setting) => (
              <button key={setting.label} className="flex items-center justify-between p-5 w-full hover:bg-surface/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-secondary flex items-center justify-center">
                    <setting.icon className="w-4 h-4 text-text-muted" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">{setting.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  {setting.value && <span className="text-sm text-text-muted">{setting.value}</span>}
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </div>
              </button>
            ))}
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={item}>
          <Card className="p-5">
            <button className="flex items-center gap-3 text-danger hover:opacity-80 transition-opacity cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
