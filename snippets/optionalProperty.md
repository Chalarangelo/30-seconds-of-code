---
title: objectWithOptionalProperty
tags: objects,intermediate
---

## Create a new object with an optional property?

- Use spread operator `(...)` with the logical and operator `(&&)`.
```js
let includeEmail = true;
const user = { 
  userName: 'Jhon Doe',
  ...(includeEmail && { userEmail: jhonDoe@email.com })
};
```
If includeEmail is true, the email property is applied.
