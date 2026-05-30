import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-warm-light/60 transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("px-5 pt-5 pb-2", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("px-5 pb-5", className)} {...props} />
  );
}
