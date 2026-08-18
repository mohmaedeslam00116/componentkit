import { Code, Globe, MessageCircle, type LucideIcon } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Components", href: "#components" },
    { label: "Documentation", href: "#" },
    { label: "Figma Kit", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "License", href: "#" },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com", icon: Code },
    { label: "Discord", href: "https://discord.com", icon: MessageCircle },
    { label: "Twitter", href: "https://twitter.com", icon: Globe },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                CK
              </div>
              <span>ComponentKit</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Beautiful, accessible UI components for modern web applications.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.icon && <link.icon className="h-3.5 w-3.5" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ComponentKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
