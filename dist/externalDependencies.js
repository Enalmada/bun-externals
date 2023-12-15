// src/externalDependencies.ts
async function loadPackageJson(path) {
  try {
    return await import(path);
  } catch (err) {
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
