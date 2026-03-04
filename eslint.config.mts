import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: ["vitest.config.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "./eslint.config.mts",
            "./tsup.config.ts",
            "./vitest.config.ts",
            "./vitest.setup.ts",
          ],
        },
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "jsx-a11y": jsxA11y,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // --- TYPESCRIPT ---
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["class", "enumMember", "interface"],
          format: ["PascalCase"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // --- GENERAL ---
      "array-callback-return": "error",
      "brace-style": ["error", "1tbs"],
      "comma-spacing": ["error", { before: false, after: true }],
      curly: "error",
      eqeqeq: ["error", "smart"],
      "getter-return": "error",
      "jsx-a11y/alt-text": "error",
      "keyword-spacing": ["error", { before: true, after: true }],
      "max-len": ["error", { code: 185, ignoreStrings: true }],
      "no-bitwise": "error",
      "no-caller": "error",
      "no-debugger": "error",
      "no-eval": "error",
      "no-fallthrough": "error",
      "no-invalid-this": "error",
      "no-multiple-empty-lines": "error",
      "no-new-wrappers": "error",
      "no-redeclare": "error",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-unused-labels": "error",
      "no-useless-computed-key": "error",
      "no-useless-escape": "error",
      "no-var": "error",
      "prefer-const": "error",
      radix: "error",

      // --- REACT ---
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // --- IMPORT SORT ---
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: [
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "vitest.setup.ts",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.vitest,
      },
    },
  },
  {
    files: ["vitest.config.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["./vitest.config.ts"],
        },
        tsconfigRootDir: __dirname,
      },
    },
  },
]);
