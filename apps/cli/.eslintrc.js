/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["oclif", "oclif-typescript", "prettier"],
  rules: {
    "perfectionist/sort-objects": "off",
    "perfectionist/sort-imports": "off",
    "@typescript-eslint/no-unused-vars": "off",
    camelcase: "off",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-module": "off",
    "unicorn/no-array-for-each": "off",
  },
};
