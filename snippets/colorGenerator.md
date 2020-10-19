---
title: generateRandomColor
tags: color,intermediate
---

Generate a hash code for a random color and it will change the color of HTML page's background
- You should configure the HTML file as follows.
- Add a button tag with a ID `<button id="genarate">Generate Color</button>` to your HTML file.
- By using the ID we write a javaScript to change the color of Background.
- We genarate a random number using `const randomColor = Math.floor(Math.random()*16777215).toString(16);`.

```js
const setBackground = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  color.innerHTML = "#" + randomColor;
}

genarate.addEventListener("click", setBackground);

```

```js
setBackground(); // Change the color of HTML page will change
```