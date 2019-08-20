# rollup-pluginutils

A set of functions commonly used by Rollup plugins.


## Installation

```bash
npm install --save rollup-pluginutils
```


## Usage

### addExtension

```js
import { addExtension } from 'rollup-pluginutils';

export default function myPlugin ( options = {} ) {
  return {
    resolveId ( code, id ) {
      // only adds an extension if there isn't one already
      id = addExtension( id ); // `foo` -> `foo.js`, `foo.js -> foo.js`
      id = addExtension( id, '.myext' ); // `foo` -> `foo.myext`, `foo.js -> `foo.js`
    }
  };
}
```


### attachScopes

This function attaches `Scope` objects to the relevant nodes of an AST. Each `Scope` object has a `scope.contains(name)` method that returns `true` if a given name is defined in the current scope or a parent scope.

See [rollup-plugin-inject](https://github.com/rollup/rollup-plugin-inject) or [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs) for an example of usage.

```js
import { attachScopes } from 'rollup-pluginutils';
import { walk } from 'estree-walker';

export default function myPlugin ( options = {} ) {
  return {
    transform ( code ) {
      const ast = this.parse( code );

      let scope = attachScopes( ast, 'scope' );

      walk( ast, {
        enter ( node ) {
          if ( node.scope ) scope = node.scope;

          if ( !scope.contains( 'foo' ) ) {
            // `foo` is not defined, so if we encounter it,
            // we assume it's a global
          }
        },
        leave ( node ) {
          if ( node.scope ) scope = scope.parent;
        }
      });
    }
  };
}
```


### createFilter

```js
import { createFilter } from 'rollup-pluginutils';

export default function myPlugin ( options = {} ) {
  // `options.include` and `options.exclude` can each be a minimatch
  // pattern, or an array of minimatch patterns, relative to process.cwd()
  var filter = createFilter( options.include, options.exclude );

  return {
    transform ( code, id ) {
      // if `options.include` is omitted or has zero length, filter
      // will return `true` by default. Otherwise, an ID must match
      // one or more of the minimatch patterns, and must not match
      // any of the `options.exclude` patterns.
      if ( !filter( id ) ) return;

      // proceed with the transformation...
    }
  };
}
```

If you want to resolve the patterns against a directory other than
`process.cwd()`, you can additionally pass a `resolve` option:

```js
var filter = createFilter( options.include, options.exclude, {resolve: '/my/base/dir'} )
```

If `resolve` is a string, then this value will be used as the base directory.
Relative paths will be resolved against `process.cwd()` first. If `resolve` is
`false`, then the patterns will not be resolved against any directory. This can
be useful if you want to create a filter for virtual module names.


### makeLegalIdentifier

```js
import { makeLegalIdentifier } from 'rollup-pluginutils';

makeLegalIdentifier( 'foo-bar' ); // 'foo_bar'
makeLegalIdentifier( 'typeof' ); // '_typeof'
```

### dataToEsm

Helper for treeshakable data imports

```js
import { dataToEsm } from 'rollup-pluginutils';

const esModuleSource = dataToEsm({
  custom: 'data',
  to: ['treeshake']
}, {
  compact: false,
  indent: '\t',
  preferConst: false,
  objectShorthand: false,
  namedExports: true
});
/*
Outputs the string ES module source:
  export const custom = 'data';
  export const to = ['treeshake'];
  export default { custom, to };
*/
```

### extractAssignedNames

Extract the names of all assignment targets from patterns.

```js
import { extractAssignedNames } from 'rollup-pluginutils';
import { walk } from 'estree-walker';

export default function myPlugin ( options = {} ) {
  return {
    transform ( code ) {
      const ast = this.parse( code );

      walk( ast, {
        enter ( node ) {
          if ( node.type === 'VariableDeclarator' ) {
          	const declaredNames = extractAssignedNames(node.id);
          	// do something with the declared names
          	// e.g. for `const {x, y: z} = ... => declaredNames = ['x', 'z']
          }
        }
      });
    }
  };
}
```


## License

MIT
