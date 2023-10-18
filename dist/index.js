// src/index.ts
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
  getExternalsFromCurrentWorkingDirPackageJson as default
};
