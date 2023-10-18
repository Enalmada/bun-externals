/// <reference types="bun-types" />

import getExternalDependencies from './src';

export async function buildWithExternals(): Promise<void> {
  const externals = await getExternalDependencies();

  const result = await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    external: externals,
    root: './src',
  });

  if (!result.success) {
    console.error('Build failed');
    for (const message of result.logs) {
      console.error(message);
    }
    throw new AggregateError(result.logs, 'Build failed');
  }
}

void buildWithExternals();
