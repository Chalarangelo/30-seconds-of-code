# html-has-lang

<html> elements must have the lang prop.

#### References
1. [axe-core, html-has-lang](https://dequeuniversity.com/rules/axe/3.2/html-has-lang)
1. [axe-core, html-lang-valid](https://dequeuniversity.com/rules/axe/3.2/html-lang-valid)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<html lang="en">
<html lang="en-US">
<html lang={language}>
```

### Fail

```jsx
<html>
```
