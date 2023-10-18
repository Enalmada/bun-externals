// src/index.ts
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
  const pathToProjectPackageJson = `${process.cwd()}/package.json`;
  let packageJson;
  try {
    packageJson = await import(pathToProjectPackageJson);
  } catch (err) {
    throw new Error("Unable to load package.json from the current working directory.");
  }
  const sections = ["dependencies", "devDependencies", "peerDependencies"];
  const externals = [];
  for (const section of sections) {
    if (packageJson[section]) {
      externals.push(...Object.keys(packageJson[section]));
    }
  }
  return Array.from(new Set(externals));
}
export {
  handleBuildResult,
  getExternalsFromCurrentWorkingDirPackageJson as default,
  bunBuild
};
