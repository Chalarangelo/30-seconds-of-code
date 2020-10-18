---
title: Convert Hexadecimal to RGB
tags: python,conversion,complex
---

Checks if the provided predicate function returns `true` for at least one element in a collection.

- Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```python
const any = (arr, fn = Boolean) => arr.some(fn);
```

```python
def hex_to_rgb(hex):
  h = hex.lstrip('#')
  return tuple(int(h[i:i+2], 16) for i in (0, 2, 4)))
