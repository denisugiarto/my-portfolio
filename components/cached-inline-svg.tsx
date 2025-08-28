import { useEffect, useState } from "react";
import { useAccessibleColorForContext } from "@/lib/contrast-checker";

// Global cache to avoid refetching the same SVG
const svgCache = new Map<string, string>();

interface CachedInlineSVGProps {
  src: string;
  color?: string;
  className?: string;
  alt?: string;
  title?: string;
  style?: React.CSSProperties;
  enableContrastCheck?: boolean;
  themeContext?: "background" | "card" | "muted" | "primary";
}

export default function CachedInlineSVG({
  src,
  color,
  className = "",
  alt = "",
  title,
  style,
  enableContrastCheck = true,
  themeContext = "background",
}: CachedInlineSVGProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use accessible color if contrast checking is enabled and component is mounted
  const accessibleColor = useAccessibleColorForContext(
    color || "currentColor",
    themeContext,
  );
  const finalColor =
    enableContrastCheck && color && mounted ? accessibleColor : color;

  useEffect(() => {
    if (!src) return;

    const loadSVG = async () => {
      // Return cached SVG if available
      if (svgCache.has(src)) {
        setSvgContent(svgCache.get(src)!);
        return;
      }

      try {
        const response = await fetch(src);
        if (!response.ok)
          throw new Error(`Failed to fetch SVG: ${response.statusText}`);

        const text = await response.text();

        // Parse SVG string
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svg = doc.querySelector("svg");

        if (!svg) {
          console.error("No SVG found in the fetched file:", src);
          return;
        }

        // Enhance SVG for better styling and accessibility
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("fill", "currentColor"); // Critical for color control
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-hidden", alt ? "false" : "true");

        // Remove any existing fill/stroke on children to respect `currentColor`
        const paths = svg.querySelectorAll(
          "path, circle, rect, polygon, polyline, line, g",
        );
        paths.forEach((el) => {
          el.setAttribute("fill", "currentColor");
          el.setAttribute("stroke", "currentColor");
        });

        const enhancedSVG = svg.outerHTML;
        svgCache.set(src, enhancedSVG);
        setSvgContent(enhancedSVG);
      } catch (err) {
        console.error("Error loading SVG:", err);
      }
    };

    // Only load if not already in cache
    if (!svgCache.has(src)) {
      loadSVG();
    } else {
      setSvgContent(svgCache.get(src)!);
    }
  }, [src, alt]);

  // Merge style with accessible color
  const finalStyle = finalColor ? { ...style, color: finalColor } : style;

  return (
    <span
      className={className}
      style={finalStyle}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt}
      title={title} // for tooltip or when aria-hidden="false"
    />
  );
}
