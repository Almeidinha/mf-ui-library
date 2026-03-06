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

At the moment, the package root exports are intentionally minimal:

- `src/index.ts` currently exports **only** `foundation/`
- `components/`, `hooks/`, `helpers/`, and `theme/` exist in the repo but are not exported from the package root yet

If you want consumers to import components from the package root (e.g. `import { Modal } from "@almeidinha/mfui"`), expose them by exporting from `src/index.ts`.

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
