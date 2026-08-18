# @shadowskit/ui — Next Steps Spec

## Current State Summary

**What's done (Phases 1-4):**
- ✅ Foundation: Radix UI, CVA, clsx, tailwind-merge installed; CSS variable system (--ck-* tokens)
- ✅ 8 v1 components: Button, Badge, Input, Card, Avatar, Tabs, Select, Dialog
- ✅ Landing page refactored to use library components
- ✅ Documentation site at `/docs` with per-component pages (live previews, props tables, code snippets)

**What remains:**
- ❌ Phase 5: CLI tool (`@shadowskit/cli`) — separate npm package
- ❌ Phase 6: Polish & hardening — dark mode, a11y, Lighthouse, CHANGELOG
- ❌ v2 components (8 new)
- ❌ Testing infrastructure

---

## Part 1: CLI Tool — `@shadowskit/cli`

### Overview
A separate npm package that scaffolds @shadowskit/ui components into a user's project. Follows the shadcn/ui CLI model.

### Package Setup
```
packages/
  cli/
    package.json        # name: "@shadowskit/cli", bin: { shadowskit: "./dist/index.js" }
    src/
      index.ts          # Entry point — parses commands
      commands/
        init.ts         # `shadowskit init` command
        add.ts          # `shadowskit add <component>` command
      registry.ts       # Component registry — maps component names to file URLs
      utils/
        fs.ts           # File system helpers (write file, create dir)
        deps.ts         # Dependency installation helpers
        config.ts       # Read/write components.json
    dist/               # Compiled output
    tsconfig.json
```

### Commands

#### `npx @shadowskit/cli init`
1. Detect project framework (Next.js by default for v1)
2. Create/update `src/lib/utils.ts` with `cn()` helper
3. Create/update `src/app/globals.css` with CSS variable definitions (--ck-* tokens)
4. Install dependencies: `clsx`, `tailwind-merge`
5. Create `components.json` config file
6. Print success message with next steps

#### `npx @shadowskit/cli add <component>`
1. Read `components.json` to get project config (aliases, paths)
2. Download component source from registry (GitHub raw URLs or npm)
3. Place file in `src/components/ui/<component>.tsx`
4. Install component-specific dependencies (Radix packages, sonner, etc.)
5. Update barrel export `src/components/ui/index.ts` if it exists
6. Print success message with import example

#### `npx @shadowskit/cli add --all`
- Runs `add` for every v1 component

### Registry Structure
Each component entry in the registry maps a name to its source files and dependencies:

```typescript
// registry.ts
export const registry = {
  button: {
    files: ["button.tsx"],
    dependencies: [],
    devDependencies: [],
  },
  badge: {
    files: ["badge.tsx"],
    dependencies: [],
    devDependencies: [],
  },
  input: {
    files: ["input.tsx"],
    dependencies: [],
    devDependencies: [],
  },
  card: {
    files: ["card.tsx"],
    dependencies: [],
    devDependencies: [],
  },
  avatar: {
    files: ["avatar.tsx"],
    dependencies: ["@radix-ui/react-avatar"],
    devDependencies: [],
  },
  tabs: {
    files: ["tabs.tsx"],
    dependencies: ["@radix-ui/react-tabs"],
    devDependencies: [],
  },
  select: {
    files: ["select.tsx"],
    dependencies: ["@radix-ui/react-select"],
    devDependencies: [],
  },
  dialog: {
    files: ["dialog.tsx"],
    dependencies: ["@radix-ui/react-dialog", "@radix-ui/react-slot"],
    devDependencies: [],
  },
  // v2 components
  tooltip: {
    files: ["tooltip.tsx"],
    dependencies: ["@radix-ui/react-tooltip"],
    devDependencies: [],
  },
  progress: {
    files: ["progress.tsx"],
    dependencies: [],
    devDependencies: [],
  },
  toast: {
    files: ["toast.tsx"],
    dependencies: ["sonner"],
    devDependencies: [],
  },
  accordion: {
    files: ["accordion.tsx"],
    dependencies: ["@radix-ui/react-accordion"],
    devDependencies: [],
  },
  "dropdown-menu": {
    files: ["dropdown-menu.tsx"],
    dependencies: ["@radix-ui/react-dropdown-menu"],
    devDependencies: [],
  },
  checkbox: {
    files: ["checkbox.tsx"],
    dependencies: ["@radix-ui/react-checkbox"],
    devDependencies: [],
  },
  switch: {
    files: ["switch.tsx"],
    dependencies: ["@radix-ui/react-switch"],
    devDependencies: [],
  },
  textarea: {
    files: ["textarea.tsx"],
    dependencies: [],
    devDependencies: [],
  },
};
```

