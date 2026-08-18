# @shadowskit/ui — Component Library Spec

## Overview

**Project:** Convert the existing ComponentKit landing page project into a proper, reusable React UI component library distributed under the name **@shadowskit/ui**.  
**Architecture:** Copy-paste model (inspired by shadcn/ui) — a CLI tool scaffolds component source code directly into the user's project.  
**Tech Stack:** React 19 + TypeScript + Tailwind CSS v4 + Radix UI Primitives  
**Design Style:** Clean, minimal, professional — consistent with the existing landing page aesthetic (neutral grays + blue accent)  
**Package Name:** `@shadowskit/ui` (npm scope: `@shadowskit`)

---

## Design Philosophy

### Why copy-paste (not npm install)?
- **Full ownership:** Users own the source code and can modify anything
- **Zero version lock-in:** No breaking changes from upstream updates
- **Tree-shaking by default:** Only the code you copy is in your bundle
- **Easy customization:** Change any prop, class, or behavior without wrapper hacks
- **Framework-agnostic output:** The CLI can target Next.js, Vite, or plain React setups

### Why Radix UI?
- Battle-tested accessibility (WAI-ARIA patterns, focus trapping, keyboard navigation)
- Headless primitives — they provide logic, we provide Tailwind-styled wrappers
- Large community and active maintenance
- Used by shadcn/ui, which proves the pattern works at scale

### Why CSS variables for theming?
- Decouples theming from Tailwind — works with any Tailwind version or config
- Users can override variables in their own CSS without touching Tailwind config
- Supports runtime theme switching (light/dark/custom themes)
- Makes the library framework-agnostic in terms of styling

---

## v1 Component Scope

**8 core primitives** — cover buttons, forms, content display, navigation, and overlays.

| Component | Radix Primitive | Priority | Notes |
|-----------|----------------|----------|-------|
| **Button** | — (native button) | P0 | Variants: primary, secondary, ghost, destructive. Sizes: sm, md, lg. Loading, disabled, icon support. |
| **Input** | `@radix-ui/react-form` (optional) or native | P0 | Text, email, password, number, search. Error states, labels, helper text, required indicator. |
| **Card** | — (native div) | P0 | Container with header, content, footer sections. Hoverable variant. |
| **Dialog** | `@radix-ui/react-dialog` | P0 | Modal, alert dialog. Focus trap, close on escape, backdrop click, animation. |
| **Tabs** | `@radix-ui/react-tabs` | P1 | Underline, pill, and enclosed variants. Keyboard navigation. |
| **Select** | `@radix-ui/react-select` | P1 | Custom styled dropdown. Searchable variant. Disabled, error states. |
| **Badge** | — (native span) | P1 | Solid, outline, dot variants. Color: primary, success, warning, destructive, neutral. |
| **Avatar** | `@radix-ui/react-avatar` | P1 | Image with fallback initials/icon. Sizes: sm, md, lg. Group display. |

