import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",  // Add this line to disable the any type error
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            "{}": false  // Add this to allow empty object type
          },
          extendDefaults: true
        }
      ]
    }
  }
];

export default eslintConfig;
