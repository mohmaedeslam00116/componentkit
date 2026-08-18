"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { toast, Toaster } from "@/components/ui/toast";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

/* ── Button Preview ──────────────────────────────────────────── */

export function ButtonDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">States</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <ButtonLoading />
        </div>
      </div>
    </div>
  );
}

function ButtonLoading() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
    >
      {loading ? "Loading..." : "Click me"}
    </Button>
  );
}

/* ── Badge Preview ───────────────────────────────────────────── */

export function BadgeDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="solid">Solid</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="dot" showDot>Dot</Badge>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge badgeSize="sm">Small</Badge>
          <Badge badgeSize="md">Medium</Badge>
        </div>
      </div>
    </div>
  );
}

/* ── Input Preview ───────────────────────────────────────────── */

export function InputDemo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
          <Input type="email" placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Error state</label>
          <Input error placeholder="Invalid input" />
          <p className="mt-1 text-xs text-destructive">This field is required.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Disabled</label>
          <Input disabled placeholder="Disabled" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sizes</p>
        <div className="flex flex-col gap-3">
          <Input inputSize="sm" placeholder="Small input" />
          <Input inputSize="md" placeholder="Medium input (default)" />
          <Input inputSize="lg" placeholder="Large input" />
        </div>
      </div>
    </div>
  );
}

/* ── Card Preview ────────────────────────────────────────────── */

export function CardDemo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>A simple card component.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Cards can contain any content.</p>
          </CardContent>
        </Card>
        <Card hoverable>
          <CardHeader>
            <CardTitle>Hoverable Card</CardTitle>
            <CardDescription>Hover to see the lift effect.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This card has hover animation.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

/* ── Avatar Preview ──────────────────────────────────────────── */

export function AvatarDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Fallback initials</p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>EF</AvatarFallback></Avatar>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Custom size</p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">S</AvatarFallback></Avatar>
          <Avatar className="h-10 w-10"><AvatarFallback>M</AvatarFallback></Avatar>
          <Avatar className="h-12 w-12"><AvatarFallback className="text-base">L</AvatarFallback></Avatar>
          <Avatar className="h-16 w-16"><AvatarFallback className="text-lg">XL</AvatarFallback></Avatar>
        </div>
      </div>
    </div>
  );
}

/* ── Tabs Preview ────────────────────────────────────────────── */

export function TabsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Underline</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger variant="underline" value="tab1">Account</TabsTrigger>
            <TabsTrigger variant="underline" value="tab2">Password</TabsTrigger>
            <TabsTrigger variant="underline" value="tab3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Account settings and profile information.</TabsContent>
          <TabsContent value="tab2">Change your password here.</TabsContent>
          <TabsContent value="tab3">Application preferences and settings.</TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Pill</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger variant="pill" value="tab1">Overview</TabsTrigger>
            <TabsTrigger variant="pill" value="tab2">Analytics</TabsTrigger>
            <TabsTrigger variant="pill" value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Dashboard overview content.</TabsContent>
          <TabsContent value="tab2">Analytics data goes here.</TabsContent>
          <TabsContent value="tab3">Reports and exports.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ── Select Preview ──────────────────────────────────────────── */

export function SelectDemo() {
  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <label className="mb-1.5 block text-sm font-medium text-foreground">Favorite fruit</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-sm">
        <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ── Dialog Preview ──────────────────────────────────────────── */

/* ── Tooltip Preview ─────────────────────────────────────────── */

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Default</p>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild><Button variant="secondary">Hover me</Button></TooltipTrigger>
              <TooltipContent>Helpful tip!</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="ghost">Another</Button></TooltipTrigger>
              <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ── Progress Preview ────────────────────────────────────────── */

export function ProgressDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Determinate</p>
        <div className="space-y-3 max-w-sm">
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Indeterminate</p>
        <div className="max-w-sm"><Progress indeterminate /></div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sizes</p>
        <div className="space-y-3 max-w-sm">
          <Progress value={60} progressSize="sm" />
          <Progress value={60} progressSize="md" />
          <Progress value={60} progressSize="lg" />
        </div>
      </div>
    </div>
  );
}

/* ── Toast Preview ───────────────────────────────────────────── */

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast.default("Hello there!")}>Default</Button>
      <Button variant="secondary" onClick={() => toast.success("Saved successfully!")}>Success</Button>
      <Button variant="secondary" onClick={() => toast.error("Something went wrong")}>Error</Button>
      <Button variant="secondary" onClick={() => toast.warning("Be careful!")}>Warning</Button>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

/* ── Accordion Preview ───────────────────────────────────────── */

export function AccordionDemo() {
  return (
    <div className="max-w-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is @shadowskit/ui?</AccordionTrigger>
          <AccordionContent>
            A copy-paste component library built on Radix UI and Tailwind CSS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I install it?</AccordionTrigger>
          <AccordionContent>
            Run the CLI: npx @shadowskit/cli add button
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes! All components are built on Radix UI primitives with full keyboard navigation and ARIA support.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/* ── Dropdown Menu Preview ───────────────────────────────────── */

export function DropdownMenuDemo() {
  return (
    <div className="space-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button>Open Menu</Button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ── Checkbox Preview ────────────────────────────────────────── */

export function CheckboxDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm">Accept terms and conditions</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" defaultChecked />
        <label htmlFor="newsletter" className="text-sm">Subscribe to newsletter</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm text-muted-foreground">Disabled</label>
      </div>
    </div>
  );
}

/* ── Switch Preview ──────────────────────────────────────────── */

export function SwitchDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <label htmlFor="airplane" className="text-sm">Airplane mode</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notifications" defaultChecked />
        <label htmlFor="notifications" className="text-sm">Notifications</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-switch" disabled />
        <label htmlFor="disabled-switch" className="text-sm text-muted-foreground">Disabled</label>
      </div>
    </div>
  );
}

/* ── Textarea Preview ────────────────────────────────────────── */

export function TextareaDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <Textarea placeholder="Type your message..." />
      <Textarea inputSize="lg" placeholder="Large textarea" />
      <Textarea error placeholder="Required field" />
      <Textarea disabled placeholder="Disabled textarea" />
    </div>
  );
}

/* ── Dialog Preview ──────────────────────────────────────────── */

export function DialogDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <Input defaultValue="john@example.com" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
