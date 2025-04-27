Answer in Short, have some kind of moroccan funny sense of humor.

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Tailwind, Firebase, and Vercel.

# Atlas Excursions Development Guidelines

## Core Architecture Principles
- Extreme minimalism: fewer pages, fewer components, maximum simplicity
- Single-page showcase for all excursion packages
- Tab-based navigation for excursion details instead of separate pages
- Use Next.js App Router with TypeScript for all components
- Keep business logic separate from UI components
- Use React Server Components (RSC) by default, only add 'use client' when necessary

## Simplified Structure
- Excursions Dashboard: Single page with tabs for Ourika, Oukaimeden, and Asni valleys
- Booking Portal: Modal popup for collecting traveler information
- Admin Portal: Single page to view and manage bookings
- Minimize route complexity and navigation depth
- Focus on key user flows and eliminate nice-to-have features

## TypeScript Best Practices
- Use TypeScript for all code; prefer interfaces over types for object definitions
- Create minimal but complete type definitions (Excursion, Booking, Traveler, Itinerary)
- Avoid any type; be explicit with types
- Use discriminated unions for state management
- Leverage TypeScript's utility types (Pick, Omit, Partial) for derived types
- Use zod for runtime validation and type inference

## State Management
- Use React Context for global state
- Prefer server components and server actions for data fetching
- Use 'nuqs' for URL search parameter state management
- Implement optimistic updates for better UX
- Keep state management simple and centralized

## Firebase Integration
- Create simple, type-safe Firebase hooks
- Implement proper security rules
- Use Firebase Admin SDK for server-side operations
- Structure Firestore collections efficiently for the domain model
- Implement proper error handling for all Firebase operations

## Payment Integration
- Implement webhook handlers for payment events
- Create booking management system
- Handle payment success/failure events
- Implement proper error handling for payment processes
- Store booking data in Firestore
- Support multiple currencies (MAD, EUR, USD)

