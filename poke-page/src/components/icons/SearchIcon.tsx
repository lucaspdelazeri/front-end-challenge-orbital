type IconProps = {
  className?: string;
};

function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="116" cy="116" r="84" />
      <line x1="175.4" y1="175.4" x2="224" y2="224" />
    </svg>
  );
}

export default SearchIcon;
