// src/index.ts
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
function handleBuildResult(result) {
  if (!result.success) {
    console.error("Build failed");
    for (const message of result.logs) {
      console.error(message);
    }
    throw new AggregateError(result.logs, "Build failed");
  }
}
async function bunBuild(options) {
  const result = await Bun.build(options);
  handleBuildResult(result);
}
async function getExternalsFromCurrentWorkingDirPackageJson() {
  const paths = [`${process.cwd()}/../../package.json`, `${process.cwd()}/package.json`];
  return getExternalsFromPackageJsonPaths(paths);
}
export {
  handleBuildResult,
  getExternalsFromPackageJsonPaths,
  getExternalsFromCurrentWorkingDirPackageJson as default,
  bunBuild
};
