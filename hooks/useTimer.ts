"use client"
import { TimeBreakdown, TimeCue } from "@/typings";
import { useEffect, useState } from "react";

export const useTimer = (cue?: TimeCue) => {
  const [timeLeft, setTimeLeft] = useState(cue?.duration || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBreakdown: TimeBreakdown = {
    days: Math.floor(timeLeft / 86400000),
    hours: Math.floor((timeLeft % 86400000) / 3600000),
    minutes: Math.floor((timeLeft % 3600000) / 60000),
    seconds: Math.floor((timeLeft % 60000) / 1000),
    milliseconds: timeLeft
  }

  console.log(timeLeft, timeBreakdown)

  return { timeLeft, timeBreakdown };
}