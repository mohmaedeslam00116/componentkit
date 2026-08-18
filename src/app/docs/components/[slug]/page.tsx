import { notFound } from "next/navigation";
import { components, getComponentBySlug } from "@/lib/componentData";
import { CodePreview } from "@/components/docs/CodePreview";
import { PropsTable } from "@/components/docs/PropsTable";
import {
  ButtonDemo,
  BadgeDemo,
  InputDemo,
  CardDemo,
  AvatarDemo,
  TabsDemo,
  SelectDemo,
  DialogDemo,
} from "@/components/docs/ComponentPreview";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const comp = getComponentBySlug(params.slug);
  if (!comp) return {};
  return {
    title: `${comp.name} — @shadowskit/ui`,
    description: comp.description,
  };
}

const demoMap: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  badge: BadgeDemo,
  input: InputDemo,
  card: CardDemo,
  avatar: AvatarDemo,
  tabs: TabsDemo,
  select: SelectDemo,
  dialog: DialogDemo,
};

export default function ComponentDocPage({ params }: { params: { slug: string } }) {
  const comp = getComponentBySlug(params.slug);
  if (!comp) notFound();

  const Demo = demoMap[comp.slug];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {comp.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{comp.description}</p>
        {comp.radixPrimitive && (
          <p className="mt-1 text-sm text-muted-foreground">
            Built on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-primary">
              {comp.radixPrimitive}
            </code>
          </p>
        )}
      </div>

      {/* Installation */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <CodePreview title="Terminal" code={comp.installation} />
      </section>

      {/* Import */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Import</h2>
        <CodePreview title="Import" code={`import { ${comp.name} } from "${comp.importPath.replace(/"$/, "")}"`} />
      </section>

      {/* Live Preview */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Preview</h2>
        <div className="rounded-xl border border-border bg-surface p-6">
          {Demo && <Demo />}
        </div>
      </section>

      {/* Code Snippet */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodePreview title="Example" code={comp.codeSnippet} />
      </section>

      {/* Props */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <PropsTable props={comp.props} />
      </section>

      {/* Accessibility */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Accessibility</h2>
        <div className="rounded-xl border border-border p-4 text-sm text-muted-foreground space-y-2">
          <p>
            This component follows WAI-ARIA patterns and provides full keyboard
            navigation support.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>All interactive elements have visible focus rings</li>
            <li>Keyboard navigation follows WAI-ARIA Authoring Practices</li>
            <li>Screen reader friendly with proper ARIA labels and roles</li>
            <li>Respects <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">prefers-reduced-motion</code> for animations</li>
          </ul>
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Customization</h2>
        <div className="rounded-xl border border-border p-4 text-sm text-muted-foreground space-y-2">
          <p>
            Since the source code is copied into your project, you have full
            control. Here are common customizations:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Override default styles via the{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">className</code>{" "}
              prop
            </li>
            <li>
              Change the theme by modifying{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">--ck-*</code>{" "}
              CSS variables
            </li>
            <li>
              Add new variants by editing the CVA definition in the component
              file
            </li>
            <li>
              Modify the component&apos;s JSX structure directly — no wrappers or
              abstractions
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
