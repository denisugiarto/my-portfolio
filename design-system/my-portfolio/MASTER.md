# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** My Portfolio
**Generated:** 2026-03-29 01:28:59
**Category:** Marketing Agency

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#000000` | `--color-primary` |
| Secondary | `#FFFFFF` | `--color-secondary` |
| CTA/Accent | `#FF3366` | `--color-cta` |
| Background | `#FFD260` | `--color-background` |
| Text | `#000000` | `--color-text` |

**Color Notes:** High contrast black, white, bright yellow background, and vibrant pink accent.

### Typography

- **Heading Font:** Archivo
- **Body Font:** Space Grotesk
- **Mood:** modern, playful, bold, neo-brutalist, striking, clean but aggressive
- **Google Fonts:** [Archivo + Space Grotesk](https://fonts.google.com/share?selection.family=Archivo:wght@300;400;500;600;700;800;900|Space+Grotesk:wght@300;400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths (Neo-Brutalist Hard Shadows)

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `2px 2px 0px rgba(0,0,0,1)` | Tags, small buttons, inputs |
| `--shadow-md` | `4px 4px 0px rgba(0,0,0,1)` | Cards, primary buttons |
| `--shadow-lg` | `8px 8px 0px rgba(0,0,0,1)` | Modals, dropdowns, featured cards |
| `--shadow-xl` | `12px 12px 0px rgba(0,0,0,1)` | Hero images, large interactive areas |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--color-cta);
  color: #000000;
  padding: 12px 24px;
  border-radius: 4px;
  border: 3px solid #000000;
  font-weight: 800;
  box-shadow: var(--shadow-md);
  transition: all 150ms ease;
  cursor: pointer;
  text-transform: uppercase;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(0,0,0,1);
}

.btn-primary:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px rgba(0,0,0,1);
}

/* Secondary Button */
.btn-secondary {
  background: var(--color-secondary);
  color: var(--color-text);
  border: 3px solid #000000;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 800;
  box-shadow: var(--shadow-sm);
  transition: all 150ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #E2E8F0;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0,0,0,1);
}

.btn-secondary:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px rgba(0,0,0,1);
}
```

### Cards

```css
.card {
  background: var(--color-secondary);
  border: 3px solid #000000;
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 150ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translate(-4px, -4px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 3px solid #000000;
  border-radius: 4px;
  background: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: all 150ms ease;
  color: var(--color-text);
}

.input:focus {
  outline: none;
  box-shadow: var(--shadow-md);
  transform: translate(-2px, -2px);
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.modal {
  background: var(--color-background);
  border: 4px solid #000000;
  border-radius: 12px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Neo-Brutalism

**Keywords:** Playful, hard shadows, thick borders, modern, high contrast, vibrant colors, solid shapes, legible typography, visible grids

**Best For:** Developer portfolios, modern agencies, design portfolios, trendy SaaS products, startups

**Key Effects:** Hard solid shadows (no blur), thick stroke borders (2-4px), vibrant background colors combined with pitch black elements, hover states that move elements up/left while expanding the shadow, active states that press the element down to remove the shadow.

### Page Pattern

**Pattern Name:** Modern Creator Grid

- **Conversion Strategy:** bold immediate visual hierarchy, playful interactive hover states, highly legible call to actions.
- **CTA Placement:** Sticky Header + Bold Footer block
- **Section Order:** 1. Hero (Massive Typography & Playful Shapes), 2. Project Grid (Chunky Cards), 3. About/Skills, 4. Contact

---

## Anti-Patterns (Do NOT Use)

- ❌ Soft blurred shadows (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`)
- ❌ Thin, subtle borders (`border: 1px solid #E2E8F0`)
- ❌ Low contrast gray text on white backgrounds
- ❌ Overly complex gradients
- ❌ Hidden work

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons) but consider giving them thick stroke-widths (e.g., 2.5 or 3).
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Inconsistent border radiuses** — Pick round or sharp for the project and stick to it.
- ❌ **Invisible focus states** — Focus states must be highly visible and bold.

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] "Hard" shadows without blur mapped correctly
- [ ] Borders are thick and highly visible (usually 2px-4px)
- [ ] Hover effects translate the element (e.g., `-2px, -2px`) and increase shadow appropriately
- [ ] Active/Click states compress the shadow and translate the element positively
- [ ] No emojis used as icons (use SVG instead with matching stroke weight)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with snappy but visible transitions (e.g. 150ms)
- [ ] Light mode: text contrast 4.5:1 minimum (Neo-brutalism usually exceeds this easily)
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile Layouts: Adjust padding and shadow offsets for small screens
- [ ] No horizontal scroll on mobile
