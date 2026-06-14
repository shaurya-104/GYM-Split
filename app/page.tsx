"use client";

import { useState, useEffect } from "react";

const programData = [
  {
    label: "Day 1",
    title: "Chest & Back",
    subtitle: "Thickness & Power",
    exercises: [
      { name: "Incline Dumbbell Press",        sets: "2 × failure", muscle: "Upper Chest" },
      { name: "Incline Chest-Supported T-Bar Row", sets: "2 × failure", muscle: "Mid Back / Lats" },
      { name: "Flat Machine Chest Press",       sets: "1–2 × failure", muscle: "Chest" },
      { name: "Neutral-Grip Lat Pulldowns",     sets: "2 × failure", muscle: "Lats" },
    ]
  },
  {
    label: "Day 2",
    title: "Shoulders & Triceps",
    subtitle: "Heavy Pressing",
    exercises: [
      { name: "Seated Dumbbell Overhead Press", sets: "2 × failure", muscle: "Front / Side Delts" },
      { name: "Overhead Cable Tricep Extension",sets: "2 × failure", muscle: "Triceps (Long Head)" },
      { name: "Cross-Body Cable Tricep Extensions", sets: "2 × failure", muscle: "Triceps" },
      { name: "Cable Upright Rows",             sets: "2 × failure", muscle: "Side Delts" },
    ]
  },
  {
    label: "Day 3",
    title: "Legs",
    subtitle: "Absolute Annihilation",
    exercises: [
      { name: "Bulgarian Split Squats",         sets: "2 × failure / leg", muscle: "Quads / Glutes" },
      { name: "Romanian Deadlift",              sets: "2 × failure", muscle: "Hamstrings / Glutes" },
      { name: "Hack Squats or Pendulum Squats", sets: "2 × failure", muscle: "Quads" },
      { name: "Seated Leg Curls",               sets: "2 × failure", muscle: "Hamstrings" },
      { name: "Standing Calf Raises",           sets: "2 × failure", muscle: "Calves" },
    ]
  },
  {
    label: "Day 4",
    title: "Shoulders & Triceps",
    subtitle: "Isolation & Stretch",
    exercises: [
      { name: "Overhead Cable Tricep Extensions", sets: "2 × failure", muscle: "Triceps (Long Head)" },
      { name: "Tricep Rope Pushdowns",          sets: "2 × failure", muscle: "Triceps" },
      { name: "Dumbbell Lateral Raises",        sets: "2 × failure", muscle: "Side Delts" },
      { name: "Reverse Pec Deck Flyes",         sets: "2 × failure", muscle: "Rear Delts" },
    ]
  },
  {
    label: "Day 5",
    title: "Chest & Back",
    subtitle: "Width & Stretch",
    exercises: [
      { name: "Single-Arm Iliac Lat Pulldowns", sets: "2 × failure / arm", muscle: "Lower Lats" },
      { name: "High-to-Low Cable Crossovers",   sets: "2 × failure", muscle: "Lower Chest" },
      { name: "Chest-Supported Machine Rows",   sets: "2 × failure", muscle: "Upper Back / Rhomboids" },
      { name: "Pec Deck Flyes",                 sets: "2 × failure", muscle: "Chest (Stretch)" },
    ]
  },
  {
    label: "Day 6",
    title: "Biceps, Delts & Core",
    subtitle: "Peak Isolation",
    exercises: [
      { name: "Superman Curls (High Cable)",    sets: "2 × failure", muscle: "Biceps" },
      { name: "Incline Dumbbell Curls",         sets: "2 × failure", muscle: "Biceps (Long Head)" },
      { name: "Cable Hammer Curls",             sets: "2 × failure", muscle: "Brachialis" },
      { name: "Machine Lateral Raises",         sets: "2 × failure", muscle: "Side Delts" },
      { name: "Cable Crunches",                 sets: "2 × failure", muscle: "Abs / Core" },
    ]
  }
];

