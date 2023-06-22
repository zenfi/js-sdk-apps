import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/creditea.js',
  output: {
    file: 'dist/creditea/index.js',
    format: 'umd',
    name: 'zenfi',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: '> 0.25%, not dead',
          },
        ],
      ],
    }),
    terser(),
  ],
};
