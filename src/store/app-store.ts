"use client";

import { create } from "zustand";

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  emoji: string;
  note: string;
  stress: number;
  sleep: number;
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  emotionalSummary: string;
  mood: string;
}

interface HabitEntry {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  category: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  type?: "text" | "breathing" | "reflection";
}

interface AppState {
  currentMood: number;
  moodHistory: MoodEntry[];
  journalEntries: JournalEntry[];
  habits: HabitEntry[];
  chatMessages: ChatMessage[];
  onboardingComplete: boolean;
  userName: string;
  sidebarOpen: boolean;

  setCurrentMood: (mood: number) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  toggleHabit: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setUserName: (name: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentMood: 7,
  moodHistory: [
    { id: "1", date: "2026-05-05", mood: 6, emoji: "😌", note: "Felt calm today", stress: 3, sleep: 7 },
    { id: "2", date: "2026-05-06", mood: 8, emoji: "😊", note: "Great meditation session", stress: 2, sleep: 8 },
    { id: "3", date: "2026-05-07", mood: 5, emoji: "😐", note: "A bit tired", stress: 5, sleep: 5 },
    { id: "4", date: "2026-05-08", mood: 7, emoji: "🙂", note: "Productive day", stress: 4, sleep: 7 },
    { id: "5", date: "2026-05-09", mood: 9, emoji: "😄", note: "Wonderful day with friends", stress: 1, sleep: 8 },
    { id: "6", date: "2026-05-10", mood: 6, emoji: "😌", note: "Quiet evening", stress: 3, sleep: 6 },
    { id: "7", date: "2026-05-11", mood: 7, emoji: "🙂", note: "Feeling balanced", stress: 3, sleep: 7 },
  ],
  journalEntries: [
    {
      id: "1",
      date: "2026-05-11",
      title: "Morning Reflections",
      content: "Today I woke up feeling grateful for the small things...",
      emotionalSummary: "Calm and centered",
      mood: "peaceful",
    },
    {
      id: "2",
      date: "2026-05-10",
      title: "Evening Thoughts",
      content: "Had a productive day at work. Managed to stay focused...",
      emotionalSummary: "Accomplished and tired",
      mood: "satisfied",
    },
  ],
  habits: [
    { id: "1", name: "Meditation", icon: "🧘", streak: 12, completedToday: true, category: "mindfulness" },
    { id: "2", name: "Exercise", icon: "🏃", streak: 5, completedToday: false, category: "physical" },
    { id: "3", name: "Journaling", icon: "📝", streak: 8, completedToday: true, category: "reflection" },
    { id: "4", name: "Sleep 8hrs", icon: "😴", streak: 3, completedToday: false, category: "rest" },
    { id: "5", name: "Hydration", icon: "💧", streak: 15, completedToday: true, category: "physical" },
    { id: "6", name: "Gratitude", icon: "🙏", streak: 20, completedToday: false, category: "mindfulness" },
  ],
  chatMessages: [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Sereni, your wellness companion. How are you feeling today? I'm here to listen and support you on your journey to better mental and physical well-being.",
      timestamp: "2026-05-11T07:00:00Z",
      type: "text",
    },
  ],
  onboardingComplete: false,
  userName: "",
  sidebarOpen: true,

  setCurrentMood: (mood) => set({ currentMood: mood }),
  addMoodEntry: (entry) => set((state) => ({ moodHistory: [...state.moodHistory, entry] })),
  addJournalEntry: (entry) => set((state) => ({ journalEntries: [entry, ...state.journalEntries] })),
  toggleHabit: (id) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id ? { ...h, completedToday: !h.completedToday, streak: !h.completedToday ? h.streak + 1 : h.streak - 1 } : h
      ),
    })),
  addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  setUserName: (name) => set({ userName: name }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
