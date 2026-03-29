import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded border-[3px] border-foreground bg-background px-4 py-2 text-base font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 focus-visible:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] focus-visible:-translate-x-[2px] focus-visible:-translate-y-[2px]",
          className!,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
