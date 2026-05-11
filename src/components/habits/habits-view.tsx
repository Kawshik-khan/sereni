"use client";

import { motion } from "framer-motion";
import { Target, Flame, Check, Plus, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

export function HabitsView() {
  const { habits, toggleHabit } = useAppStore();
  const completedCount = habits.filter((h) => h.completedToday).length;
  const totalStreak = habits.reduce((a, h) => a + h.streak, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Habits</h1>
          <p className="text-text-secondary">Build lasting wellness habits, one day at a time.</p>
        </div>
        <Button variant="glow">
          <Plus className="w-4 h-4" /> New Habit
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        {[
          { label: "Today", value: `${completedCount}/${habits.length}`, icon: Target, color: "text-accent" },
          { label: "Completion", value: `${Math.round((completedCount / habits.length) * 100)}%`, icon: Check, color: "text-success" },
          { label: "Total Streaks", value: totalStreak.toString(), icon: Flame, color: "text-warning" },
          { label: "Best Streak", value: `${Math.max(...habits.map((h) => h.streak))} days`, icon: Trophy, color: "text-accent-purple" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 text-center">
            <stat.icon className={cn("w-5 h-5 mx-auto mb-2", stat.color)} />
            <p className="text-xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </Card>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Daily Progress</span>
          <span className="text-sm font-medium text-accent">{completedCount}/{habits.length}</span>
        </div>
        <div className="h-3 rounded-full bg-surface-tertiary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / habits.length) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-purple"
          />
        </div>
      </motion.div>

      {/* Habits list */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {habits.map((habit) => (
          <motion.div key={habit.id} variants={item}>
            <Card
              className={cn(
                "p-5 hover:-translate-y-0.5 transition-all cursor-pointer",
                habit.completedToday && "border-success/20 bg-success/[0.03]"
              )}
              onClick={() => toggleHabit(habit.id)}
            >
              <div className="flex items-center gap-4">
                <button
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer",
                    habit.completedToday
                      ? "bg-success text-white"
                      : "bg-surface-tertiary text-text-muted hover:bg-surface-secondary"
                  )}
                >
                  {habit.completedToday ? <Check className="w-5 h-5" /> : <span className="text-xl">{habit.icon}</span>}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={cn(
                      "font-medium transition-all",
                      habit.completedToday ? "text-success line-through" : "text-text-primary"
                    )}>
                      {habit.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-secondary text-text-muted capitalize">
                      {habit.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Flame className="w-3 h-3 text-warning" />
                    <span className="text-xs text-text-muted">{habit.streak} day streak</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1">
                  {weekDays.map((d, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-medium",
                        i < 4
                          ? "bg-success/20 text-success"
                          : i === 4
                          ? habit.completedToday
                            ? "bg-success/20 text-success"
                            : "bg-surface-tertiary text-text-muted"
                          : "bg-surface-tertiary text-text-muted"
                      )}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
