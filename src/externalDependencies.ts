import { promises as fs } from "node:fs";

type PackageJson = {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
	[key: string]: unknown; // This allows other keys without TypeScript complaining
};

async function loadPackageJson(path: string): Promise<PackageJson> {
	try {
		const content = await fs.readFile(path, "utf-8");
		return JSON.parse(content) as PackageJson;
	} catch (_err) {
		return {}; // Return an empty object if the file is not found
	}
}

export async function getExternalsFromPackageJsonPaths(paths: string[]): Promise<string[]> {
	const sections: (keyof PackageJson)[] = ["dependencies", "devDependencies", "peerDependencies"];
	const externals: string[] = [];

	for (const path of paths) {
		const packageJson = await loadPackageJson(path);
		for (const section of sections) {
			if (packageJson[section]) {
				// biome-ignore lint/style/noNonNullAssertion: TBD
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
