# Document 05: Engineering Standards

## DS Home Services

**Version:** 1.0  
**Status:** Approved  
**Priority:** Critical

## Purpose

This document defines the engineering standards for the entire project.

Every file, component, function, and architecture decision must follow these rules.

Code quality is as important as design quality.

The project should be easy to maintain for many years.

## Engineering Philosophy

Build like a product.

Not like a landing page.

Think long-term.

Optimize for scalability.

Optimize for maintainability.

Optimize for readability.

Optimize for performance.

## Tech Stack

- **Framework:** Next.js with App Router
- **Language:** TypeScript in Strict Mode
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Validation:** Zod
- **Future backend:** Supabase or PostgreSQL
- **CMS:** Future implementation

## General Rules

- Never use JavaScript
- Always use TypeScript
- Never use `any`
- Never disable TypeScript errors
- Prefer explicit types
- Keep components small
- Keep files readable

## Component Rules

- One component equals one responsibility
- Avoid components longer than 250 lines
- Extract reusable logic
- Extract repeated UI
- Never duplicate JSX
- Prefer composition over inheritance

## Next.js Rules

- Use App Router
- Prefer Server Components
- Use Client Components only when necessary
- Avoid unnecessary hydration
- Use Server Actions when appropriate
- Optimize metadata
- Optimize routing

## State Management

- Use local state whenever possible
- Do not introduce global state without a clear reason
- Future global state should use Zustand
- Avoid unnecessary Context Providers

## Data Fetching

- Prefer server-side fetching
- Cache where appropriate
- Handle loading states
- Handle error states
- Handle empty states
- Never assume successful responses

## Error Handling

Every asynchronous operation must handle:

- Loading
- Success
- Failure
- Unexpected error

Never expose technical errors to users.

## Type Safety

- Everything typed
- Props typed
- Responses typed
- Hooks typed
- Forms typed
- API responses typed
- No implicit `any`

## Tailwind Rules

- Use utility classes consistently
- Avoid inline styles
- Extract repeated utility groups into reusable components
- Keep class order readable
- Avoid unnecessary custom CSS

## CSS Rules

- Tailwind first
- Custom CSS only when absolutely necessary
- Never create page-specific CSS
- Never hardcode magic values
- Use design tokens

## Accessibility

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper ARIA labels
- Correct heading hierarchy
- Accessible forms
- Alt text for images

## SEO

Every page must include:

- Title
- Description
- Open Graph metadata
- Twitter Card metadata
- Canonical URL
- Structured data in the future
- Semantic HTML

## Performance

- Optimize images
- Lazy load when appropriate
- Use automatic code splitting
- Avoid unnecessary libraries
- Reduce bundle size
- Keep the Lighthouse score above 95

## Image Optimization

- Use Next.js Image
- Use lazy loading
- Define responsive sizes
- Use modern formats
- Never load oversized images

## Animation Rules

- Use Framer Motion only
- Animations should improve UX
- Never animate everything
- Avoid excessive motion
- Respect `prefers-reduced-motion`

## Forms

- Use React Hook Form
- Use Zod validation
- Provide inline validation
- Provide helpful error messages
- Include loading states
- Include success states

## File Naming

Use PascalCase.

Examples:

- `Hero.tsx`
- `Navbar.tsx`
- `EstimateForm.tsx`
- `ServiceCard.tsx`

Never use inconsistent naming.

## Function Naming

Use descriptive names.

### Good

- `getServices()`
- `submitEstimate()`
- `calculatePrice()`

### Bad

- `data()`
- `run()`
- `handle()`

## Hooks

Hooks must be:

- Reusable
- Typed
- Small
- Limited to one responsibility

Examples:

- `useEstimate()`
- `useScrollPosition()`
- `useWindowSize()`

## Code Organization

Use this consistent order:

1. Imports
2. Types
3. Constants
4. Hooks
5. Component
6. Helpers
7. Export

## Comments

- Write self-documenting code
- Comment only complex logic
- Never comment obvious code

## Security

- Validate every input
- Never trust client data
- Escape dynamic content
- Protect API routes
- Sanitize uploads

## Logging

- Use meaningful logs in development
- Remove unnecessary console logs before production
- Never expose secrets

## Testing — Future

Testing will cover:

- Components
- Forms
- Utilities
- Critical flows
- API

## Git Practices

- Make small commits
- Write clear commit messages
- Keep one feature per commit
- Never commit broken code

## Quality Before Completion

Before marking any task complete, verify:

- No TypeScript errors
- No ESLint errors
- No console errors
- Responsive layout works
- Accessibility is preserved
- Performance remains high
- No duplicated code
- Reusable architecture is maintained

## Do Not

- Do not use `any`
- Do not duplicate components
- Do not hardcode data
- Do not over-engineer
- Do not optimize prematurely
- Do not break existing architecture
- Do not rewrite approved code without a request

## Final Engineering Principle

Every line of code should make the project easier to maintain.

Every component should be reusable.

Every architectural decision should support future growth.

Write code that another senior engineer would immediately understand.
