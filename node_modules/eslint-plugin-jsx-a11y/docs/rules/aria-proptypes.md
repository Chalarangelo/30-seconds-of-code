# aria-proptypes

ARIA state and property values must be valid.

#### References
1. [Spec](https://www.w3.org/TR/wai-aria/states_and_properties)
2. [AX_ARIA_04](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_04)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<!-- Good: the aria-hidden state is of type true/false -->
<span aria-hidden="true">foo</span>
```

### Fail
```jsx
<!-- Bad: the aria-hidden state is of type true/false -->
<span aria-hidden="yes">foo</span>
```

