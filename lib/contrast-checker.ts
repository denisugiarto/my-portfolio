/**
 * Contrast Checker Library
 * Ensures good color contrast by automatically adjusting colors based on background
 */

// WCAG 2.1 contrast ratios
const CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
} as const;

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color meets WCAG contrast requirements
 */
function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= CONTRAST_RATIOS[level];
}

/**
 * Lighten or darken a color by a percentage
 */
function adjustColorLightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (color: number) => {
    const adjusted = Math.round(color + (255 - color) * (percent / 100));
    return Math.max(0, Math.min(255, adjusted));
  };

  if (percent > 0) {
    // Lighten
    return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
  } else {
    // Darken
    const darken = (color: number) => {
      const adjusted = Math.round(color * (1 + percent / 100));
      return Math.max(0, Math.min(255, adjusted));
    };
    return rgbToHex(darken(rgb.r), darken(rgb.g), darken(rgb.b));
  }
}

/**
 * Convert CSS color values (hsl, rgb, hex) to hex format
 */
function cssColorToHex(cssColor: string): string {
  if (typeof window === 'undefined') return '#ffffff';

  const tempDiv = document.createElement('div');
  tempDiv.style.color = cssColor.trim();
  document.body.appendChild(tempDiv);
  const computedColor = getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);

  // Handle rgb() format
  const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return rgbToHex(
      parseInt(rgbMatch[1]),
      parseInt(rgbMatch[2]),
      parseInt(rgbMatch[3])
    );
  }

  // Handle rgba() format
  const rgbaMatch = computedColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
  if (rgbaMatch) {
    return rgbToHex(
      parseInt(rgbaMatch[1]),
      parseInt(rgbaMatch[2]),
      parseInt(rgbaMatch[3])
    );
  }

  // If already hex, return as is
  if (cssColor.startsWith('#')) {
    return cssColor;
  }

  return '#ffffff';
}

/**
 * Get current theme colors from CSS custom properties
 */
function getCurrentThemeColors(): {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
} {
  if (typeof window === 'undefined') {
    return {
      background: '#ffffff',
      foreground: '#000000',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      card: '#ffffff',
      cardForeground: '#000000',
      primary: '#0f172a',
      primaryForeground: '#ffffff',
    };
  }

  try {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    // Get CSS custom properties for current theme
    const cssVars = {
      background: computedStyle.getPropertyValue('--background').trim(),
      foreground: computedStyle.getPropertyValue('--foreground').trim(),
      muted: computedStyle.getPropertyValue('--muted').trim(),
      mutedForeground: computedStyle.getPropertyValue('--muted-foreground').trim(),
      card: computedStyle.getPropertyValue('--card').trim(),
      cardForeground: computedStyle.getPropertyValue('--card-foreground').trim(),
      primary: computedStyle.getPropertyValue('--primary').trim(),
      primaryForeground: computedStyle.getPropertyValue('--primary-foreground').trim(),
    };

    // Convert HSL values to hex
    const convertedColors = {
      background: cssVars.background ? cssColorToHex(`hsl(${cssVars.background})`) : '#ffffff',
      foreground: cssVars.foreground ? cssColorToHex(`hsl(${cssVars.foreground})`) : '#000000',
      muted: cssVars.muted ? cssColorToHex(`hsl(${cssVars.muted})`) : '#f1f5f9',
      mutedForeground: cssVars.mutedForeground ? cssColorToHex(`hsl(${cssVars.mutedForeground})`) : '#64748b',
      card: cssVars.card ? cssColorToHex(`hsl(${cssVars.card})`) : '#ffffff',
      cardForeground: cssVars.cardForeground ? cssColorToHex(`hsl(${cssVars.cardForeground})`) : '#000000',
      primary: cssVars.primary ? cssColorToHex(`hsl(${cssVars.primary})`) : '#0f172a',
      primaryForeground: cssVars.primaryForeground ? cssColorToHex(`hsl(${cssVars.primaryForeground})`) : '#ffffff',
    };

    return convertedColors;
  } catch (error) {
    console.warn('Error reading theme colors:', error);
    // Fallback values
    const isDark = document.documentElement.classList.contains('dark') || 
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDark) {
      return {
        background: '#0a0a0a',
        foreground: '#fafafa',
        muted: '#27272a',
        mutedForeground: '#a1a1aa',
        card: '#0a0a0a',
        cardForeground: '#fafafa',
        primary: '#fafafa',
        primaryForeground: '#0a0a0a',
      };
    } else {
      return {
        background: '#ffffff',
        foreground: '#0a0a0a',
        muted: '#f4f4f5',
        mutedForeground: '#71717a',
        card: '#ffffff',
        cardForeground: '#0a0a0a',
        primary: '#18181b',
        primaryForeground: '#fafafa',
      };
    }
  }
}

/**
 * Get the current background color from CSS custom properties or computed styles
 */
function getCurrentBackgroundColor(): string {
  const themeColors = getCurrentThemeColors();
  return themeColors.background;
}

/**
 * Get accessible color for specific theme context
 */
