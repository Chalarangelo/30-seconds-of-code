# lang

The `lang` prop on the `<html>` element must have a valid value based on ISO country and language codes.

#### References
1. [axe-core, valid-lang](https://dequeuniversity.com/rules/axe/3.2/valid-lang)
2. [ISO Language Codes](http://www.w3schools.com/tags/ref_language_codes.asp)
3. [ISO Country Codes](http://www.w3schools.com/tags/ref_country_codes.asp)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<html lang="en">
<html lang="en-US">
```

### Fail

```jsx
<html>
<html lang="foo">
```
