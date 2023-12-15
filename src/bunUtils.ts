/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */

/// <reference types="bun-types" />

export async function bunBuildWrapper(options: any): Promise<{ success: boolean; logs: any[] }> {
  return Bun.build(options);
}
