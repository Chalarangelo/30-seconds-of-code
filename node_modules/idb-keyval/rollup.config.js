import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'idb-keyval.ts',
  plugins: [typescript()],
  output: [{
    file: 'dist/idb-keyval-iife.js',
    format: 'iife',
    name: 'idbKeyval'
  }, {
    file: 'dist/idb-keyval-cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/idb-keyval.mjs',
    format: 'es'
  }, {
    file: 'dist/idb-keyval-amd.js',
    format: 'amd',
  }]
};
