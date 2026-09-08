import logo from '../assets/products/logo.png';

export function Brand({ className = '' }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`wordmark ${className}`}
      aria-label="ARMORA — Home"
    >
      <img src={logo} alt="ARMORA" className="logo" />
    </a>
  );
}
