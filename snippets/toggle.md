---
title: toggle
tags: JavaScript, HTML, beginner
---

Here is a simple toggle function that you can add to your html code to create a button. This toggle changes the text from "Hi!" to "Hello there!"

```js
//basic HTML code 
<button onclick="myToggle()">Click</button>
<div id="clicker">Hi!</div>

```

```js
function myToggle() {
  var x = document.getElementById("clicker");
  if (x.innerHTML === "Hi!") {
    x.innerHTML = "Hello there!";
  } else {
    x.innerHTML = "Hi";
  }
}
```