### Future components (v2+)
- Modal/Alert Dialog (variant of Dialog)
- Tooltip (`@radix-ui/react-tooltip`)
- Progress (linear, circular)
- Breadcrumb
- Sidebar
- Table (sortable, paginated)
- Toast/Sonner
- Accordion
- Dropdown Menu
- Popover
- Checkbox, Radio, Switch (form components)
- Textarea
- Toggle / Toggle Group

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (refactored to use library)
│   ├── page.tsx                # Landing page (refactored to showcase library)
│   ├── globals.css             # CSS variables, Tailwind imports
│   └── docs/
│       ├── page.tsx            # Docs landing page
│       └── components/
│           ├── button/page.tsx
│           ├── input/page.tsx
│           ├── card/page.tsx
│           ├── dialog/page.tsx
│           ├── tabs/page.tsx
│           ├── select/page.tsx
│           ├── badge/page.tsx
│           └── avatar/page.tsx
├── components/
│   ├── ui/                     # ★ THE LIBRARY (distributable components)
│   │   ├── index.ts            # Barrel export for all components
│   │   ├── button.tsx          # <Button /> with variants
│   │   ├── input.tsx           # <Input /> with label/error
│   │   ├── card.tsx            # <Card />, <CardHeader />, <CardContent />, <CardFooter />
│   │   ├── dialog.tsx          # <Dialog />, <DialogTrigger />, <DialogContent />, etc.
│   │   ├── tabs.tsx            # <Tabs />, <TabsList />, <TabsTrigger />, <TabsContent />
│   │   ├── select.tsx          # <Select />, <SelectTrigger />, <SelectContent />, etc.
│   │   ├── badge.tsx           # <Badge /> with variants
│   │   ├── avatar.tsx          # <Avatar />, <AvatarImage />, <AvatarFallback />
│   │   └── types.ts            # Shared types/interfaces
│   ├── layout/                 # Landing page layout (NOT part of library)
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/               # Landing page sections (NOT part of library)
│   │   ├── Hero.tsx            # Refactored to use library Button
│   │   ├── Features.tsx
│   │   ├── ComponentGallery.tsx # Refactored to use library components as live previews
│   │   └── Testimonials.tsx
│   └── shared/                 # Landing page shared utilities (NOT part of library)
│       ├── CodeBlock.tsx
│       ├── CopyButton.tsx
│       ├── ThemeToggle.tsx
│       └── AnimatedSection.tsx
├── lib/
│   ├── utils.ts                # cn() helper — part of library
│   └── componentData.ts        # Component metadata for docs/gallery
├── hooks/
│   └── useTheme.tsx            # Theme provider — part of library
└── registry/
    └── components.json         # Component registry manifest (for CLI)
```

---

## Component API Design

All components follow a consistent API pattern:

### General Principles
1. **Compound components** — complex components (Dialog, Tabs, Select) use compound pattern with sub-components
2. **Prop forwarding** — all native HTML attributes are forwarded via `...props`
3. **className merging** — all components accept a `className` prop merged with defaults via `cn()` (clsx + tailwind-merge)
4. **asChild pattern** — where applicable, allow rendering as a different element via `asChild` prop (Radix convention)
5. **RSC-compatible** — components are React Server Components by default; only interactive parts marked with `"use client"`

### Example: Button Component API

```tsx
// Button.tsx — React Server Component (no "use client" needed)
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        destructive: "bg-destructive text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

export function Button({ className, variant, size, loading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </button>
  )
}
```

### Example: Dialog Component API

```tsx
// Uses Radix primitives, wrapped with Tailwind styling
"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

// Export all Radix sub-components with styled wrappers
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogPortal = DialogPrimitive.Portal

export function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)}
      {...props}
    />
  )
}

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-2xl",
          className
        )}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
```

### Component Variants Summary

| Component | Variants | Sizes | States |
|-----------|----------|-------|--------|
| Button | primary, secondary, ghost, destructive | sm, md, lg | default, disabled, loading |
| Input | default, error | sm, md, lg | default, focused, disabled, error |
| Card | default, hoverable | — | default, hover |
| Dialog | default, alert | sm, md, lg | open, closed |
| Tabs | underline, pill, enclosed | — | active, inactive |
| Select | default, error | sm, md, lg | default, open, disabled, error |
| Badge | solid, outline, dot | sm, md | — |
| Avatar | image, fallback | sm, md, lg | loaded, error (fallback) |

---

## Variant Matrix — Exact Tailwind Classes

Below is the complete variant × size × state matrix for every v1 component. Each entry shows the exact Tailwind utility classes that compose that cell. All classes reference CSS variables from the design token system (`--ck-*` tokens exposed as `--color-*` via `@theme inline`).

### Shared Classes Reference

These base classes are shared across components and defined once:

```css
/* Focus ring — applied to all interactive elements */
.focus-ring:focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background

