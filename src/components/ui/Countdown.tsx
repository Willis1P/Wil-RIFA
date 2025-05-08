import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ targetDate, className = '' }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      <div className="countdown-item">
        <div className="text-2xl font-bold">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs font-medium uppercase">Dias</div>
      </div>
      <div className="countdown-item">
        <div className="text-2xl font-bold">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs font-medium uppercase">Horas</div>
      </div>
      <div className="countdown-item">
        <div className="text-2xl font-bold">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs font-medium uppercase">Min</div>
      </div>
      <div className="countdown-item">
        <div className="text-2xl font-bold">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs font-medium uppercase">Seg</div>
      </div>
    </div>
  );
};

export default Countdown;