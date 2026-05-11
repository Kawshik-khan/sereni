"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";
import { SmilePlus, TrendingUp, Activity, Moon } from "lucide-react";
import { Card, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const emojis = [
  { value: 1, emoji: "😢", label: "Terrible" },
  { value: 2, emoji: "😞", label: "Bad" },
  { value: 3, emoji: "😔", label: "Down" },
  { value: 4, emoji: "😐", label: "Meh" },
  { value: 5, emoji: "🙂", label: "Okay" },
  { value: 6, emoji: "😌", label: "Calm" },
  { value: 7, emoji: "😊", label: "Good" },
  { value: 8, emoji: "😄", label: "Great" },
  { value: 9, emoji: "🥰", label: "Amazing" },
  { value: 10, emoji: "🤩", label: "Incredible" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function MoodTracker() {
  const { moodHistory, currentMood, setCurrentMood, addMoodEntry } = useAppStore();
  const [selectedEmoji, setSelectedEmoji] = useState(emojis[currentMood - 1]);
  const [note, setNote] = useState("");
  const [stress, setStress] = useState(3);

  const moodChartData = moodHistory.map((m) => ({
    day: new Date(m.date).toLocaleDateString("en", { weekday: "short" }),
    mood: m.mood,
  }));

  const stressChartData = moodHistory.map((m) => ({
    day: new Date(m.date).toLocaleDateString("en", { weekday: "short" }),
    stress: m.stress,
  }));

  const sleepChartData = moodHistory.map((m) => ({
    day: new Date(m.date).toLocaleDateString("en", { weekday: "short" }),
    sleep: m.sleep,
  }));

  const handleSliderChange = (value: number) => {
    setCurrentMood(value);
    setSelectedEmoji(emojis[value - 1]);
  };

  const logMood = () => {
    addMoodEntry({
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      mood: currentMood,
      emoji: selectedEmoji.emoji,
      note,
      stress,
      sleep: 7,
    });
    setNote("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Mood Tracking</h1>
        <p className="text-text-secondary">Track and understand your emotional patterns.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Log Mood */}
        <motion.div variants={item} className="lg:col-span-1">
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <SmilePlus className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">How are you feeling?</h3>
            </div>

            <div className="text-center mb-6">
              <motion.span
                key={selectedEmoji.value}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl block mb-2"
              >
                {selectedEmoji.emoji}
              </motion.span>
              <p className="text-text-secondary font-medium">{selectedEmoji.label}</p>
              <p className="text-accent text-2xl font-bold">{currentMood}/10</p>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              value={currentMood}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-2 bg-surface-tertiary rounded-full appearance-none cursor-pointer mb-6 accent-accent"
            />

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {emojis.map((e) => (
                <button
                  key={e.value}
                  onClick={() => handleSliderChange(e.value)}
                  className={cn(
                    "text-2xl p-1 rounded-lg transition-all cursor-pointer",
                    currentMood === e.value ? "bg-accent/20 scale-125" : "opacity-50 hover:opacity-80"
                  )}
                >
                  {e.emoji}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-sm text-text-muted mb-2 block">Stress level: {stress}/10</label>
              <input
                type="range"
                min={1}
                max={10}
                value={stress}
                onChange={(e) => setStress(Number(e.target.value))}
                className="w-full h-2 bg-surface-tertiary rounded-full appearance-none cursor-pointer accent-danger"
              />
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about how you're feeling..."
              className="w-full h-20 rounded-2xl border border-border bg-surface/60 p-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none mb-4"
            />

            <Button onClick={logMood} className="w-full">
              Log Mood
            </Button>
          </GlassCard>
        </motion.div>

        {/* Charts */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Mood Over Time</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodChartData}>
                  <defs>
                    <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 10]} stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#172033", border: "1px solid #1E293B", borderRadius: "12px", fontSize: "12px", color: "#F1F5F9" }} />
                  <Area type="monotone" dataKey="mood" stroke="#60A5FA" strokeWidth={2} fill="url(#moodGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-danger" />
                <h3 className="font-semibold text-sm">Stress Levels</h3>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stressChartData}>
                    <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} hide />
                    <Tooltip contentStyle={{ background: "#172033", border: "1px solid #1E293B", borderRadius: "12px", fontSize: "12px", color: "#F1F5F9" }} />
                    <Bar dataKey="stress" fill="#F87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5 text-accent-purple" />
                <h3 className="font-semibold text-sm">Sleep Quality</h3>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepChartData}>
                    <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} hide />
                    <Tooltip contentStyle={{ background: "#172033", border: "1px solid #1E293B", borderRadius: "12px", fontSize: "12px", color: "#F1F5F9" }} />
                    <Bar dataKey="sleep" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Emotional Patterns */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Emotional Patterns</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Most common", value: "Calm 😌", color: "text-accent" },
                { label: "Avg mood", value: `${(moodHistory.reduce((a, b) => a + b.mood, 0) / moodHistory.length).toFixed(1)}/10`, color: "text-success" },
                { label: "Avg stress", value: `${(moodHistory.reduce((a, b) => a + b.stress, 0) / moodHistory.length).toFixed(1)}/10`, color: "text-danger" },
                { label: "Avg sleep", value: `${(moodHistory.reduce((a, b) => a + b.sleep, 0) / moodHistory.length).toFixed(1)}hrs`, color: "text-accent-purple" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-2xl bg-surface-secondary/40">
                  <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                  <p className={cn("text-sm font-semibold", stat.color)}>{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
