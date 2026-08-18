// @shadowskit/ui — Component Library
// Barrel export for all distributable components

export { Button, buttonVariants, type ButtonProps } from "./button";
export { Badge, badgeVariants, type BadgeProps } from "./badge";
export { Input, inputVariants, type InputProps } from "./input";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./select";
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";

// ── v2 Components ───────────────────────────────────────────────
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
export { Progress, progressVariants, type ProgressProps } from "./progress";
export { Toaster, toast } from "./toast";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./dropdown-menu";
export { Checkbox } from "./checkbox";
export { Switch } from "./switch";
export { Textarea, textareaVariants, type TextareaProps } from "./textarea";
