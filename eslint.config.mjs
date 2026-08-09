import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Module boundaries: keep each dashboard module a self-contained vertical
  // slice so it can later be split into its own deployable app/zone.
  {
    files: ["src/app/**/*.{ts,tsx}", "src/modules/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/root-path": "src",
      "boundaries/elements": [
        { type: "shared", pattern: "modules/shared" },
        { type: "module", pattern: "modules/*", capture: ["moduleName"] },
        { type: "app", pattern: "app" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            // A module may freely import its own internals.
            {
              from: { element: { type: "module" } },
              allow: {
                to: {
                  element: {
                    type: "module",
                    captured: {
                      moduleName: "{{ from.element.captured.moduleName }}",
                    },
                  },
                },
              },
            },
            // Cross-module imports must go through the target's public entry.
            {
              from: { element: { type: "module" } },
              allow: {
                to: {
                  element: { type: "module", fileInternalPath: "index.tsx" },
                },
              },
            },
            // Any module (or app route) can use the shared kit.
            {
              from: { element: { type: ["module", "app"] } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "shared" } } },
            },
            // Routes only reach a module through its public entry point.
            {
              from: { element: { type: "app" } },
              allow: {
                to: {
                  element: { type: "module", fileInternalPath: "index.tsx" },
                },
              },
            },
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { type: "app" } } },
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