/* Transition default */
.transition-all duration-200

/* Disabled base */
disabled:pointer-events-none disabled:opacity-50
```

---

### 1. Button

**Base class:** `inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`

#### Variant × Size Matrix

| | `sm` | `md` (default) | `lg` |
|---|---|---|---|
| **primary** | `rounded-md bg-primary px-3 py-1.5 text-xs` | `rounded-lg bg-primary px-4 py-2 text-sm` | `rounded-lg bg-primary px-6 py-3 text-base` |
| **secondary** | `rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground` | `rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground` | `rounded-lg border border-border bg-background px-6 py-3 text-base text-foreground` |
| **ghost** | `rounded-md bg-transparent px-3 py-1.5 text-xs text-foreground` | `rounded-lg bg-transparent px-4 py-2 text-sm text-foreground` | `rounded-lg bg-transparent px-6 py-3 text-base text-foreground` |
| **destructive** | `rounded-md bg-destructive px-3 py-1.5 text-xs text-white` | `rounded-lg bg-destructive px-4 py-2 text-sm text-white` | `rounded-lg bg-destructive px-6 py-3 text-base text-white` |

#### Hover Classes per Variant

| Variant | Hover |
|---|---|
| primary | `hover:bg-primary-hover` |
| secondary | `hover:bg-muted` |
| ghost | `hover:bg-muted` |
| destructive | `hover:opacity-90` |

#### State Modifiers

| State | Classes Applied |
|---|---|
| **disabled** (all variants) | `disabled:pointer-events-none disabled:opacity-50` |
| **loading** (all variants) | Same as default + `[&_svg]:animate-spin` on spinner icon, `aria-busy="true"` |
| **icon-only** (all sizes) | Add `h-9 w-9` (sm), `h-10 w-10` (md), `h-12 w-12` (lg); remove px padding |

#### Full CVA Definition

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        destructive: "bg-destructive text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-10 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
```

---

### 2. Input

**Base class:** `flex w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50`

#### Variant × Size Matrix

| | `sm` | `md` (default) | `lg` |
|---|---|---|---|
| **default** | `h-8 rounded-md border-border px-3 py-1 text-xs` | `h-10 rounded-lg border-border px-3 py-2 text-sm` | `h-12 rounded-lg border-border px-4 py-3 text-base` |
| **error** | `h-8 rounded-md border-destructive px-3 py-1 text-xs` | `h-10 rounded-lg border-destructive px-3 py-2 text-sm` | `h-12 rounded-lg border-destructive px-4 py-3 text-base` |

#### State Modifiers

| State | Classes Applied |
|---|---|
| **focused** (default) | `focus:border-primary focus:ring-2 focus:ring-primary/20` |
| **focused** (error) | `focus:border-destructive focus:ring-2 focus:ring-destructive/20` |
| **disabled** | `disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted` |
| **error message** | Below input: `mt-1 text-xs text-destructive` |
| **helper text** | Below input: `mt-1 text-xs text-muted-foreground` |

#### Label Classes

| Element | Classes |
|---|---|
| Label | `mb-1.5 block text-sm font-medium text-foreground` |
| Required indicator | `text-destructive ml-0.5` |
| Error message | `mt-1 text-xs text-destructive` |
| Helper text | `mt-1 text-xs text-muted-foreground` |

#### Full CVA Definition

```tsx
const inputVariants = cva(
  "flex w-full border bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "h-8 rounded-md px-3 py-1 text-xs",
        md: "h-10 rounded-lg px-3 py-2 text-sm",
        lg: "h-12 rounded-lg px-4 py-3 text-base",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive/20",
        false: "border-border",
      },
    },
    defaultVariants: {
      inputSize: "md",
      error: false,
    },
  }
)
```

---

### 3. Card

**Base class:** `rounded-xl border border-border bg-background text-foreground transition-all duration-200`

#### Variant × Size Matrix

