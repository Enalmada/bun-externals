/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="bun-types" />

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown; // This allows other keys without TypeScript complaining
};

export default async function getExternalsFromCurrentWorkingDirPackageJson(): Promise<string[]> {
  const pathToProjectPackageJson = `${process.cwd()}/package.json`;
  let packageJson: PackageJson;

  try {
    packageJson = (await import(pathToProjectPackageJson)) as PackageJson;
  } catch (err) {
    throw new Error('Unable to load package.json from the current working directory.');
  }

  const sections: (keyof PackageJson)[] = ['dependencies', 'devDependencies', 'peerDependencies'];
  const externals: string[] = [];

  for (const section of sections) {
    if (packageJson[section]) {
      externals.push(...Object.keys(packageJson[section]!)); // The ! asserts that it exists, given the preceding if check.
    }
  }

  return Array.from(new Set(externals));
}

export function handleBuildResult(result: { success: boolean; logs: any[] }): void {
  if (!result.success) {
    console.error('Build failed');
    for (const message of result.logs) {
      console.error(message);
    }
    throw new AggregateError(result.logs, 'Build failed');
  }
}

export async function bunBuild(options: any): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = await Bun.build(options);
  handleBuildResult(result);
}
