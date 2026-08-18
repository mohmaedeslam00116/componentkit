import path from "node:path";
import fs from "node:fs";

export type PackageDetectResult = "npm" | "yarn" | "pnpm" | "bun";

export interface ShadowsKitConfig {
  $schema?: string;
  style: string;
  tailwind: {
    css: string;
    baseColor: string;
    cssVariables: boolean;
  };
  aliases: {
    components: string;
    utils: string;
  };
  framework: string;
}

const CONFIG_FILE = "components.json";

/** Resolve the project root (where package.json lives) */
export function resolveProjectRoot(cwd: string = process.cwd()): string {
  let current = cwd;
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, "package.json"))) {
      return current;
    }
    current = path.dirname(current);
  }
  return cwd;
}

/** Read the components.json config file */
export function readConfig(projectRoot: string): ShadowsKitConfig | null {
  const configPath = path.join(projectRoot, CONFIG_FILE);
  const content = fs.readFileSync(configPath, "utf-8");
  if (!content) return null;
  try {
    return JSON.parse(content) as ShadowsKitConfig;
  } catch {
    return null;
  }
}

/** Write the components.json config file */
export function writeConfig(projectRoot: string, config: ShadowsKitConfig): void {
  const configPath = path.join(projectRoot, CONFIG_FILE);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

/** Detect the package manager from lock files */
export function detectPackageManager(projectRoot: string): "npm" | "yarn" | "pnpm" | "bun" {
  if (fs.existsSync(path.join(projectRoot, "bun.lockb")) || fs.existsSync(path.join(projectRoot, "bun.lock"))) {
    return "bun";
  }
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

/** Get the install command for the detected package manager */
export function getInstallCommand(
  pkgManager: "npm" | "yarn" | "pnpm" | "bun",
  dependencies: string[],
  dev = false
): string {
  const flag = dev ? (pkgManager === "npm" ? "--save-dev" : "-D") : "";
  switch (pkgManager) {
    case "npm":
      return `npm install ${flag} ${dependencies.join(" ")}`;
    case "yarn":
      return `yarn add ${flag} ${dependencies.join(" ")}`;
    case "pnpm":
      return `pnpm add ${flag} ${dependencies.join(" ")}`;
    case "bun":
      return `bun add ${dev ? "-d" : ""} ${dependencies.join(" ")}`;
  }
}
