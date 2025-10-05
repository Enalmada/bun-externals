# 📋 bun-externals Modernization Task List

Based on npm-module-template upgrades. Track progress here.

---

## 1. 🗑️ Remove lint-staged and husky

**Status:** ✅ Completed

### Tasks:
- [x] Delete `.lintstagedrc.js` file
- [x] Delete `.husky` folder and all its contents
- [x] Remove from package.json devDependencies:
  - `lint-staged: "16.2.3"`
  - `husky: "9.1.7"`
- [x] Remove scripts from package.json:
  - `pre-commit`
  - `prepare` (replaced with lefthook install)

---

## 2. 🎨 Upgrade Biome Configuration

**Status:** ✅ Completed

### Tasks:
- [x] Rename `biome.json` → `biome.jsonc`
- [x] Update schema to `https://biomejs.dev/schemas/2.2.5/schema.json`
- [x] Enable VCS: `vcs.enabled: true`, `vcs.useIgnoreFile: true`
- [x] Update files section to use `includes` instead of `ignore`
- [x] Set `lineWidth: 120`
- [x] Move `organizeImports` to `assist.actions.source.organizeImports: "on"`
- [x] Add `linter.rules.correctness.noUnusedImports: "error"`
- [x] Add `javascript.formatter.trailingCommas: "all"`
- [x] Add `json.formatter.trailingCommas: "none"`
- [x] Fix `noConsoleLog` → `noConsole` (rule name changed in biome 2.2.5)

---

## 3. ⚡ Add Lefthook

**Status:** ✅ Completed

### Tasks:
- [x] Install lefthook: `bun add -D lefthook`
- [x] Install turbo: `bun add -D turbo` (required for check script)
- [x] Create `lefthook.yml` with:
  - parallel: true
  - type-check hook (glob: "**/*.{ts,tsx}")
  - lint hook with {staged_files} and stage_fixed: true
  - package-fix hook for package.json
  - Custom fail_text messages
- [x] Add to package.json scripts: `"prepare": "lefthook install"`

---

## 4. 📘 Modernize TypeScript Config

**Status:** ✅ Completed

### Tasks:
- [x] Change `moduleResolution` from `"node"` to `"Bundler"`
- [x] Add `isolatedModules: true`
- [x] Add `strictNullChecks: true`
- [x] Add `exactOptionalPropertyTypes: true`
- [x] Add `noEmit: false`
- [x] Add `baseUrl: "."`
- [x] Add `paths: { "@/*": ["./src/*"] }`

---

## 5. 📦 Enhance package.json

**Status:** ✅ Completed

### Tasks:
- [x] Add modern `exports` field:
  ```json
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  }
  ```
- [x] Add `sideEffects: false`
- [x] Add `engines: { "node": ">=18.0.0" }`
- [x] Add `files: ["dist"]`
- [x] Add `check` script: `"check": "turbo lint type-check test:unit"`
- [x] Fix Windows compatibility in build:clear:
  ```json
  "build:clear": "node -e \"require('fs').rmSync('dist', {recursive: true, force: true})\""
  ```

---

## 6. 🔧 Update Turbo Config

**Status:** ✅ Completed

### Tasks:
- [x] Update lint task inputs to reference `biome.jsonc`
- [x] Add proper inputs to `type-check` task: `["src/**/*.ts", "src/**/*.tsx", "tsconfig.json"]`
- [x] Update `test:unit` inputs to include test files: `["src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx", "vitest.config.ts"]`
- [x] Update `lint` task with proper inputs: `["src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx", "biome.jsonc"]`
- [x] Remove unused tasks: `lint:fix`, `build:pack`, `dev:install`, `test`

---

## 7. 🧪 Update Vitest Config

**Status:** ✅ Completed

### Tasks:
- [x] Remove GraphQL workaround (server.deps.inline section)
- [x] Add explicit test patterns: `include: ["test/**/*.test.ts", "src/**/*.test.ts"]`
- [x] Remove `watch: false` to allow watch mode
- [x] Keep the `@` alias configuration

---

## 8. 🗂️ Update .gitignore

**Status:** ✅ Completed

### Tasks:
- [x] Add `dist/` to .gitignore

