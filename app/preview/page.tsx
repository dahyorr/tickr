import TimerPreview from "@/components/TimerPreview"

interface Props { }
const TimerPreviewPage = (props: Props) => {
  return (
    <div>
      <div className="flex justify-center items-center space-x-2 text-6xl">
        <TimerPreview />
      </div>
    </div>
  )
}
export default TimerPreviewPage