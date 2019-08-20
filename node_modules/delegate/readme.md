# delegate

Lightweight event delegation.

## Install

You can get it on npm.

```
npm install delegate --save
```

If you're not into package management, just [download a ZIP](https://github.com/zenorocha/delegate/archive/master.zip) file.

## Setup

###### Node (Browserify)

```js
var delegate = require('delegate');
```

###### Browser (Standalone)

```html
<script src="dist/delegate.js"></script>
```

## Usage

### Add event delegation

#### With the default base (`document`)

```js
delegate('.btn', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);
```

#### With an element as base

```js
delegate(document.body, '.btn', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);
```

#### With a selector (of existing elements) as base

```js
delegate('.container', '.btn', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);
```

#### With an array/array-like of elements as base

```js
delegate(document.querySelectorAll('.container'), '.btn', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);
```

### Remove event delegation

#### With a single base element (default or specified)

```js
var delegation = delegate(document.body, '.btn', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);

delegation.destroy();
```

#### With multiple elements (via selector or array)

Note: selectors are always treated as multiple elements, even if one or none are matched. `delegate()` will return an array.

```js
var delegations = delegate('.container', '.btn', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);

delegations.forEach(function (delegation) {
    delegation.destroy();
});
```

## Browser Support

| <img src="https://clipboardjs.com/assets/images/chrome.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://clipboardjs.com/assets/images/edge.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://clipboardjs.com/assets/images/firefox.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://clipboardjs.com/assets/images/ie.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://clipboardjs.com/assets/images/opera.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://clipboardjs.com/assets/images/safari.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Latest ✔ | Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | Latest ✔ |

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
