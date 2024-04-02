import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" assert { type: "json" };

const isProd = process.env.BUILD === "production";

export default defineConfig([
    // browser-friendly UMD build

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: "src/index.ts",
        plugins: [
            json(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            image(),
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            typescript(),
            eslint({
                fix: true,
                include: ["*.js", "*.ts"]
            }),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            postcss({
                plugins: [],
                extensions: [".css"]
            }),
            isProd && terser()
        ],
        external: ["ms"],
        output: [
            // { file: pkg.main, format: 'umd', name: "libName" },
            { file: pkg.module, format: "es" }
        ]
    }
]);
