import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { readmeTopics, requiredDocs } from "../scripts/scaffold-required-docs.mjs";

const root = process.cwd();

test("all required docs exist and include validation guidance", async () => {
  for (const doc of requiredDocs) {
    const text = await readFile(path.join(root, "docs", doc), "utf8");
    assert.match(text, /^# /, `${doc} title`);
    if (doc !== "implementation-log.md") {
      assert.match(text, /ECC-Fusion|Source Library Map|Skill Categories|ECC Help/, `${doc} context`);
    }
  }
});

test("README covers every required topic", async () => {
  const text = await readFile(path.join(root, "README.md"), "utf8");
  const lower = text.toLowerCase();

  for (const topic of readmeTopics) {
    assert.ok(lower.includes(topic.toLowerCase()), `README missing topic: ${topic}`);
  }
});

test("README exposes verification commands", async () => {
  const text = await readFile(path.join(root, "README.md"), "utf8");

  assert.match(text, /npm\.cmd test/);
  assert.match(text, /npm\.cmd run validate/);
});

test("README and phase map expose the routed lifecycle visuals", async () => {
  const readme = await readFile(path.join(root, "README.md"), "utf8");
  const phaseMap = await readFile(path.join(root, "docs", "path-phase-map.md"), "utf8");

  for (const text of [readme, phaseMap]) {
    assert.match(text, /```mermaid/);
    assert.match(text, /Short Path/);
    assert.match(text, /Regular Path/);
    assert.match(text, /Transition Notice/);
  }

  for (const phase of ["Orient", "Scope", "Specify", "Design", "Plan", "Build", "Verify", "Release", "Learn"]) {
    assert.match(phaseMap, new RegExp(phase), `phase map missing ${phase}`);
  }

  for (const skill of ["ecc-help", "write-spec", "architecture-plan", "implement-work-packet", "verify-work", "ship-release"]) {
    assert.match(phaseMap, new RegExp(skill), `phase map missing ${skill}`);
  }
});

test("install compatibility doc covers AC-INSTALL lifecycle safety gates", async () => {
  const text = await readFile(path.join(root, "docs", "install-and-compatibility.md"), "utf8");

  for (const operation of ["Install", "Repair", "Doctor", "Status", "Uninstall", "Rollback"]) {
    assert.match(text, new RegExp(`## ${operation}`), `${operation} section`);
  }

  for (const requirement of [
    /dry run/i,
    /conflict detection/i,
    /backups before replacing managed files/i,
    /Windows PowerShell paths with spaces/i,
    /idempotent/i,
    /must not silently rewrite `AGENTS\.md`, manifests, commands, skills, hooks, or MCP configs/i,
    /remove only managed ECC-Fusion surfaces/i,
    /previous known-good managed state/i,
    /Smoke Matrix/
  ]) {
    assert.match(text, requirement);
  }
});
