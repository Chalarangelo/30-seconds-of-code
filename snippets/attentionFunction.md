---
title: attentionFunction
tags: function,parameter,exception,beginner
firstSeen: 31-08-2021 11:28:42.60
---

Check for requiring values be passed for a given argument:

- You can throw errors when a given parameter isn't provided to a function:

```js
const isRequired = () =>
  {{ throw new Error('parameter is required! Look Closely'); };}

const attentionFunction = (name = isRequired()) => { console.log(`Welcome ${name}`) };
```

```js
// This will throw an error because no name is provided
attentionFunction();
attentionFunction(undefined);

// These are good!
attentionFunction(null);
attentionFunction('Sovan');
```
