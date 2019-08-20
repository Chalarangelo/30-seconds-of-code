# role-has-required-aria-props

Elements with ARIA roles must have all required attributes for that role.

#### References
1. [Spec](https://www.w3.org/TR/wai-aria/roles)
2. [AX_ARIA_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<!-- Good: the checkbox role requires the aria-checked state -->
<span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>
```

### Fail

```jsx
<!-- Bad: the checkbox role requires the aria-checked state -->
<span role="checkbox" aria-labelledby="foo" tabindex="0"></span>
```