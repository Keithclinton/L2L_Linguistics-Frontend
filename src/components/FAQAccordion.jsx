import { useState } from 'react'

const FAQS = [
  {
    q: 'Are all courses paid?',
    a: 'No. Many beginner courses are completely free. You only pay for courses marked with a price — everything else you can access right after creating a free account.',
  },
  {
    q: 'How do I pay for a paid course?',
    a: 'Via M-Pesa. Once you enroll in a paid course, you will be prompted to enter your phone number and confirm the M-Pesa payment on your phone.',
  },
  {
    q: 'Do I need an account to browse courses?',
    a: 'No — you can browse and preview courses without an account. You only need to sign up when you want to enroll or start a lesson.',
  },
  {
    q: 'Can I access lessons on my phone?',
    a: 'Yes. The platform is fully responsive and works on any device with a browser, no app download required.',
  },
  {
    q: 'Is there a time limit to finish a course?',
    a: 'No. Once enrolled, you have full lifetime access and can learn at your own pace.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-4 gap-4"
      >
        <span className="font-medium text-slate-800">{q}</span>
        <svg
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="text-sm text-slate-500 pb-4 pr-8 leading-relaxed">{a}</p>}
    </div>
  )
}

export default function FAQAccordion() {
  return (
    <div>
      {FAQS.map((item) => <FAQItem key={item.q} {...item} />)}
    </div>
  )
}
