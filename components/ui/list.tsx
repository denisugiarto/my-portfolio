import * as React from "react";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  animated?: boolean;
  animationDelay?: number;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      children,
      animated = false,
      animationDelay = 0,
      ...props
    },
    ref,
  ) => {
    const Component = animated ? m.li : "li";

    const animationProps = animated
      ? {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          transition: { delay: animationDelay },
          viewport: { once: true },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={cn("flex items-start gap-3 leading-relaxed text-muted-foreground", className)}
        {...animationProps}
        {...props}
      >
        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
        <span>{children}</span>
      </Component>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem };