import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";
import prompts from "prompts";
import { readFileIfExists, writeFile, ensureDir } from "../utils/fs.js";
import {
  resolveProjectRoot,
  writeConfig,
  detectPackageManager,
  type ShadowsKitConfig,
} from "../utils/config.js";
import { installDependencies } from "../utils/deps.js";
import { getDependenciesForComponents, V1_COMPONENTS } from "../registry.js";

/** Content for the cn() utility file */
const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

/** Content for the CSS variable tokens */
const CSS_TOKENS = `
/* ── @shadowskit/ui CSS Variables ─────────────────────────────── */
/* Light mode (default) */
:root {
  --ck-background: 0 0% 100%;
  --ck-foreground: 0 0% 3.9%;
  --ck-muted: 0 0% 96.1%;
  --ck-muted-foreground: 0 0% 45.1%;
  --ck-border: 0 0% 89.8%;
  --ck-input: 0 0% 89.8%;
  --ck-primary: 221.2 83.2% 53.3%;
  --ck-primary-hover: 221.2 83.2% 47%;
  --ck-primary-foreground: 0 0% 98%;
  --ck-secondary: 0 0% 96.1%;
  --ck-secondary-foreground: 0 0% 9%;
  --ck-accent: 0 0% 96.1%;
  --ck-accent-foreground: 0 0% 9%;
  --ck-destructive: 0 84.2% 60.2%;
  --ck-destructive-foreground: 0 0% 98%;
  --ck-success: 142.1 76.2% 36.3%;
  --ck-success-foreground: 0 0% 98%;
  --ck-warning: 38 92% 50%;
  --ck-warning-foreground: 0 0% 98%;
  --ck-ring: 221.2 83.2% 53.3%;
  --ck-radius: 0.5rem;
  --ck-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --ck-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}

/* Dark mode */
.dark {
  --ck-background: 0 0% 3.9%;
  --ck-foreground: 0 0% 98%;
  --ck-muted: 0 0% 14.9%;
  --ck-muted-foreground: 0 0% 63.9%;
  --ck-border: 0 0% 14.9%;
  --ck-input: 0 0% 14.9%;
  --ck-primary: 217.2 91.2% 59.8%;
  --ck-primary-hover: 217.2 91.2% 65%;
  --ck-primary-foreground: 0 0% 98%;
  --ck-secondary: 0 0% 14.9%;
  --ck-secondary-foreground: 0 0% 98%;
  --ck-accent: 0 0% 14.9%;
  --ck-accent-foreground: 0 0% 98%;
  --ck-destructive: 0 62.8% 30.6%;
  --ck-destructive-foreground: 0 0% 98%;
  --ck-success: 142.1 70.6% 45.3%;
  --ck-success-foreground: 0 0% 98%;
  --ck-warning: 48 96.5% 53%;
  --ck-warning-foreground: 0 0% 98%;
  --ck-ring: 217.2 91.2% 59.8%;
}
`;

export async function initCommand(): Promise<void> {
  console.log(pc.bold(pc.cyan("\n🌈 @shadowskit/ui init\n")));

  const projectRoot = resolveProjectRoot();
  console.log(pc.dim(`Project root: ${projectRoot}`));

  // 1. Confirm with user
  const { proceed } = await prompts({
    type: "confirm",
    name: "proceed",
    message: "Initialize @shadowskit/ui in your project?",
    initial: true,
  });

  if (!proceed) {
    console.log(pc.yellow("Cancelled."));
    return;
  }

  // 2. Detect package manager
  const pkgManager = detectPackageManager(projectRoot);
  console.log(pc.dim(`Package manager: ${pkgManager}`));

  // 3. Install base dependencies
  const baseDeps = ["clsx", "tailwind-merge"];
  await installDependencies(pkgManager, baseDeps, { cwd: projectRoot });

  // 4. Create/update src/lib/utils.ts
  const utilsPath = path.join(projectRoot, "src/lib/utils.ts");
  const existingUtils = readFileIfExists(utilsPath);
  if (existingUtils) {
    if (existingUtils.includes("twMerge")) {
      console.log(pc.dim("  utils.ts already exists, skipping"));
    } else {
      console.log(pc.yellow("  utils.ts exists but doesn't contain cn() — backing up and replacing"));
      fs.copyFileSync(utilsPath, utilsPath + ".bak");
      writeFile(utilsPath, UTILS_CONTENT);
    }
  } else {
    writeFile(utilsPath, UTILS_CONTENT);
    console.log(pc.green("  ✓ Created src/lib/utils.ts"));
  }

  // 5. Update globals.css with CSS variables
  const globalsPath = path.join(projectRoot, "src/app/globals.css");
  const existingCss = readFileIfExists(globalsPath);
  if (existingCss) {
    if (existingCss.includes("--ck-background")) {
      console.log(pc.dim("  CSS variables already present in globals.css, skipping"));
    } else {
      // Append CSS tokens
      fs.appendFileSync(globalsPath, "\n" + CSS_TOKENS, "utf-8");
      console.log(pc.green("  ✓ Appended CSS variables to globals.css"));
    }
  } else {
    writeFile(globalsPath, `@import "tailwindcss";\n${CSS_TOKENS}`);
    console.log(pc.green("  ✓ Created globals.css with CSS variables"));
  }

  // 6. Create components.json
  const config: ShadowsKitConfig = {
    style: "default",
    tailwind: {
      css: "src/app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
    },
    framework: "nextjs",
  };

  const configPath = path.join(projectRoot, "components.json");
  if (fs.existsSync(configPath)) {
    console.log(pc.dim("  components.json already exists, skipping"));
  } else {
    writeConfig(projectRoot, config);
    console.log(pc.green("  ✓ Created components.json"));
  }

  // 7. Create components directory
  const componentsDir = path.join(projectRoot, "src/components/ui");
  ensureDir(componentsDir);
  console.log(pc.green("  ✓ Ensured src/components/ui/ exists"));

  // Done
  console.log(pc.bold(pc.green("\n✨ @shadowskit/ui initialized successfully!\n")));
  console.log(pc.cyan("Next steps:"));
  console.log(pc.white("  1. Add components: ") + pc.bold("npx @shadowskit/cli add button card"));
  console.log(pc.white("  2. Or add all:     ") + pc.bold("npx @shadowskit/cli add --all"));
  console.log(pc.white("  3. Read the docs:  ") + pc.bold("https://shadowskit.dev/docs\n"));
}
