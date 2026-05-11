"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface MoodEntry {
  date: string;
  mood: number;
}

export function MoodChart({ data }: { data: MoodEntry[] }) {
  const chartData = data.map((d) => ({
    day: new Date(d.date).toLocaleDateString("en", { weekday: "short" }),
    mood: d.mood,
  }));

  return (
    <div className="h-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" hide />
          <YAxis domain={[0, 10]} hide />
          <Tooltip
            contentStyle={{
              background: "#172033",
              border: "1px solid #1E293B",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#F1F5F9",
            }}
          />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#60A5FA"
            strokeWidth={2}
            fill="url(#moodGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
