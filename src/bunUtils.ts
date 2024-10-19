export async function bunBuildWrapper(
	// biome-ignore lint/suspicious/noExplicitAny: TBD
	options: any,
	// biome-ignore lint/suspicious/noExplicitAny: TBD
): Promise<{ success: boolean; logs: any[] }> {
	return Bun.build(options);
}
