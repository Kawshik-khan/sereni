"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Sparkles, Calendar, Tag } from "lucide-react";
import { Card, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const prompts = [
  "What are you grateful for today?",
  "Describe a moment that made you smile.",
  "What's been weighing on your mind?",
  "Write about something you learned about yourself.",
  "What would make today great?",
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function JournalView() {
  const { journalEntries, addJournalEntry } = useAppStore();
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const saveEntry = () => {
    if (!title.trim() || !content.trim()) return;
    addJournalEntry({
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      title,
      content,
      emotionalSummary: "Reflective",
      mood: "thoughtful",
    });
    setTitle("");
    setContent("");
    setIsWriting(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Journal</h1>
          <p className="text-text-secondary">A safe space for your thoughts and reflections.</p>
        </div>
        <Button onClick={() => setIsWriting(!isWriting)} variant={isWriting ? "secondary" : "default"}>
          {isWriting ? "Cancel" : <><Plus className="w-4 h-4" /> New Entry</>}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm text-accent-cyan font-medium">Writing prompts</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPrompt(p);
                      if (!title) setTitle(p);
                    }}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer",
                      selectedPrompt === p
                        ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                        : "border-border text-text-muted hover:text-text-secondary hover:border-border-light"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entry title..."
                className="text-lg font-semibold h-12 mb-4 border-0 bg-transparent px-0 focus:ring-0 placeholder:text-text-muted/50"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts..."
                className="w-full min-h-[200px] bg-transparent text-text-primary placeholder:text-text-muted/50 text-sm leading-relaxed resize-none focus:outline-none"
              />

              <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                <span className="text-xs text-text-muted">
                  {content.split(/\s+/).filter(Boolean).length} words
                </span>
                <Button onClick={saveEntry} disabled={!title.trim() || !content.trim()}>
                  Save Entry
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {journalEntries.map((entry) => (
          <motion.div key={entry.id} variants={item}>
            <Card className="p-6 hover:border-border-light hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{entry.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent-purple/10 text-accent-purple">
                  <Tag className="w-3 h-3" />
                  {entry.mood}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{entry.content}</p>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-accent-cyan" />
                <span className="text-xs text-accent-cyan">{entry.emotionalSummary}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
