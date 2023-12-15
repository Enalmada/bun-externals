/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="bun-types" />

import fg, { type Options } from 'fast-glob';

export default async function getSourceFiles(
  source = './src/**/*.{ts,tsx,js,jsx}',
  options?: Options
): Promise<string[]> {
  return await fg(source, options);
}