export default function GymSplit() {
  const [activeDay, setActiveDay] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  const day = programData[activeDay];
  const total = day.exercises.length;
  const done = completed.size;
  const pct = Math.round((done / total) * 100);

  // 1. Load saved session data on initial mount
  useEffect(() => {
    const savedDay = localStorage.getItem("astryx_activeDay");
    const savedCompleted = localStorage.getItem("astryx_completed");
    
    if (savedDay !== null) setActiveDay(parseInt(savedDay, 10));
    if (savedCompleted) setCompleted(new Set(JSON.parse(savedCompleted)));
    
    setIsLoaded(true);
  }, []);

  // 2. Save session data whenever it changes (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("astryx_activeDay", activeDay.toString());
      localStorage.setItem("astryx_completed", JSON.stringify(Array.from(completed)));
    }
  }, [activeDay, completed, isLoaded]);

  // 3. Handle Day Switching (only wipe completed sets if tapping a NEW day)
  const handleTabSwitch = (i: number) => {
    if (i !== activeDay) {
      setActiveDay(i);
      setCompleted(new Set()); 
    }
  };

  const toggle = (i: number) => {
    const next = new Set(completed);
    next.has(i) ? next.delete(i) : next.add(i);
    setCompleted(next);
  };

  // Prevent UI flash during SSR hydration on Vercel
  if (!isLoaded) return <div style={{ minHeight: "100vh", background: "#141414" }} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#141414",
      color: "#F2F2F2",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      display: "flex",
      justifyContent: "center",
      padding: "52px 22px 80px",
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* Day tabs */}
        <div style={{
          display: "flex",
          gap: "6px",
          marginBottom: "48px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}>
          {programData.map((d, i) => (
            <button
              key={i}
              onClick={() => handleTabSwitch(i)}
              style={{
                background: activeDay === i ? "#2C2C2C" : "none",
                border: "none",
                borderRadius: "20px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: activeDay === i ? 600 : 400,
                color: activeDay === i ? "#F2F2F2" : "#555",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div style={{ marginBottom: "36px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: "0 0 5px 0",
            lineHeight: 1.1,
            color: "#F2F2F2",
          }}>
            {day.title}
          </h1>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "15px", color: "#555", fontWeight: 400 }}>
              {day.subtitle}
            </span>
            <span style={{
              fontSize: "13px",
              fontWeight: 600,
              color: pct === 100 ? "#32D74B" : "#3A3A3A",
              transition: "color 0.25s",
              letterSpacing: "-0.01em",
            }}>
              {pct}%
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#242424", marginBottom: "8px" }} />

        {/* Exercise rows */}
        <div>
          {day.exercises.map((ex, i) => {
            const isDone = completed.has(i);
            return (
              <div key={i}>
                <div
                  onClick={() => toggle(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "17px 0",
                    cursor: "pointer",
                  }}
                >
                  {/* iPhone-style circle button */}
                  <div style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    position: "relative",
                    background: isDone
                      ? "linear-gradient(145deg, #32D74B, #28B840)"
                      : "transparent",
                    border: isDone ? "none" : "2px solid #363636",
                    boxShadow: isDone
                      ? "0 1px 4px rgba(50,215,75,0.35), inset 0 1px 1px rgba(255,255,255,0.15)"
                      : "inset 0 1px 2px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}>
                    {isDone && (
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                        <path
                          d="M1.5 5L5 8.5L11.5 1.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Text */}
                  <div style={{
                    flex: 1,
                    opacity: isDone ? 0.3 : 1,
                    transition: "opacity 0.2s",
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "10px",
                    }}>
                      <span style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "#F0F0F0",
                        textDecoration: isDone ? "line-through" : "none",
                        textDecorationColor: "#555",
                      }}>
                        {ex.name}
                      </span>
                      <span style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#444",
                        flexShrink: 0,
                        letterSpacing: "-0.01em",
                      }}>
                        {ex.sets}
                      </span>
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#3A3A3A",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      marginTop: "3px",
                    }}>
                      {ex.muscle}
                    </div>
                  </div>
                </div>

                {i < day.exercises.length - 1 && (
                  <div style={{
                    height: "1px",
                    background: "#1E1E1E",
                    marginLeft: "42px",
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Completion */}
        {pct === 110 && (
          <div style={{
            marginTop: "44px",
            padding: "16px 20px",
            borderRadius: "12px",
            background: "#1A2E1C",
            border: "1px solid #1F3B22",
            color: "#32D74B",
            fontSize: "14px",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}>
            Session complete. Rest and recover.
          </div>
        )}

      </div>
    </div>
  );
}