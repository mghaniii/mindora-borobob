export function TextField({ id, label, error, rightSlot, className = '', ...inputProps }) {
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm leading-5 font-semibold text-(color:--color-shadow)"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-2xl border-[0.5px] bg-white px-4 text-sm text-(color:--color-shadow) transition-colors outline-none placeholder:text-[#95999A] focus:ring-4 ${
            rightSlot ? 'pr-12' : ''
          } ${
            error
              ? 'border-[#BA1A1A] focus:ring-[#BA1A1A]/20'
              : 'border-[#95999A] focus:border-primary focus:ring-primary/20'
          }`}
          {...inputProps}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {rightSlot}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-[#BA1A1A]">
          {error}
        </p>
      )}
    </div>
  )
}    