export function getAccessibleColorForContext(
  originalColor: string,
  context: 'background' | 'card' | 'muted' | 'primary' = 'background',
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): string {
  const themeColors = getCurrentThemeColors();
  const backgroundColors = {
    background: themeColors.background,
    card: themeColors.card,
    muted: themeColors.muted,
    primary: themeColors.primary,
  };
  
  const background = backgroundColors[context];
  return getAccessibleColor(originalColor, background, level);
}

/**
 * Automatically adjust color for better contrast
 */
export function getAccessibleColor(
  originalColor: string,
  backgroundHint?: string,
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): string {
  const background = backgroundHint || getCurrentBackgroundColor();
  
  // If original color already meets contrast requirements, return it
  if (meetsContrastRequirement(originalColor, background, level)) {
    return originalColor;
  }

  // Try to adjust the color to meet contrast requirements
  let adjustedColor = originalColor;
  let attempts = 0;
  const maxAttempts = 20;
  
  // Determine if we should lighten or darken based on background
  const bgLuminance = (() => {
    const rgb = hexToRgb(background);
    return rgb ? getRelativeLuminance(rgb.r, rgb.g, rgb.b) : 0.5;
  })();
  
  const shouldLighten = bgLuminance < 0.5;
  const step = shouldLighten ? 10 : -10;

  while (!meetsContrastRequirement(adjustedColor, background, level) && attempts < maxAttempts) {
    adjustedColor = adjustColorLightness(adjustedColor, step);
    attempts++;
  }

  // If still doesn't meet requirements, use fallback high-contrast colors
  if (!meetsContrastRequirement(adjustedColor, background, level)) {
    return shouldLighten ? '#ffffff' : '#000000';
  }

  return adjustedColor;
}

/**
 * React hook to get accessible color that updates with theme changes
 */
export function useAccessibleColor(
  originalColor: string,
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): string {
  // Start with original color to prevent hydration mismatch
  const [accessibleColor, setAccessibleColor] = useState(originalColor);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateColor = () => {
      setAccessibleColor(getAccessibleColor(originalColor, undefined, level));
    };

    // Initial color calculation after mount
    updateColor();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          updateColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColor);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', updateColor);
    };
  }, [originalColor, level]);

  // Return original color during SSR, accessible color after hydration
  return typeof window === 'undefined' ? originalColor : accessibleColor;
}

/**
 * React hook for context-aware accessible colors
 */
export function useAccessibleColorForContext(
  originalColor: string,
  context: 'background' | 'card' | 'muted' | 'primary' = 'background',
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): string {
  const [accessibleColor, setAccessibleColor] = useState(originalColor);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateColor = () => {
      setAccessibleColor(getAccessibleColorForContext(originalColor, context, level));
    };

    // Initial color calculation after mount
    updateColor();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          updateColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColor);

    // Listen for CSS custom property changes
    const updateStyleListener = () => {
      // Use setTimeout to ensure CSS has been applied
      setTimeout(updateColor, 0);
    };
    
    // Listen for style changes
    document.addEventListener('DOMContentLoaded', updateStyleListener);
    window.addEventListener('load', updateStyleListener);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', updateColor);
      document.removeEventListener('DOMContentLoaded', updateStyleListener);
      window.removeEventListener('load', updateStyleListener);
    };
  }, [originalColor, context, level]);

  // Return original color during SSR, accessible color after hydration
  return typeof window === 'undefined' ? originalColor : accessibleColor;
}

/**
 * Utility to check if a color is dark or light
 */
export function isColorDark(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  return luminance < 0.5;
}

/**
 * Get contrasting text color (black or white) for a given background
 */
export function getContrastingTextColor(backgroundColor: string): string {
  return isColorDark(backgroundColor) ? '#ffffff' : '#000000';
}

/**
 * Get current theme information
 */
export function getCurrentTheme(): {
  isDark: boolean;
  colors: ReturnType<typeof getCurrentThemeColors>;
  name: 'light' | 'dark' | 'system';
} {
  if (typeof window === 'undefined') {
    return {
      isDark: false,
      colors: getCurrentThemeColors(),
      name: 'light',
    };
  }

  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const isSystem = !root.classList.contains('light') && !root.classList.contains('dark');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    isDark: isDark || (isSystem && systemPrefersDark),
    colors: getCurrentThemeColors(),
    name: isDark ? 'dark' : isSystem ? 'system' : 'light',
  };
}

/**
 * Check if color meets contrast requirement against current theme
 */
export function meetsCurrentThemeContrast(
  foregroundColor: string,
  context: 'background' | 'card' | 'muted' | 'primary' = 'background',
  level: keyof typeof CONTRAST_RATIOS = 'AA_NORMAL'
): boolean {
  const themeColors = getCurrentThemeColors();
  const backgrounds = {
    background: themeColors.background,
    card: themeColors.card,
    muted: themeColors.muted,
    primary: themeColors.primary,
  };
  
  return meetsContrastRequirement(foregroundColor, backgrounds[context], level);
}

// Re-export useState and useEffect for the hook
import { useState, useEffect } from 'react';