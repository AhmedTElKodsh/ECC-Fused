#!/usr/bin/env node

import { cp, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const targetDir = path.resolve(process.argv[2] || process.cwd());
const sourceDir = path.resolve(import.meta.dirname, "..");

async function init() {
  console.log(`Initializing ECC-Fused in ${targetDir}...`);
  
  if (!existsSync(targetDir)) {
    await mkdir(targetDir, { recursive: true });
  }

  const filesToCopy = [
    { src: "AGENTS.md", dest: "AGENTS.md" },
    { src: ".planning/state.yaml", dest: ".planning/state.yaml" },
  ];

  for (const file of filesToCopy) {
    const srcPath = path.join(sourceDir, file.src);
    const destPath = path.join(targetDir, file.dest);
    
    if (existsSync(srcPath)) {
      await mkdir(path.dirname(destPath), { recursive: true });
      await copyFile(srcPath, destPath);
      console.log(`✓ Copied ${file.dest}`);
    } else {
      console.warn(`! Warning: Source file missing ${file.src}`);
    }
  }

  const manifestsSrc = path.join(sourceDir, "manifests");
  const manifestsDest = path.join(targetDir, "manifests");
  
  if (existsSync(manifestsSrc)) {
    await cp(manifestsSrc, manifestsDest, { recursive: true });
    console.log("✓ Copied manifests/");
  } else {
    console.warn("! Warning: Source directory missing manifests/");
  }

  console.log("\nECC-Fused initialization complete!");
  console.log("You can now start using /ecc-help in this repository.");
}

init().catch(console.error);
