import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/amex.js',
  output: {
    file: 'dist/amex/index.js',
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
      babelHelpers: 'runtime',
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
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
    }),
    terser(),
  ],
};
