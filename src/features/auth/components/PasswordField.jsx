import { useState } from 'react'
import { TextField } from './TextField'
import { EyeIcon, EyeOffIcon } from './icons'

export function PasswordField(props) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Sembunyikan password' : 'Tampilkan password'}
          aria-pressed={visible}
          className="cursor-pointer rounded text-(color:--color-shadow) focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          {visible ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      }
    />
  )
}