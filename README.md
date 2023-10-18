# bun-externals

## What
Workaround for bun not having a way to define all node_modules as external
https://github.com/oven-sh/bun/issues/6351

## Installation
`bun install -D @enalmada/bun-externals`

## Usage
```ts
// build.ts
/// <reference types="bun-types" />

import getExternalDependencies from '@enalmada/bun-externals';

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
```
See build.ts for example

## TODO
- [ ] deprecate with a plugin or actual bun feature


## Notes
### Build
* Using [latest module and target settings](https://stackoverflow.com/questions/72380007/what-typescript-configuration-produces-output-closest-to-node-js-18-capabilities/72380008#72380008) for current LTS
* using tsc for types until [bun support](https://github.com/oven-sh/bun/issues/5141#issuecomment-1727578701) comes around

## Contribute
Using [changesets](https://github.com/changesets/changesets) so please remember to run "changeset" with any PR that might be interesting to people on an older template.
Although this isn't being deployed as a module, I would like to call out things worth keeping in sync.