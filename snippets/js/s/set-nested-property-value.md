---
title: Set nested property value using a path string
type: snippet
language: javascript
tags: [object]
cover: overgrown
dateModified: 2023-08-24T21:51:42-06:00
---

Sets the value of a nested property of an object by following a path string.

- Use `String.prototype.split()` to split each selector from the path.
- If `i < length - 1`, it means that is trying to pass through a non-final property.
- Use object destructuring in `{length}` to extract only the length of the path.
- Use `typeof` to determine if a non-final property is an object, so it can continue.
- If a non-final property is not an object (first `return` statement), the function will return false, meaning that the final property could not be reached.
- The `return true` statement means that the value was set successfully.

```js
const set = (object, path, value) => path.split('.').every((key, i, {length}) =>
  if (i < length - 1){
    object = object[key];
    return typeof object === 'object' && !!object;
  }else{
    object[key] = value;
    return true;
  }
);
```

```js
const user = {
  username: 'somename23',
  pictures: [
    {
      description: 'Profile Picture',
      filename: 'profile.jpg'
    }
  ]
};
set(user, 'username', 'newname23'); // true
set(user, 'pictures.0.description', 'My Profile Picture'); // true
set(user, 'pictures.1.description', 'Cover Picture'); // false
set(user, 'pictures.1', { description: 'Cover', filename: 'cover.jpg' }); // true
set(user, 'pictures.1.description', 'Cover Picture'); // true
```
