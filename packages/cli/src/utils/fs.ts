import fs from "node:fs";
import path from "node:path";

/** Ensure a directory exists, creating it recursively if needed */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/** Read a file if it exists, otherwise return null */
export function readFileIfExists(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

/** Write a file, creating parent directories if needed */
export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  fs.writeFileSync(filePath, content, "utf-8");
}

/** Check if a file exists */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
