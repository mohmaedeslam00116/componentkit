"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { components } from "@/lib/componentData";

const navSections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
    ],
  },
  {
    title: "Components",
    items: components.map((c) => ({
      label: c.name,
      href: `/docs/components/${c.slug}`,
    })),
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-muted/30 overflow-y-auto">
        {/* Logo */}
        <div className="border-b border-border px-6 py-4">
          <Link href="/docs" className="text-lg font-bold text-foreground">
            @shadowskit/ui
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">Documentation</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to landing page
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-8 py-12">{children}</div>
      </main>
    </div>
  );
}
