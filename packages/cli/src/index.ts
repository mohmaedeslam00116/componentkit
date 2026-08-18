#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

const program = new Command();

program
  .name("shadowskit")
  .description("CLI tool for scaffolding @shadowskit/ui components")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize @shadowskit/ui in your project")
  .action(async () => {
    try {
      await initCommand();
    } catch (error) {
      console.error(pc.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

program
  .command("add <components...>")
  .description("Add components to your project")
  .option("-a, --all", "Add all available components")
  .option("-y, --yes", "Skip confirmation prompts")
  .action(async (components: string[], options: { all?: boolean; yes?: boolean }) => {
    try {
      await addCommand(components, options);
    } catch (error) {
      console.error(pc.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

program.parse();