### `components.json` Config
```json
{
  "$schema": "https://shadowskit.dev/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "framework": "nextjs"
}
```

### Source File Strategy
Component source files are stored as raw `.tsx` files in the CLI package itself (under `src/templates/` or similar). When the user runs `add`, the CLI copies these files directly into their project. This is the same approach shadcn/ui uses — the source lives in the registry, not in node_modules.

### Key Implementation Details
- Use `commander` or `citty` for CLI argument parsing
- Use `picocolors` for terminal colors (lightweight)
- Use `execa` for running npm install commands
- Detect package manager (npm/yarn/pnpm/bun) from lock files
- Handle edge cases: component already exists (overwrite prompt), missing globals.css, missing utils.ts

---

## Part 2: v2 Components (8 new)

### Component Specifications

#### 1. Tooltip
- **Radix Primitive:** `@radix-ui/react-tooltip`
- **Sub-components:** Tooltip, TooltipTrigger, TooltipContent, TooltipProvider
- **Variants:** none (single style)
- **Props:** `delayDuration`, `side` (top/right/bottom/left), `sideOffset`
- **Classes:** Content gets `rounded-md bg-foreground px-2.5 py-1 text-xs text-background shadow-md`

#### 2. Progress
- **Radix Primitive:** None (pure Tailwind)
- **Sub-components:** Progress (single component)
- **Props:** `value` (0-100), `max`, `indeterminate`
- **Variants:** none
- **Classes:** Track: `h-2 w-full overflow-hidden rounded-full bg-muted`. Indicator: `h-full rounded-full bg-primary transition-all`

#### 3. Toast (via sonner)
- **Library:** `sonner` (installed as dependency)
- **Sub-components:** Toaster (provider), toast (function call)
- **Props:** `title`, `description`, `variant` (default/success/error/warning/info), `duration`, `action`
- **Usage:** `toast("Message")`, `toast.success("Done!")`, `toast.error("Failed")`
- **Integration:** Toaster component placed in layout, themed via CSS variables

#### 4. Accordion
- **Radix Primitive:** `@radix-ui/react-accordion`
- **Sub-components:** Accordion, AccordionItem, AccordionTrigger, AccordionContent
- **Props:** `type` (single/multiple), `collapsible`
- **Variants:** none (single style)
- **Classes:** Item: `border-b border-border`. Trigger: `flex items-center justify-between py-4 font-medium`. Content: `overflow-hidden text-sm`. Chevron animation on open/close.

#### 5. Dropdown Menu
- **Radix Primitive:** `@radix-ui/react-dropdown-menu`
- **Sub-components:** DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel
- **Props:** `align` (start/center/end), `sideOffset`
- **Classes:** Content: `z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background p-1 shadow-md`. Item: `flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-muted`.

#### 6. Checkbox
- **Radix Primitive:** `@radix-ui/react-checkbox`
- **Sub-components:** Checkbox (single component, usually with Label)
- **Props:** `checked`, `defaultChecked`, `onCheckedChange`, `disabled`
- **Variants:** none
- **Classes:** Root: `h-4 w-4 rounded border border-border`. Indicator: check icon with `text-white`. Checked: `bg-primary border-primary`. Focus: `focus-visible:ring-2 focus-visible:ring-primary/50`.

