### randomHexColorCode

Generates a random hexadecimal color code.

Use `Math.random` to generate a random 24-bit(6x4bits) hexadecimal number. Use bit shifting and then convert it to an hexadecimal String using `toString(16)`.

```js
const randomHexColorCode = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);
};
```

```js
randomHexColorCode() // "#e34155"
randomHexColorCode() // "#fd73a6"
randomHexColorCode() // "#4144c6"
```
