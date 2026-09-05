export function Brand({ className = '' }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`wordmark ${className}`}
      aria-label="ARMORA — Home"
    >
      ARMORA<span aria-hidden="true">™</span>
    </a>
  );
}
