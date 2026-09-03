type IconProps = {
  className?: string;
};

function CaretRightIcon({ className }: IconProps) {
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
      <polyline points="96 48 176 128 96 208" />
    </svg>
  );
}

export default CaretRightIcon;
