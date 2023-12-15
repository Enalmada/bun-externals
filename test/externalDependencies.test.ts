/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="bun-types" />

import getExternalsFromCurrentWorkingDirPackageJson from '../src';

const mockDeps = {
  dependencies: {
    dep1: '1.0.0',
  },
  devDependencies: {
    devDep1: '2.0.0',
    devDep2: '2.1.0',
  },
  peerDependencies: {
    peerDep1: '3.0.0',
  },
};

const skeletonPackageJson = {
  dependencies: {},
  devDependencies: {},
  peerDependencies: {},
};

function createMockedImport(data: any) {
  return vi.mock(process.cwd() + '/package.json', () => ({ ...skeletonPackageJson, ...data }));
}

describe('getExternalsFromCurrentWorkingDirPackageJson', () => {
  it('should return all unique dependencies', async () => {
    createMockedImport(mockDeps);

    const externals = await getExternalsFromCurrentWorkingDirPackageJson();

    // Check length
    expect(externals.length).toEqual(4);

    // Check each dependency is present
    expect(externals).toContain('dep1');
    expect(externals).toContain('devDep1');
    expect(externals).toContain('devDep2');
    expect(externals).toContain('peerDep1');
  });

  it('should handle missing sections in package.json gracefully', async () => {
    // Adjusting our mock data to exclude a section
    const modifiedMockDeps = { ...mockDeps };
    delete (modifiedMockDeps as any).devDependencies;
    createMockedImport(modifiedMockDeps);

    const externals = await getExternalsFromCurrentWorkingDirPackageJson();

    // We removed devDependencies, so the length should be reduced by 2 (devDep1 and devDep2)
    expect(externals.length).toEqual(2);
  });

  it('should handle an empty package.json gracefully', async () => {
    createMockedImport({});
    const externals = await getExternalsFromCurrentWorkingDirPackageJson();
    expect(externals.length).toEqual(0);
  });

  it('should eliminate duplicates across sections', async () => {
    const dupMockDeps = {
      dependencies: {
        commonDep: '1.0.0',
      },
      devDependencies: {
        commonDep: '1.0.0',
      },
      peerDependencies: {
        commonDep: '1.0.0',
      },
    };
    createMockedImport(dupMockDeps);
    const externals = await getExternalsFromCurrentWorkingDirPackageJson();
    expect(externals.length).toEqual(1);
    expect(externals[0]).toEqual('commonDep');
  });

  it('should handle a package.json with only one section', async () => {
    const singleSectionDeps = {
      devDependencies: {
        devDep1: '1.0.0',
      },
    };
    createMockedImport(singleSectionDeps);
    const externals = await getExternalsFromCurrentWorkingDirPackageJson();
    expect(externals.length).toEqual(1);
    expect(externals[0]).toEqual('devDep1');
  });

  // Optionally, if you think it's useful:
  it('should handle an invalid package.json format gracefully', async () => {
    const invalidFormat = { notADependencySection: {} };
    createMockedImport(invalidFormat);
    const externals = await getExternalsFromCurrentWorkingDirPackageJson();
    expect(externals.length).toEqual(0);
  });
});
