import { useState, useEffect, useRef } from "react";
import { Flame } from "lucide-react";

const MILESTONES = [
  { days: 7, label: "1 Week!" },
  { days: 30, label: "1 Month!" },
  { days: 60, label: "2 Months!" },
  { days: 90, label: "3 Months!" },
  { days: 180, label: "6 Months!" },
  { days: 365, label: "1 Year!" },
  { days: 730, label: "2 Years!" },
  { days: 1095, label: "3 Years!" },
];

export default function StreakTracker({ currentStreak, todayComplete }) {
  const [popup, setPopup] = useState(null);
  const prevStreakRef = useRef(currentStreak);

  useEffect(() => {
    if (currentStreak > prevStreakRef.current) {
      const hit = MILESTONES.find((m) => m.days === currentStreak);
      if (hit) {
        setPopup(hit.label);
        const t = setTimeout(() => setPopup(null), 3000);
        return () => clearTimeout(t);
      }
    }
    prevStreakRef.current = currentStreak;
  }, [currentStreak]);

  const flameScale = Math.min(1 + currentStreak * 0.04, 1.5);
  const glowIntensity = Math.min(currentStreak * 2, 20);

  return (
    <>
      <div className={`streak-box ${currentStreak > 0 ? "active" : ""}`}>
        <Flame
          className="streak-box-icon"
          size={22}
          style={{
            transform: `scale(${flameScale})`,
            filter: currentStreak > 0
              ? `drop-shadow(0 0 ${glowIntensity}px rgba(255,120,0,0.7))`
              : "none",
          }}
        />
        <span className="streak-box-count">{currentStreak}</span>
      </div>

      {popup && (
        <div className="streak-milestone-toast">
          <Flame size={20} className="streak-toast-icon" />
          <span>{popup}</span>
        </div>
      )}
    </>
  );
}
