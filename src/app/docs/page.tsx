import Link from "next/link";
import { components } from "@/lib/componentData";
import { CodePreview } from "@/components/docs/CodePreview";

export const metadata = {
  title: "Documentation — @shadowskit/ui",
  description:
    "Installation guide and component documentation for @shadowskit/ui.",
};

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          @shadowskit/ui
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Beautiful, accessible, copy-paste UI components built with React,
          Tailwind CSS, and Radix UI.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Installation</h2>
        <p className="text-muted-foreground">
          @shadowskit/ui uses a copy-paste model. Run the init command to set up
          your project, then add individual components as needed.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              1. Initialize your project
            </h3>
            <CodePreview
              title="Terminal"
              code="npx @shadowskit/ui init"
            />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              2. Add components
            </h3>
            <CodePreview
              title="Terminal"
              code={`npx @shadowskit/ui add button
npx @shadowskit/ui add card
npx @shadowskit/ui add dialog
npx @shadowskit/ui add --all  # Add all components`}
            />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              3. Import and use
            </h3>
            <CodePreview
              title="Example"
              code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button variant="primary">Hello World</Button>
}`}
            />
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Dependencies</h2>
        <p className="text-muted-foreground">
          The following packages are installed by the CLI when you add components:
        </p>
        <div className="rounded-xl border border-border p-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                clsx
              </code>
              <span>— Conditional class names</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                tailwind-merge
              </code>
              <span>— Merge Tailwind classes without conflicts</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                class-variance-authority
              </code>
              <span>— Manage component variants</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                lucide-react
              </code>
              <span>— Icons (X, ChevronDown, Check, etc.)</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                @radix-ui/react-dialog
              </code>
              <span>— Dialog primitive</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                @radix-ui/react-tabs
              </code>
              <span>— Tabs primitive</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                @radix-ui/react-select
              </code>
              <span>— Select primitive</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                @radix-ui/react-avatar
              </code>
              <span>— Avatar primitive</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Theming */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Theming</h2>
        <p className="text-muted-foreground">
          All components use CSS variables for theming. Override them in your
          global CSS to customize the entire library:
        </p>
        <CodePreview
          title="globals.css"
          code={`:root {
  --ck-primary: #7c3ared;     /* Purple theme */
  --ck-primary-hover: #6d28d9;
  --ck-background: #faf5ff;  /* Light purple bg */
}

.dark {
  --ck-primary: #a78bfa;
  --ck-primary-hover: #c4b5fd;
}`}
        />
        <p className="text-sm text-muted-foreground">
          The <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">--ck-*</code> variables
          are mapped to Tailwind theme tokens automatically via{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">@theme inline</code>.
          You can use <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">bg-primary</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">text-foreground</code>,
          etc. in your own code.
        </p>
      </section>

      {/* Component list */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Components</h2>
        <p className="text-muted-foreground">
          Browse all available components in v1:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((comp) => (
            <Link
              key={comp.slug}
              href={`/docs/components/${comp.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-all hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 dark:hover:shadow-black/20"
            >
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {comp.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {comp.description}
              </p>
              {comp.radixPrimitive && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Built on{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono">
                    {comp.radixPrimitive}
                  </code>
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
