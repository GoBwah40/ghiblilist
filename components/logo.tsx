/** Logo vectoriel : ses couleurs suivent le thème via les variables --logo-*. */
const Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="logo-tile">
        <rect width="64" height="64" rx="14" />
      </clipPath>
    </defs>
    <g clipPath="url(#logo-tile)">
      <rect width="64" height="64" fill="var(--logo-tile)" />
      <circle cx="47" cy="20" r="7.5" fill="var(--logo-sun)" />
      <path d="M-2 47 C12 37 24 37 36 44 C46 50 56 44 66 37 V66 H-2Z" fill="var(--logo-h1)" />
      <path d="M-2 55 C10 48 22 49 32 53 C44 58 54 54 66 49 V66 H-2Z" fill="var(--logo-h2)" />
    </g>
    <g
      stroke="var(--logo-ink)"
      strokeWidth="4.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M11 17.5 l3.5 3.5 L21.5 14" />
      <path d="M27 18 H33.5" />
      <path d="M11 30.5 l3.5 3.5 L21.5 27" />
      <path d="M27 31 H52" />
    </g>
  </svg>
);

export default Logo;
