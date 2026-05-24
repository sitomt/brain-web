// Hairline SVG arrow icons used in CTAs and links. Replace Unicode arrows
// (→ ↓ ↗) for crispness and consistency across browsers/fonts.

export function ArrowRight({ size = 14, strokeWidth = 1.5, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 7h9" />
      <path d="M8 3.5 11.5 7 8 10.5" />
    </svg>
  )
}

export function ArrowDown({ size = 14, strokeWidth = 1.5, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 2.5v9" />
      <path d="M3.5 8 7 11.5 10.5 8" />
    </svg>
  )
}

export function ArrowUpRight({ size = 14, strokeWidth = 1.5, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 10 10 4" />
      <path d="M5 4h5v5" />
    </svg>
  )
}

export function ArrowLeft({ size = 14, strokeWidth = 1.5, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M11.5 7h-9" />
      <path d="M6 3.5 2.5 7 6 10.5" />
    </svg>
  )
}
