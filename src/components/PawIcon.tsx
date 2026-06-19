interface PawIconProps {
  className?: string;
}

/**
 * The Dolphin paw-print signature icon, derived from the brand logo.
 * Used as section markers, list bullets, and decorative accents throughout the site.
 */
export default function PawIcon({ className = 'w-5 h-5' }: PawIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="62" rx="26" ry="22" />
      <ellipse cx="22" cy="38" rx="13" ry="15" />
      <ellipse cx="78" cy="38" rx="13" ry="15" />
      <ellipse cx="38" cy="20" rx="14" ry="17" />
      <ellipse cx="62" cy="20" rx="14" ry="17" />
    </svg>
  );
}
