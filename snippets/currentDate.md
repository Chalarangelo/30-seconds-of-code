---
title: Ask your name and tells you the current date
tags: browser, begginer
---

Ask a user to enter the name and returns current date

- Declare n1 variable to save the user's name
- Declare dayToday to save the current date
- Use new Date() to get current date and hour
- Declare a function to return user's name and current date

```js
let n1 = prompt("Enter your name");

const dayToday = new Date();

const dateFunction = (name) => {
    console.log(`${n1}, today is ${dayToday}`)
}

```

```js
dateFunction()
```
