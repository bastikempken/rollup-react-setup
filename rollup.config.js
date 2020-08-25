import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import livereload from "rollup-plugin-livereload";
import replace from "rollup-plugin-replace";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript";
//Template
import { template } from "./src/html-template";

const outputFolder = "build";

//Variable
const isDev = process.env.BUILD_ENV === "DEV";

export default {
  input: "./src/index.tsx",
  output: [
    {
      dir: outputFolder,
      sourcemap: isDev ? "inline" : false,
      entryFileNames: isDev ? "bundle.js" : "bundle.[hash].js",
    },
  ],
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs({
      include: ["node_modules/**"],
      exclude: ["node_modules/process-es6/**"],
    }),
    filesize(),
    html({ template }),
    replace({
      "process.env.NODE_ENV": isDev
        ? JSON.stringify("development")
        : JSON.stringify("production"),
    }),
    !isDev && terser(),
    isDev &&
      serve({
        open: false,
        contentBase: outputFolder,
        host: "localhost",
        port: 4200,
      }),
    isDev && livereload(outputFolder),
  ],
};
