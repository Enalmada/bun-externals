import { promises as fs } from "node:fs";
import getExternalsFromCurrentWorkingDirPackageJson from "../src/externalDependencies";

// biome-ignore lint/suspicious/noExplicitAny: TBD
const mockReadFile = (mockData: any) => {
	vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockData));
};

describe("getExternalsFromCurrentWorkingDirPackageJson", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("should return all unique dependencies", async () => {
		const mockDeps = {
			dependencies: {
				dep1: "1.0.0",
			},
			devDependencies: {
				devDep1: "2.0.0",
				devDep2: "2.1.0",
			},
			peerDependencies: {
				peerDep1: "3.0.0",
			},
		};

		mockReadFile(mockDeps); // Mock the readFile result

		const externals = await getExternalsFromCurrentWorkingDirPackageJson();

		// Check the length of the returned dependencies
		expect(externals.length).toEqual(4);

		// Ensure each dependency is included
		expect(externals).toContain("dep1");
		expect(externals).toContain("devDep1");
		expect(externals).toContain("devDep2");
		expect(externals).toContain("peerDep1");
	});

	it("should handle missing sections in package.json gracefully", async () => {
		const modifiedMockDeps = {
			dependencies: {
				dep1: "1.0.0",
			},
			peerDependencies: {
				peerDep1: "3.0.0",
			},
		};

		mockReadFile(modifiedMockDeps);

		const externals = await getExternalsFromCurrentWorkingDirPackageJson();

		// We removed devDependencies, so the length should be reduced by 2
		expect(externals.length).toEqual(2);
	});

	it("should handle an empty package.json gracefully", async () => {
		mockReadFile({}); // Mock empty package.json

		const externals = await getExternalsFromCurrentWorkingDirPackageJson();

		expect(externals.length).toEqual(0);
	});

	it("should eliminate duplicates across sections", async () => {
		const dupMockDeps = {
			dependencies: {
				commonDep: "1.0.0",
			},
			devDependencies: {
				commonDep: "1.0.0",
			},
			peerDependencies: {
				commonDep: "1.0.0",
			},
		};

		mockReadFile(dupMockDeps);

		const externals = await getExternalsFromCurrentWorkingDirPackageJson();

		// Ensure duplicates are eliminated
		expect(externals.length).toEqual(1);
		expect(externals[0]).toEqual("commonDep");
	});

	it("should handle a package.json with only one section", async () => {
		const singleSectionDeps = {
			devDependencies: {
				devDep1: "1.0.0",
			},
		};

		mockReadFile(singleSectionDeps);

		const externals = await getExternalsFromCurrentWorkingDirPackageJson();

		expect(externals.length).toEqual(1);
		expect(externals[0]).toEqual("devDep1");
	});

	it("should handle an invalid package.json format gracefully", async () => {
		const invalidFormat = { notADependencySection: {} };

		mockReadFile(invalidFormat);

		const externals = await getExternalsFromCurrentWorkingDirPackageJson();

		expect(externals.length).toEqual(0);
	});
});
