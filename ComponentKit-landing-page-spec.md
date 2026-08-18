# ComponentKit Landing Page — Spec

## Overview

**Project:** A landing page for **ComponentKit**, a UI/UX component library  
**Target Audience:** Both developers (engineers) and designers (UI/UX)  
**Tech Stack:** Next.js (App Router) + Tailwind CSS  
**Design Style:** Minimal / clean — clean lines, generous whitespace, subtle shadows (inspired by shadcn/ui and Vercel's aesthetic)  
**Color Palette:** Neutral grays + blue accent color  
**Interaction Level:** Fully interactive — hover states, focus rings, active states, clickable component previews  

---

## Brand

- **Name:** ComponentKit
- **Tagline:** (TBD — something like "Beautiful, accessible components for every project" or similar)
- **Primary CTA:** (e.g. "Get Started" or "Install ComponentKit")
- **Secondary CTA:** (e.g. "View Documentation" or "Browse Components")

---

## Page Structure & Sections

### 1. Navigation Bar (Sticky)
- Logo / brand name "ComponentKit" on the left
- Navigation links: Components, Documentation, GitHub, Blog
- CTA button ("Get Started") on the right
- Sticky on scroll with subtle backdrop blur
- Responsive hamburger menu for mobile

### 2. Hero Section
- **Headline:** Bold, large typography — conveys what ComponentKit is
- **Subheadline:** 1-2 sentence description of the value proposition
- **Primary CTA:** "Get Started" button (blue accent)
- **Secondary CTA:** "View Components" text link or ghost button
- **Hero Visual:** Interactive component showcase or animated preview of components
- Generous whitespace, centered or split layout

### 3. Feature Highlights
- 3-4 key benefits/features in a grid or horizontal row
- Each feature: icon + title + short description (1-2 sentences)
- Example features:
  - **Accessible:** WCAG 2.1 AA compliant out of the box
  - **Customizable:** Tailwind-based, easy to restyle
  - **Interactive:** Full state management — hover, focus, active
  - **Copy-Paste Ready:** Drop components directly into your project

### 4. Component Gallery / Showcase
- **Section heading:** "Explore Our Components" or similar
- **Tab navigation:** Tabs to switch between component categories:
  - Buttons
  - Form Elements
  - Cards & Modals
  - Navigation
  - Data Display
- **Component grid:** Each category shows a grid of component previews
- **Live previews:** Components are fully interactive within the gallery:
  - Buttons: hover, focus, active states work
  - Forms: inputs respond to typing, focus rings visible, selects open
  - Cards/modals: clickable, dismissible modals
  - Navigation: tabs switch content, navbars respond to hover
  - Data: tables sort on column click, tooltips appear on hover
- **Copy-paste code:** Each component has a "Copy Code" button that copies the HTML/Tailwind snippet to clipboard with a toast notification

### 5. Component Details (per component)
When a component is selected/focused in the gallery:
- Live preview (interactive)
- Code snippet (syntax highlighted, copyable)
- Props/options table showing available variants (size, color, state, etc.)
- Accessibility notes

### 6. Testimonials / Social Proof
- 3-4 testimonial cards with:
  - Quote text
  - Author name
  - Role / company
  - Avatar photo
- Or alternatively: logos of companies/teams using ComponentKit
- Stats row (e.g. "50+ components", "10K+ downloads", "99% accessibility score")

### 7. Footer
- Logo / brand name
- Column layout with links:
  - Product: Components, Documentation, Figma Kit
  - Resources: Blog, Changelog, Roadmap
  - Community: GitHub, Discord, Twitter/X
- Copyright notice
- Optional: Newsletter signup input

---

## Design Tokens & Visual System

### Colors
```
--color-bg:         #ffffff       (light mode background)
--color-bg-dark:    #0a0a0a       (dark mode background)
--color-surface:    #f5f5f5       (cards, panels - light)
--color-surface:    #1a1a1a       (cards, panels - dark)
--color-border:     #e5e5e5       (light borders)
--color-border:     #2a2a2a       (dark borders)
--color-text:       #0a0a0a       (primary text - light)
--color-text:       #fafafa       (primary text - dark)
--color-text-muted: #737373       (secondary text)
--color-primary:    #2563eb       (blue accent - primary)
--color-primary-hover: #1d4ed8    (blue accent - hover)
--color-primary-light: #dbeafe    (blue accent - light tint)
```

### Typography
- **Headings:** Inter or system font stack (font-sans), bold weight (700-800)
- **Body:** Inter or system font stack, regular weight (400)
- **Code:** JetBrains Mono or Fira Code (monospace)
- **Hero heading:** 48-64px, font-weight 800
- **Section headings:** 32-40px, font-weight 700
- **Body text:** 16-18px, font-weight 400, line-height 1.6

### Spacing
- Use Tailwind's default spacing scale (4px base unit)
- Section padding: 80-120px vertical, 24-48px horizontal
- Card padding: 24-32px
- Component gap: 16-24px

### Shadows & Effects
- Subtle box shadows on cards: `shadow-sm` or `shadow-md`
- Backdrop blur on sticky nav: `backdrop-blur-lg`
- Smooth transitions: `transition-all duration-200`
- Border radius: `rounded-lg` or `rounded-xl` for cards, `rounded-md` for buttons

---

## Dark Mode

- Full dark mode support via Tailwind's `dark:` class
- Toggle button in the navbar (sun/moon icon)
- Persist user preference in localStorage
- Default to system preference on first visit
- All components render correctly in both modes

---

## Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 640px) | Single column, stacked layout, hamburger nav |
| Tablet (640-1024px) | 2-column grid for components, condensed nav |
| Desktop (> 1024px) | Full layout, 3-4 column component grid, horizontal nav |

---

## Component Specifications

### Buttons
- **Variants:** Primary (blue), Secondary (outline), Ghost (transparent), Destructive (red)
- **Sizes:** sm, md, lg
- **States:** Default, Hover, Focus, Active, Disabled
- **Features:** Icon support (left/right), loading state, full-width option
- **Interactivity:** Click ripple effect, smooth hover transitions, focus ring on tab

### Form Elements
- **Inputs:** Text, email, password, number, search
- **Textarea:** Multi-line input with resize handle
- **Select:** Custom styled dropdown with search
- **Checkbox:** Custom styled with animation
- **Radio:** Custom styled with animation
- **States:** Default, Filled, Focused, Error, Disabled
- **Features:** Labels, helper text, error messages, required indicator

### Cards & Modals
- **Cards:** Default card, card with image, card with header/footer, hoverable card
- **Modals/Dialogs:** Basic modal, confirmation modal, form modal, full-screen modal
- **Alerts/Banners:** Info, success, warning, error variants with dismiss button
- **Interactivity:** Cards scale on hover, modals open/close with animation, alerts dismissable

### Navigation
- **Navbar:** Simple navbar, navbar with dropdowns, navbar with search
- **Tabs:** Underline tabs, pill tabs, enclosed tabs
- **Breadcrumbs:** Standard breadcrumb with separators
- **Sidebar:** Collapsible sidebar with nested items
- **Interactivity:** Active state highlighting, dropdown hover, tab switching

### Data Display
- **Tables:** Sortable columns, striped rows, hoverable rows, responsive
- **Badges:** Solid, outline, with dot indicator
- **Avatars:** Single avatar, avatar group, sizes
- **Progress:** Linear bar, circular
- **Tooltips:** Appear on hover, positioned top/right/bottom/left
- **Interactivity:** Table sort on click, tooltip show/hide, progress animation

---

## Technical Requirements

### Next.js (App Router)
- Use App Router (not Pages Router)
- Server components by default, client components only where interactivity is needed
- Proper metadata/SEO for the landing page

### Tailwind CSS
- Use Tailwind's utility classes exclusively
- Custom theme config for design tokens (colors, fonts, spacing)
- Dark mode via `class` strategy (for manual toggle support)
- Responsive design via Tailwind breakpoints (`sm:`, `md:`, `lg:`)

### Component Architecture
- Create reusable React components for the landing page itself
- Each showcased UI component should be a self-contained component
- Components should accept props for variant/size/state customization
- All components must include proper ARIA attributes and keyboard support

### Performance
- Lighthouse score target: 90+ on all metrics
- Use Next.js Image component for any images
- Lazy load below-the-fold content
- Minimal JavaScript bundle — keep components lightweight

### Accessibility
- WCAG 2.1 AA compliance for all components
- Proper focus management and keyboard navigation
- Screen reader friendly labels and announcements
- Sufficient color contrast ratios (4.5:1 minimum for text)
- Semantic HTML (headings hierarchy, landmarks, lists)

---

## File Structure (Proposed)

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Tailwind imports + custom styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ComponentGallery.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx
│   ├── ui/                 # The actual showcased components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Tabs.tsx
│   │   ├── Table.tsx
│   │   ├── Progress.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Alert.tsx
│   │   └── Navbar.tsx      # Showcase navbar component
│   └── shared/
│       ├── CodeBlock.tsx    # Syntax-highlighted code with copy button
│       ├── ThemeToggle.tsx  # Dark/light mode toggle
│       └── CopyButton.tsx   # Copy-to-clipboard button with toast
├── lib/
│   ├── componentData.ts    # Component metadata, code snippets, props
│   └── utils.ts            # Helper functions (cn, etc.)
├── hooks/
│   ├── useTheme.ts         # Theme management hook
│   └── useCopyToClipboard.ts
└── tailwind.config.ts      # Custom theme configuration
```

---

## Content Requirements

### Copy / Copywriting
- Headline should be benefit-driven, not feature-driven
- Use active voice and concise language
- Component descriptions should explain use cases, not just appearance
- Testimonials should be specific and credible

### Code Snippets
- Provide clean, copy-pasteable Tailwind + HTML for each component
- Show realistic usage examples (not just isolated components)
- Include brief comments for key props/options
- Keep snippets short (under 30 lines each)

---

## Implementation Priority

1. **P0 — Must Have:**
   - Hero section with CTA
   - Component gallery with tabs
   - Live interactive previews for all 5 categories
   - Copy-paste code snippets
   - Dark mode toggle
   - Responsive design (mobile + desktop)

2. **P1 — Should Have:**
   - Feature highlights section
   - Sticky navigation bar
   - Component props/variants display
   - Testimonials section
   - Syntax-highlighted code blocks

3. **P2 — Nice to Have:**
   - Scroll-based animations (fade-in on scroll)
   - Component search/filter
   - Figma download link
   - Newsletter signup in footer
   - Changelog / version display

---

## Open Questions / TBD

- [ ] Exact brand name confirmation (currently: ComponentKit)
- [ ] Specific tagline copy
- [ ] Hero visual: interactive demo vs. animated illustration vs. code snippet
- [ ] Testimonial source: placeholder content or real quotes?
- [ ] Whether to include a Figma Kit download section
- [ ] Whether to include pricing (free vs. paid tiers)
- [ ] Deployment target (Vercel, Netlify, etc.)
- [ ] Custom domain or subdomain?
