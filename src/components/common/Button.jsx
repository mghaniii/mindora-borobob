import React from 'react'

/**
 * Komponen Tombol Reusable Mindora
 * Mengacu pada desain Button kumpulan.svg & rencana.md
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  withArrow = false,
  glow = false,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  // 1. Gaya Varian Warna & Efek Cahaya (Glow)
  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] ' +
      (glow
        ? 'shadow-[0px_0px_12px_0px_rgba(108,92,231,0.75)]'
        : 'hover:shadow-[0px_0px_12px_0px_rgba(108,92,231,0.75)]'),

    secondary:
      'bg-secondary text-white hover:brightness-105 active:scale-[0.98] ' +
      (glow
        ? 'shadow-[0px_0px_12px_0px_rgba(255,169,77,0.75)]'
        : 'hover:shadow-[0px_0px_12px_0px_rgba(255,169,77,0.75)]'),

    'outline-primary':
      'bg-white border-2 border-primary text-primary hover:bg-primary/5 active:scale-[0.98] ' +
      (glow
        ? 'shadow-[0px_0px_12px_0px_rgba(108,92,231,0.75)]'
        : 'hover:shadow-[0px_0px_12px_0px_rgba(108,92,231,0.75)]'),

    'outline-secondary':
      'bg-white border-2 border-secondary text-secondary hover:bg-secondary/5 active:scale-[0.98] ' +
      (glow
        ? 'shadow-[0px_0px_12px_0px_rgba(255,169,77,0.75)]'
        : 'hover:shadow-[0px_0px_12px_0px_rgba(255,169,77,0.75)]'),

    white:
      'bg-white text-primary hover:bg-slate-50 active:scale-[0.98] ' +
      (glow
        ? 'shadow-[0px_0px_12px_0px_rgba(108,92,231,0.75)]'
        : 'hover:shadow-[0px_0px_12px_0px_rgba(108,92,231,0.75)]'),

    ghost:
      'bg-transparent text-gray-700 hover:bg-slate-100 hover:text-primary active:scale-[0.98]',
  }

  // 2. Gaya Ukuran Padding & Font (Default: Horizontal 24px, Vertikal 12px)
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-semibold gap-1.5',
    md: 'px-6 py-3 text-sm font-semibold gap-2 leading-5', // Horizontal 24px (px-6), Vertikal 12px (py-3)
    lg: 'px-8 py-3.5 text-base font-bold gap-2.5',
    icon: 'p-2.5 aspect-square justify-center',
  }

  // 3. Gaya Bentuk Kelengkungan Sudut (Corner Radius = 32px)
  const shapeStyles = {
    pill: 'rounded-[32px]',   // Corner radius = 32px (Standar desain kumpulan)
    rounded: 'rounded-xl',    // Kotak melengkung (Sangat cocok untuk Form Login/Register)
    circle: 'rounded-full',   // Bulat penuh (Khusus tombol icon)
  }

  const baseStyles =
    'inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'

  const currentVariant = variantStyles[variant] || variantStyles.primary
  const currentSize = sizeStyles[size] || sizeStyles.md
  const currentShape = shapeStyles[shape] || shapeStyles.pill
  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${currentVariant} ${currentSize} ${currentShape} ${widthStyle} ${className}`}
      {...props}
    >
      {/* Animasi Spinner Loading */}
      {isLoading && (
        <svg
          className="w-4 h-4 animate-spin text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}

      {/* Ikon Sebelah Kiri */}
      {!isLoading && iconLeft && <span className="shrink-0">{iconLeft}</span>}

      {/* Teks Tombol */}
      <span>{children}</span>

      {/* Ikon Sebelah Kanan (Bisa kustom atau panah bawaan sesuai desain) */}
      {!isLoading && iconRight && <span className="shrink-0">{iconRight}</span>}

      {!isLoading && withArrow && !iconRight && (
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      )}
    </button>
  )
}

export default Button
