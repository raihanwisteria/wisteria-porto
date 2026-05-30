import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-sans text-xs transition-all duration-200 cursor-default select-none",
  {
    variants: {
      variant: {
        default:
          "border border-border-mid bg-transparent text-text-muted hover:border-accent hover:text-accent hover:bg-accent-light     ",
        filled:
          "bg-accent-light text-accent border border-transparent ",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px]",
        md: "px-3.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export function Badge({ className, variant, size, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
