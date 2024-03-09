import clsx from "clsx"
import { MdClose } from "react-icons/md"

export default function Input({
  value, onChange, placeholder, className, type = 'text'
}: {
  value: string, onChange: (val: string) => void,
  placeholder: string, className?: string, type?: string
}) {
  return (
    <div className={clsx("grid grid-cols-[1fr_auto] bg-darky", className)}>
      <input className="w-full px-2 py-1" placeholder={placeholder} type={type}
        value={value} onChange={e => onChange(e.currentTarget.value)}/>
      <button className="cursor-pointer h-full px-2" onClick={() => onChange('')}>
        <MdClose color="red" size={20} />
      </button>
    </div>
  )
}