# mf-ui-library

A small React design system / UI component library I use across BI projects.

It’s built as a **library** (not an app): you develop and preview components in Storybook, and publish a bundled output (ESM + CJS + typings) from `dist/`.

## Tech stack

- **React + TypeScript**
- **styled-components v6** (peer dependency)
- **Build**: `tsup` (outputs ESM + CJS + `.d.ts`)
- **Docs / playground**: Storybook (Vite)
- **Tests**: Vitest (jsdom) + Testing Library
- **Storybook tests**: `@storybook/addon-vitest` + Playwright (headless browser)
- **Quality**: ESLint + `tsc` + Prettier

## Architecture

The code lives under `src/`:

- `src/foundation/` — design tokens (colors, spacing, typography, shadows)
- `src/components/` — UI components (atoms → molecules → organisms)
- `src/hooks/` — reusable React hooks
- `src/helpers/` — shared utility functions/types
- `src/theme/` — theme helpers (currently internal)

### Public API (what the package exports)

The library’s **single entry point** is `src/index.ts` (configured in `tsup.config.ts`).

The package root currently exports:

- `components/`
- `foundation/`
- `hooks/`
- `theme/`

Helpers remain internal to the repo and are not part of the public package API.

### Internal path aliases

The source uses TypeScript path aliases (e.g. `@foundations`, `@helpers`, `components/...`) for local development. Those are resolved at build time.

## Development guide

### Prerequisites

- Node.js installed (recommended: `nvm`, this repo includes a `.nvmrc`)
- `pnpm` (this repo pins a `packageManager` version in `package.json`)

If you use `nvm`:

```bash
nvm install
nvm use
```

### Install

```bash
pnpm install
```

### Build (library output)

Builds `dist/` (ESM + CJS + source maps + TypeScript declarations):

```bash
pnpm build
```

### Watch mode (dev build)

Continuously rebuilds `dist/` on changes:

```bash
pnpm dev
```

### Run Storybook (component playground)

Starts Storybook on port `6006`:

```bash
pnpm storybook
```

Build static Storybook:

```bash
pnpm build-storybook
```

## Publishing

This repo is set up to publish to npm through GitHub Actions when you push a
version tag matching `v*.*.*`.

Typical release flow:

```bash
pnpm version 2.0.1 --no-git-tag-version
git add package.json pnpm-lock.yaml
git commit -m "release: v2.0.1"
git tag v2.0.1
git push origin main --tags
```

Notes:

- The npm package version in `package.json` and the git tag should match.
- GitHub Actions will only publish on pushed version tags, not on every commit.
- Republishing the same npm version is not allowed, so bump the version first.

## Testing

### Unit tests

Runs unit tests (Vitest “unit” project):

```bash
pnpm test
```

### Storybook tests

Runs Storybook-linked tests in a headless browser (Vitest “storybook” project):

```bash
pnpm test:storybook
```

First run may require installing Playwright browsers:

```bash
pnpm playwright install
```

## Linting & formatting

Typecheck + ESLint:

```bash
pnpm lint
```

Auto-fix ESLint + format:

```bash
pnpm lint:fix
```

Format only:

```bash
pnpm lint:format
```

## Example (using foundation tokens)

```tsx
import styled from "styled-components";
import { Borders, Padding, Surface } from "@almeidinha/mfui";

export const Panel = styled.div`
  background: ${Surface.Default.Default};
  border: 1px solid ${Borders.Default.Subdued};
  padding: ${Padding.m};
`;
```