| | Default padding | Compact padding |
|---|---|---|
| **default** | `rounded-xl border border-border bg-background p-6` | `rounded-xl border border-border bg-background p-4` |
| **hoverable** | `rounded-xl border border-border bg-background p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 dark:hover:shadow-black/20` | `rounded-xl border border-border bg-background p-4 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5` |

#### Sub-component Classes

| Sub-component | Classes |
|---|---|
| `CardHeader` | `flex flex-col space-y-1.5 p-6` |
| `CardContent` | `p-6 pt-0` |
| `CardFooter` | `flex items-center p-6 pt-0` |
| `CardTitle` | `text-lg font-semibold leading-none tracking-tight text-foreground` |
| `CardDescription` | `text-sm text-muted-foreground` |

#### State Modifiers

| State | Classes Applied |
|---|---|
| **hover** (hoverable only) | `hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5` |
| **dark hover** (hoverable only) | `dark:hover:shadow-black/20` |

---

### 4. Dialog

**Built on:** `@radix-ui/react-dialog`

#### Sub-component Classes

| Sub-component | Classes |
|---|---|
| **DialogOverlay** | `fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0` |
| **DialogContent** | `fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg` |
| **DialogHeader** | `flex flex-col space-y-1.5 text-center sm:text-left` |
| **DialogTitle** | `text-lg font-semibold leading-none tracking-tight text-foreground` |
| **DialogDescription** | `text-sm text-muted-foreground` |
| **DialogClose** | `absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-muted` |

#### Size Matrix

| Size | Classes |
|---|---|
| **sm** | `max-w-sm` |
| **md** (default) | `max-w-lg` |
| **lg** | `max-w-xl` |
| **xl** | `max-w-2xl` |
| **full** | `max-w-[calc(100vw-2rem)]` |

#### Animation Classes (via `tailwindcss-animate` / `tw-animate-css`)

| Animation | Trigger |
|---|---|
| `data-[state=open]:fade-in-0` | Overlay/content enter |
| `data-[state=closed]:fade-out-0` | Overlay/content exit |
| `data-[state=open]:zoom-in-95` | Content scale in |
| `data-[state=closed]:zoom-out-95` | Content scale out |
| `data-[state=open]:slide-in-from-left-1/2` | Content slide in from center |
| `data-[state=closed]:slide-out-to-left-1/2` | Content slide out to center |

---

### 5. Tabs

**Built on:** `@radix-ui/react-tabs`

#### Variant × Size Matrix

| | `sm` | `md` (default) |
|---|---|---|
| **underline** | `border-b text-xs` | `border-b text-sm` |
| **pill** | `rounded-md px-3 py-1 text-xs` | `rounded-lg px-4 py-2 text-sm` |
| **enclosed** | `rounded-t-md border border-b-0 text-xs` | `rounded-t-lg border border-b-0 text-sm` |

#### Sub-component Classes

| Sub-component | Variant | Classes |
|---|---|---|
| **TabsList** | underline | `flex gap-1 border-b border-border` |
| | pill | `inline-flex gap-1 rounded-lg bg-muted p-1` |
| | enclosed | `flex gap-1` |
| **TabsTrigger** | underline | `border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary` |
| | pill | `rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm` |
| | enclosed | `rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-border data-[state=active]:border-b-transparent data-[state=active]:bg-background data-[state=active]:text-foreground` |
| **TabsContent** | all | `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2` |

#### State Classes

| State | Classes Applied |
|---|---|
| **active trigger** | Per-variant classes listed above (active state) |
| **inactive trigger** | Base muted colors + hover states |
| **disabled trigger** | `disabled:pointer-events-none disabled:opacity-50` |

---

### 6. Select

**Built on:** `@radix-ui/react-select`

#### Sub-component Classes

