// src/externalDependencies.ts
import { promises as fs } from "node:fs";
async function loadPackageJson(path) {
  try {
    const content = await fs.readFile(path, "utf-8");
    return JSON.parse(content);
  } catch (_err) {
    return {};
  }
}
async function getExternalsFromPackageJsonPaths(paths) {
  const sections = ["dependencies", "devDependencies", "peerDependencies"];
  const externals = [];
  for (const path of paths) {
    const packageJson = await loadPackageJson(path);
    for (const section of sections) {
      if (packageJson[section]) {
        externals.push(...Object.keys(packageJson[section]));
      }
    }
  }
  return Array.from(new Set(externals));
}
async function getExternalsFromCurrentWorkingDirPackageJson() {
  const paths = [`${process.cwd()}/../../package.json`, `${process.cwd()}/package.json`];
  return getExternalsFromPackageJsonPaths(paths);
}
export {
  getExternalsFromPackageJsonPaths,
  getExternalsFromCurrentWorkingDirPackageJson as default
};
