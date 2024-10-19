import fg from "fast-glob";

import { getSourceFiles } from "../src";

// Mocking fast-glob
vi.mock("fast-glob", () => ({
	__esModule: true, // This is required for mocking ES modules
	default: vi.fn(),
}));

describe("getSourceFiles", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should call fast-glob with the default directory when no argument is provided", async () => {
		const mockFg = vi.mocked(fg);
		mockFg.mockResolvedValueOnce(["./src/file1.ts", "./src/file2.ts"]);

		const files = await getSourceFiles();

		expect(mockFg).toHaveBeenCalledWith(
			"./src/**/*.{ts,tsx,js,jsx}",
			undefined,
		);
		expect(files).toEqual(["./src/file1.ts", "./src/file2.ts"]);
	});

	it("should call fast-glob with a specified directory", async () => {
		const mockFg = vi.mocked(fg);
		const testDirectory = "./test";
		mockFg.mockResolvedValueOnce(["./test/file1.ts", "./test/file2.ts"]);

		const files = await getSourceFiles(testDirectory);

		expect(mockFg).toHaveBeenCalledWith(testDirectory, undefined);
		expect(files).toEqual(["./test/file1.ts", "./test/file2.ts"]);
	});

	it("should handle no files found", async () => {
		const mockFg = vi.mocked(fg);
		mockFg.mockResolvedValueOnce([]);

		const files = await getSourceFiles("./empty");

		expect(mockFg).toHaveBeenCalledWith("./empty", undefined);
		expect(files).toEqual([]);
	});
});
