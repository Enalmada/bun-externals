import { bunBuildWrapper } from "./bunUtils";

export function handleBuildResult(result: {
	success: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: TBD
	logs: any[];
}): void {
	if (!result.success) {
		console.error("Build failed");
		for (const message of result.logs) {
			console.error(message);
		}
		throw new AggregateError(result.logs, "Build failed");
	}
}

// biome-ignore lint/suspicious/noExplicitAny: TBD
export async function bunBuild(options: any): Promise<void> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = await bunBuildWrapper(options);
	handleBuildResult(result);
}
