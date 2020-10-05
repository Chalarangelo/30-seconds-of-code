---
title: find substring
tags: string,beginner
---

Find a substring in a string with Python.

- Use the built-in "in" keyword to iterate over all the addresses in the address list and again to check if the address contains the street name.

```js
addresses = [
    "123 Elm Street",
    "531 Oak Street",
    "678 Maple Street"
]
street = "Elm Street"
```

```js
for address in addresses:
    if street in address:
        print(address)
```

```js
street = "Elm Street";//'"123 Elm Street"'
street = "531";//'"531 Oak Street"'
street = "Maple";//'"678 Maple Street"'
```
