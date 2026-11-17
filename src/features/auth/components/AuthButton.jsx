const variants = {
  primary:
    'border border-transparent bg-primary text-white hover:bg-primary-dark',
  outline:
    'border-[0.5px] border-[#95999A] bg-white text-(color:--color-shadow) hover:bg-surface-bg',
}

export function AuthButton({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-4 text-base font-semibold transition-colors focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}