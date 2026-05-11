"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageCircle,
  LayoutDashboard,
  SmilePlus,
  BookOpen,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/mood", icon: SmilePlus, label: "Mood" },
  { href: "/journal", icon: BookOpen, label: "Journal" },
  { href: "/habits", icon: Target, label: "Habits" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background-secondary/80 backdrop-blur-2xl">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative",
                isActive ? "text-accent" : "text-text-muted"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active"
                  className="absolute -top-2 w-8 h-1 rounded-full bg-accent"
                  transition={{ duration: 0.3 }}
                />
              )}
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
