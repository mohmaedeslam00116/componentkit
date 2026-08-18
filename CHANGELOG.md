# Changelog

All notable changes to `@shadowskit/ui` will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added

#### CLI Tool (`@shadowskit/cli`)
- `shadowskit init` command — scaffolds project with CSS variables, `cn()` utility, and `components.json`
- `shadowskit add <component>` command — copies component source files and installs dependencies
- `shadowskit add --all` flag — installs every component at once
- Automatic package manager detection (npm, yarn, pnpm, bun)
- Component registry with dependency mapping for all 16 components

#### v1 Components (8)
- **Button** — Interactive button with `primary`, `secondary`, `ghost`, `destructive` variants; `sm`, `md`, `lg` sizes; loading state with spinner; `asChild` support via Radix Slot
- **Badge** — Inline label with `solid`, `secondary`, `destructive`, `outline`, `dot` variants; `sm`, `md` sizes; optional dot indicator
- **Input** — Text input with `sm`, `md`, `lg` sizes; error state with red border and `aria-invalid`; forwards all native input props
- **Card** — Content container with compound sub-components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`); `hoverable` variant with lift animation
- **Avatar** — User avatar with image and fallback support via `@radix-ui/react-avatar`; custom sizing via className
- **Tabs** — Tabbed navigation with `underline`, `pill`, `enclosed` variants via `@radix-ui/react-tabs`; full keyboard navigation
- **Select** — Dropdown select with items, groups, scroll buttons, labels, separators via `@radix-ui/react-select`; keyboard navigation and ARIA support
- **Dialog** — Modal dialog with overlay, focus trap, escape-to-close, backdrop click, enter/exit animations via `@radix-ui/react-dialog`; compound pattern with header, footer, title, description

#### v2 Components (8)
- **Tooltip** — Contextual popup on hover/focus via `@radix-ui/react-tooltip`; configurable delay, side, and offset
- **Progress** — Progress bar with `sm`, `md`, `lg` sizes; determinate and indeterminate modes with CSS animation
- **Toast** — Toast notifications powered by `sonner`; typed helpers for `default`, `success`, `error`, `warning`, `info`; themed via CSS variables
- **Accordion** — Collapsible content sections via `@radix-ui/react-accordion`; supports `single` and `multiple` modes; animated chevron icon
- **Dropdown Menu** — Context menu with items, checkbox items, radio items, labels, separators, sub-menus via `@radix-ui/react-dropdown-menu`; full keyboard navigation
- **Checkbox** — Toggle control with check indicator icon via `@radix-ui/react-checkbox`; supports `indeterminate` state; keyboard accessible
- **Switch** — Toggle switch with smooth thumb animation via `@radix-ui/react-switch`; focus ring support
- **Textarea** — Multi-line text input matching Input's API with `sm`, `md`, `lg` sizes; error state; resize-none by default

#### Documentation Site
- `/docs` overview page with installation guide, dependencies list, theming reference, and component grid
- `/docs/components/[slug]` dynamic route — per-component documentation pages for all 16 components
- Each doc page includes: description, installation command, import path, live interactive preview, code snippet, props table, accessibility notes, and customization guide
- Sticky sidebar navigation with component list and active state highlighting

#### Landing Page
- "New in v2 ✨" tab in ComponentGallery showcasing all v2 components
- Updated navbar with Docs link
- Hero "Get Started" button now links to `/docs`

#### Theming System
- CSS variable token system (`--ck-*` tokens) for light and dark modes
- Semantic color tokens: background, foreground, muted, border, primary, destructive, success, warning, accent, secondary
- Theme-agnostic — all colors defined via CSS variables, easily overridable

#### Testing Infrastructure
- Vitest with jsdom environment
- React Testing Library with `@testing-library/jest-dom` matchers
- `@testing-library/user-event` for interaction testing
- 85 tests across 13 test files covering all 16 components

### Dependencies Added
- `@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-select`, `@radix-ui/react-avatar`, `@radix-ui/react-slot` (v1)
- `@radix-ui/react-tooltip`, `@radix-ui/react-accordion`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-checkbox`, `@radix-ui/react-switch` (v2)
- `class-variance-authority` — variant management
- `sonner` — toast notifications
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom` (dev)
- `commander`, `execa`, `picocolors`, `prompts`, `tsup` (CLI dev)

---

## Component Reference

### v1 Components

| Component | Sub-components | Radix Primitive | Variants |
|-----------|---------------|----------------|----------|
| Button | — | `@radix-ui/react-slot` | `primary`, `secondary`, `ghost`, `destructive` |
| Badge | — | — | `solid`, `secondary`, `destructive`, `outline`, `dot` |
| Input | — | — | `sm`, `md`, `lg` + error state |
| Card | `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | — | `hoverable` |
| Avatar | `AvatarImage`, `AvatarFallback` | `@radix-ui/react-avatar` | — |
| Tabs | `TabsList`, `TabsTrigger`, `TabsContent` | `@radix-ui/react-tabs` | `underline`, `pill`, `enclosed` |
| Select | `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator` | `@radix-ui/react-select` | `sm`, `md`, `lg` |
| Dialog | `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` | `@radix-ui/react-dialog` | — |

