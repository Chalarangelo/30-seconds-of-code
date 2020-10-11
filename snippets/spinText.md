---
title: spinText
tags: text,intermediate
---

This script will spin the text based on the provided options everytime.

- Options can be provided using ``|`` pipe operator
- Based on the number of options provided a random option will be selected and the variable passed with be spinned accordingly.

```js
const spinText = (text, regEx) => {
  var matches, options, random;

  while((matches = regEx.exec(text)) !== null) {
    options = matches[1].split("|");
    random = Math.floor(Math.random() * options.length);
    text = text.replace(matches[0], options[random]);
  }
  console.log(text);
}
```

```js
var text = "{Hello|Hi|Hola|Namaste}, How {have you been|are you doing}? " +
           "Take care. {{Thanks and|Best} Regards|Cheers|Thanks}";
var regEx = new RegExp(/{([^{}]+?)}/);

spinText(text, regEx); //Hola, How are you doing? Take care. Thanks

// Once again
spinText(text, regEx); //Namaste, How have you been? Take care. Cheers

text = "{sampleInput|sampleInputVariable}

spinText(text, regEx); //sampleInput
spinText(text, regEx); //sampleInput
spinText(text, regEx); //sampleInputVariable
```
