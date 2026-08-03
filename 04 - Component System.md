# Document 04: Component System

## DS Home Services

**Version:** 1.0  
**Status:** Approved  
**Priority:** Critical

## Purpose

This document defines every reusable UI component.

The entire website must be built from reusable components.

Never create one-off UI elements when an existing component can be reused.

Consistency is more important than creativity.

## Design System Philosophy

Every component belongs to the same design language.

If two components solve the same problem, they should look related.

Never redesign components for individual pages.

Build once.

Reuse everywhere.

## Component Hierarchy

Foundation  
↓  
Layout  
↓  
Sections  
↓  
Cards  
↓  
Content  
↓  
Buttons  
↓  
Inputs  
↓  
Animations

## Foundation Components

- Container
- Section
- Grid
- Stack
- Spacer
- Divider
- Page Wrapper

These components create the entire page layout.

Never hardcode spacing.

## Navigation

### Behavior

- Sticky navigation
- Transparent on the Hero
- Solid after scrolling

### Contents

- Logo
- Navigation links
- Language switcher
- CTA button
- Mobile menu

Navigation should always remain minimal.

## Buttons

### Primary Button

- Main CTA
- Solid
- Rounded
- Large

### Secondary Button

- Outline

### Ghost Button

- Minimal

### Text Button

- No background

### Icon Button

- Square

### Emergency Button

- WhatsApp style
- Large
- Highly visible

### Loading Button

- Spinner
- Disabled state
- Hover state
- Focus state

Every button must share the same height.

## Badges

Badges are small, rounded, and minimal.

Use them for:

- Available Today
- Fast Response
- New
- Popular
- Verified

Never overuse badges.

## Cards

Cards are one of the main design elements.

Every card shares:

- Padding
- Border radius
- Shadow
- Spacing
- Hover animation

### Card Types

- Service Card
- Feature Card
- Process Card
- Pricing Card
- Testimonial Card
- Coverage Card
- Statistic Card
- Gallery Card
- FAQ Card

## Service Card

### Contents

- Icon
- Title
- Description
- Optional CTA

### Hover

- Lift
- Soft shadow
- Small scale

## Feature Card

Simple.

Minimal.

Supports one idea only.

Never overload content.

## Process Card

### Contents

- Step number
- Title
- Description
- Optional icon

Used inside How It Works.

## Pricing Card

### Contents

- Service name
- Starting price
- Description
- CTA
- Optional badge

## Testimonial Card

### Contents

- Customer name
- Location
- Review
- Rating
- Optional photo

Never fake visual identity.

## Statistic Card

### Contents

- Large number
- Short description
- Animated counter

Use carefully.

## Form Components

- Text Input
- Textarea
- Phone Input
- Email Input
- Dropdown
- Checkbox
- Radio
- Toggle
- Date Picker
- Time Picker
- Upload Area
- Submit Button

Every input shares:

- Height
- Radius
- Spacing
- Typography

## Upload Component

### Capabilities

- Drag and drop
- Click upload
- Image preview
- Remove image
- Loading indicator
- Future support for multiple images

## Modals

### Types

- Estimate Modal
- Success Modal
- Confirmation Modal
- Image Preview

### Behavior

- Always centered
- Blurred background
- Escape key closes the modal

## Drawers

Used for:

- Mobile navigation
- Estimate panel
- Filters

Drawers slide smoothly.

## Accordion

Used for:

- FAQ
- Technical information
- Pricing details

Only one section is open at a time.

## Gallery

- Before and After
- Responsive grid
- Lightbox
- Lazy loading
- Smooth transitions

## Coverage Map

- Interactive
- Hover regions
- Service areas
- Ready for future expansion

## Hero Component

### Contents

- Headline
- Description
- Primary CTA
- Emergency CTA
- Trust indicators
- Interactive 3D house

The Hero exists only once.

Never duplicate Hero styles elsewhere.

## Interactive House

The interactive house is a core visual element.

### Behavior

- Hover rooms
- Highlight areas
- Show labels
- Small animations

### Possible Hotspots

- Kitchen
- Bathroom
- Living room
- Bedroom
- Garage
- Entrance

No heavy animations.

## Section Component

Every section follows:

- Title
- Subtitle
- Content
- CTA
- Spacing
- Consistent width

## Icons

- One icon library only
- Outline icons
- Consistent size
- Consistent stroke

## Images

- Rounded corners
- Responsive
- Lazy loading
- Optimized
- Never stretched

## Dividers

Minimal.

Mostly invisible.

Use whitespace first.

## Empty States

Every dynamic component should have:

- Loading state
- Empty state
- Error state
- Success state

## Loading States

- Skeleton loading
- Button loading
- Image loading
- Form loading

Never show blank areas.

## Error States

Use friendly language.

Provide helpful guidance.

Never expose technical errors.

## Success States

Clear confirmation.

Positive.

Minimal.

## Hover States

Every interactive component reacts:

- Buttons
- Cards
- Navigation
- Icons
- House
- Links
- Inputs

Never exaggerate hover animations.

## Focus States

- Keyboard accessible
- Clearly visible
- Consistent across components

## Animation System

Every component supports:

- Appear
- Hover
- Focus
- Exit
- Loading

Transitions remain subtle.

## Responsive Rules

Every component must work on:

- Desktop
- Tablet
- Mobile

Layouts may change.

Behavior remains consistent.

## Reusability

Every component should be usable on multiple pages.

Never create page-specific components without strong reason.

## Naming Convention

Examples:

- Button
- PrimaryButton
- Hero
- Navbar
- ServiceCard
- PricingCard
- EstimateForm
- UploadArea
- CoverageMap
- Testimonials
- FAQAccordion

Keep names short.

Clear.

Predictable.

## Final Principle

If a new UI element is needed, first check whether an existing component can solve the problem.

If yes, reuse it.

If not, create a new reusable component.

Never build temporary UI.
