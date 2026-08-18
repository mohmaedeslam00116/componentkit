export interface ComponentRegistryEntry {
  /** Source file names to copy */
  files: string[];
  /** npm dependencies this component requires */
  dependencies: string[];
  /** npm dev dependencies */
  devDependencies: string[];
  /** Human-readable description */
  description: string;
}

export const registry: Record<string, ComponentRegistryEntry> = {
  // ── v1 Components ──────────────────────────────────────────────
  button: {
    files: ["button.tsx"],
    dependencies: ["class-variance-authority", "@radix-ui/react-slot"],
    devDependencies: [],
    description: "Interactive button with variants, sizes, loading, and asChild support",
  },
  badge: {
    files: ["badge.tsx"],
    dependencies: ["class-variance-authority"],
    devDependencies: [],
    description: "Inline label with variants and dot indicator",
  },
  input: {
    files: ["input.tsx"],
    dependencies: ["class-variance-authority"],
    devDependencies: [],
    description: "Text input with sizes, error states, and labels",
  },
  card: {
    files: ["card.tsx"],
    dependencies: [],
    devDependencies: [],
    description: "Content container with compound sub-components",
  },
  avatar: {
    files: ["avatar.tsx"],
    dependencies: ["@radix-ui/react-avatar"],
    devDependencies: [],
    description: "User avatar with image, fallback, and group layout",
  },
  tabs: {
    files: ["tabs.tsx"],
    dependencies: ["@radix-ui/react-tabs"],
    devDependencies: [],
    description: "Tabbed navigation with underline, pill, and enclosed variants",
  },
  select: {
    files: ["select.tsx"],
    dependencies: ["@radix-ui/react-select"],
    devDependencies: [],
    description: "Dropdown select with search, groups, and nested items",
  },
  dialog: {
    files: ["dialog.tsx"],
    dependencies: ["@radix-ui/react-dialog"],
    devDependencies: [],
    description: "Modal dialog with focus trap and animations",
  },

  // ── v2 Components ──────────────────────────────────────────────
  tooltip: {
    files: ["tooltip.tsx"],
    dependencies: ["@radix-ui/react-tooltip"],
    devDependencies: [],
    description: "Contextual tooltip on hover or focus",
  },
  progress: {
    files: ["progress.tsx"],
    dependencies: [],
    devDependencies: [],
    description: "Progress bar with indeterminate mode",
  },
  toast: {
    files: ["toast.tsx"],
    dependencies: ["sonner"],
    devDependencies: [],
    description: "Toast notifications via sonner",
  },
  accordion: {
    files: ["accordion.tsx"],
    dependencies: ["@radix-ui/react-accordion"],
    devDependencies: [],
    description: "Collapsible content sections",
  },
  "dropdown-menu": {
    files: ["dropdown-menu.tsx"],
    dependencies: ["@radix-ui/react-dropdown-menu"],
    devDependencies: [],
    description: "Dropdown menu with items, checkboxes, and radio groups",
  },
  checkbox: {
    files: ["checkbox.tsx"],
    dependencies: ["@radix-ui/react-checkbox"],
    devDependencies: [],
    description: "Checkbox with check indicator",
  },
  switch: {
    files: ["switch.tsx"],
    dependencies: ["@radix-ui/react-switch"],
    devDependencies: [],
    description: "Toggle switch with smooth animation",
  },
  textarea: {
    files: ["textarea.tsx"],
    dependencies: ["class-variance-authority"],
    devDependencies: [],
    description: "Multi-line text input with sizes and error states",
  },
};

export const V1_COMPONENTS = [
  "button", "badge", "input", "card", "avatar", "tabs", "select", "dialog",
];

export const V2_COMPONENTS = [
  "tooltip", "progress", "toast", "accordion", "dropdown-menu",
  "checkbox", "switch", "textarea",
];

export const ALL_COMPONENTS = [...V1_COMPONENTS, ...V2_COMPONENTS];

/** Get the Radix/UI dependencies needed for a list of components */
export function getDependenciesForComponents(
  componentNames: string[]
): { dependencies: string[]; devDependencies: string[] } {
  const deps = new Set<string>();
  const devDeps = new Set<string>();

  for (const name of componentNames) {
    const entry = registry[name];
    if (!entry) continue;
    entry.dependencies.forEach((d) => deps.add(d));
    entry.devDependencies.forEach((d) => devDeps.add(d));
  }

  // Always include these base dependencies
  deps.add("clsx");
  deps.add("tailwind-merge");

  return {
    dependencies: [...deps],
    devDependencies: [...devDeps],
  };
}
