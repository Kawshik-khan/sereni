"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles, Heart, Moon, Sun, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const steps = [
  { id: "welcome", title: "Welcome to Sereni" },
  { id: "name", title: "What should we call you?" },
  { id: "emotional", title: "Your emotional goals" },
  { id: "wellness", title: "Your wellness goals" },
  { id: "personality", title: "Choose AI personality" },
  { id: "ready", title: "You're all set!" },
];

const emotionalGoals = [
  { id: "reduce-anxiety", label: "Reduce anxiety", icon: Shield },
  { id: "better-sleep", label: "Better sleep", icon: Moon },
  { id: "emotional-awareness", label: "Emotional awareness", icon: Heart },
  { id: "stress-management", label: "Stress management", icon: Zap },
  { id: "daily-calm", label: "Daily calm", icon: Sun },
  { id: "self-compassion", label: "Self-compassion", icon: Sparkles },
];

const wellnessGoals = [
  { id: "exercise", label: "Regular exercise", emoji: "🏃" },
  { id: "meditation", label: "Daily meditation", emoji: "🧘" },
  { id: "hydration", label: "Stay hydrated", emoji: "💧" },
  { id: "nutrition", label: "Better nutrition", emoji: "🥗" },
  { id: "journaling", label: "Daily journaling", emoji: "📝" },
  { id: "sleep-routine", label: "Sleep routine", emoji: "😴" },
];

const personalities = [
  { id: "gentle", name: "Gentle Guide", description: "Warm, nurturing, and patient", emoji: "🌸" },
  { id: "motivator", name: "Calm Motivator", description: "Encouraging with gentle pushes", emoji: "🌟" },
  { id: "analytical", name: "Mindful Analyst", description: "Thoughtful and insight-driven", emoji: "🔮" },
  { id: "playful", name: "Playful Friend", description: "Light-hearted and uplifting", emoji: "🦋" },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedEmotional, setSelectedEmotional] = useState<string[]>([]);
  const [selectedWellness, setSelectedWellness] = useState<string[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const { setUserName, setOnboardingComplete } = useAppStore();
  const router = useRouter();

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };
  const finish = () => {
    setUserName(name);
    setOnboardingComplete(true);
    router.push("/dashboard");
  };

  const toggleEmotional = (id: string) => {
    setSelectedEmotional((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleWellness = (id: string) => {
    setSelectedWellness((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl" />

      <div className="w-full max-w-lg relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === step ? "w-8 bg-accent" : i < step ? "w-4 bg-accent/40" : "w-4 bg-surface-tertiary"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {step === 0 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Welcome to Sereni</h1>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  Your personal AI wellness companion. Let&apos;s set things up so I can support you best.
                </p>
                <Button onClick={next} size="lg" className="w-full max-w-xs mx-auto">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">What should I call you?</h2>
                <p className="text-text-secondary mb-8">This helps me personalize our conversations.</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="text-center text-lg h-14 max-w-xs mx-auto mb-6"
                  autoFocus
                />
                <Button onClick={next} size="lg" disabled={!name.trim()} className="w-full max-w-xs mx-auto">
                  Continue <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">What are your emotional goals?</h2>
                <p className="text-text-secondary mb-8">Select all that resonate with you.</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {emotionalGoals.map((goal) => (
                    <GlassCard
                      key={goal.id}
                      onClick={() => toggleEmotional(goal.id)}
                      className={cn(
                        "p-4 cursor-pointer transition-all hover:-translate-y-0.5",
                        selectedEmotional.includes(goal.id)
                          ? "border-accent/40 bg-accent/10"
                          : "hover:border-white/10"
                      )}
                    >
                      <goal.icon className={cn("w-5 h-5 mb-2 mx-auto", selectedEmotional.includes(goal.id) ? "text-accent" : "text-text-muted")} />
                      <p className="text-sm font-medium">{goal.label}</p>
                    </GlassCard>
                  ))}
                </div>
                <Button onClick={next} size="lg" className="w-full max-w-xs mx-auto">
                  Continue <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Wellness goals</h2>
                <p className="text-text-secondary mb-8">What habits would you like to build?</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {wellnessGoals.map((goal) => (
                    <GlassCard
                      key={goal.id}
                      onClick={() => toggleWellness(goal.id)}
                      className={cn(
                        "p-4 cursor-pointer transition-all hover:-translate-y-0.5",
                        selectedWellness.includes(goal.id)
                          ? "border-accent/40 bg-accent/10"
                          : "hover:border-white/10"
                      )}
                    >
                      <span className="text-2xl mb-2 block">{goal.emoji}</span>
                      <p className="text-sm font-medium">{goal.label}</p>
                    </GlassCard>
                  ))}
                </div>
                <Button onClick={next} size="lg" className="w-full max-w-xs mx-auto">
                  Continue <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Choose AI personality</h2>
                <p className="text-text-secondary mb-8">How would you like Sereni to communicate?</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {personalities.map((p) => (
                    <GlassCard
                      key={p.id}
                      onClick={() => setSelectedPersonality(p.id)}
                      className={cn(
                        "p-5 cursor-pointer transition-all hover:-translate-y-0.5",
                        selectedPersonality === p.id
                          ? "border-accent-purple/40 bg-accent-purple/10"
                          : "hover:border-white/10"
                      )}
                    >
                      <span className="text-3xl mb-3 block">{p.emoji}</span>
                      <p className="text-sm font-semibold mb-1">{p.name}</p>
                      <p className="text-xs text-text-muted">{p.description}</p>
                    </GlassCard>
                  ))}
                </div>
                <Button onClick={next} size="lg" className="w-full max-w-xs mx-auto">
                  Continue <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {step === 5 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-success to-accent-cyan flex items-center justify-center mx-auto mb-8">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">You&apos;re all set, {name}!</h2>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  Sereni is ready to support your wellness journey. Let&apos;s start with your first conversation.
                </p>
                <Button onClick={finish} size="lg" className="w-full max-w-xs mx-auto">
                  Start My Journey <Sparkles className="w-5 h-5" />
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && step < steps.length - 1 && (
          <button
            onClick={prev}
            className="flex items-center gap-1 text-sm text-text-muted hover:text-text-secondary mx-auto mt-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>
    </div>
  );
}
