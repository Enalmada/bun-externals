/// <reference types="bun-types" />

import getExternalDependencies, { bunBuild } from './src';

export async function buildWithExternals(): Promise<void> {
  const externals = await getExternalDependencies();

  await bunBuild({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    external: externals,
    root: './src',
  });
}

void buildWithExternals();
