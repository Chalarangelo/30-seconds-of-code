---
title: mixTwoColors
tags: math,string,beginner
---

Mixes two hexcodes and returns the resulting color. (eg. red + blue = purple)

- First we split each color into its red/green/blue values.
- We take the averages of the reds/greens/blues of the two colors.
- We pad zeroes to every average, so that "9" becomes "09".
- We make the resulting color by concatentaing the red/green/blue of the result.

```js
const mixTwoColors = ( firstColor, secondColor ) => {
  let firstRed = parseInt(firstColor.substr(0, 2), 16);
  let firstGreen = parseInt(firstColor.substr(2, 2), 16);
  let firstBlue = parseInt(firstColor.substr(4, 2), 16);

  let secondRed = parseInt(secondColor.substr(0, 2), 16);
  let secondGreen = parseInt(secondColor.substr(2, 2), 16);
  let secondBlue = parseInt(secondColor.substr(4, 2), 16);

  averageRed = Math.floor((firstRed + secondRed) / 2);
  averageGreen = Math.floor((firstGreen + secondGreen) / 2);
  averageBlue = Math.floor((firstBlue + secondBlue) / 2);

  let resultRed = averageRed.toString(16);
  while (resultRed.length < 2) { resultRed = '0' + resultRed; }
  let resultGreen = averageGreen.toString(16);
  while (resultGreen.length < 2) { resultGreen = '0' + resultGreen; }
  let resultBlue = averageBlue.toString(16);
  while (resultBlue.length < 2) { resultBlue = '0' + resultBlue; }

  resultHex = resultRed + resultGreen + resultBlue;
  return resultHex;  
}
```

```js
mixTwoColors("ff0000","0000ff"); // 'f700f7'
```
