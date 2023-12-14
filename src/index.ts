/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="bun-types" />

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown; // This allows other keys without TypeScript complaining
};

async function loadPackageJson(path: string): Promise<PackageJson> {
  try {
    return (await import(path)) as PackageJson;
  } catch (err) {
    return {}; // Return an empty object if the file is not found
  }
}

export async function getExternalsFromPackageJsonPaths(paths: string[]): Promise<string[]> {
  const sections: (keyof PackageJson)[] = ['dependencies', 'devDependencies', 'peerDependencies'];
  const externals: string[] = [];

  for (const path of paths) {
    const packageJson = await loadPackageJson(path);
    for (const section of sections) {
      if (packageJson[section]) {
        externals.push(...Object.keys(packageJson[section]!));
      }
    }
  }

  return Array.from(new Set(externals)); // Remove duplicates
}

export default async function getExternalsFromCurrentWorkingDirPackageJson(): Promise<string[]> {
  const paths = [`${process.cwd()}/../../package.json`, `${process.cwd()}/package.json`];
  return getExternalsFromPackageJsonPaths(paths);
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
