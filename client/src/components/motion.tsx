import { motion, type Transition } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Springs, in Apple's terms: damping ratio 1.0 (bounce 0) = critically damped, no overshoot.
 * `visualDuration` plays the role of Apple's "response". Springs start from the current
 * on-screen value, so every animation here can be interrupted and redirected mid-flight.
 */
export const spring = {
  /** Default for UI that appears or repositions. */
  ui: { type: "spring", bounce: 0, visualDuration: 0.4 },
  /** Small controls (segmented pill, menus): a touch quicker. */
  snappy: { type: "spring", bounce: 0, visualDuration: 0.3 },
} satisfies Record<string, Transition>;

/**
 * Fades content up as it enters the viewport, once. With reduced motion (MotionConfig
 * reducedMotion="user" in App) the transform is dropped and only the opacity cross-fade remains.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ ...spring.ui, visualDuration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export interface SegmentOption<T extends string> {
  value: T;
  label: React.ReactNode;
  title?: string;
}

/**
 * Segmented control: the selected pill slides between options on a spring. Switching quickly
 * retargets the pill from wherever it currently is, carrying its velocity (no snap, no jump).
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
  className,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const id = useId();
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("relative inline-flex items-center rounded-full bg-foreground/[0.06] p-0.5", className)}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            title={option.title}
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-full font-medium outline-none transition-colors duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "active:opacity-70 active:duration-0",
              size === "sm" ? "h-7 px-3 text-xs" : "h-9 px-4 text-sm",
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected && (
              <motion.span
                layoutId={`segment-${id}`}
                transition={spring.snappy}
                className="absolute inset-0 rounded-full bg-card shadow-[0_1px_2px_rgb(0_0_0/0.08),0_2px_8px_rgb(0_0_0/0.06)] dark:bg-[#3A3A3C]"
                aria-hidden
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
