export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  installation: string;
  importPath: string;
  radixPrimitive?: string;
  props: PropDef[];
  codeSnippet: string;
}

export const components: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    description:
      "Displays a button or a component that looks like a button. Supports variants, sizes, loading state, and can be rendered as a child element via asChild.",
    installation: "npx @shadowskit/ui add button",
    importPath: '@/components/ui/button"',
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost" | "destructive"', default: '"primary"', description: "The visual style of the button." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "The size of the button." },
      { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and disables the button." },
      { name: "asChild", type: "boolean", default: "false", description: "Renders as the child element instead of a button (Radix Slot pattern)." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
      { name: "className", type: "string", default: "—", description: "Additional CSS classes to apply." },
    ],
    codeSnippet: `import { Button } from "@/components/ui/button"

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Saving...</Button>

// As a link
<Button asChild>
  <a href="/docs">Read Docs</a>
</Button>`,
  },
  {
    slug: "badge",
    name: "Badge",
    description:
      "Displays a badge or a component that looks like a badge. Use the variant prop to change the visual style, and showDot for a dot indicator.",
    installation: "npx @shadowskit/ui add badge",
    importPath: '@/components/ui/badge"',
    props: [
      { name: "variant", type: '"solid" | "secondary" | "destructive" | "outline" | "dot"', default: '"solid"', description: "The visual style of the badge." },
      { name: "badgeSize", type: '"sm" | "md"', default: '"md"', description: "The size of the badge." },
      { name: "showDot", type: "boolean", default: "false", description: "Shows a dot indicator before the label." },
      { name: "className", type: "string", default: "—", description: "Additional CSS classes to apply." },
    ],
    codeSnippet: `import { Badge } from "@/components/ui/badge"

// Variants
<Badge variant="solid">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// With dot indicator
<Badge variant="dot" showDot>Active</Badge>

// Sizes
<Badge badgeSize="sm">Small</Badge>
<Badge badgeSize="md">Medium</Badge>`,
  },
  {
    slug: "input",
    name: "Input",
    description:
      "A text input component for forms and user data entry with built-in styling and accessibility features. Supports error states and multiple sizes.",
    installation: "npx @shadowskit/ui add input",
    importPath: '@/components/ui/input"',
    props: [
      { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "The size of the input field." },
      { name: "error", type: "boolean", default: "false", description: "Shows error styling (red border and ring)." },
      { name: "type", type: '"text" | "email" | "password" | "number" | "search" | ...', default: '"text"', description: "The input type." },
      { name: "placeholder", type: "string", default: "—", description: "Placeholder text when input is empty." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
      { name: "className", type: "string", default: "—", description: "Additional CSS classes to apply." },
    ],
    codeSnippet: `import { Input } from "@/components/ui/input"

// Default
<Input type="email" placeholder="you@example.com" />

// Error state
<Input error placeholder="Invalid input" />
<p className="text-xs text-destructive mt-1">
  Please enter a valid email.
</p>

// Sizes
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />

// Disabled
<Input disabled placeholder="Disabled" />`,
  },
  {
    slug: "card",
    name: "Card",
    description:
      "A flexible card container with compound sub-components for header, title, description, content, and footer. Supports a hoverable variant with lift animation.",
    installation: "npx @shadowskit/ui add card",
    importPath: '@/components/ui/card"',
    props: [
      { name: "hoverable", type: "boolean", default: "false", description: "Enables hover lift animation and shadow." },
      { name: "className", type: "string", default: "—", description: "Additional CSS classes to apply." },
    ],
    codeSnippet: `import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>

// Hoverable card
<Card hoverable>
  <CardContent>Hover over me!</CardContent>
</Card>`,
  },
  {
    slug: "avatar",
    name: "Avatar",
    description:
      "An image element with a fallback for representing the user. Built on Radix UI Avatar primitive with automatic image loading states.",
    installation: "npx @shadowskit/ui add avatar",
    importPath: '@/components/ui/avatar"',
    radixPrimitive: "@radix-ui/react-avatar",
    props: [
      { name: "className", type: "string", default: "—", description: "Additional CSS classes to apply (e.g., override size)." },
      { name: "src", type: "string", default: "—", description: "URL of the avatar image." },
      { name: "alt", type: "string", default: '""', description: "Alt text for the image." },
    ],
    codeSnippet: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// With image
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Fallback only (initials)
<Avatar>
  <AvatarFallback>SC</AvatarFallback>
</Avatar>

// Custom size via className
<Avatar className="h-16 w-16">
  <AvatarFallback className="text-lg">LG</AvatarFallback>
</Avatar>`,
  },
  {
    slug: "tabs",
    name: "Tabs",
    description:
      "A set of layered sections of content, known as tab panels, that are displayed one at a time. Built on Radix UI Tabs with three visual variants.",
    installation: "npx @shadowskit/ui add tabs",
    importPath: '@/components/ui/tabs"',
    radixPrimitive: "@radix-ui/react-tabs",
    props: [
      { name: "defaultValue", type: "string", default: "—", description: "The value of the tab that should be active when initially rendered." },
      { name: "value", type: "string", default: "—", description: "The controlled value of the active tab." },
      { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback fired when the active tab changes." },
      { name: "variant", type: '"underline" | "pill" | "enclosed"', default: '"underline"', description: "Visual variant (on TabsList and TabsTrigger)." },
    ],
    codeSnippet: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Underline variant (default)
<Tabs defaultValue="account">
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="account">Account</TabsTrigger>
    <TabsTrigger variant="underline" value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password form</TabsContent>
</Tabs>

// Pill variant
<Tabs defaultValue="tab1">
  <TabsList variant="pill">
    <TabsTrigger variant="pill" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger variant="pill" value="tab2">Tab 2</TabsTrigger>
  </TabsList>
</Tabs>`,
  },
  {
    slug: "select",
    name: "Select",
    description:
      "Displays a list of options for the user to pick from, triggered by a button. Built on Radix UI Select with full keyboard navigation and accessibility.",
    installation: "npx @shadowskit/ui add select",
    importPath: '@/components/ui/select"',
    radixPrimitive: "@radix-ui/react-select",
    props: [
      { name: "value", type: "string", default: "—", description: "The controlled value of the select." },
      { name: "defaultValue", type: "string", default: "—", description: "The default value when initially rendered." },
      { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback fired when the selected value changes." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the select trigger." },
    ],
    codeSnippet: `import {
  Select, SelectTrigger, SelectContent,
  SelectItem, SelectValue
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>

// Controlled
<Select value={fruit} onValueChange={setFruit}>
  ...
</Select>`,
  },
  {
    slug: "dialog",
    name: "Dialog",
    description:
      "A window overlaid on the primary content. Built on Radix UI Dialog with focus trapping, escape-to-close, backdrop click, and enter/exit animations.",
    installation: "npx @shadowskit/ui add dialog",
    importPath: '@/components/ui/dialog"',
    radixPrimitive: "@radix-ui/react-dialog",
    props: [
      { name: "open", type: "boolean", default: "—", description: "The controlled open state of the dialog." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "The default open state when initially rendered." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback fired when the open state changes." },
    ],
    codeSnippet: `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Confirm</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
];

export function getComponentBySlug(slug: string): ComponentDoc | undefined {
  return components.find((c) => c.slug === slug);
}

// ── v2 Components ───────────────────────────────────────────────
const v2Components: ComponentDoc[] = [
  {
    slug: "tooltip",
    name: "Tooltip",
    description:
      "A popup that displays information related to an element when it receives focus or on hover. Built on Radix UI Tooltip primitive.",
    installation: "npx @shadowskit/ui add tooltip",
    importPath: "@/components/ui/tooltip",
    radixPrimitive: "@radix-ui/react-tooltip",
    props: [
      { name: "delayDuration", type: "number", default: "700", description: "Delay in ms before the tooltip opens." },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "The preferred side of the trigger to render the tooltip." },
      { name: "sideOffset", type: "number", default: "4", description: "Distance in px from the trigger." },
    ],
    codeSnippet: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful tip!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  {
    slug: "progress",
    name: "Progress",
    description:
      "Shows completion progress of a task or operation. Supports determinate and indeterminate modes.",
    installation: "npx @shadowskit/ui add progress",
    importPath: "@/components/ui/progress",
    props: [
      { name: "value", type: "number", default: "0", description: "Progress value from 0 to max." },
      { name: "max", type: "number", default: "100", description: "Maximum value." },
      { name: "indeterminate", type: "boolean", default: "false", description: "Show indeterminate animation." },
      { name: "progressSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height of the progress bar." },
    ],
    codeSnippet: `import { Progress } from "@/components/ui/progress"

// Determinate
<Progress value={60} />

// Indeterminate
<Progress indeterminate />

// Sizes
<Progress value={40} progressSize="sm" />
<Progress value={40} progressSize="lg" />`,
  },
  {
    slug: "toast",
    name: "Toast",
    description:
      "A succinct message that is displayed temporarily. Powered by the sonner library with theming via CSS variables.",
    installation: "npx @shadowskit/ui add toast",
    importPath: "@/components/ui/toast",
    props: [
      { name: "message", type: "string", default: "—", description: "The toast message (function argument)." },
      { name: "variant", type: '"default" | "success" | "error" | "warning" | "info"', default: '"default"', description: "Toast style." },
      { name: "duration", type: "number", default: "4000", description: "Duration in ms before auto-dismiss." },
    ],
    codeSnippet: `import { toast, Toaster } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

// Add <Toaster /> to your layout
function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster richColors position="bottom-right" />
    </>
  )
}

// Usage
<Button onClick={() => toast.default("Hello!")}>Default</Button>
<Button onClick={() => toast.success("Saved!")}>Success</Button>
<Button onClick={() => toast.error("Oops")}>Error</Button>`,
  },
  {
    slug: "accordion",
    name: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content. Supports single or multiple open items.",
    installation: "npx @shadowskit/ui add accordion",
    importPath: "@/components/ui/accordion",
    radixPrimitive: "@radix-ui/react-accordion",
    props: [
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Whether one or multiple items can be open." },
      { name: "collapsible", type: "boolean", default: "false", description: "Allow the open item to be collapsed." },
      { name: "defaultValue", type: "string[]", default: "—", description: "Initial open item(s)." },
    ],
    codeSnippet: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is this?</AccordionTrigger>
    <AccordionContent>
      It's an accordion component built on Radix UI.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I use it?</AccordionTrigger>
    <AccordionContent>
      Import it and wrap your content.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    description:
      "Displays a menu to the user triggered by a button, with support for items, checkboxes, radio groups, and sub-menus.",
    installation: "npx @shadowskit/ui add dropdown-menu",
    importPath: "@/components/ui/dropdown-menu",
    radixPrimitive: "@radix-ui/react-dropdown-menu",
    props: [
      { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment of the dropdown content." },
      { name: "sideOffset", type: "number", default: "4", description: "Distance from the trigger." },
    ],
    codeSnippet: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and not checked. Built on Radix UI Checkbox with keyboard support.",
    installation: "npx @shadowskit/ui add checkbox",
    importPath: "@/components/ui/checkbox",
    radixPrimitive: "@radix-ui/react-checkbox",
    props: [
      { name: "checked", type: '"indeterminate" | boolean', default: "—", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state." },
      { name: "onCheckedChange", type: "(checked: CheckedState) => void", default: "—", description: "Callback when state changes." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox." },
    ],
    codeSnippet: `import { Checkbox } from "@/components/ui/checkbox"

// Basic
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms</label>
</div>

// Checked
<Checkbox defaultChecked />

// Indeterminate
<Checkbox checked="indeterminate" />`,
  },
  {
    slug: "switch",
    name: "Switch",
    description:
      "A control that allows the user to toggle between on and off states. Built on Radix UI Switch with smooth thumb animation.",
    installation: "npx @shadowskit/ui add switch",
    importPath: "@/components/ui/switch",
    radixPrimitive: "@radix-ui/react-switch",
    props: [
      { name: "checked", type: "boolean", default: "—", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", default: "—", description: "Callback when state changes." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the switch." },
    ],
    codeSnippet: `import { Switch } from "@/components/ui/switch"

// Basic
<Switch />

// With label
<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane mode</label>
</div>

// Controlled
<Switch checked={enabled} onCheckedChange={setEnabled} />`,
  },
  {
    slug: "textarea",
    name: "Textarea",
    description:
      "A multi-line text input component for forms. Matches the Input component API with sizes, error states, and consistent styling.",
    installation: "npx @shadowskit/ui add textarea",
    importPath: "@/components/ui/textarea",
    props: [
      { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "The size of the textarea." },
      { name: "error", type: "boolean", default: "false", description: "Shows error styling." },
      { name: "placeholder", type: "string", default: "—", description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea." },
    ],
    codeSnippet: `import { Textarea } from "@/components/ui/textarea"

// Default
<Textarea placeholder="Type your message..." />

// Error state
<Textarea error placeholder="Required field" />

// Sizes
<Textarea inputSize="sm" placeholder="Small" />
<Textarea inputSize="lg" placeholder="Large" />`,
  },
];

// Merge v1 and v2
components.push(...v2Components);

