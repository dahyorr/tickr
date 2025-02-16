"use client"
import { useTimer } from "@/hooks/useTimer"
import { padWithZero } from "@/lib/utils"
import { TimeCue } from "@/typings"
import clsx from "clsx"

interface Props {
  timerCue?: TimeCue
  largePreview?: boolean
  showDays?: boolean
  showHours?: boolean
  bold?: boolean
}

// const defaultFontSize = "20rem"
const TimerPreview = ({
  timerCue,
  largePreview,
  showDays,
  showHours,
  bold
}: Props) => {

  const {
    timeBreakdown
  } = useTimer(timerCue)


  return (
    <div className={clsx({ "text-9xl": largePreview, [`text-4xl`]: !largePreview, "font-bold": bold })}>
      {(showDays || timeBreakdown.days > 0) && (<>
        <span id="days">{padWithZero(timeBreakdown.days)}</span>
        <span id="spacer">:</span>
      </>)}
      {(showHours || timeBreakdown.hours > 0) && (<>
        <span id="hours">{padWithZero(timeBreakdown.hours)}</span>
        <span id="spacer">:</span>
      </>)}
      <span id="minutes">{padWithZero(timeBreakdown.minutes)}</span>
      <span id="spacer">:</span>
      <span id="seconds">{padWithZero(timeBreakdown.seconds)}</span>
    </div>
  )
}
export default TimerPreview