"use client";

import { useState, Fragment } from "react";
import { ChevronDown, X, Check, ArrowUpDown, ChevronRight, Home, Settings, Users, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

/* ── Tab definitions ─────────────────────────────────────────── */

const tabDefs = [
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Form Elements" },
  { id: "cards", label: "Cards & Modals" },
  { id: "nav", label: "Navigation" },
  { id: "data", label: "Data Display" },
  { id: "new", label: "New in v2 ✨" },
] as const;

type TabId = (typeof tabDefs)[number]["id"];

/* ── Code snippets for each preview ─────────────────────────── */

const codeSnippets: Record<TabId, string> = {
  buttons: `import { Button } from "@/components/ui/button"

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button loading>Loading...</Button>`,

  forms: `import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

<Input type="email" placeholder="you@example.com" />
<Input error placeholder="Invalid input" />
<Input inputSize="lg" placeholder="Large input" />

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a role..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="developer">Developer</SelectItem>
    <SelectItem value="designer">Designer</SelectItem>
  </SelectContent>
</Select>`,

  cards: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card hoverable>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card description goes here.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>`,

  nav: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList variant="pill">
    <TabsTrigger variant="pill" value="overview">Overview</TabsTrigger>
    <TabsTrigger variant="pill" value="analytics">Analytics</TabsTrigger>
    <TabsTrigger variant="pill" value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>`,

  data: `import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

<Badge variant="solid">Primary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="dot" showDot>Success</Badge>

<Avatar>
  <AvatarFallback>SC</AvatarFallback>
</Avatar>

<Card hoverable>Hoverable card content</Card>`,

  new: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Progress value={60} />
<Checkbox id="terms" />
<Switch />
<Textarea placeholder="Type..." />`,
};

/* ── Live preview renderers ──────────────────────────────────── */

function ButtonsPreview() {
  return (
    <div className="space-y-6">
      {/* Variants */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      {/* Sizes */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      {/* States */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">States</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <LoadingButton />
        </div>
      </div>
    </div>
  );
}

function LoadingButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
      }}
    >
      {loading ? "Loading..." : "Click me"}
    </Button>
  );
}

function FormsPreview() {
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState("option1");

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Text input */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
        <Input type="email" placeholder="you@example.com" />
      </div>
      {/* Textarea */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
        <Textarea rows={3} placeholder="Write something..." />
      </div>
      {/* Custom select */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Error state */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
        <Input error type="password" defaultValue="123" readOnly />
        <p className="mt-1 text-xs text-destructive">Password must be at least 8 characters.</p>
      </div>
      {/* Checkbox & Radio */}
      <div className="sm:col-span-2 flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="h-4 w-4 rounded border-border"
          />
          I agree to the terms
        </label>
        {["option1", "option2"].map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              name="demo-radio"
              checked={radio === opt}
              onChange={() => setRadio(opt)}
              className="h-4 w-4 border-border"
            />
            {opt === "option1" ? "Option A" : "Option B"}
          </label>
        ))}
      </div>
    </div>
  );
}

function CardsPreview() {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card hoverable className="p-5">
          <CardTitle className="text-sm">Basic Card</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">A simple card with hover animation.</p>
        </Card>
        <Card hoverable className="p-5">
          <CardTitle className="text-sm">Card with Action</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Cards can include buttons and links.</p>
          <Button size="sm" className="mt-3">Learn more</Button>
        </Card>
      </div>

      {/* Modal trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Modal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed? This action cannot be undone.
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
      </Dialog>

      {/* Alerts */}
      {alertVisible && (
        <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-3">
          <Check className="h-4 w-4 shrink-0 text-success" />
          <p className="flex-1 text-sm text-success">Success! Your changes have been saved.</p>
          <button onClick={() => setAlertVisible(false)} className="shrink-0 rounded p-0.5 text-success hover:opacity-80">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function NavPreview() {
  return (
    <div className="space-y-6">
      {/* Underline Tabs */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Underline Tabs</p>
        <Tabs defaultValue="overview">
          <TabsList variant="underline">
            <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
            <TabsTrigger variant="underline" value="analytics">Analytics</TabsTrigger>
            <TabsTrigger variant="underline" value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Dashboard overview content goes here.</TabsContent>
          <TabsContent value="analytics">Analytics charts and metrics go here.</TabsContent>
          <TabsContent value="settings">Settings form and preferences go here.</TabsContent>
        </Tabs>
      </div>

      {/* Pill Tabs */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Pill Tabs</p>
        <Tabs defaultValue="overview">
          <TabsList variant="pill">
            <TabsTrigger variant="pill" value="overview">Overview</TabsTrigger>
            <TabsTrigger variant="pill" value="analytics">Analytics</TabsTrigger>
            <TabsTrigger variant="pill" value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Breadcrumbs */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Breadcrumbs</p>
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Home className="h-3.5 w-3.5" />
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-foreground cursor-pointer">Components</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Navigation</span>
        </nav>
      </div>

      {/* Mini sidebar */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sidebar Nav</p>
        <div className="flex gap-4">
          <div className="w-44 space-y-1 rounded-xl border border-border bg-background p-2">
            {[
              { icon: Home, label: "Dashboard" },
              { icon: Users, label: "Users" },
              { icon: Bell, label: "Notifications" },
              { icon: Settings, label: "Settings" },
            ].map((item, i) => (
              <button
                key={item.label}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex-1 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
            Dashboard overview content goes here.
          </div>
        </div>
      </div>
    </div>
  );
}

function DataPreview() {
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const data = [
    { name: "Alice Johnson", role: "Engineer", status: "Active", statusColor: "bg-success/10 text-success" },
    { name: "Bob Smith", role: "Designer", status: "Away", statusColor: "bg-warning/10 text-warning" },
    { name: "Carol White", role: "PM", status: "Active", statusColor: "bg-success/10 text-success" },
  ].sort((a, b) => sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  return (
    <div className="space-y-8">
      {/* Table */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sortable Table</p>
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">
                  <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                    Name <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-medium text-foreground">Role</th>
                <th className="px-4 py-3 font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.name} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn(row.statusColor)}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Badges</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="solid">Primary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="dot" showDot>Success</Badge>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Avatars</p>
          <div className="flex flex-wrap items-center gap-3">
            <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>MJ</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>AP</AvatarFallback></Avatar>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tooltips</p>
          <TooltipProvider>
            <div className="flex flex-wrap items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild><Button variant="secondary" size="sm">Hover me</Button></TooltipTrigger>
                <TooltipContent>Helpful tip!</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function NewPreview() {
  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Progress</p>
        <div className="max-w-sm space-y-3">
          <Progress value={30} />
          <Progress value={60} progressSize="lg" />
          <Progress indeterminate />
        </div>
      </div>

      {/* Checkbox & Switch */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Checkbox</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2"><Checkbox id="v2-check-1" defaultChecked /><label htmlFor="v2-check-1" className="text-sm">Checked</label></div>
            <div className="flex items-center gap-2"><Checkbox id="v2-check-2" /><label htmlFor="v2-check-2" className="text-sm">Unchecked</label></div>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Switch</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2"><Switch id="v2-sw-1" defaultChecked /><label htmlFor="v2-sw-1" className="text-sm">Enabled</label></div>
            <div className="flex items-center gap-2"><Switch id="v2-sw-2" /><label htmlFor="v2-sw-2" className="text-sm">Disabled</label></div>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Textarea</p>
        <Textarea placeholder="Type your message..." className="max-w-sm" />
      </div>

      {/* Dropdown Menu */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Dropdown Menu</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="secondary">Actions</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Accordion */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Accordion</p>
        <Accordion type="single" collapsible className="max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is this?</AccordionTrigger>
            <AccordionContent>A copy-paste component library built on Radix UI.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I use it?</AccordionTrigger>
            <AccordionContent>Run npx @shadowskit/cli add to install any component.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

/* ── Main gallery component ──────────────────────────────────── */

const previewMap: Record<TabId, React.ComponentType> = {
  buttons: ButtonsPreview,
  forms: FormsPreview,
  cards: CardsPreview,
  nav: NavPreview,
  data: DataPreview,
  new: NewPreview,
};

export function ComponentGallery() {
  const [activeTab, setActiveTab] = useState<TabId>("buttons");
  const Preview = previewMap[activeTab];

  return (
    <section id="components" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore our components
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse 50+ fully interactive components. Copy the code and paste into your project.
          </p>
        </div>

        {/* Tabs — using library Tabs with pill variant */}
        <div className="mt-12 flex justify-center">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
            <TabsList variant="pill">
              {tabDefs.map((tab) => (
                <TabsTrigger key={tab.id} variant="pill" value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Preview + Code */}
        <div className="mt-10">
          <Card className="p-6 sm:p-8">
            <Preview />
          </Card>

          {/* Code block */}
          <div className="mt-4">
            <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-muted px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground">React + Tailwind CSS</span>
              <CopyButton text={codeSnippets[activeTab]} />
            </div>
            <pre className="overflow-x-auto rounded-b-xl border border-border bg-muted p-4 text-sm leading-relaxed">
              <code className="font-mono text-foreground">{codeSnippets[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
