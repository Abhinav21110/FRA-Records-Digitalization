import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
}

export const ScrollAnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  threshold = 0.2
}: ScrollAnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    margin: "0px"
  });
  const controls = useAnimation();

  const getAnimationVariants = () => {
    const distance = 60;
    
    switch (direction) {
      case "up":
        return {
          hidden: { y: distance, opacity: 0, scale: 0.95 },
          visible: { y: 0, opacity: 1, scale: 1 },
          exit: { y: -distance/2, opacity: 0, scale: 0.98 }
        };
      case "down":
        return {
          hidden: { y: -distance, opacity: 0, scale: 0.95 },
          visible: { y: 0, opacity: 1, scale: 1 },
          exit: { y: distance/2, opacity: 0, scale: 0.98 }
        };
      case "left":
        return {
          hidden: { x: distance, opacity: 0, scale: 0.95 },
          visible: { x: 0, opacity: 1, scale: 1 },
          exit: { x: -distance/2, opacity: 0, scale: 0.98 }
        };
      case "right":
        return {
          hidden: { x: -distance, opacity: 0, scale: 0.95 },
          visible: { x: 0, opacity: 1, scale: 1 },
          exit: { x: distance/2, opacity: 0, scale: 0.98 }
        };
      default:
        return {
          hidden: { y: distance, opacity: 0, scale: 0.95 },
          visible: { y: 0, opacity: 1, scale: 1 },
          exit: { y: -distance/2, opacity: 0, scale: 0.98 }
        };
    }
  };

  const variants = getAnimationVariants();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      // Only animate out if we've moved significantly out of view
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 200,
        damping: 25
      }}
    >
      {children}
    </motion.div>
  );
};