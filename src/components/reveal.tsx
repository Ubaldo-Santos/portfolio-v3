import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, revealEase, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Animate on mount (page enter) instead of on scroll into view. */
  onMount?: boolean;
} & HTMLMotionProps<"div">;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  onMount = false,
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} {...(rest as object)}>
        {children}
      </div>
    );
  }

  if (onMount) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...revealEase, delay }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...revealEase, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /** HTML tag to render as motion element (so stagger reaches direct children). */
  as?: "div" | "ol" | "ul" | "section";
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-72px" }}
      variants={{
        hidden: staggerContainer.hidden,
        show: {
          ...staggerContainer.show,
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}


export function RevealItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { ...fadeUp.hidden, y },
        show: fadeUp.show,
      }}
    >
      {children}
    </motion.div>
  );
}
