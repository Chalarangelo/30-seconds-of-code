# React Hot Loader

[![Build Status][build-badge]][build] [![version][version-badge]][package]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs] [![Chat][chat-badge]][chat]
[![Backers on Open Collective][oc-backer-badge]](#backers)
[![Sponsors on Open Collective][oc-sponsor-badge]](#sponsors)

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

Tweak React components in real time ⚛️⚡️

Watch
**[Dan Abramov's talk on Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs).**

## Install

```
npm install react-hot-loader
```

> Note: You can safely install react-hot-loader as a regular dependency instead
> of a dev dependency as it automatically ensures it is not executed in
> production and the footprint is minimal.

## Getting started

1.  Add `react-hot-loader/babel` to your `.babelrc`:

```js
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```

2.  Mark your root component as _hot-exported_:

```js
// App.js
import { hot } from 'react-hot-loader/root';
const App = () => <div>Hello World!</div>;
export default hot(App);
```

3.  Make sure `react-hot-loader` is required before `react` and `react-dom`:

* or `import 'react-hot-loader'` in your main file (before React)
* or prepend your webpack entry point with `react-hot-loader/patch`, for example:
  ```js
  // webpack.config.js
  module.exports = {
    entry: ['react-hot-loader/patch', './src'],
    // ...
  }
  ```

4.  If you need hooks support, use [`@hot-loader/react-dom`](#hot-loaderreact-dom)

### Hook support

Hooks would be auto updated on HMR if they _should_ be.
There is only one condition for it - a non zero dependencies list.

```js
❄️ useState(initialState); // will never updated (preserve state)
❄️ useEffect(effect); // no need to update, updated on every render
❄️ useEffect(effect, []); // "on mount" hook. "Not changing the past"
🔥 useEffect(effect, [anyDep]); // would be updated

🔥 useEffect(effect, ["hot"]); // the simplest way to make hook reloadable
```

**Plus**

* any hook would be reloaded on a function body change. Enabled by default, controlled by `reloadHooksOnBodyChange` option.
* you may configure RHL to reload any hook by setting `reloadLifeCycleHooks` option to true.

**To disable hooks reloading** - set configuration option:

```js
import { setConfig } from 'react-hot-loader';

setConfig({
  reloadHooks: false,
});
```

With this option set **all** `useEffects`, `useCallbacks` and `useMemo` would be updated on Hot Module Replacement.

### Hooks reset

Hooks would be reset if their order changes. Adding, removing or moving around would
cause a local tree remount.

**Babel plugin is required** for this operation. Without it changing hook order would throw an error
which would be propagated till the nearest class-based component.

## `@hot-loader/react-dom`

[`@hot-loader/react-dom`](https://github.com/hot-loader/react-dom) replaces the "react-dom" package of the same version, but with additional patches to support hot reloading.

There are 2 ways to install it:

* Use **yarn** name resolution, so `@hot-loader/react-dom` would be installed instead of `react-dom`

```
yarn add react-dom@npm:@hot-loader/react-dom
```

* Use [webpack aliases](https://webpack.js.org/configuration/resolve/#resolvealias)

```
yarn add @hot-loader/react-dom
```

```js
// webpack.config.js
module.exports = {
  // ...
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
```

### Old API

**Note:** There is also an old version of `hot`, used prior to version 4.5.4. **Please use the new one**,
as it is much more resilient to js errors that you may make during development.

Meanwhile, not all the bundlers are compatible with new `/root` API, for example **[parcel](http://parceljs.org/) is not**.

React-Hot-Load will throw an error, asking you to use the old API, if such incompatibility would be detected.
It is almost the same, but you have to pass `module` inside `hot`.

```js
import { hot } from 'react-hot-loader';
const App = () => <div>Hello World!</div>;
export default hot(module)(App);
```

3.  [Run webpack with Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr):

```sh
webpack-dev-server --hot
```

## Limitations

* (that's the goal) React-Hot-Loader would not change the past, only update the present - no lifecycle event would be called on component update.
  As a result - all the code changes, you may made among `componentWillUnmount` or `componentDidMount`, would be ignored for
  already created components.
* (that's the goal) React-Hot-Loader would not update any object, including component `state`.
* (1%) React-Hot-Loader could not reply some changes you may made in components `constructors`. As long as
  components would not be recreated - RHL have to _inject_ new data onto existing components, but there is no way to detect the actual change and the way reply it.
  React-Hot-Loader knows what class method is, not how you created it. See #1001 for details.

## Recipes

### Migrating from [create-react-app](https://github.com/facebookincubator/create-react-app)

1.  Run `npm run eject`
2.  Install React Hot Loader (`npm install --save-dev react-hot-loader`)
3.  In `config/webpack.config.dev.js`, add `'react-hot-loader/babel'` to Babel
    loader configuration. The loader should now look like:

```js
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
      plugins: ['react-hot-loader/babel'],
    },
  }
```

4.  Mark your App (`src/App.js`) as _hot-exported_:

```js
// ./containers/App.js
import React from 'react';
import { hot } from 'react-hot-loader';

const App = () => <div>Hello World!</div>;

export default hot(module)(App);
```

### Migrating from [create-react-app](https://github.com/facebookincubator/create-react-app) without ejecting

Users [report](https://github.com/gaearon/react-hot-loader/pull/729#issuecomment-354097936), that it is possible to use [react-app-rewire-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader) to setup React-hot-loader without ejecting.

### TypeScript

As of version 4, React Hot Loader requires you to pass your code through [Babel](http://babeljs.io/) to transform it so that it can be hot-reloaded. This can be a pain point for TypeScript users, who usually do not need to integrate Babel as part of their build process.

Fortunately, it's simpler than it may seem! Babel will happily parse TypeScript syntax and can act as an alternative to the TypeScript compiler, so you can safely replace `ts-loader` or `awesome-typescript-loader` in your Webpack configuration with `babel-loader`. Babel won't typecheck your code, but you can use [`fork-ts-checker-webpack-plugin`](https://github.com/Realytics/fork-ts-checker-webpack-plugin) (and/or invoke `tsc --noEmit`) as part of your build process instead.

A sample configuration:

```js
{
  // ...you'll probably need to configure the usual Webpack fields like "mode" and "entry", too.
  resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } } // or whatever your project requires
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ],
            plugins: [
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "react-hot-loader/babel"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
};
```

For a full example configuration of TypeScript with React Hot Loader and newest beta version of Babel, check [here](https://github.com/gaearon/react-hot-loader/tree/master/examples/typescript).

As an alternative to this approach, it's possible to chain Webpack loaders so that your code passes through Babel and then TypeScript (or TypeScript and then Babel), but this approach is not recommended as it is more complex and may be significantly less performant. Read more [discussion here](https://github.com/gaearon/react-hot-loader/issues/884).

### Parcel

Parcel supports Hot Module Reloading out of the box, just follow step 1 and 2 of [Getting Started](https://github.com/gaearon/react-hot-loader/tree/master#getting-started).

We also have a [full example running Parcel + React Hot Loader](https://github.com/gaearon/react-hot-loader/tree/master/examples/parcel).

### Electron

You need something to mark your modules as hot in order to use React Hot Loader.

One way of doing this with Electron is to simply use webpack like any web-based project might do and the general guide above describes. See also [this example Electron app](https://github.com/s-h-a-d-o-w/rhl-electron-quick-start).

A webpack-less way of doing it to use `electron-compile` (which is also used by [`electron-forge`](https://electronforge.io)) - see [this example](https://github.com/rllola/hmr-example-issue-2). While it requires less configuration, something to keep in mind is that `electron-compile`'s HMR will always reload all modules, regardless of what was actually edited.

### Source Maps

If you use `devtool: 'source-map'` (or its equivalent), source maps will be
emitted to hide hot reloading code.

Source maps slow down your project. Use `devtool: 'eval'` for best build
performance.

Hot reloading code is just one line in the beginning and one line at the end of
each module so you might not need source maps at all.

### Linking

If you are using `npm link` or `yarn link` for development purposes, there is a chance you will get error `Module not found: Error: Cannot resolve module 'react-hot-loader'` or the linked package is not hot reloaded.

There are 2 ways to fix `Module not found`:

* Use [`include` in loader configuration](https://github.com/gaearon/react-hot-boilerplate/blob/master/webpack.config.js#L22) to only opt-in your app's files to processing.
* Alternatively if you are using webpack, override the module resolution in your config:

```js
{
  resolve: {
    alias: {
      'react-hot-loader': path.resolve(path.join(__dirname, './node_modules/react-hot-loader')),
    }
  }
}
```

And to make your linked package to be hot reloaded, it will need to use the patched version of `react` and `react-dom`, if you're using webpack, add this options to the alias config

```js
{
  resolve: {
    alias: {
      'react-hot-loader': path.resolve(path.join(__dirname, './node_modules/react-hot-loader')),
      // add these 2 lines below so linked package will reference the patched version of `react` and `react-dom`
      'react': path.resolve(path.join(__dirname, './node_modules/react')),
      'react-dom': path.resolve(path.join(__dirname, './node_modules/react-dom')),
      // or point react-dom above to './node_modules/@hot-loader/react-dom' if you are using it
    }
  }
}
```

## Preact

React-hot-loader should work out of the box with `preact-compat`, but, in case of pure preact, you will need
to configure it:

* create configuration file (setupHotLoader.js)

```js
import reactHotLoader from 'react-hot-loader';
import preact from 'preact';

reactHotLoader.preact(preact);
```

* dont forget to import it

#### Preact limitations

* HOCs and Decorators as not supported yet. For Preact React-Hot-Loader v4 behave as v3.

## React Native

React Native
**[supports hot reloading natively](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html)**
as of version 0.22.

Using React Hot Loader with React Native can cause unexpected issues (see #824) and is not recommended.

## Webpack plugin

We recommend using the `babel` plugin, but there are some situations where you are unable to. If so, try the `webpack` plugin / `webpack-loader` (as seen in v3).

Remember - the `webpack` plugin is **not compatible** with class-based components. The `babel` plugin
will inject special methods to every class, to make `class members` (like onClick) hot-updatable, while the `webpack` plugin would leave classes as is, without any _instrumentation_.

```js
class MyComponent extends React.Component {
  onClick = () => this.setState(); // COULD NOT UPDATE
  variable = 1; // this is ok
  render() {} // this is ok
}
```

But `webpack-loader` could help with TypeScript or _spreading_ "cold API" [to all node_modules](https://github.com/gaearon/react-hot-loader#disabling-a-type-change-for-all-node_modules).

> It is safe to enable this loader for all the files. But place it after babel-loader, if babel-loader is present.

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
    ],
  },
};
```

Webpack plugin will also land a "hot" patch to react-dom, making React-Hot-Loader more compliant to [the principles](https://github.com/gaearon/react-hot-loader/issues/1118).

If you are using `babel-plugin` you might not need to apply `webpack-loader` to all the files, scoping it to `react-dom`

```js
// would only land a "hot-patch" to react-dom
{
    test: /\.js$/,
    include: /node_modules\/react-dom/,
    use: ['react-hot-loader/webpack']
},
```

### Code Splitting

If you want to use Code Splitting + React Hot Loader, the simplest solution is to pick one of our compatible library:

* [Loadable Components](https://github.com/smooth-code/loadable-components/)
* [Imported Component](https://github.com/theKashey/react-imported-component)
* [React Universal Component](https://github.com/faceyspacey/react-universal-component)
* [React-Loadable](https://github.com/jamiebuilds/react-loadable)

If you use a non-yet-friendly library, like [react-async-component](github.com/ctrlplusb/react-async-component) you have to mark all your "loaded components" as _hot-exported_:

```js
// AsyncHello.js
import { asyncComponent } from 'react-async-component';

// asyncComponent could not `hot-reload` itself.
const AsyncHello = asyncComponent({
  resolve: () => import('./Hello'),
});

export default AsyncHello;
```

```js
// Hello.js
import { hot } from 'react-hot-loader/root';

const Hello = () => 'Hello';

export default hot(Hello); // <-- module will reload itself
```

### Checking Element `type`s

Because React Hot Loader creates proxied versions of your components, comparing
reference types of elements won't work:

```js
const element = <Component />;
console.log(element.type === Component); // false
```

React Hot Loader exposes a function `areComponentsEqual` to make it possible:

```js
import { areComponentsEqual } from 'react-hot-loader';
const element = <Component />;
areComponentsEqual(element.type, Component); // true
```

Another way - compare "rendered" element type

```js
const element = <Component />;
console.log(element.type === <Component />.type); // true

// better - precache rendered type
const element = <Component />;
const ComponentType = <Component />.type;
console.log(element.type === ComponentType); // true
```

But you might have to provide all required props. See [original issue](https://github.com/gaearon/react-hot-loader/issues/304).
This is most reliable way to compare components, but it will not work with required props.

Another way - compare Component name.

> Not all components has a name. **In production displayName could not exists.**

```js
const element = <Component />;
console.log(element.displayName === 'Component'); // true
```

This is something we did not solve yet. Cold API could help keep original types.

### Webpack ExtractTextPlugin

webpack ExtractTextPlugin is not compatible with React Hot Loader. Please disable it in development:

```js
new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  disable: NODE_ENV !== 'production',
});
```

#### Disabling a type change (❄️)

It is possible to disable React-Hot-Loader for a specific component, especially to
enable common way to type comparison.
See #991 for the idea behind ⛄️, and #304 about "type comparison" problem.

```js
import { cold } from 'react-hot-loader';

cold(SomeComponent) // this component will ignored by React-Hot-Loader
<SomeComponent />.type === SomeComponent // true
```

If you will update `cold` component React-Hot-Loader will complain (on error level), and then
React will cold-replace Component with a internal state lose.

> Reach-Hot-Loader: cold element got updated

##### Disabling a type change for all node_modules

You may _cold_ all components from node_modules. This will not work for HOC(like Redux) or dynamically created Components, but might help in most of situations, when type changes
are not welcomed, and modules are not expected to change.

```js
import { setConfig, cold } from 'react-hot-loader';
setConfig({
  onComponentRegister: (type, name, file) => file.indexOf('node_modules') > 0 && cold(type),

  // some components are not visible as top level variables,
  // thus its not known where they were created
  onComponentCreate: (type, name) => name.indexOf('styled') > 0 && cold(type),
});
```

! To be able to "cold" components from 'node_modules' you have to apply babel to node_modules, while this
folder is usually excluded.
You may add one more babel-loader, with only one React-Hot-Loader plugin inside to solve this.
**Consider using webpack-loader** for this.

##### React-Hooks

React hooks are not _really_ supported by React-Hot-Loader. Mostly due to our internal
processes of re-rendering React Tree, which is required to reconcile an updated application
before React will try to rerender it, and fail to do that, obviously.

* hooks **should work** for versions 4.6.0 and above (`pureSFC` is enabled by default).
* hooks will produce **errors** on every hot-update without patches to `react-dom`.
* hooks **may loss the state** without patches to `react-dom`.
* hooks does not support adding new hooks on the fly
* change in hooks for a mounted components will cause a runtime exception, and a `retry` button (at the nearest class component) will be shown.
  Pressing a `retry` button will basically remount tree branch.

To mitigate any hook-related issues (and disable their hot-reloadability) - `cold` them.

* _cold_ components using hooks.

```js
import { setConfig, cold } from 'react-hot-loader';
setConfig({
  onComponentCreate: (type, name) =>
    (String(type).indexOf('useState') > 0 || String(type).indexOf('useEffect') > 0) && cold(type),
});
```

## API

### `hot(Component, options)`

Mark a component as hot.

#### Babel plugin

Right now babel plugin has only one option, enabled by default.

* `safetyNet` - will help you properly setup ReactHotLoader.

You may disable it to get more control on the module execution order.

```js
//.babelrc
{
    "plugins": [
        [
            "react-hot-loader/babel",
            {
            "safetyNet": false
            }
        ]
    ]
}
```

#### Important

**!!** Use `hot` only for module `exports`, not for module `imports`. **!!**

```js
import { hot } from 'react-hot-loader/root';

const App = () => 'Hello World!';

export default hot(App);
```

Keep in mind - by importing `react-hot-loader/root` you are setting up a boundary for update event propagation.

The higher(in module hierarchy) you have it - the more stuff would be updated on Hot Module Replacement.

To make RHL more reliable and safe, please place `hot` _below_ (ie somewhere in _imported_ modules):

* react-dom
* redux store creation
* any data, you want to preserve between updates
* big libraries

You may(but it's not required) place `hot` to the every route/page/feature/lazy chunk, thus make updates more scoped.

You don't need to wrap every component with `hot`, application work work fine with a single one.

### (old)`hot(module, options)(Component, options)`

Mark a component as hot. The "new" hot is just hidding the first part - `hot(module)`, giving you
only the second `(App)`. The "new" hot is using old API.

```js
import { hot } from 'react-hot-loader';

const App = () => 'Hello World!';

export default hot(module)(App);
```

### `AppContainer`

Mark application as hot reloadable. (**Prefer** using `hot` helper, see below for migration details).

This low-level approach lets you make **hot **imports\_\_, not exports.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./containers/App', () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require('./containers/App'));
  });
}
```

### areComponentsEqual(Component1, Component2)

Test if two components have the same type.

```js
import { areComponentsEqual } from 'react-hot-loader';
import Component1 from './Component1';
import Component2 from './Component2';

areComponentsEqual(Component1, Component2); // true or false
```

### setConfig(config)

Set a new configuration for React Hot Loader.

Available options are:

* `logLevel`: specify log level, default to `"error"`, available values are: `['debug', 'log', 'warn', 'error']`
* `pureSFC`: enable Stateless Functional Component. If disabled they will be converted to React Components.
  Default value: false.
* `ignoreSFC`: skip "patch" for SFC. "Hot loading" could still work, with webpack-patch present
* `pureRender`: do not amend `render` method of any component.
* for the rest see [index.d.ts](https://github.com/gaearon/react-hot-loader/blob/master/index.d.ts#L62-L133).

```js
// rhlConfig.js
import { setConfig } from 'react-hot-loader';

setConfig({ logLevel: 'debug' });
```

**It is important** to set configuration before any other action will take a place

```js
// index.js
import './rhlConfig' // <-- extract configuration to a separate file, and import it in the beggining
import React from 'react'
....
```

## Migrating from v3

### AppContainer vs hot

Prior v4 the right way to setup React Hot Loader was to wrap your Application
with `AppContainer`, set setup module acceptance by yourself. This approach is
still valid but only for advanced use cases, prefer using `hot` helper.

**React Hot Loader v3:**

```js
// App.js
import React from 'react';

const App = () => <div>Hello world!</div>;

export default App;
```

```js
// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require('./containers/App'));
  });
}
```

**React Hot Loader v4:**

```js
// App.js
import React from 'react';
import { hot } from 'react-hot-loader';

const App = () => <div>Hello world!</div>;

export default hot(module)(App);
```

```js
// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### Patch is optional

> Since 4.0 till 4.8

Code is automatically patched, you can safely remove `react-hot-loader/patch` from your webpack config,
if react-hot-loader is required before React in any other way.

### Error Boundary is inside every component

> Since 4.5.4

On Hot Module Update we will inject `componentDidCatch` and a _special_ `render`
to every Class-based component you have, making [Error Boundaries](https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries) more local.

After update we will remove all sugar, keeping only Boundaries you've created.

You can provide your own `errorReporter`, via `setConfig({errorReporter})` or opt-out from
root ErrorBoundaries setting `errorBoundary={false}` prop on `AppContainer` or `hot`.
However - this option affects only SFC behavior, and any ClassComponent would boundary itself.

```js
import { setConfig } from 'react-hot-loader';
import ErrorBoundary from './ErrorBoundary';

// ErrorBoundary will be given error and errorInfo prop.
setConfig({ errorReporter: ErrorBoundary });
```

If `errorReporter` is not set - full screen error overlay would be shown.

#### Setting global Error Reporter

Global Error Reporter would, created a fixed overlay on top the page,
would be used to display errors, not handled by `errorReporter`, and
any HMR error.

You may change, or disable this global error overlay

```js
// to disable
setConfig({ ErrorOverlay: () => null });

// to change
setConfig({ ErrorOverlay: MyErrorOverlay });
```

The UX of existing overlay is a subject to change, and we are open to any proposals.

## Known limitations and side effects

### Note about `hot`

`hot` accepts only React Component (Stateful or Stateless), resulting the `HotExported` variant of it.
The `hot` function will setup current module to _self-accept_ itself on reload, and will **ignore** all the changes, made for non-React components.
You may mark as many modules as you want. But `HotExportedComponent` **should be the only used export** of a _hot_-module.

> Note: Please note how often we have used `exported` keyword. `hot` is for exports.

> Note: Does nothing in production mode, just passes App through.

### New Components keep executing the old code

There is no way to hot-update constructor code, as result even new components
will be born as the first ones, and then grow into the last ones. As of today, this issue cannot be solved.

## Troubleshooting

If it doesn't work, in 99% of cases it's a configuration issue. A missing option, a
wrong path or port. webpack is very strict about configuration, and the best way
to find out what's wrong is to compare your project to an already working setup,
check out
**[examples](https://github.com/gaearon/react-hot-loader/tree/master/examples)**,
bit by bit.

If something doesn't work, in 99% of cases it's an issue with your code. The Component
didn't get registered, due to HOC or Decorator around it, which is making it
invisible to the Babel plugin or webpack loader.

We're also gathering
**[Troubleshooting Recipes](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md)**
so send a PR if you have a lesson to share!

### Switch into debug mode

Debug mode adds additional warnings and can tells you why React Hot Loader is
not working properly in your application.

```js
import { setConfig } from 'react-hot-loader';
setConfig({ logLevel: 'debug' });
```

## Contributors

This project exists thanks to all the people who contribute. [Contribute](CONTRIBUTING.md).
[![contributors][oc-contributors-img]](https://github.com/gaearon/react-hot-loader/graphs/contributors)

## Backers

Thank you to all our backers! 🙏 [Become a backer][oc-backer-link]
[![backers][oc-backer-img]][oc-backer-link]

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [Become a sponsor][oc-sponsor-link]

<a href="https://opencollective.com/react-hot-loader/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-hot-loader/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-hot-loader/sponsor/9/avatar.svg"></a>

## License

MIT

[build-badge]: https://img.shields.io/travis/gaearon/react-hot-loader.svg?style=flat-square
[build]: https://travis-ci.org/gaearon/react-hot-loader
[coverage-badge]: https://img.shields.io/codecov/c/github/gaearon/react-hot-loader.svg?style=flat-square
[coverage]: https://codecov.io/github/gaearon/react-hot-loader
[version-badge]: https://img.shields.io/npm/v/react-hot-loader.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-hot-loader
[license-badge]: https://img.shields.io/npm/l/react-hot-loader.svg?style=flat-square
[license]: https://github.com/gaearon/react-hot-loader/blob/next/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[chat]: https://gitter.im/gaearon/react-hot-loader
[chat-badge]: https://img.shields.io/gitter/room/gaearon/react-hot-loader.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/gaearon/react-hot-loader.svg?style=social
[github-watch]: https://github.com/gaearon/react-hot-loader/watchers
[github-star-badge]: https://img.shields.io/github/stars/gaearon/react-hot-loader.svg?style=social
[github-star]: https://github.com/gaearon/react-hot-loader/stargazers
[oc-backer-badge]: https://opencollective.com/react-hot-loader/backers/badge.svg
[oc-sponsor-badge]: https://opencollective.com/react-hot-loader/sponsors/badge.svg
[oc-contributors-img]: https://opencollective.com/react-hot-loader/contributors.svg?width=890&button=false
[oc-backer-img]: https://opencollective.com/react-hot-loader/backers.svg?width=890
[oc-backer-link]: https://opencollective.com/react-hot-loader#backers
[oc-sponsor-link]: https://opencollective.com/react-hot-loader#sponsor