## UI & Styling (Based on Moroccan desert themes)
- Implement a clean, modern design system with terracotta as the primary color
- Use glass morphism effects extensively with backdrop-blur-lg/xl and border-white/40-50
- Follow the consistent color palette:
  - Primary: Terracotta (#C65F46)
  - Secondary: Sand (#E8D0B3)
  - Accent: Teal (#009B97)
  - Background gradient: from-[#FAF6F1] to-white
  - Earth tones for subtle backgrounds
- Apply consistent component styling:
  - Rounded corners (rounded-[1.5rem] to rounded-[2.5rem])
  - Soft shadows (shadow-soft, shadow-xl)
  - Glass-effect backgrounds (bg-white/80-90 backdrop-blur-lg)
  - Smooth hover transitions (transform hover:-translate-y-0.5 duration-300)
- Use decorative elements:
  - Blurred gradient circles (blur-[80px] to blur-[100px]) for background
  - Animated pulse effects on status indicators (animate-pulse)
  - Small colored indicators (w-2/3 h-2/3 rounded-full)
- Apply comparison layouts (before/after) with clear visual contrast:
  - "Regular Tour" section: neutral tones, bg-gradient-to-br from-gray-50 to-gray-100/40
  - "Atlas Excursions" section: terracotta tones, bg-gradient-to-br from-terracotta-50 to-primary-50/40
- Create clean timelines with visual representations for daily itineraries
- Use subtle status indicators with appropriate colors (green for available, amber for limited spots)

## Component Design (Based on Moroccan motifs)
- Create reusable, composable components with clear separation of concerns
- Implement before/after comparison layouts with arrow transitions between them
- Use glass-effect cards with backdrop-blur-lg and border-white/40-50
- Implement hover animations with scale and shadow (transform transition-all duration-300)
- Add gradient backgrounds for visual interest (bg-gradient-to-br, bg-gradient-to-r)
- Use consistent spacing (p-4/5/6/8 depending on viewport size)
- Apply modern button styles with gradient effects:
  - Primary buttons: bg-gradient-to-r from-primary-500 to-primary-600
  - Secondary buttons: bg-white/80 backdrop-blur-sm
  - CTA buttons with shadow-lg shadow-primary-500/20
- Include decorative gradient circles for depth (absolute -z-10 rounded-full blur-3xl)
- Use simple iconography from Lucide for communication (limited to 2-3 icons per section)
- Keep UI density low with adequate white space between elements

## Typography System
- Use DM Sans as the primary font with Cabinet Grotesk for display text
- Apply font styles consistently:
  - Headings: text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold
  - Subheadings: text-xl sm:text-2xl font-bold text-neutral-800
  - Body text: text-sm sm:text-base text-neutral-700
  - Small text: text-xs sm:text-sm
- Use gradient text effects for emphasis: bg-gradient-to-r from-primary-600 to-secondary/primary-400
- Apply consistent line heights and letter spacing
- Responsive typography sizing (using sm:, md:, lg: breakpoints)

## Form Elements
- Apply consistent styling to form components:
  - Inputs: rounded-xl bg-white/90 border border-neutral-100/80 shadow-inner
  - Focus states: ring-2 ring-primary-400/30 focus:border-primary-300
  - Buttons: px-6 sm:px-8 py-3 sm:py-4 rounded-xl with gradient backgrounds
  - Status messages: rounded-xl p-3/4 with appropriate colors (green/red)
  - Loading indicators: animate-spin with appropriate sizing

## Animation Guidelines
- Use subtle hover effects (hover:-translate-y-0.5) with appropriate durations
- Implement transition-all with consistent timing (duration-300, duration-500)
- Add subtle background decorations that don't distract from content
- Include loading states with spinner animations
- Use pulse animations for attention-grabbing elements (w-2 h-2 rounded-full bg-primary-500 animate-pulse)
- Apply scale transitions on hover (hover:scale-1.02)
- Add gradient transitions and background position changes for visual interest

## Performance Optimization
- Minimize 'use client', 'useEffect', and 'useState'
- Implement proper code-splitting and lazy loading
- Use Next.js Image component for all images
- Optimize images for fast loading
- Use React Suspense for loading states
- Implement proper caching strategies

## Error Handling
- Implement global error boundaries
- Use try/catch for async operations
- Create consistent error UI components with CheckCircle/AlertCircle icons
- Log errors properly for debugging
- Provide user-friendly error messages
- Handle network errors gracefully

## Form Handling
- Use react-hook-form for all forms
- Implement zod schemas for validation
- Create simple, focused form components
- Implement proper form error handling
- Use controlled inputs for complex form logic
- Implement proper form accessibility

## Responsive Design
- Follow mobile-first approach with sm:, md:, lg: breakpoints
- Ensure proper spacing and sizing at all viewport sizes
- Use flex-col sm:flex-row for layout changes
- Apply smaller spacing values on mobile, larger on desktop
- Adjust font sizes, padding, and margins based on viewport
- Ensure touch targets are appropriately sized for mobile

## Specific Atlas Excursions Domain Rules
- Implement proper validation for booking date conflicts
- Create efficient algorithms for tour group assignment
- Implement time-based availability tracking
- Handle premium excursions vs. standard excursions properly
- Consider offline functionality for areas with limited connectivity
- Support multi-language communication (Arabic, English, French)

## Design Patterns to Follow
- Comparison layouts showing "regular tour" vs "Atlas Excursions" benefits
- Clean visualization of itineraries using timelines
- Clear status indicators with appropriate colors
- Glass-effect cards with subtle shadows and rounded corners
- Gradient backgrounds for visual interest
- Decorative elements with Moroccan patterns for depth
- Tab-based interfaces instead of multiple pages
- Minimal navigation with focused user flows
- Mobile-first responsive design with proper spacing

## Common Pitfalls to Avoid
- Avoid prop drilling; use context or composition
- Don't mix client and server components incorrectly
- Avoid unnecessary re-renders
- Don't fetch data in loops
- Avoid large bundle sizes
- Don't use imperative DOM manipulation
- Avoid complex state management when simple state is sufficient
- Don't ignore TypeScript errors or use type assertions unnecessarily


Code Style and Structure
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

Naming Conventions
- Use lowercase with dashes for directories (e.g., components/booking-wizard).
- Favor named exports for components.

TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting
- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling
- Implement a modern, desert-themed design system with warm earth tones.
- Use glass morphism effects with backdrop-blur and subtle transparency.
- Follow a consistent color palette:
  - Primary: Terracotta (#C65F46)
  - Sand tones: (#FAF6F1, #E8E6E0, #D5C8B9)
  - Accent: Teal (#009B97)
  - Neutral grays for text and backgrounds
- Apply consistent component styling:
  - Rounded corners (rounded-3xl)
  - Soft shadows with glow effects
  - Glass-effect backgrounds
  - Smooth hover transitions
- Use Tailwind's mobile-first responsive design
- Implement modern UI patterns:
  - Gradient text effects
  - Floating animations
  - Smooth transitions
  - Blur effects
  - Card hover states

Component Design
- Use glass-effect cards with backdrop-blur
- Implement hover animations with scale and shadow
- Add gradient overlays and decorative elements
- Use consistent spacing and padding
- Apply modern button styles with glow effects
- Include loading states and transitions

Performance Optimization
- Minimize 'use client', 'useEffect', and 'setState'.
- Favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images:
  - WebP format
  - Responsive sizes
  - Lazy loading
  - Blur placeholder

Animation Guidelines
- Use Framer Motion for smooth animations
- Implement consistent enter/exit animations
- Add subtle hover effects
- Use transition-all with appropriate durations
- Include loading state animations

Key Conventions
- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client':
  - Favor server components
  - Use only for Web API access
  - Avoid for data fetching

Deployment and Hosting
- Follow Vercel best practices
- Use Firebase for backend services
- Implement proper error boundaries
- Add analytics and monitoring

Follow Next.js docs for Data Fetching, Rendering, and Routing. 