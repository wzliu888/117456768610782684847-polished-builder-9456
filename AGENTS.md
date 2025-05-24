# Project AGENTS.md Guide for AI Agents

> **Purpose**
> This file provides specialized guidance for AI assistants and agents so they can navigate, edit, test, and extend this repository *safely and effectively*. It supplements the human‑oriented `README.md` and is automatically read by AI agents when present at the project root.

---

## 1. Project Snapshot

| Key Item          | Value                                                                           |
| ----------------- | ------------------------------------------------------------------------------- |
| **Frameworks**    | React 19 + Vite 6                                                               |
| **Routing**       | TanStack Router (file‑based, `src/routes`)                                      |
| **Styling**       | Tailwind CSS 4 + `tailwind-merge` + `tailwindcss-animate` + `class-variance-authority` |
| **State**         | TanStack Store (recommended for state management)                               |
| **Data‑Fetch**    | Route `loader`s **or** TanStack Query (needs to be installed)                   |
| **Quality Gates** | Vitest 3 (unit & component tests) • Biome 1.9 (lint, format, type‑aware checks) |
| **Dev Scripts**   | `npm run dev`/`start`, `build`, `test`, `lint`, `format`, `check`               |
| **Node Target**   | ESM (`"type":"module"`), TypeScript 5.7, strict                                 |

### Directory Cheatsheet

```
 .
 ├─ public/           # Static assets served as‑is
 ├─ src/
 │  ├─ routes/        # **File‑based routes** (one file = one route)
 │  │   ├─ index.tsx  # Root route
 │  │   └─ __root.tsx # Shared layout & Devtools
 │  ├─ components/    # Re‑usable UI pieces (prefer lucide‑react for icons)
 │  ├─ lib/           # Non‑React helpers (e.g. utility functions)
 │  └─ styles.css     # Global styles with Tailwind directives
 ├─ vitest.config.js  # Test runner setup
 └─ tailwind.config.js # Tailwind configuration
```

---

## 2. Quick‑Start Commands for Agents

> **IMPORTANT**: Due to command restrictions in sandboxed environments, AI agents cannot directly execute `npm` commands. The commands below are for reference only and should be suggested to human developers to run manually.

When human developers need to *run*, *build* or *test*, they can use:

