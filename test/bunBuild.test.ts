import { bunBuild, handleBuildResult } from "../src";
import * as bunUtils from "../src/bunUtils";

vi.mock("../src/bunUtils", () => ({
	bunBuildWrapper: vi.fn().mockResolvedValue({ success: true, logs: [] }),
}));

describe("bunBuild module", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("handleBuildResult", () => {
		it("should not throw an error for a successful build", () => {
			const result = { success: true, logs: [] };
			expect(() => handleBuildResult(result)).not.toThrow();
		});

		it("should throw an error for a failed build", () => {
			const result = { success: false, logs: ["Error 1", "Error 2"] };
			expect(() => handleBuildResult(result)).toThrow("Build failed");
		});
	});

	describe("bunBuild", () => {
		it("should call Bun.build with provided options", async () => {
			const options = { entrypoints: ["./src/index.ts"] };
			await bunBuild(options);

			const mockBunBuildWrapper = vi.mocked(bunUtils.bunBuildWrapper);
			expect(mockBunBuildWrapper).toHaveBeenCalledWith(options);
		});

		it("should handle failed build result", async () => {
			const mockBunBuildWrapper = vi.mocked(bunUtils.bunBuildWrapper);
			mockBunBuildWrapper.mockResolvedValueOnce({
				success: false,
				logs: ["Error 1"],
			});

			const options = { entrypoints: ["./src/index.ts"] };
			await expect(bunBuild(options)).rejects.toThrow("Build failed");
		});
	});
});
