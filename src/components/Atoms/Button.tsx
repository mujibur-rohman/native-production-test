import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("group flex items-center overflow-hidden rounded-lg border-[1px] px-4 py-2 font-medium transition-all hover:scale-105 active:scale-95", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      error: "bg-error text-error-foreground",
      warning: "bg-warning text-warning-foreground",
      outlined: "bg-background text-foreground",
    },
    size: {
      default: "h-8 text-sm px-4 py-2",
      sm: "h-6 text-xs rounded-md px-3",
      lg: "h-10 rounded-md px-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: string | React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
      <div className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</div>
    </button>
  );
});

Button.displayName = "Button";

export default Button;
