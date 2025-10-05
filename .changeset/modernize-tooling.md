---
"@enalmada/bun-externals": patch
---

Modernize development tooling and configuration

- Replace husky + lint-staged with lefthook for faster parallel pre-commit hooks
- Upgrade Biome configuration to 2.2.5 with enhanced linting rules and 120 line width
- Modernize TypeScript config with Bundler module resolution and stricter type checking
- Add modern package.json exports field for better ESM compatibility
- Add turbo for task orchestration and caching
- Update Vitest config with explicit test patterns
- Fix Windows compatibility in build scripts
- Add proper biome-ignore comments for build output console usage
- Remove unnecessary triple-slash bun-types reference
