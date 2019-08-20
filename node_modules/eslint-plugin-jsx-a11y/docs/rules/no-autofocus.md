# no-autofocus

Enforce that autoFocus prop is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.

#### References
1. [w3c](https://w3c.github.io/html/sec-forms.html#autofocusing-a-form-control-the-autofocus-attribute)

## Rule details

This rule takes one optional object argument of type object:

```
{
    "rules": {
        "jsx-a11y/no-autofocus": [ 2, {
            "ignoreNonDOM": true
        }],
    }
}
```

For the `ignoreNonDOM` option, this determines if developer created components are checked.

### Succeed
```jsx
<div />
```

### Fail
```jsx
<div autoFocus />
<div autoFocus="true" />
<div autoFocus="false" />
<div autoFocus={undefined} />
```
