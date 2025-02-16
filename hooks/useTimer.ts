"use client"
import { TimeBreakdown } from "@/typings";
import { useEffect, useState } from "react";

export const useTimer = (duration: number, options?: { countNegetive?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (duration <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0 && prev < 1000) {
          return 0;
        }
        if (prev > 0 || options?.countNegetive) {
          return prev - 1000;
        }
        clearInterval(interval);
        return 0
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const timeBreakdown: TimeBreakdown = {
    days: Math.floor(timeLeft / 86400000),
    hours: Math.floor((timeLeft % 86400000) / 3600000),
    minutes: Math.floor((timeLeft % 3600000) / 60000),
    seconds: Math.floor((timeLeft % 60000) / 1000),
    milliseconds: timeLeft
  }

  return { timeLeft, timeBreakdown };
}