import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";
import prompts from "prompts";
import { ensureDir, fileExists, readFileIfExists } from "../utils/fs.js";
import {
  resolveProjectRoot,
  detectPackageManager,
  readConfig,
} from "../utils/config.js";
import { installDependencies } from "../utils/deps.js";
import {
  registry,
  ALL_COMPONENTS,
  V1_COMPONENTS,
  V2_COMPONENTS,
  getDependenciesForComponents,
} from "../registry.js";

/** Load component source code from the templates directory */
function loadComponentTemplate(componentName: string): string | null {
  // First try to load from the actual source files in the library
  // In production, these would be fetched from a registry URL
  const possiblePaths = [
    // Local development: load from src/components/ui/
    path.resolve(process.cwd(), "../src/components/ui", `${componentName}.tsx`),
    path.resolve(process.cwd(), "../../src/components/ui", `${componentName}.tsx`),
    // CLI templates directory
    path.resolve(path.dirname(new URL(import.meta.url).pathname), "../templates", `${componentName}.tsx`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  }

  return null;
}

/** Get the barrel export line for a component */
function getBarrelExportLine(componentName: string): string {
  const entry = registry[componentName];
  if (!entry) return "";

  const exportName = componentName
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  // For compound components, we export multiple things
  // For simple components, just the main one
  if (["dialog", "tabs", "select", "dropdown-menu", "accordion"].includes(componentName)) {
    return `export * from "./${componentName}";`;
  }
  return `export * from "./${componentName}";`;
}

export async function addCommand(
  components: string[],
  options: { all?: boolean; yes?: boolean }
): Promise<void> {
  const projectRoot = resolveProjectRoot();
  const config = readConfig(projectRoot);
  const pkgManager = detectPackageManager(projectRoot);

  // Resolve which components to add
  let targetComponents: string[];

  if (options.all) {
    targetComponents = [...ALL_COMPONENTS];
  } else {
    // Validate component names
    targetComponents = [];
    for (const name of components) {
      if (!registry[name]) {
        console.error(
          pc.red(`Unknown component: "${name}"\n`) +
            pc.dim(`Available: ${ALL_COMPONENTS.join(", ")}`)
        );
        process.exit(1);
      }
      targetComponents.push(name);
    }
  }

  if (targetComponents.length === 0) {
    console.error(pc.red("No components specified. Use `shadowskit add <component>` or `--all`"));
    process.exit(1);
  }

  // Check for already existing components
  const componentsDir = path.join(projectRoot, config?.aliases?.components ?? "@/components", "ui");
  const existingComponents: string[] = [];
  const newComponents: string[] = [];

  for (const name of targetComponents) {
    const filePath = path.join(componentsDir, `${name}.tsx`);
    if (fileExists(filePath)) {
      existingComponents.push(name);
    } else {
      newComponents.push(name);
    }
  }

  // Handle existing components
  if (existingComponents.length > 0 && !options.yes) {
    console.log(pc.yellow(`\n⚠ Components already exist: ${existingComponents.join(", ")}`));
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Overwrite existing components?",
      initial: false,
    });
    if (!overwrite) {
      targetComponents = newComponents;
      if (targetComponents.length === 0) {
        console.log(pc.yellow("Nothing to add."));
        return;
      }
    }
  }

  console.log(pc.bold(pc.cyan(`\n📦 Adding ${targetComponents.length} component(s)...\n`)));

  // Install dependencies for all target components
  const { dependencies, devDependencies } = getDependenciesForComponents(targetComponents);

  // Filter out already-installed dependencies
  const newDeps = dependencies.filter((dep) => {
    try {
      require.resolve(dep, { paths: [projectRoot] });
      return false;
    } catch {
      return true;
    }
  });
  const newDevDeps = devDependencies.filter((dep) => {
    try {
      require.resolve(dep, { paths: [projectRoot] });
      return false;
    } catch {
      return true;
    }
  });

  if (newDeps.length > 0) {
    await installDependencies(pkgManager, newDeps, { cwd: projectRoot });
  }
  if (newDevDeps.length > 0) {
    await installDependencies(pkgManager, newDevDeps, { dev: true, cwd: projectRoot });
  }

  // Ensure components directory exists
  ensureDir(componentsDir);

  // Copy component files
  let addedCount = 0;
  for (const name of targetComponents) {
    const entry = registry[name];
    if (!entry) continue;

    const source = loadComponentTemplate(name);
    if (!source) {
      console.error(pc.red(`  ✗ Could not find source for "${name}"`));
      continue;
    }

    for (const file of entry.files) {
      const filePath = path.join(componentsDir, file);
      fs.writeFileSync(filePath, source, "utf-8");
      addedCount++;
      console.log(pc.green(`  ✓ Created ${file}`));
    }
  }

  // Update barrel export
  const indexPath = path.join(componentsDir, "index.ts");
  let indexContent = readFileIfExists(indexPath) ?? "";

  for (const name of targetComponents) {
    const exportLine = getBarrelExportLine(name);
    if (exportLine && !indexContent.includes(exportLine)) {
      indexContent += exportLine + "\n";
    }
  }

  if (indexContent) {
    fs.writeFileSync(indexPath, indexContent, "utf-8");
    console.log(pc.green("  ✓ Updated barrel export (index.ts)"));
  }

  // Print summary
  console.log(pc.bold(pc.green(`\n✨ Added ${addedCount} file(s) for ${targetComponents.length} component(s)\n`)));
  console.log(pc.cyan("Import example:"));
  console.log(
    pc.white(
      `  import { ${targetComponents[0]
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("")} } from "@/components/ui/${targetComponents[0]}";`
    )
  );
  console.log();
}