### v2 Components

| Component | Sub-components | Radix Primitive | Variants |
|-----------|---------------|----------------|----------|
| Tooltip | `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | `@radix-ui/react-tooltip` | — |
| Progress | — | — | `sm`, `md`, `lg` + indeterminate |
| Toast | `Toaster`, `toast` | `sonner` | `default`, `success`, `error`, `warning`, `info` |
| Accordion | `AccordionItem`, `AccordionTrigger`, `AccordionContent` | `@radix-ui/react-accordion` | — |
| Dropdown Menu | `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator` | `@radix-ui/react-dropdown-menu` | — |
| Checkbox | — | `@radix-ui/react-checkbox` | — |
| Switch | — | `@radix-ui/react-switch` | — |
| Textarea | — | — | `sm`, `md`, `lg` + error state |

---

## Testing Summary

| File | Tests | Coverage |
|------|-------|----------|
| `button.test.tsx` | 9 | Variants, sizes, disabled, loading, className forwarding |
| `badge.test.tsx` | 8 | Variants, sizes, dot indicator, className forwarding |
| `input.test.tsx` | 10 | Sizes, error state, disabled, types, className forwarding |
| `card.test.tsx` | 10 | All sub-components, hoverable, className forwarding |
| `avatar.test.tsx` | 4 | Fallback, sizing, className forwarding |
| `tabs.test.tsx` | 5 | Renders, trigger states, variant classes |
| `select.test.tsx` | 5 | Renders, trigger, content, item selection |
| `dialog.test.tsx` | 5 | Renders, trigger, content, compound pattern |
| `tooltip.test.tsx` | 3 | Renders, open state, className forwarding |
| `progress.test.tsx` | 6 | Renders, aria attributes, sizes, indeterminate |
| `toast.test.tsx` | 2 | Renders, toast methods |
| `accordion.test.tsx` | 6 | Renders, expanded/collapsed, click, multiple items |
| `checkbox.test.tsx` | 7 | Renders, toggle, defaultChecked, disabled |
| `switch.test.tsx` | 7 | Renders, toggle, defaultChecked, disabled |
| `textarea.test.tsx` | 8 | Sizes, error state, disabled, resize-none |
| **Total** | **85** | **All passing** |

---

## Architecture Decisions

- **Distribution model**: Copy-paste (shadcn/ui model) — source lives in user projects, not node_modules
- **Styling**: Pre-styled with Tailwind CSS + CVA for variant management
- **Accessibility**: Built on Radix UI primitives for keyboard navigation, focus management, ARIA attributes
- **Theming**: CSS variable system (`--ck-*` tokens) — theme-agnostic, easily customizable
- **Package**: `@shadowskit/ui` (components) + `@shadowskit/cli` (scaffolding tool)
