import { execSync } from "node:child_process";
import pc from "picocolors";
import type { PackageDetectResult } from "./config.js";

/** Install npm dependencies using the detected package manager */
export async function installDependencies(
  pkgManager: PackageDetectResult,
  dependencies: string[],
  options: { dev?: boolean; cwd?: string } = {}
): Promise<void> {
  if (dependencies.length === 0) return;

  const { dev = false, cwd = process.cwd() } = options;
  const depType = dev ? "dev dependencies" : "dependencies";

  console.log(
    pc.cyan(`Installing ${depType}: `) + pc.dim(dependencies.join(", "))
  );

  const commands: Record<string, string> = {
    npm: `npm install ${dev ? "--save-dev" : ""} ${dependencies.join(" ")}`,
    yarn: `yarn add ${dev ? "-D" : ""} ${dependencies.join(" ")}`,
    pnpm: `pnpm add ${dev ? "-D" : ""} ${dependencies.join(" ")}`,
    bun: `bun add ${dev ? "-d" : ""} ${dependencies.join(" ")}`,
  };

  try {
    execSync(commands[pkgManager], {
      cwd,
      stdio: "pipe",
      timeout: 120_000,
    });
    console.log(pc.green("  ✓ Dependencies installed successfully"));
  } catch (error) {
    throw new Error(
      `Failed to install dependencies. Try running the command manually:\n${
        commands[pkgManager]
      }`
    );
  }
}
