import { useRef } from "react";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const AnimatedCounter = ({ value, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Extract numeric value and prefix (like $ or +)
  const match = value.match(/^([+$]?)(\d+)$/);
  
  if (!match) {
    // If it's not a simple number, just display as-is
    return <span className={className}>{value}</span>;
  }
  
  const prefix = match[1];
  const numericValue = parseInt(match[2], 10);
  
  const animatedValue = useCounterAnimation({
    target: numericValue,
    duration: 2000,
    ref: ref as React.RefObject<HTMLElement>,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}{animatedValue}
    </span>
  );
};

export default AnimatedCounter;
