---
title: Dynamically Computed Properties with Proxy
subTitle: Create virtual properties with dynamic behavior
type: snippet
language: javascript
tags: [proxy,computed-properties,reactive-programming]
author: jayanth-kumar-morem
dateModified: 2023-08-21T11:48:07+03:00
---

Dynamically compute property values using JavaScript Proxy.

- Create a function `createComputed` that takes an object and a function.
- Use a Proxy to intercept property access.
- When a property is accessed, invoke the provided function and return its result.

```js
function createComputed(obj, computeFunc) {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return computeFunc(target, prop);
    },
  });
}
```

**Practical Usage:**
```js
const user = { firstName: "John", lastName: "Doe" };

const computedUser = createComputed(user, (obj, prop) => {
  if (prop === "fullName") {
    return `${obj.firstName} ${obj.lastName}`;
  }
});

console.log(computedUser.fullName); // "John Doe"
user.firstName = "Alice";
console.log(computedUser.fullName); // "Alice Doe"
```
In this snippet, we've created a function `createComputed` that takes an object and a function to compute virtual property values. The Proxy intercepts property access, and if the property doesn't exist, it invokes the compute function to return the computed value. This technique allows you to create dynamic, reactive properties without modifying the original object.
