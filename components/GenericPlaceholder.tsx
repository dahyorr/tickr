
interface Props {
  text?: string
}

const GenericPlaceholder = ({ text }: Props) => {
  return (
    <div className="flex-col flex items-center justify-center h-full w-full">
      <div className="flex gap-2 items-center">
        <p className="text-lg">{text || "No items Available"}</p>
      </div>
    </div>
  )
}
export default GenericPlaceholder