import * as walk from 'acorn/dist/walk';
import { DynamicImportKey } from './inject';

export function inject(injectableWalk) {
  return Object.assign({}, injectableWalk, {
    base: Object.assign({}, injectableWalk.base, {
      [DynamicImportKey]() {},
    }),
  });
}

export default inject(walk);
