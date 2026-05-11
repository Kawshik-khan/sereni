"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  BarChart3,
  BookOpen,
  Brain,
  Heart,
  Shield,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";

const features = [
  {
    icon: MessageCircle,
    title: "AI Companion",
    description: "Have meaningful conversations with an emotionally intelligent AI that truly understands you.",
    gradient: "from-accent to-accent-cyan",
    span: "col-span-2 row-span-2",
  },
  {
    icon: BarChart3,
    title: "Mood Tracking",
    description: "Track emotional patterns with beautiful visualizations.",
    gradient: "from-accent-purple to-accent",
    span: "col-span-1 row-span-1",
  },
  {
    icon: BookOpen,
    title: "Journaling",
    description: "Reflect with guided prompts and AI-powered summaries.",
    gradient: "from-success to-accent-cyan",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Brain,
    title: "Wellness Insights",
    description: "Get personalized insights based on your emotional and physical data.",
    gradient: "from-warning to-danger",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Heart,
    title: "Habit Building",
    description: "Build healthy habits with gentle reminders and streaks.",
    gradient: "from-danger to-accent-purple",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Shield,
    title: "Memory System",
    description: "Sereni remembers your journey and adapts to support you better over time.",
    gradient: "from-accent-cyan to-accent-purple",
    span: "col-span-2 row-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

export function FeaturesGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need for
            <br />
            <span className="text-accent">emotional well-being</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            A comprehensive toolkit designed to help you understand, track, and improve your mental and physical health.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={feature.span}
            >
              <GlassCard className="h-full p-6 hover:border-white/10 hover:-translate-y-1 group cursor-default">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
