/// <reference path="../../typings/package.json.d.ts" />
export * from './rollup/index';
export * from './watch/index';
export { default as rollup } from './rollup/index';
export { default as watch } from './watch/index';
export { version as VERSION } from 'package.json';
