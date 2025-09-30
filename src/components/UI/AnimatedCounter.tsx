import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter = ({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { 
    stiffness: 100, 
    damping: 30,
    duration: duration * 1000
  });
  
  const display = useTransform(spring, (current) => {
    return (Math.floor(current * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.onChange((latest) => {
      setDisplayValue(parseFloat(latest));
    });
    return unsubscribe;
  }, [display]);

  return (
    <motion.span
      className={`kpi-counter ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {prefix}
      <motion.span>{displayValue.toLocaleString()}</motion.span>
      {suffix}
    </motion.span>
  );
};