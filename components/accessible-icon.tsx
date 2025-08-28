import { useAccessibleColor } from "@/lib/contrast-checker";

interface AccessibleIconProps {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  originalColor?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A wrapper component that automatically adjusts icon colors for accessibility
 */
export default function AccessibleIcon({
  icon: Icon,
  originalColor = "currentColor",
  size = 20,
  className,
  style,
}: AccessibleIconProps) {
  const accessibleColor = useAccessibleColor(originalColor);

  return (
    <span className={className}>
      <Icon
        size={size}
        style={{
          ...style,
          color: accessibleColor,
        }}
      />
    </span>
  );
}
