
function Svg({ size = 20, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
)

export const PencilIcon = (p) => (
  <Svg {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
  </Svg>
)

export const ShareIcon = (p) => (
  <Svg {...p}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.7 10.7 6.6-4.4" />
    <path d="m8.7 13.3 6.6 4.4" />
  </Svg>
)

export const BoltIcon = (p) => (
  <Svg {...p}>
    <path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z" />
  </Svg>
)

export const FlameIcon = (p) => (
  <Svg {...p}>
    <path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-2-1-3-3-3-5-3 3-4 6-4 9a7 7 0 0 0 7 7Z" />
  </Svg>
)

export const TargetIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </Svg>
)

export const TrophyIcon = (p) => (
  <Svg {...p}>
    <path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0Z" />
    <path d="M7 6H4v3a4 4 0 0 0 4 4M17 6h3v3a4 4 0 0 1-4 4" />
  </Svg>
)

export const SlidersIcon = (p) => (
  <Svg {...p}>
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
    <path d="M2 14h4M10 8h4M18 16h4" />
  </Svg>
)

export const TimerIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l3 2M9 2h6" />
  </Svg>
)

export const BellIcon = (p) => (
  <Svg {...p}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
  </Svg>
)

export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
  </Svg>
)

export const LogoutIcon = (p) => (
  <Svg {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </Svg>
)

export const ChartIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 17v-5M12 17V7M16 17v-3" />
  </Svg>
)

export const BadgeCheckIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const RefreshIcon = (p) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </Svg>
)

export const ArrowRightIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Svg>
)

export const GraduationIcon = (p) => (
  <Svg {...p}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
  </Svg>
)

export const HomeIcon = (p) => (
  <Svg {...p}>
    <path d="m3 11 9-8 9 8M5 10v10h14V10" />
  </Svg>
)
