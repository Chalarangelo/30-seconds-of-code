### American to english date
Take an American date and split the string re-arranging into english format.
```js
var americanDate = "5/10/2004";
var split = americanDate.split("/");
var englishDate = split[1] +"/" +split[0] +"/" +split[2] ;
```
