export default function Spinner({ fullPage = false, size = 'md' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }

  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-2 border-slate-200 border-t-primary-700`}
    />
  )

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-primary-700" />
      </div>
    )
  }

  return spinner
}
