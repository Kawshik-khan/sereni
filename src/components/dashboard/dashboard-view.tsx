"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  TrendingUp,
  Moon,
  BookOpen,
  Target,
  Brain,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Card, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { MoodChart } from "./mood-chart";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

export function DashboardView() {
  const { habits, moodHistory, journalEntries, chatMessages } = useAppStore();
  const completedHabits = habits.filter((h) => h.completedToday).length;
  const latestMood = moodHistory[moodHistory.length - 1];
  const avgMood = (moodHistory.reduce((a, b) => a + b.mood, 0) / moodHistory.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Good morning</h1>
        <p className="text-text-secondary">Here&apos;s your wellness overview for today.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
        {/* AI Chat - Large */}
        <motion.div variants={item} className="md:col-span-2 lg:row-span-2">
          <Link href="/chat" className="block h-full">
            <GlassCard className="h-full p-6 hover:border-white/10 hover:-translate-y-1 group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">AI Companion</h3>
                  <p className="text-xs text-success">Ready to chat</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                {chatMessages.slice(-2).map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "text-sm rounded-xl px-3 py-2",
                      msg.role === "assistant"
                        ? "bg-surface-secondary/60 text-text-secondary"
                        : "bg-accent/10 text-accent ml-8"
                    )}
                  >
                    {msg.content.slice(0, 100)}...
                  </div>
                ))}
              </div>
              <Button variant="glow" size="sm" className="w-full group-hover:bg-accent/20">
                Continue conversation <ArrowRight className="w-4 h-4" />
              </Button>
            </GlassCard>
          </Link>
        </motion.div>

        {/* Mood Analytics */}
        <motion.div variants={item} className="lg:col-span-2">
          <Link href="/mood" className="block h-full">
            <Card className="h-full p-6 hover:border-accent/20 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold">Mood Trends</h3>
                </div>
                <span className="text-2xl">{latestMood?.emoji}</span>
              </div>
              <MoodChart data={moodHistory} />
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-text-muted">7-day avg: <span className="text-accent font-medium">{avgMood}/10</span></span>
                <span className="text-text-muted">Today: <span className="text-text-primary font-medium">{latestMood?.mood}/10</span></span>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Sleep Card */}
        <motion.div variants={item}>
          <Card className="h-full p-6 hover:border-accent-purple/20 hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-5 h-5 text-accent-purple" />
              <h3 className="font-semibold text-sm">Sleep</h3>
            </div>
            <div className="text-3xl font-bold text-text-primary mb-1">7.2<span className="text-lg text-text-muted font-normal">hrs</span></div>
            <p className="text-xs text-text-muted mb-3">avg this week</p>
            <div className="flex gap-1">
              {[6, 8, 5, 7, 8, 7, 7].map((h, i) => (
                <div key={i} className="flex-1 rounded-full bg-surface-tertiary overflow-hidden h-12">
                  <div
                    className="w-full rounded-full bg-gradient-to-t from-accent-purple/60 to-accent-purple/20 transition-all"
                    style={{ height: `${(h / 10) * 100}%`, marginTop: `${100 - (h / 10) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Journal Card */}
        <motion.div variants={item}>
          <Link href="/journal" className="block h-full">
            <Card className="h-full p-6 hover:border-success/20 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-success" />
                <h3 className="font-semibold text-sm">Journal</h3>
              </div>
              {journalEntries[0] && (
                <>
                  <p className="text-sm font-medium text-text-primary mb-1">{journalEntries[0].title}</p>
                  <p className="text-xs text-text-muted mb-2">{journalEntries[0].content.slice(0, 60)}...</p>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                    {journalEntries[0].emotionalSummary}
                  </span>
                </>
              )}
            </Card>
          </Link>
        </motion.div>

        {/* Habits Card */}
        <motion.div variants={item}>
          <Link href="/habits" className="block h-full">
            <Card className="h-full p-6 hover:border-warning/20 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-sm">Habits</h3>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">
                {completedHabits}<span className="text-lg text-text-muted font-normal">/{habits.length}</span>
              </div>
              <p className="text-xs text-text-muted mb-3">completed today</p>
              <div className="flex flex-wrap gap-2">
                {habits.slice(0, 4).map((h) => (
                  <span
                    key={h.id}
                    className={cn(
                      "text-lg transition-all",
                      h.completedToday ? "opacity-100 scale-110" : "opacity-40"
                    )}
                  >
                    {h.icon}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* AI Insights */}
        <motion.div variants={item}>
          <GlassCard className="h-full p-6 hover:border-white/10 hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-accent-cyan" />
              <h3 className="font-semibold text-sm">AI Insight</h3>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent-cyan mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-secondary leading-relaxed">
                Your mood has been trending upward this week. Your meditation habit seems strongly correlated with better sleep quality.
              </p>
            </div>
            <span className="text-xs text-accent-cyan/60">Updated 2 hours ago</span>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