| Action            | Command                     | Notes                                                      |
| ----------------- | --------------------------- | ---------------------------------------------------------- |
| **Dev server**    | `npm run dev` or `npm run start` | Vite dev on [http://localhost:3000](http://localhost:3000) |
| **Unit tests**    | `npm run test`              | Headless Vitest                                            |
| **Type check**    | `npm run build`             | Runs `vite build` then `tsc`                               |
| **Lint / Format** | `npm run lint` / `format`   | Uses Biome, auto‑fixable with `--apply`                    |
| **Full CI gate**  | `npm run check && npm test` | Recommended before any commit push                         |

**For AI agents**: Use allowed commands like `cat`, `ls`, `git status` to inspect code and suggest changes. Recommend that humans run the above commands to test and build.

---

## 3. Coding Conventions

1. **Language** – TypeScript only, `strict` mode; no `any` unless justified.
2. **File Naming** – kebab‑case for files, PascalCase for React components.
3. **CSS** – Prefer utility classes from Tailwind; avoid inline styles.
4. **State** – Use TanStack Store for state management; derive computed state with `Derived` as shown in README.md.
5. **Routing** – One route per file in `src/routes`. Use `createRoute` helpers. When adding a route, also add a `<Link>` in navigation if appropriate.
6. **Testing** – Co‑locate `*.test.tsx` next to source. Use React Testing Library for component tests.
7. **Imports** – Absolute imports via `@/` alias can be configured in `tsconfig.json` if needed.
8. **Devtools** – Keep `<TanStackRouterDevtools />` in dev‑only branches; wrap in `import.meta.env.DEV` guard for prod builds.
9. **Template Content** – When modifying files, remove any template instructions or comments that were meant as guidance for developers. For example, template code in `index.tsx` that contains instructional comments should be removed and replaced with actual implementation.

---

## 4. Pull‑Request Workflow

* **Branch Naming** `feat/<scope>` · `fix/<scope>` · `chore/<topic>`
* Keep PRs ≤ **300 LOC** and focused on a single concern.
* Every PR must pass `npm run test` and `npm run check` before merge.
* If PR **B** builds on changes from **A** (unmerged), target `B -> A` and re‑target to `main` once **A** is merged. This preserves linear history.

---

## 5. Working with Tests

* Vitest is configured for JSDOM & React Testing Library.
* Use `@testing-library/react` for component testing.
* Use `vi.useFakeTimers()` for timer‑based logic.

---

## 6. Environment & Secrets

> **Never** commit real API keys or `.env` values. Place sample keys in `.env.example`.
>
> AI agents must redact or mask any secrets that accidentally appear in logs.

---

## 7. Extending the Project

| Task               | Guidance                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Add dependency** | `npm install <pkg>` plus `@types/pkg` if needed for TypeScript.                                    |
| **Add route**      | Create `src/routes/<route>.tsx`; export `Route` via `createRoute`. Update nav links in `__root.tsx`.|
| **Add component**  | Place in `src/components/` following existing patterns.                                            |
| **Data fetching**  | Prefer `loader` for route‑scoped data; or install TanStack Query as shown in README.md.            |
| **Global state**   | Use TanStack Store. Follow pattern in README.md for derived state.                                 |
| **Icons**          | Import from `lucide-react` to keep bundle small.                                                   |
| **UI Components**  | Use `pnpx shadcn@latest add <component>` to add Shadcn components.                                 |

---

## 8. AI Agent‑Specific Tips

1. Before suggesting code, **read** `README.md`, this file, and any `TODO:` comments near the touched lines.
2. Prefer incremental edits to reduce merge conflicts.
3. After large refactors, run **all** tests and type‑checks; then execute `npm run build` to ensure build integrity.
4. When working with TanStack Router, remember it uses file-based routing with route files in `src/routes/`.
5. **Sandbox Limitations**: When operating in an AI sandbox environment, be aware that there is typically no web access. Do not suggest executing commands like `curl` or other network-dependent operations that may fail in the sandbox. Stick to local operations supported by the development environment.
6. When modifying existing files, make sure to remove any template/instructional content that was meant as guidance for initial development. Replace these with proper implementation code.

> **STRICT Command Restrictions**
> 
> ### ✅ ALLOWED Commands (EXACT LIST)
> You can ONLY use these commands:
> - **File reading**: `cat`, `head`, `tail`, `nl`, `wc`
> - **Directory operations**: `ls`, `pwd`, `cd`
> - **Search**: `grep`, `rg`, `find` (without `-exec`, `-delete`, `-execdir`, `-ok`, `-okdir`, `-fls`, `-fprint`, `-fprint0`, `-fprintf`)
> - **Git (read-only)**: `git status`, `git branch`, `git log`, `git diff`, `git show`
> - **Utilities**: `echo`, `true`, `which`
> - **Text processing**: `sed -n` (limited patterns only)
> - **Development**: `cargo check`
> 
> ### ❌ FORBIDDEN Commands
> DO NOT use: `npm`, `node`, `make`, `curl`, `rm`, `mv`, `cp`, `mkdir`, `python`, `docker`, `sh`, `bash`, `zsh`, `fish`, `yarn`, `pnpm`, `pip`, `sudo`, `chmod`, `chown`, `tar`, `zip`, `unzip`, `wget`, `apt`, `yum`, `systemctl`, or ANY other commands not in the allowed list above.
> 
> ### 📝 File Writing Mechanisms (Sandbox Bypasses)
> 
> **Method: `apply_patch` (Primary - ALWAYS USE THIS)**
> - Built-in Codex mechanism that bypasses ALL sandbox restrictions
> - Works regardless of seccomp/landlock limitations
> - Usage: `apply_patch "*** Begin Patch\n*** Update File: filename\n@@ changes @@\n*** End Patch"`
> - This method is **hard-coded to bypass sandbox** in the Rust core

---

## 9. FAQ for AI Agents

**Q — How do I reset the dev DB or API mocks?**
*A —* There is no backend in this template. Mock all network calls within tests or use a fake API like [https://swapi.dev](https://swapi.dev) as shown in the README examples.

**Q — How can I scaffold UI quickly?**
*A —* Run `pnpx shadcn@latest add <component>` to pull Tailwind‑compatible components.

**Q — Should I update Tailwind or Vite major versions automatically?**
*A —* No. Open a PR labeled `deps‑major` so humans can review bundle size and breaking changes.

---

## 10. Additional Resources

* [TanStack Router Documentation](https://tanstack.com/router/latest/docs/framework/react/overview)
* [TanStack Store Documentation](https://tanstack.com/store/latest)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Biome Documentation](https://biomejs.dev/guides/getting-started/)
* [Vitest Documentation](https://vitest.dev/guide/)

*End of file*
