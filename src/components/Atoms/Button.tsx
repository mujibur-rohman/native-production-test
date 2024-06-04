import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

// Defining button variants using cva
const buttonVariants = cva(
  // Base styles for button with variants
  "group flex items-center overflow-hidden rounded-lg border-[1px] px-4 py-2 font-medium transition-all disabled:opacity-65 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground", // Default variant styles
        error: "bg-error text-error-foreground", // Error variant styles
        warning: "bg-warning text-warning-foreground", // Warning variant styles
        outlined: "bg-background text-foreground", // Outlined variant styles
      },
      size: {
        default: "h-8 text-sm px-4 py-2", // Default size styles
        sm: "h-6 text-xs rounded-md px-3", // Small size styles
        lg: "h-10 rounded-md px-8", // Large size styles
      },
    },
    defaultVariants: {
      variant: "default", // Default variant
      size: "default", // Default size
    },
  }
);

// ButtonProps interface with variant props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: string | React.ReactNode; // Children of the button
}

// Button component definition using forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
      {/* Button element */}
      <div className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</div> {/* Children content */}
    </button>
  );
});

Button.displayName = "Button"; // Setting display name for easier debugging

export default Button; // Exporting the Button component
