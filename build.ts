/// <reference types="bun-types" />

import { bunBuild, getSourceFiles } from './src';

export async function buildWithExternals(): Promise<void> {
  const entrypoints = await getSourceFiles();

  await bunBuild({
    entrypoints,
    outdir: './dist',
    target: 'node',
    external: ['*'],
    root: './src',
  });
}

void buildWithExternals();
