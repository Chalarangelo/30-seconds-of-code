---
title: Colorize text in the Node.js terminal
shortTitle: Colorize text
language: javascript
tags: [node,string]
cover: plant-corner
excerpt: Use special Unicode characters to print text in color in the console.
listed: true
dateModified: 2024-03-14
---

You've probably seen colored text in the console before, and you might have wondered how to do it yourself. In most environments, there are **special Unicode characters** that you can use to print text in color in the console. This can be useful for adding emphasis to certain parts of your output, or for making your logs easier to read.

Here's a handy table of the most common colors and their corresponding Unicode characters:

| Color | Text | Background |
| --- | --- | --- |
| Black | `\x1b[30m` | `\x1b[40m` |
| Red | `\x1b[31m` | `\x1b[41m` |
| Green | `\x1b[32m` | `\x1b[42m` |
| Yellow | `\x1b[33m` | `\x1b[43m` |
| Blue | `\x1b[34m` | `\x1b[44m` |
| Magenta | `\x1b[35m` | `\x1b[45m` |
| Cyan | `\x1b[36m` | `\x1b[46m` |
| White | `\x1b[37m` | `\x1b[47m` |

In order to use these characters, you can create a function that takes a string and returns the string with the appropriate color code added to it, using **template literals**. The special characters need to be added to the string output, and for background colors, you need to add a special character (`\x1b[0m`) to **reset the background color** at the end of the string.

```js
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
});

console.log(colorize('foo').red); // 'foo' (red letters)
console.log(colorize('foo', 'bar').bgBlue); // 'foo bar' (blue background)
console.log(colorize(colorize('foo').yellow, colorize('foo').green).bgWhite);
// 'foo bar' (first word in yellow letters, second word in green letters, white background for both)
```
