interface Props {}

// const defaultFontSize = "20rem"

const TimerPreview = (props: Props) => {
  return (
    <div className="flex justify-center items-center space-x-2 text-6xl">
      <span>00</span>
      <span>:</span>
      <span>00</span>
      <span>:</span>
      <span>00</span>
      <span>:</span>
      <span>00</span>
      <span>:</span>
      <span>00</span>
    </div>
  )
}
export default TimerPreview