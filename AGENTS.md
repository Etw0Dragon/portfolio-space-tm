# Repository Guidelines

## Project Structure & Module Organization

This is an Astro portfolio using React islands, Tailwind CSS, Framer Motion, and Three.js/WebGPU visuals.

- `src/pages/` contains Astro routes such as `index.astro`, `terminal.astro`, and `easter-egg.astro`.
- `src/components/` contains React UI and animation components. Use PascalCase filenames, for example `Timeline.tsx`.
- `src/layouts/` contains shared Astro layouts.
- `src/constants/` stores shared data.
- `src/utils/` contains rendering and helper code, including `src/utils/webgpu-black-hole/`.
- `public/img/` and `public/videos/` hold static assets referenced by absolute paths like `/img/git.png`.
- `dist/` is generated build output. Do not edit it manually.

There is no dedicated test directory.

## Build, Test, and Development Commands

- `pnpm install` installs dependencies.
- `pnpm dev` starts the Astro development server.
- `pnpm start` is an alias for `pnpm dev`.
- `pnpm build` creates the static production build in `dist/`.
- `pnpm preview` serves the built site locally.
- `pnpm astro ...` runs Astro CLI commands directly.

No `test`, `lint`, or `format` scripts are currently defined.

## Coding Style & Naming Conventions

Write TypeScript and React in the existing style: functional components, PascalCase component names, and camelCase variables. Keep UI classes in Tailwind utility strings and follow nearby layout patterns.

Use two-space indentation in Astro files and preserve the current spacing style in touched TypeScript files. Prefer concise comments only where shader, animation, or WebGPU behavior is not obvious.

## Testing Guidelines

Because there is no automated test setup, validate changes with `pnpm build` at minimum. For visual or interactive changes, run `pnpm dev` and check relevant viewport sizes, especially the black hole scene, mobile notice, terminal, and modal states.

If tests are added later, place them near the code they cover or under a clear `tests/` directory, and document the new command in this file.

## Commit & Pull Request Guidelines

Recent commits use short descriptive messages such as `fix planets position arround the blackhole`, `new pop up to select blackhole resolution`, and `add alert for mobile...`. Keep commits focused and concise.

Pull requests should include a brief summary, verification steps such as `pnpm build`, linked issues when applicable, and screenshots or screen recordings for UI, animation, or responsive layout changes.

## Agent-Specific Instructions

Do not modify generated files in `dist/` unless the task explicitly requires committing build output. Avoid reverting unrelated user changes. Keep edits scoped to the requested behavior.
