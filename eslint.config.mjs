import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      // Client providers and admin data loaders intentionally hydrate browser or
      // API state after mount. These effects are synchronization boundaries, not
      // derived-state calculations.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  prettier,
  globalIgnores([".next/**", "node_modules/**", "out/**"]),
]);
