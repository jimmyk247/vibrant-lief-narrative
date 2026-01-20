import { useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface UseCounterAnimationProps {
  target: number;
  duration?: number;
  ref: React.RefObject<HTMLElement>;
}

export const useCounterAnimation = ({
  target,
  duration = 2000,
  ref,
}: UseCounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target, duration]);

  return count;
};
