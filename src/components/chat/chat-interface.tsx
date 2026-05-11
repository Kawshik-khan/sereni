"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Smile,
  Wind,
  Sparkles,
  Heart,
  CloudRain,
  Sun,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const quickEmotions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "🥰", label: "Loved" },
];

const aiResponses = [
  "I hear you, and I want you to know that what you're feeling is completely valid. Let's explore that together.",
  "That's a really thoughtful observation. It shows great self-awareness. Would you like to dive deeper into what's driving that feeling?",
  "Thank you for sharing that with me. It takes courage to be open about our feelings. How has this been affecting your day?",
  "I appreciate you trusting me with this. Remember, every emotion carries a message. What do you think yours is telling you?",
  "It sounds like you've been carrying a lot. Let's take a moment to breathe together and create some space for clarity.",
];

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatMessages, addChatMessage } = useAppStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date().toISOString(),
      type: "text" as const,
    };
    addChatMessage(userMessage);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
        type: "text",
      });
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] md:h-screen">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background-secondary/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-text-primary">Sereni</h2>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              Online &middot; Ready to listen
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[Sun, Heart, CloudRain].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-xl bg-surface/50 flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-surface transition-colors cursor-pointer"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] sm:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-accent text-white rounded-br-md"
                    : "bg-surface-secondary/80 text-text-primary rounded-bl-md border border-border"
                )}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-surface-secondary/80 border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </motion.div>
        )}

        <GlassCard className="p-4 mx-auto max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-medium text-accent-cyan">Breathing Exercise</span>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Take a moment to breathe. Inhale for 4 seconds, hold for 4, exhale for 4.
          </p>
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.3, 1.3, 1],
                opacity: [0.5, 1, 1, 0.5],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                times: [0, 0.33, 0.66, 1],
              }}
              className="w-16 h-16 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center"
            >
              <span className="text-xs text-accent-cyan font-medium">Breathe</span>
            </motion.div>
          </div>
        </GlassCard>

        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-border bg-background-secondary/30 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-3">
          {quickEmotions.map((e) => (
            <button
              key={e.label}
              onClick={() => setInput(`I'm feeling ${e.label.toLowerCase()} right now`)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface/50 hover:bg-surface text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer border border-transparent hover:border-border"
            >
              <span>{e.emoji}</span>
              <span className="hidden sm:inline">{e.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-surface/50 flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-surface transition-colors cursor-pointer flex-shrink-0">
            <Smile className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share what's on your mind..."
              className="w-full h-11 rounded-2xl border border-border bg-surface/60 px-4 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 backdrop-blur-sm"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-surface/50 flex items-center justify-center text-text-muted hover:text-accent-purple hover:bg-surface transition-colors cursor-pointer flex-shrink-0">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
