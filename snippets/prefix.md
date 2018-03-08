### prefix

Returns the prefixed version (if necessary) of a CSS property that the browser supports.

Use an array of vendor prefix strings and loop through them, testing if `document.body` has one 
of them defined in its CSSStyleDeclaration object, otherwise return `null`. Use `String.charAt()`
and `String.toUpperCase()` to capitalize the property, which will be appended to the vendor prefix string.

```js
const prefix = property => {
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o']
  const upperProp = property.charAt(0).toUpperCase() + property.slice(1)
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i]
    const prefixedProp = prefix ? prefix + upperProp : property
    if (typeof document.body.style[prefixedProp] !== 'undefined') {
      return prefixedProp
    }
  }
  return null
}
```

```js
prefix('transform')
// 'transform' on a supported browser
// otherwise 'webkitTransform' or 'mozTransform' or 'msTransform' or 'oTransform'
```
