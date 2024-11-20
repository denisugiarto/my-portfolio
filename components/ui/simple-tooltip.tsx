import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type SimpleTooltipProps = {
  children: JSX.Element;
  title: string;
};
export default function SimpleTooltip({ children, title }: SimpleTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="px-1 py-0.5">
          <p className="text-center text-xs font-bold capitalize">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
