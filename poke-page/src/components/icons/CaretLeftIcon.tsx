type IconProps = {
  className?: string;
};

function CaretLeftIcon({ className }: IconProps) {
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
      <polyline points="160 208 80 128 160 48" />
    </svg>
  );
}

export default CaretLeftIcon;