| Sub-component | Classes |
|---|---|
| **SelectTrigger** (base) | `flex h-10 w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1` |
| **SelectContent** | `relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2` |
| **SelectItem** | `relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50` |
| **SelectLabel** | `py-1.5 pl-8 pr-2 text-sm font-semibold text-foreground` |
| **SelectSeparator** | `-mx-1 my-1 h-px bg-border` |
| **SelectScrollUpButton** | `flex cursor-default items-center justify-center py-1` |
| **SelectScrollDownButton** | `flex cursor-default items-center justify-center py-1` |

#### Size Matrix

| Size | Trigger Classes |
|---|---|
| **sm** | `h-8 rounded-md px-3 py-1 text-xs` |
| **md** (default) | `h-10 rounded-lg px-3 py-2 text-sm` |
| **lg** | `h-12 rounded-lg px-4 py-3 text-base` |

#### State Modifiers

| State | Classes Applied |
|---|---|
| **open trigger** | `ring-2 ring-primary/20 ring-offset-2 ring-offset-background` |
| **error** | `border-destructive focus:ring-destructive/20` |
| **disabled trigger** | `disabled:cursor-not-allowed disabled:opacity-50` |
| **selected item** | `font-medium text-primary` + check icon with `absolute left-2 h-3.5 w-3.5` |
| **indicator** | `absolute left-2 h-3.5 w-3.5 flex items-center justify-center` |

---

### 7. Badge

**Base class:** `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`

#### Variant × Size Matrix

| | `sm` | `md` (default) |
|---|---|---|
| **solid** (default) | `rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary` | `rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary` |
| **secondary** | `rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground` | `rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground` |
| **destructive** | `rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive` | `rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs text-destructive` |
| **outline** | `rounded-full border-border bg-transparent px-2 py-0.5 text-[10px] text-foreground` | `rounded-full border-border bg-transparent px-2.5 py-0.5 text-xs text-foreground` |
| **dot** | `rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary` | `rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary` |

#### Color Variants (applied over any base variant)

