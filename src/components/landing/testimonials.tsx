"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Sereni helped me understand my emotional patterns in ways I never could on my own. It feels like having a thoughtful friend available whenever I need one.",
    name: "Sarah M.",
    role: "Teacher",
    avatar: "S",
  },
  {
    quote: "The daily check-ins and mood tracking have become an essential part of my routine. I feel more in tune with myself than ever before.",
    name: "James L.",
    role: "Software Engineer",
    avatar: "J",
  },
  {
    quote: "What I love most is how gentle and non-judgmental the experience is. It creates a safe space to explore my feelings without pressure.",
    name: "Maria K.",
    role: "Healthcare Worker",
    avatar: "M",
  },
];

export function Testimonials() {
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
            Stories of <span className="text-accent-purple">calm & growth</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Real experiences from people finding peace with Sereni.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col hover:border-white/10 hover:-translate-y-1">
                <p className="text-text-secondary leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-white text-sm font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
