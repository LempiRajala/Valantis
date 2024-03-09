import clsx from "clsx"
import { MdArrowLeft, MdArrowRight } from "react-icons/md"

export default function Pagination({
  selected, onChange, className, canLeft, canRight
}: {
  selected: number, onChange: (delta: number) => void,
  className?: string, canLeft: boolean, canRight: boolean
}) {
  return (
    <div className={clsx("flex gap-3 items-center justify-center", className)}>
      <button className={clsx("transition-colors", canLeft ? "hover:text-blue-600 cursor-pointer" : "opacity-50 cursor-not-allowed")}
        onClick={() => onChange(selected - 1)} disabled={!canLeft}>
        <MdArrowLeft size={22}/>
      </button>
      <div className="font-bold px-1">{selected}</div>
      <button className={clsx("transition-colors", canRight ? "hover:text-blue-600 cursor-pointer" : "opacity-50 cursor-not-allowed")}
        onClick={() => onChange(selected + 1)} disabled={!canRight}>
        <MdArrowRight size={22}/>
      </button>
    </div>
  )
}