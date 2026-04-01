import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none border-[3px] border-foreground text-sm font-bold uppercase tracking-wide ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "",
        icon: "normal-case tracking-normal",
        outline: "bg-transparent hover:scale-105",
        ghost: "hover:scale-105",
        link: "underline-offset-4 hover:underline",
        gradient:
          "font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300",
        gradientOutline:
          "bg-transparent hover:scale-105 transition-all duration-300",
      },
      color: {
        primary: "",
        secondary: "",
        destructive: "",
        success: "",
        warning: "",
        info: "",
        bluePurple: "",
        greenBlue: "",
        pinkOrange: "",
        white: "",
      },
      size: {
        default: "h-11 px-4 text-sm",
        xs: "h-8 px-2.5 text-xs",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-5 text-base",
        xl: "h-14 px-6 text-lg",
        "2xl": "h-16 px-7 text-lg md:text-xl",
        icon: "h-10 w-10",
        iconLg: "h-12 w-12",
      },
    },
    compoundVariants: [
      // Default variant colors
      {
        variant: "default",
        color: "primary",
        class: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "default",
        color: "secondary",
        class: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        variant: "default",
        color: "destructive",
        class:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      {
        variant: "default",
        color: "success",
        class: "bg-green-600 text-white hover:bg-green-700",
      },
      {
        variant: "default",
        color: "warning",
        class: "bg-yellow-600 text-white hover:bg-yellow-700",
      },
      {
        variant: "default",
        color: "info",
        class: "bg-blue-600 text-white hover:bg-blue-700",
      },
      {
        variant: "default",
        color: "white",
        class: "bg-white text-black border-border hover:bg-white/90",
      },
      {
        variant: "icon",
        color: "primary",
        class:
          "bg-background text-foreground hover:bg-primary hover:text-primary-foreground active:translate-x-[2px] active:translate-y-[2px]",
      },

      // Outline variant colors
      {
        variant: "outline",
        color: "primary",
        class:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
      },
      {
        variant: "outline",
        color: "destructive",
        class:
          "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white",
      },
      {
        variant: "outline",
        color: "info",
        class:
          "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      },

      // Ghost variant colors
      {
        variant: "ghost",
        color: "primary",
        class: "text-primary hover:bg-primary/10",
      },
      {
        variant: "ghost",
        color: "secondary",
        class: "text-secondary hover:bg-secondary/10",
      },
      {
        variant: "ghost",
        color: "destructive",
        class: "text-destructive hover:bg-destructive/10",
      },
      {
        variant: "ghost",
        color: "success",
        class: "text-green-600 hover:bg-green-600/10",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "text-yellow-600 hover:bg-yellow-600/10",
      },
      {
        variant: "ghost",
        color: "info",
        class: "text-blue-600 hover:bg-blue-600/10",
      },

      // Link variant colors
      {
        variant: "link",
        color: "primary",
        class: "text-primary hover:text-primary/80",
      },
      {
        variant: "link",
        color: "secondary",
        class: "text-secondary hover:text-secondary/80",
      },
      {
        variant: "link",
        color: "destructive",
        class: "text-destructive hover:text-destructive/80",
      },

      // Gradient variant colors
      {
        variant: "gradient",
        color: "bluePurple",
        class:
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/25",
      },
      {
        variant: "gradient",
        color: "greenBlue",
        class:
          "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:shadow-green-500/25",
      },
      {
        variant: "gradient",
        color: "pinkOrange",
        class:
          "bg-gradient-to-r from-pink-600 to-orange-600 text-white hover:from-pink-700 hover:to-orange-700 hover:shadow-pink-500/25",
      },
      {
        variant: "gradient",
        color: "primary",
        class:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 hover:shadow-primary/25",
      },

      // Gradient outline variant colors
      {
        variant: "gradientOutline",
        color: "bluePurple",
        class:
          "border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent",
      },
      {
        variant: "gradientOutline",
        color: "greenBlue",
        class:
          "border-green-500 text-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:text-white hover:border-transparent",
      },
      {
        variant: "gradientOutline",
        color: "primary",
        class:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, color }),
          className || "",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
