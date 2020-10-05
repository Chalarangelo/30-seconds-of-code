---
title: selectToCopy
tags: browser,function,advanced
---

Create function to select & copy text content on HTML tag via it's click event listener

- Just create below function and use anywhere you need.
- Call the function via click event listener with any valid HTML selector (ID, class, tag-name, etc.) as parameter.
- The function will select all the content inside that element (the tag you call the function) and copy it to clipboard.

- The function
```js
  function selectionToCopy(id){
    let sel, ranges;
    const el = document.getElementById(id);
    if(window.getSelection && document.createRange){
      sel = window.getSelection();
      if(sel.toString() === ''){
        range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy')
        alert('copied'); //just notification
      }
    }else if(document.selection){ // for older browser
      sel = document.selection.createRange();
      if (sel.text === '') {
        range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
        document.execCommand('copy');
        alert('copied'); //just notification
      }
    }
  }
```
- Call method
```html
<!-- It will copy all text on div#app -->
<div id="app" onclick="selectionToCopy('app')"> 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit,...
</div>
```