#### 7. Switch
- **Radix Primitive:** `@radix-ui/react-switch`
- **Sub-components:** Switch (single component)
- **Props:** `checked`, `defaultChecked`, `onCheckedChange`, `disabled`
- **Variants:** none
- **Classes:** Root: `h-5 w-9 rounded-full bg-muted`. Thumb: `h-4 w-4 rounded-full bg-background shadow-sm`. Checked: `bg-primary`. Thumb translate on checked.

#### 8. Textarea
- **Radix Primitive:** None (native textarea)
- **Sub-components:** Textarea (single component)
- **Props:** Same as Input — `inputSize` (sm/md/lg), `error`, `placeholder`, `disabled`
- **Variants:** Same CVA pattern as Input
- **Classes:** Same base as Input but with `min-h-[80px] resize-none`

### v2 Dependencies to Install
```
@radix-ui/react-tooltip
@radix-ui/react-accordion
@radix-ui/react-dropdown-menu
@radix-ui/react-checkbox
@radix-ui/react-switch
sonner
```

### v2 Component File List
```
src/components/ui/
  ├── tooltip.tsx
  ├── progress.tsx
  ├── toast.tsx
  ├── accordion.tsx
  ├── dropdown-menu.tsx
  ├── checkbox.tsx
  ├── switch.tsx
  └── textarea.tsx
```

### v2 Docs Pages
Each new component gets its own doc page at `/docs/components/<slug>`:
- `/docs/components/tooltip`
- `/docs/components/progress`
- `/docs/components/toast`
- `/docs/components/accordion`
- `/docs/components/dropdown-menu`
- `/docs/components/checkbox`
- `/docs/components/switch`
- `/docs/components/textarea`

### v2 Registry Additions
Update `src/lib/componentData.ts` with 8 new ComponentDoc entries.
Update `src/components/docs/ComponentPreview.tsx` with 8 new demo components.
Update `src/components/ui/index.ts` barrel export.

---

## Part 3: Testing Infrastructure

### Stack
- **Vitest** — fast test runner, native ESM, Vite-compatible
- **React Testing Library** — component testing utilities
- **@testing-library/jest-dom** — DOM matchers (toBeInTheDocument,toHaveClass, etc.)
- **jsdom** — browser environment simulation

### Setup
```
packages/
  cli/                    # CLI package (separate)
src/
  __tests__/              # Test files co-located or in __tests__
    components/
      button.test.tsx
      badge.test.tsx
      input.test.tsx
      card.test.tsx
      avatar.test.tsx
      tabs.test.tsx
      select.test.test.tsx
      dialog.test.tsx
      tooltip.test.tsx
      progress.test.tsx
      toast.test.tsx
      accordion.test.tsx
      dropdown-menu.test.tsx
      checkbox.test.tsx
      switch.test.tsx
      textarea.test.tsx
    setup.ts              # Test setup (configureTestingLibrary, etc.)
vitest.config.ts          # Vitest configuration
```

### Test Categories Per Component

Each component should have tests covering:

1. **Renders correctly** — component mounts without errors
2. **Variants render** — each variant applies correct classes
3. **Sizes render** — each size applies correct classes
4. **Props forwarding** — custom className, data attributes, aria attributes
5. **States** — disabled, loading, error states work correctly
6. **Keyboard navigation** — Tab, Enter, Escape, Arrow keys where applicable
7. **Dark mode** — component renders correctly (classes include dark: variants or CSS vars)
8. **Compound components** — sub-components render together correctly

### Example Test Structure
```typescript
// button.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })

  it("applies primary variant classes", () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("bg-primary")
  })

  it("applies size classes", () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("h-12")
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("shows spinner when loading", () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true")
  })

  it("forwards className", () => {
    render(<Button className="custom-class">Test</Button>)
    expect(screen.getByRole("button").className).toContain("custom-class")
  })
})
```

