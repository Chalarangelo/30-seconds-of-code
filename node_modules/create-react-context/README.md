# create-react-context

> Polyfill for the [proposed React context API](https://github.com/reactjs/rfcs/pull/2)

## Install

```sh
yarn add create-react-context
```

You'll need to also have `react` and `prop-types` installed.

## API

```js
const Context = createReactContext(defaultValue);
// <Context.Provider value={providedValue}>{children}</Context.Provider>
// ...
// <Context.Consumer>{value => children}</Context.Consumer>
```

## Example

```js
// @flow
import React, { type Node } from 'react';
import createReactContext, { type Context } from 'create-react-context';

type Theme = 'light' | 'dark';
// Pass a default theme to ensure type correctness
const ThemeContext: Context<Theme> = createReactContext('light');

class ThemeToggler extends React.Component<
  { children: Node },
  { theme: Theme }
> {
  state = { theme: 'light' };
  render() {
    return (
      // Pass the current context value to the Provider's `value` prop.
      // Changes are detected using strict comparison (Object.is)
      <ThemeContext.Provider value={this.state.theme}>
        <button
          onClick={() => {
            this.setState(state => ({
              theme: state.theme === 'light' ? 'dark' : 'light'
            }));
          }}
        >
          Toggle theme
        </button>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class Title extends React.Component<{ children: Node }> {
  render() {
    return (
      // The Consumer uses a render prop API. Avoids conflicts in the
      // props namespace.
      <ThemeContext.Consumer>
        {theme => (
          <h1 style={{ color: theme === 'light' ? '#000' : '#fff' }}>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}
```

## Compatibility

This package only "ponyfills" the `React.createContext` API, not other
unrelated React 16+ APIs. If you are using a version of React <16, keep
in mind that you can only use features available in that version.

For example, you cannot pass children types aren't valid pre React 16:

```js
<Context.Provider>
  <div/>
  <div/>
</Context.Provider>
```

It will throw `A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.` because `<Context.Provider>` can only receive a single child element. To fix the error just wrap everyting in a single `<div>`:

```js
<Context.Provider>
  <div>
    <div/>
    <div/>
  </div>
</Context.Provider>
```
