import type { PropDef } from "@/lib/componentData";

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 font-medium text-foreground">Prop</th>
            <th className="px-4 py-3 font-medium text-foreground">Type</th>
            <th className="px-4 py-3 font-medium text-foreground">Default</th>
            <th className="px-4 py-3 font-medium text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-t border-border">
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-primary">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