### Vitest Config
```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/components/ui/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### New Dev Dependencies
```
vitest
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
jsdom
```

---

## Part 4: Polish & Hardening (Phase 6)

### Dark Mode Verification
- Manually verify all 8 v1 + 8 v2 components in dark mode
- Ensure no hardcoded colors — all via CSS variables
- Check contrast ratios in dark mode

### Accessibility Audit
- Run `@axe-core/react` or manual axe checks on each component
- Verify keyboard navigation: Tab, Enter, Escape, Arrow keys
- Verify focus management: focus trapping in Dialog, focus restoration
- Verify screen reader announcements: aria-live for loading states

### Lighthouse Audit
- Target: 90+ on all metrics (Performance, A11y, Best Practices, SEO)
- Check bundle size per component
- Verify no console warnings in production build

### CHANGELOG.md
```markdown
# Changelog

## v1.0.0 (unreleased)

### Added
- 8 core components: Button, Badge, Input, Card, Avatar, Tabs, Select, Dialog
- 8 v2 components: Tooltip, Progress, Toast, Accordion, Dropdown Menu, Checkbox, Switch, Textarea
- Documentation site at /docs
- @shadowskit/cli for scaffolding components
- CSS variable theming system (--ck-* tokens)
- Dark mode support

### Changed
- Landing page refactored to use library components

### Technical
- Built on Radix UI primitives for accessibility
- CVA for variant management
- Tailwind CSS v4 with @theme inline
```

---

## Implementation Order

### Sprint 1: CLI Tool (Priority 1)
1. Set up `packages/cli/` directory with package.json, tsconfig, build config
2. Implement `init` command
3. Implement `add` command
4. Create component source file templates
5. Test CLI with fresh Next.js project
6. Update landing page docs to reference real CLI commands

### Sprint 2: v2 Components (Priority 2)
7. Install v2 Radix packages + sonner
8. Build Textarea (simple, no Radix — proves pattern)
9. Build Progress (simple, no Radix)
10. Build Tooltip (simple Radix primitive)
11. Build Checkbox (simple Radix primitive)
12. Build Switch (simple Radix primitive)
13. Build Accordion (Radix compound)
14. Build Dropdown Menu (Radix compound)
15. Build Toast (sonner integration)
16. Update barrel export, componentData, docs pages, ComponentGallery

### Sprint 3: Testing (Priority 3)
17. Set up Vitest + React Testing Library
18. Write tests for all 8 v1 components
19. Write tests for all 8 v2 components
20. Run coverage report, aim for 80%+ on UI components

### Sprint 4: Polish (Priority 4)
21. Dark mode verification for all 16 components
22. Accessibility audit with axe-core
23. Lighthouse audit on landing page
24. Write CHANGELOG.md
25. Final build verification

---

## Quality Checklist

### CLI
- [ ] `shadowskit init` works on fresh Next.js 16 project
- [ ] `shadowskit add button` copies file correctly
- [ ] `shadowskit add --all` installs all components
- [ ] Detects package manager (npm/yarn/pnpm/bun)
- [ ] Handles existing files gracefully (overwrite prompt)
- [ ] Creates components.json if missing

### v2 Components
- [ ] All 8 new components follow same API pattern as v1
- [ ] All accept className prop and merge with defaults
- [ ] All have TypeScript type exports
- [ ] All work in dark mode
- [ ] All have doc pages with live previews
- [ ] All are in barrel export

### Testing
- [ ] All 16 components have render tests
- [ ] All variants/sizes have class verification tests
- [ ] Keyboard navigation tests for interactive components
- [ ] Coverage report shows 80%+ for ui/ directory

### Polish
- [ ] No console warnings in dev or production
- [ ] Lighthouse score ≥ 90 on all metrics
- [ ] CHANGELOG.md documents all changes
- [ ] Build passes with zero errors
