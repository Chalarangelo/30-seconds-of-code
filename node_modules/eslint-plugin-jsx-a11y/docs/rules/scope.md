# scope

The `scope` scope should be used only on `<th>` elements.

#### References
1. [axe-core, scope](https://dequeuniversity.com/rules/axe/1.1/scope)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<th scope="col" />
<th scope={scope} />
```

### Fail

```jsx
<div scope />
```
