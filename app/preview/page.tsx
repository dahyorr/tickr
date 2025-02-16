import TimerPreview from "@/components/TimerPreview"
import { TimeCue } from "@/typings"
import clsx from "clsx"
import { Orbitron } from 'next/font/google'

// interface Props { }

const orbitron = Orbitron({
  subsets: ['latin'],
})

const initialQueue: TimeCue[] = [
  {
    id: 1,
    duration: 3600000,
    name: "Test Timer",
    active: true,
  },
]

// const TimerPreviewPage = (props: Props) => {
const TimerPreviewPage = () => {
  const timerQueue = initialQueue
  const activeCue = timerQueue.find((cue) => cue.active)


  return (
    <div className={clsx(orbitron.className, "h-screen flex justify-center items-center")}>
      <div className="flex justify-center items-center h-full">
        <TimerPreview timerCue={activeCue} showHours largePreview />
      </div>
    </div>
  )
}
export default TimerPreviewPage