| Color | Classes |
|---|---|
| **primary** | `bg-primary/10 text-primary` (solid) |
| **success** | `bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400` |
| **warning** | `bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400` |
| **destructive** | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` |
| **neutral** | `bg-muted text-muted-foreground` |

#### Dot Indicator Variant

When `variant="dot"`, prepend a dot element:
```html
<span class="mr-1.5 h-2 w-2 rounded-full bg-current" />
```

#### Full CVA Definition

```tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        solid: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-muted text-muted-foreground",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
        dot: "border-transparent bg-primary/10 text-primary",
      },
      badgeSize: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "solid",
      badgeSize: "md",
    },
  }
)
```

---

### 8. Avatar

**Built on:** `@radix-ui/react-avatar`

#### Sub-component Classes

| Sub-component | Classes |
|---|---|
| **Avatar** (wrapper) | `relative flex shrink-0 overflow-hidden rounded-full` |
| **AvatarImage** | `aspect-square h-full w-full` |
| **AvatarFallback** | `flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground` |

#### Size Matrix

| Size | Avatar Classes | Fallback Font Size |
|---|---|---|
| **sm** | `h-8 w-8` | `text-xs` |
| **md** (default) | `h-10 w-10` | `text-sm` |
| **lg** | `h-12 w-12` | `text-base` |
| **xl** | `h-16 w-16` | `text-lg` |

#### Avatar Group Classes

| Element | Classes |
|---|---|
| **Group wrapper** | `flex -space-x-2` |
| **Grouped avatar** | `ring-2 ring-background` (overlaps with ring to create stack effect) |
| **Overflow count** | `flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background` |

#### State Classes

| State | Classes Applied |
|---|---|
| **image loaded** | `AvatarImage` rendered, `AvatarFallback` hidden |
| **image error** | `AvatarImage` hidden (via `onError`), `AvatarFallback` shown |
| **loading** | Optional: `animate-pulse bg-muted` on fallback while image loads |

#### Full Component Structure

```tsx
function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
```

---

### Dark Mode Classes Reference

All components support dark mode via Tailwind's `dark:` variant. The CSS variable system handles the heavy lifting, but some components need explicit dark overrides:

| Context | Light | Dark |
|---|---|---|
| Card hover shadow | `hover:shadow-black/5` | `dark:hover:shadow-black/20` |
| Badge success | `bg-green-100 text-green-700` | `dark:bg-green-900/30 dark:text-green-400` |
| Badge warning | `bg-yellow-100 text-yellow-700` | `dark:bg-yellow-900/30 dark:text-yellow-400` |
| Badge destructive | `bg-red-100 text-red-700` | `dark:bg-red-900/30 dark:text-red-400` |
| Dialog overlay | `bg-black/80` | `bg-black/80` (same) |
| Alert success | `bg-green-50 border-green-200` | `dark:bg-green-900/20 dark:border-green-900/50` |

Most colors (background, foreground, primary, etc.) are handled by the `--ck-*` CSS variables and do **not** need explicit `dark:` classes.

---

### Animation Classes Reference

Used by Dialog and Select. Requires `tw-animate-css` (or `tailwindcss-animate`) package:

| Utility | Effect |
|---|---|
| `animate-in fade-in-0` | Fade from 0 to 1 opacity |
| `animate-out fade-out-0` | Fade from 1 to 0 opacity |
| `zoom-in-95` | Scale from 95% to 100% |
| `zoom-out-95` | Scale from 100% to 95% |
| `slide-in-from-top-2` | Slide down from 2 units above |
| `slide-in-from-bottom-2` | Slide up from 2 units below |
| `slide-in-from-left-1/2` | Slide in from 50% left |
| `slide-out-to-left-1/2` | Slide out to 50% left |

Add `data-[state=open]:` or `data-[state=closed]:` prefix to trigger on Radix state changes.

---

## CLI Tool Design

A CLI tool that scaffolds components into the user's project:

### Installation
```bash
npx @shadowskit/ui init        # Initialize: creates globals.css with CSS variables, adds cn() utility
npx @shadowskit/ui add button  # Adds button.tsx to src/components/ui/
npx @shadowskit/ui add card    # Adds card.tsx to src/components/ui/
npx @shadowskit/ui add --all   # Adds all v1 components
```

### What the CLI does:
1. **`init` command:**
   - Creates/updates `src/lib/utils.ts` with `cn()` helper
   - Creates/updates `src/app/globals.css` with CSS variable definitions
   - Adds `clsx` and `tailwind-merge` to `package.json` if not present
   - Adds `@radix-ui/*` packages for interactive components
   - Creates `components.json` config file

2. **`add <component>` command:**
   - Downloads component source from the registry
   - Places it in `src/components/ui/`
   - Installs required dependencies (Radix packages)
   - Updates imports if needed

### Registry Manifest (`components.json`):
```json
{
  "$schema": "https://shadowskit.dev/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## Design Token System (CSS Variables)

All theming via CSS variables. No Tailwind config dependencies.

### `globals.css` — Theme Variables

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  /* Library design tokens */
  --color-background: var(--ck-background);
  --color-foreground: var(--ck-foreground);
  --color-muted: var(--ck-muted);
  --color-muted-foreground: var(--ck-muted-foreground);
  --color-border: var(--ck-border);
  --color-primary: var(--ck-primary);
  --color-primary-hover: var(--ck-primary-hover);
  --color-primary-light: var(--ck-primary-light);
  --color-surface: var(--ck-surface);
  --color-destructive: var(--ck-destructive);
}

/* Light mode (default) */
:root {
  --ck-background: #ffffff;
  --ck-foreground: #0a0a0a;
  --ck-muted: #f5f5f5;
  --ck-muted-foreground: #737373;
  --ck-border: #e5e5e5;
  --ck-primary: #2563eb;
  --ck-primary-hover: #1d4ed8;
  --ck-primary-light: #dbeafe;
  --ck-surface: #f5f5f5;
  --ck-destructive: #ef4444;
}

