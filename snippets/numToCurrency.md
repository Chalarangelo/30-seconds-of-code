---
title: numToCurrency
tags: number, currency, convert
---

Converts the given number into string of currency. `

- first arguments is string of currency abbreviation and the second arguments is the given number.

```js
const numToCurrency = (currency="USD", num=0)=>{
    let result = "";
    let reverseNum = num
                     .toString()
                     .split("")
                     .reverse()
                     .join("");
    for (let i = 0; i < reverseNum.length; i++) {
        if (i % 3 === 0) result += reverseNum.substr(i, 3) + ",";
    }
    return (
      currency+" "+result
                    .split("", result.length - 1)
                    .reverse()
                    .join("")
    );
}
```

```js
numToCurrency("EUR",10000);//"EUR 10,000"
```
