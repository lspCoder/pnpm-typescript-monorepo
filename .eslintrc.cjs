const path = require("path");

module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    plugins: ["@typescript-eslint", "prettier", "import"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "import/extensions": "off",
        "import/no-named-as-default-member": "off",
        "import/named": "off",
        "import/no-self-import": "error",
        "import/no-cycle": "error",
        "import/default": "off",
        "no-console": ["error", { allow: ["warn", "info", "error", "log", "assert"] }],
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true,
            },
        ],
        "keyword-spacing": [
            "error",
            {
                before: true,
            },
        ],
        "arrow-spacing": [
            "error",
            {
                before: true,
                after: true,
            },
        ],
        curly: ["error", "all"],
        "prettier/prettier": "error",
        "import/no-unresolved": [2, { ignore: ["\\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$"] }],
        "sort-imports": [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
                ignoreMemberSort: true,
                memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
                allowSeparatedGroups: true,
            },
        ],
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", ["internal", "parent", "sibling", "index"], "unknown"],
                pathGroups: [
                    {
                        pattern: "./src/**",
                        group: "external",
                        position: "after",
                    },
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                "newlines-between": "always",
                alphabetize: {
                    order: "asc",
                },
            },
        ],
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            node: {
                paths: "packages/*/src",
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            typescript: {
                alwaysTryTypes: true,
                project: [
                    path.resolve(__dirname, ".tsconfig.json"), // root tsconfig
                    path.resolve(__dirname, "./packages/typescript-example-1/tsconfig.json"),
                    path.resolve(__dirname, "./packages/typescript-example-2/tsconfig.json"),
                    /* ...rest of projects path to its tsconfig */
                ],
            },
        },
    },
};
