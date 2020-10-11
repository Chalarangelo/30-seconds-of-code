You can scroll using JS with the function `window.scrollTo(x, y)`.

If you want to make a function that scrolls down a certain amount when a key is pressed, this function will work: 

```js
document.addEventListener("keydown", (e) => {
  if(e.keyCode == 32){//space
    const yScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const xScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    //if you change the xScroll, it will scroll left (if negative) or right (if positive).
    window.scrollTo(xScroll, yScroll + /*Some value*/ 10); //Make negative if want to scroll up
  }
}
```
