## babel-bridge

This repo holds what we're calling a "bridge" package that is meant to ease the
transition for libraries that use "babel-core" as a peer dependency for Babel 6.

The issue with Babel 7's transition to scopes is that if a package depends on
Babel 6, they may want to add support for Babel 7 alongside. Because Babel 7
will be released as `@babel/core` instead of `babel-core`, maintainers have
no way to do that transition without making a breaking change. e.g.

```js
peerDependencies: {
  "babel-core": "6.x"
}
```
cannot change to

```js
peerDependencies: {
  "@babel/core": "6.x"
}
```

without it being a breaking change.

### Solution

To address this, we're releasing this bridge package, to allow users to do


```js
peerDependencies: {
  "babel-core": "6.x | ^7.0.0-bridge"
}
```

then where users of this package would originally have done

```sh
npm i some-package babel-core
```

to install Babel 6, they could now do


```sh
npm i some-package babel-core@^7.0.0-bridge @babel/core
```

to install the bridge package, and install Babel 7's core.
