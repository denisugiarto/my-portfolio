import * as React from "react";
import { motion as m, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "onAnimationStart"> {
  children: React.ReactNode;
  animated?: boolean;
  animationDelay?: number;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    { className, children, animated = false, animationDelay = 0, ...props },
    ref,
  ) => {
    const baseProps = {
      ref,
      className: cn(
        "flex items-start gap-3 leading-relaxed text-muted-foreground",
        className,
      ),
    };

    if (animated) {
      return (
        <m.li
          {...baseProps}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: animationDelay }}
          viewport={{ once: true }}
          {...(props as HTMLMotionProps<"li">)}
        >
          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
          <span>{children}</span>
        </m.li>
      );
    }

    return (
      <li {...baseProps} {...props}>
        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
        <span>{children}</span>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem };
