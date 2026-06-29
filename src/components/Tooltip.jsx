import { useState } from 'react'

export default function Tooltip({ text, children, className = 'inline-block', position = 'top' }) {
  const [show, setShow] = useState(false)

  const boxPosition = position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
  const arrowPosition = position === 'bottom'
    ? 'bottom-full border-b-slate-800'
    : 'top-full border-t-slate-800'

  return (
    <span
      className={`relative ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 ${boxPosition} whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-white shadow-lg`}
        >
          {text}
          <span className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${arrowPosition}`} />
        </span>
      )}
    </span>
  )
}