/* Dark mode */
.dark {
  --ck-background: #0a0a0a;
  --ck-foreground: #fafafa;
  --ck-muted: #1a1a1a;
  --ck-muted-foreground: #a3a3a3;
  --ck-border: #2a2a2a;
  --ck-primary: #3b82f6;
  --ck-primary-hover: #60a5fa;
  --ck-primary-light: #1e3a5f;
  --ck-surface: #1a1a1a;
  --ck-destructive: #f87171;
}

/* Component-specific tokens */
:root {
  --ck-radius-sm: 0.375rem;
  --ck-radius-md: 0.5rem;
  --ck-radius-lg: 0.75rem;
  --ck-radius-xl: 1rem;
  --ck-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --ck-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --ck-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

Users override by redefining variables in their own CSS:
```css
:root {
  --ck-primary: #7c3aed;  /* purple theme */
  --ck-primary-hover: #6d28d9;
}
```

---

## Landing Page Refactoring Plan

The existing landing page code should be refactored to **use the new library components**, proving they work in real scenarios and serving as live documentation.

### What changes:

| Existing Code | Refactored To |
|---------------|---------------|
| `src/components/ui/` (new) | Library components (Button, Input, Card, etc.) |
| `src/components/sections/Hero.tsx` | Uses `<Button>` from library for CTAs |
| `src/components/sections/ComponentGallery.tsx` | Previews are replaced by actual library component imports |
| `src/components/sections/Features.tsx` | Uses `<Card>` from library |
| `src/components/sections/Testimonials.tsx` | Uses `<Avatar>` from library for author photos |
| `src/components/sections/ComponentGallery.tsx` tabs | Uses `<Tabs>` from library |
| CTA section in `page.tsx` | Uses `<Button>` from library |

### What stays the same:
- `src/components/layout/Navbar.tsx` — landing page specific (not a library component)
- `src/components/layout/Footer.tsx` — landing page specific
- `src/components/shared/CodeBlock.tsx` — docs/gallery specific
- `src/components/shared/CopyButton.tsx` — docs/gallery specific
- `src/components/shared/ThemeToggle.tsx` — landing page specific
- `src/components/shared/AnimatedSection.tsx` — landing page specific

---

## Documentation Site (`/docs`)

A dedicated docs section within the Next.js app, not a separate site.

### Route Structure:
```
/docs                        → Overview, installation guide
/docs/components/button      → Button docs
/docs/components/input       → Input docs
/docs/components/card        → Card docs
/docs/components/dialog      → Dialog docs
/docs/components/tabs        → Tabs docs
/docs/components/select      → Select docs
/docs/components/badge       → Badge docs
/docs/components/avatar      → Avatar docs
/docs/theming                → Theme customization guide
/docs/cli                    → CLI usage guide
```

### Each component doc page includes:
1. **Title + description** — what the component does
2. **Installation** — `npx @shadowskit/ui add <component>` command
3. **Live preview** — interactive component demo (same as current gallery but component-specific)
4. **Code snippet** — syntax-highlighted, copyable source code
5. **Props table** — all props with types, defaults, and descriptions
6. **Variants showcase** — visual grid of all variant/size combinations
7. **Accessibility notes** — ARIA attributes, keyboard shortcuts, focus behavior
8. **Customization guide** — how to override styles, change theme
9. **Radix primitive reference** — link to underlying Radix docs

---

## Accessibility Requirements

- **WCAG 2.1 AA** compliance for all components
- **Keyboard navigation:** Full keyboard support (Tab, Enter, Escape, Arrow keys)
- **Focus management:** Visible focus rings, focus trapping in dialogs
- **Screen readers:** Proper ARIA labels, roles, and live regions
- **Color contrast:** 4.5:1 minimum for text, 3:1 for UI components
- **Motion:** Respect `prefers-reduced-motion` for animations
- **Semantic HTML:** Proper heading hierarchy, landmarks, lists

Radix UI handles most of this automatically — our job is to not break it with styling.

---

## Dependencies

### Runtime (in user projects, added by CLI):
```
@radix-ui/react-dialog       # Dialog component
@radix-ui/react-tabs         # Tabs component
@radix-ui/react-select       # Select component
@radix-ui/react-avatar       # Avatar component
clsx                         # Conditional classes
tailwind-merge               # Merge Tailwind classes
lucide-react                 # Icons (X, ChevronDown, etc.)
```

### Dev dependencies (in the component library project itself):
```
class-variance-authority      # Variant management (cva)
typescript                   # Type checking
```

Note: `class-variance-authority` (cva) is the one "extra" dependency. It provides a clean API for managing component variants (size, color, state) and is used by shadcn/ui itself. It's tiny (~2KB gzipped) and adds no runtime overhead beyond what Tailwind already provides.

### Why CVA over manual class strings?
- Clean variant definitions: `cva("base-class", { variants: { size: { sm: "...", lg: "..." } } })`
- Composable: variants merge cleanly with custom className
- Type-safe: TypeScript infers variant prop types automatically
- Used by shadcn/ui — proven pattern

---

## Implementation Order

### Phase 1: Foundation (prerequisites)
1. Install Radix UI packages, class-variance-authority, clsx, tailwind-merge
2. Create `src/components/ui/` directory
3. Create `src/lib/utils.ts` (already exists, verify `cn()` export)
4. Set up CSS variables in `globals.css` (prefixed with `--ck-`)

### Phase 2: Core Components (v1)
5. **Button** — simplest, proves the pattern
6. **Badge** — simple, no Radix dependency
7. **Input** — form foundation
8. **Card** — layout foundation
9. **Avatar** — simple Radix primitive
10. **Tabs** — navigation foundation
11. **Select** — form interaction
12. **Dialog** — overlay foundation

### Phase 3: Landing Page Refactoring
13. Refactor Hero section to use library `<Button>`
14. Refactor CTA section to use library `<Button>`
15. Refactor ComponentGallery to import library components as live previews
16. Refactor Features to use library `<Card>` (if applicable)

### Phase 4: Documentation
17. Create `/docs` route structure
18. Build docs page template (preview + code + props table)
19. Write docs for each component
20. Add installation guide and theming guide

### Phase 5: CLI Tool
21. Create registry manifest (`components.json`)
22. Build `init` command
23. Build `add` command
24. Test CLI with fresh Next.js project

### Phase 6: Polish
25. Add loading states, error states to all components
26. Verify dark mode for all components
27. Test keyboard navigation and screen reader output
28. Run Lighthouse audit
29. Write CHANGELOG.md

---

## Quality Checklist

- [ ] All components accept `className` prop and merge with defaults
- [ ] All interactive components forward refs (`React.forwardRef`)
- [ ] All components have TypeScript type exports
- [ ] All components work in both light and dark mode
- [ ] All interactive components support keyboard navigation
- [ ] All interactive components have visible focus rings
- [ ] Loading states are accessible (aria-busy, aria-live)
- [ ] No console warnings in development mode
- [ ] Bundle size < 5KB per component (gzipped, excluding Radix)
- [ ] Landing page Lighthouse score ≥ 90 on all metrics
- [ ] CLI works on fresh Next.js 16 + Tailwind v4 project

---

## Open Questions / TBD

- [ ] Should we add `React.forwardRef` to all components (React 19 deprecates it, but Radix still uses it)?
- [ ] Should the CLI support Vite/SPA projects, or Next.js only for v1?
- [ ] Should we provide Figma tokens as part of the library package?
- [ ] Should the docs page include a "Copy Code" button for each component's source?
- [ ] Should we add a playground/sandbox where users can customize components live?
- [ ] Versioning strategy: should the registry be versioned separately from the landing page?
