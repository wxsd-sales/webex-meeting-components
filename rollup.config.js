import serve from "rollup-plugin-serve";
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import livereload from "rollup-plugin-livereload";
import { eslint } from "rollup-plugin-eslint";
import globals from 'rollup-plugin-node-globals';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss'
import assets from 'postcss-assets';

const plugins = [
  nodeResolve({
    extensions:
    [
    '.mjs',
    '.js',
    '.json',
    '.jsx',
    '.ts',
    '.txs',
    ],
    browser: true
  }),
  commonjs(),
  typescript(),
  json(),
  scss({
    output: `dist/css/style.css`,
    outputStyle: 'compressed',
    failOnError: true,
    // Search for Sass in third-party packages e.g. Momentum UI
    includePaths: ['node_modules'],
    // Remove Webpack-style imports
    // Webpack-style imports are left in code because Storybook uses Webpack
    importer: (path) => ({file: path[0] === '~' ? path.slice(1) : path}),
  }),  
  // postcss(),
  globals(),
  // eslint(),
  serve({
    contentBase: "dist",
    historyApiFallback: "/200.html",
    host: "localhost",
    port: 9999,
  }),
  livereload("dist"),
];

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    sourcemap: "dist/index.js.map",
    format: "iife",
  },
  plugins: [...plugins],
  
  onwarn: function(warning) {
    // Skip certain warnings

    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`);
    }
  }
};
