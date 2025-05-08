import { Car } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = 'h-8 w-auto' }: LogoProps) => {
  return (
    <div className={`${className}`}>
      <Car size={32} strokeWidth={2} className="inline-block" />
    </div>
  );
};

export default Logo;