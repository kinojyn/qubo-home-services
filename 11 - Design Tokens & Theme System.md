# Document 11: Design Tokens & Theme System

## DS Home Services

**Version:** 1.0  
**Status:** Approved  
**Priority:** Critical

## Purpose

This document defines the design token system for the project.

Design tokens are the single source of truth for all visual decisions.

Never hardcode colors, spacing, typography, shadows, or border radius.

Always use tokens.

## Design Principle

Consistency is more important than individual styling.

Every visual property must originate from a design token.

Changing one token should update the entire design system.

## Theme Architecture

The application should support themes from the beginning.

### Current Theme

- Light

### Future Support

- Dark
- High contrast
- Seasonal themes
- Brand themes

The component API must not depend on specific colors.

Components consume semantic tokens only.

## Color Tokens

- Primary Background
- Secondary Background
- Surface
- Elevated Surface
- Primary Text
- Secondary Text
- Muted Text
- Border
- Divider
- Accent
- Accent Hover
- Accent Active
- Success
- Warning
- Error
- Info
- Overlay
- Focus Ring
- Disabled Background
- Disabled Text

## Semantic Colors

Always use semantic names.

### Good

- `background-primary`
- `text-primary`
- `surface`
- `border-default`
- `accent`

### Bad

- `white`
- `gray200`
- `orange500`
- `black`

Never couple UI to specific colors.

## Typography Tokens

### Font Family

- Display
- Heading
- Body
- Mono

### Font Sizes

- XS
- SM
- MD
- LG
- XL
- 2XL
- 3XL
- 4XL
- 5XL
- 6XL

### Line Heights

- Tight
- Normal
- Relaxed

### Letter Spacing

- Tight
- Normal
- Wide

### Font Weights

- Regular
- Medium
- SemiBold
- Bold

## Spacing Tokens

Use an 8px spacing system.

Examples:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64
- 80
- 96
- 120
- 160

Spacing should scale consistently.

Never invent arbitrary spacing values.

## Size Tokens

- Button heights
- Input heights
- Avatar sizes
- Icon sizes
- Container widths
- Card widths
- Section widths

Use shared values everywhere.

## Border Radius Tokens

- XS
- SM
- MD
- LG
- XL
- 2XL
- Full

Every component should reference these values.

## Shadow Tokens

- XS
- SM
- MD
- LG
- XL

Use soft layered shadows.

Never define custom shadows inside components.

## Border Tokens

- Thin
- Default
- Strong
- Dashed
- Focus

All borders must reference tokens.

## Animation Tokens

### Durations

- Fast
- Normal
- Slow

### Timing Functions

- Ease
- Ease In
- Ease Out
- Ease In Out

### Spring Presets

- Soft
- Default
- Snappy

### Animation Distance

- Small
- Medium
- Large

## Breakpoint Tokens

- Mobile
- Tablet
- Laptop
- Desktop
- Wide
- Ultra Wide

Never hardcode breakpoints.

## Z-Index Tokens

- Base
- Dropdown
- Sticky
- Overlay
- Modal
- Toast
- Tooltip

Always use predefined layers.

## Opacity Tokens

- Disabled
- Muted
- Overlay
- Hover
- Active

## Blur Tokens

- Small
- Medium
- Large
- Extra Large

## Icon Tokens

### Sizes

- Small
- Medium
- Large
- Extra Large

### Stroke Width

- Standard

## Motion Tokens

- Hover Scale
- Hover Lift
- Card Elevation
- Button Press
- Page Transition
- Section Reveal
- Modal Transition
- Drawer Transition

Use consistent values throughout the project.

## Component Token Rules

Every component must consume tokens.

Components may not define their own:

- Colors
- Spacing
- Typography
- Radius
- Shadows
- Animation timing

## Theme Switching

Theme switching should require changing tokens only.

Components should not require modification.

## Accessibility

Every token combination must satisfy accessibility requirements.

Color contrast must meet the WCAG AA minimum.

Focus states must remain visible in every theme.

## Future Branding

A complete rebrand should require changing only the token definitions.

Business logic must remain untouched.

## Forbidden

- Do not hardcode colors
- Do not hardcode spacing
- Do not hardcode shadows
- Do not hardcode typography
- Do not duplicate token values
- Do not bypass the token system

## Final Principle

Every visual decision begins with a design token.

Components consume tokens.

Pages consume components.

The design system remains consistent, scalable, and easy to evolve.
