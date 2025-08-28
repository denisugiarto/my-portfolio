import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[] | string[];
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  FormSelectProps
>(
  (
    {
      value,
      onValueChange,
      options,
      placeholder = "Select an option",
      label,
      error,
      required = false,
      disabled = false,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    // Convert string array to SelectOption array
    const normalizedOptions: SelectOption[] = options.map((option) =>
      typeof option === "string" ? { value: option, label: option } : option,
    );

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            id={id}
            className={cn(
              "h-auto w-full rounded-lg border bg-background px-4 py-3 text-foreground",
              "placeholder:text-muted-foreground",
              "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary",
              "transition-colors duration-200",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-destructive focus:ring-destructive"
                : "border-border",
              className || "",
            )}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {normalizedOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
