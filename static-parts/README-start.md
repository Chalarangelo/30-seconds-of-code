![Logo](/logo.png)

# 30 seconds of React

> Curated collection of useful React snippets that you can understand in 30 seconds or less.

* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
* Snippets are written in React 16.8+, using hooks.

### Prerequisites

To import a snippet into your project, you must import `React` and copy-paste the component's JavaScript code like this:
```js
import React from 'react';

function MyComponent(props) {
  /* ... */
}
```

If there is any CSS related to your component, copy-paste it to a new file with the same name and the appropriate extension, then import it like this:
```js
import './MyComponent.css';
```

To render your component, make sure there is a node with and id of `"root"` present in your element (preferrably a `<div>`) and that you have imported `ReactDOM`, like this:
```js
import ReactDOM from 'react-dom';
```

#### Related projects

* [30 Seconds of Code](https://30secondsofcode.org)
* [30 Seconds of CSS](https://30-seconds.github.io/30-seconds-of-css/)
* [30 Seconds of Interviews](https://30secondsofinterviews.org/)

## Table of Contents
