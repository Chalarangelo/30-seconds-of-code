# no-redundant-roles

Some HTML elements have native semantics that are implemented by the browser. This includes default/implicit ARIA roles. Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.

#### References
1. [w3](https://www.w3.org/TR/html5/dom.html#aria-role-attribute)

## Rule details

The default options for this rule allow an implicit role of `navigation` to be applied to a `nav` element as is [advised by w3](https://www.w3.org/WAI/GL/wiki/Using_HTML5_nav_element#Example:The_.3Cnav.3E_element). The options are provided as an object keyed by HTML element name; the value is an array of implicit ARIA roles that are allowed on the specified element.

```
{
  'jsx-a11y/no-redundant-roles': [
  'error',
  {
    nav: ['navigation'],
  },
}
```

### Succeed
```jsx
<div />
<button role="presentation" />
<MyComponent role="main" />
```

### Fail
```jsx
<button role="button" />
<img role="img" src="foo.jpg" />
```