---

## 9. 📝 Update .changeset/config.json

**Status:** ✅ Completed

### Tasks:
- [x] Change `"access": "restricted"` to `"access": "public"` (package.json already has public access)

---

## 10. 🔧 Fix Linting Issues

**Status:** ✅ Completed

### Tasks:
- [x] Add biome-ignore comments for console usage in build scripts (bunBuild.ts, prependClientDirective.ts)
- [x] Remove unused biome-ignore comments for `complexity/noForEach` rules

---

## 11. 📚 Update Documentation

**Status:** ⏳ Optional/Future

### Tasks:
- [ ] Update README.md to replace:
  - ❌ Remove: `lint-staged`, `husky`
  - ✅ Add: `lefthook`, `turbo` (if not already mentioned)
- [ ] Ensure tech stack list is current with:
  - bun build
  - vitest test framework
  - biome for linting and formatting
  - fixpack to normalize package.json
  - lefthook pre-commit hooks
  - turbo task orchestration and caching
  - changesets versioning
  - renovate dependency management

---

## 12. 🔄 Optional: Update Renovate Config

**Status:** ⏳ Optional/Future

### Tasks:
- [ ] Consider enabling renovate (currently disabled)
- [ ] If enabling, update to safer auto-merging config with minimum release age

---

## 📋 Final Verification Checklist

**Status:** ✅ Completed

### Tasks:
- [x] Run `bun install` - ✅ Success
- [x] Run `bun run prepare` (lefthook installed automatically during bun install)
- [x] Run `bun run check` - ✅ All tasks passed (lint, type-check, test:unit)
- [x] Run `bun run build` - ✅ Build successful
- [ ] Test pre-commit hooks by staging a file and committing (manual test)

---

## 🎯 Expected Benefits

| Change | Impact |
|--------|--------|
| Parallel lefthook | **2-3x faster** pre-commit |
| Biome improvements | Auto-import organization, cleaner code |
| TypeScript modernization | Better tree-shaking, stricter types |
| Package.json exports | Modern module resolution |
| Type-check hook | Catch errors before commit |
| Windows compatibility | Cross-platform builds |

---

## 📝 Completion Summary

**Date Completed:** 2025-10-05

### What Was Changed:

1. **Removed outdated tooling:** husky + lint-staged
2. **Added modern tooling:** lefthook with parallel execution
3. **Upgraded biome:** 1.9.4 → 2.2.5 schema with enhanced configuration
4. **Modernized TypeScript:** node → Bundler resolution with stricter checks
5. **Enhanced package.json:** Modern exports, engines, files fields
6. **Improved turbo config:** Proper input tracking for cache invalidation
7. **Cleaned up vitest:** Removed workarounds, added explicit patterns
8. **Fixed git ignore:** Added dist/
9. **Updated changeset:** Access set to public
10. **Fixed code quality:** Added proper biome-ignore comments for build output

### Verification Results:
```
✅ bun install - Success
✅ bun run check - All tasks passed
  - lint: Checked 16 files, no errors
  - type-check: No TypeScript errors
  - test:unit: 13 tests passed
✅ bun run build - Build successful
```

### New Dependencies Added:
- `lefthook: ^1.13.6`
- `turbo: ^2.5.8`

### Files Modified:
- `.changeset/config.json`
- `.gitignore`
- `biome.json` → `biome.jsonc`
- `bun.lockb`
- `package.json`
- `src/bunBuild.ts`
- `src/prependClientDirective.ts`
- `tsconfig.json`
- `turbo.json`
- `vitest.config.ts`

### Files Created:
- `lefthook.yml`
- `docs/session/upgrades.md`

### Files Deleted:
- `.lintstagedrc.js`
- `.husky/` (entire folder)

---

## 🚀 Next Steps

The modernization is complete and ready to commit. The pre-commit hooks will now:
1. Run type-check on TypeScript files
2. Run lint with auto-fix on staged files
3. Run package-fix on package.json changes
4. All hooks run in parallel for maximum speed

To test the hooks, stage some changes and commit:
```bash
git add .
git commit -m "modernize: upgrade to lefthook, biome 2.2.5, and modern tooling"
```
