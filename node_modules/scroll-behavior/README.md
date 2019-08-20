# scroll-behavior [![Travis][build-badge]][build] [![npm][npm-badge]][npm]

Pluggable browser scroll management.

**This library is not generally meant to be used directly by applications. Instead, it's meant to be used in integrations for routing libraries or frameworks. For examples of such integrations, see:**

- [Found Scroll](https://github.com/4Catalyzer/found-scroll): Integration for [Found](https://github.com/4Catalyzer/found)
- [react-router-scroll](https://github.com/taion/react-router-scroll): Integration for [React Router](https://github.com/reactjs/react-router) v2 and v3

[![Codecov][codecov-badge]][codecov]
[![Discord][discord-badge]][discord]

## Usage

```js
import ScrollBehavior from 'scroll-behavior';

/* ... */

const scrollBehavior = new ScrollBehavior({
  addTransitionHook,
  stateStorage,
  getCurrentLocation,
  /* shouldUpdateScroll, */
});

// After a transition:
scrollBehavior.updateScroll(/* prevContext, context */);
```

## Guide

### Installation

```
$ npm i -S scroll-behavior
```

### Basic usage

Create a `ScrollBehavior` object with the following arguments:
- `addTransitionHook`: this function should take a transition hook function and return an unregister function
  - The transition hook function should be called immediately before a transition updates the page
  - The unregister function should remove the transition hook when called
- `stateStorage`: this object should implement `read` and `save` methods
  - The `save` method should take a location object, a nullable element key, and a truthy value; it should save that value for the duration of the page session
  - The `read` method should take a location object and a nullable element key; it should return the value that `save` was called with for that location and element key, or a falsy value if no saved value is available
- `getCurrentLocation`: this function should return the current location object

This object will keep track of the scroll position. Call the `updateScroll` method on this object after transitions to emulate the default browser scroll behavior on page changes.

Call the `stop` method to tear down all listeners.

### Custom scroll behavior

You can customize the scroll behavior by providing a `shouldUpdateScroll` callback when constructing the `ScrollBehavior` object. When you call `updateScroll`, you can pass in up to two additional context arguments, which will get passed to this callback.

The callback can return:

- a falsy value to suppress updating the scroll position
- a position array of `x` and `y`, such as `[0, 100]`, to scroll to that position
- a string with the `id` or `name` of an element, to scroll to that element
- a truthy value to emulate the browser default scroll behavior

Assuming we call `updateScroll` with the previous and current location objects:

```js
const scrollBehavior = new ScrollBehavior({
  ...options,
  shouldUpdateScroll: (prevLocation, location) => (
    // Don't scroll if the pathname is the same.
    !prevLocation || location.pathname !== prevLocation.pathname
  ),
});
```

```js
const scrollBehavior = new ScrollBehavior({
  ...options,
  shouldUpdateScroll: (prevLocation, location) => (
    // Scroll to top when attempting to visit the current path.
    prevLocation && location.pathname === prevLocation.pathname ? [0, 0] : true
  ),
});
```

### Scrolling elements other than `window`

Call the `registerElement` method to register an element other than `window` to have managed scroll behavior. Each of these elements needs to be given a unique key at registration time, and can be given an optional `shouldUpdateScroll` callback that behaves as above. This method should also be called with the current context per `updateScroll` above, if applicable, to set up the element's initial scroll position.

```js
scrollBehavior.registerScrollElement(
  key, element, shouldUpdateScroll, context,
);
```

To unregister an element, call the `unregisterElement` method with the key used to register that element.

### Further scroll behavior customization

If you need to further customize scrolling behavior, subclass the `ScrollBehavior` class, then override methods as needed. For example, with the appropriate polyfill, you can override `scrollToTarget` to use smooth scrolling for `window`.

```js
class SmoothScrollBehavior extends ScrollBehavior {
  scrollToTarget(element, target) {
    if (element !== window) {
      super.scrollToTarget(element, target);
      return;
    }

    if (typeof target === 'string') {
      const targetElement = (
        document.getElementById(target) ||
        document.getElementsByName(target)[0]
      );
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // Fallback to scrolling to top when target fragment doesn't exist.
      target = [0, 0]; // eslint-disable-line no-param-reassign
    }

    const [left, top] = target;
    window.scrollTo({ left, top, behavior: 'smooth' });
  }
}
```

Integrations should accept a `createScrollBehavior` callback that can create an instance of a custom scroll behavior class.

[build-badge]: https://img.shields.io/travis/taion/scroll-behavior/master.svg
[build]: https://travis-ci.org/taion/scroll-behavior

[npm-badge]: https://img.shields.io/npm/v/scroll-behavior.svg
[npm]: https://www.npmjs.org/package/scroll-behavior

[codecov-badge]: https://img.shields.io/codecov/c/github/taion/scroll-behavior/master.svg
[codecov]: https://codecov.io/gh/taion/scroll-behavior

[discord-badge]: https://img.shields.io/badge/Discord-join%20chat%20%E2%86%92-738bd7.svg
[discord]: https://discord.gg/0ZcbPKXt5bYaNQ46
