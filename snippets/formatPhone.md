---
title: formatPhone
tags: string,math,intermediate
---

Returns mobile number using the US format order.

- Use `Number.prototype.toLocaleString()` to convert a number to using the local number format separators.

```js
const formatPhoneNumber = (phoneNumberString) => {
  const number = String(phoneNumberString).replace(/\D/g, "");
  const numberValidatorRegex = /^(1|)?(\d{3})(\d{3})(\d{4})$/;
  const match = number.match(numberValidatorRegex);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return `${intlCode}(${match[2]}) ${match[3]}-${match[4]}`;
  }
  return null;
};
```

```js
formatPhoneNumber("+12345678900"); // '+1 (234) 567-8900'
formatNumber("15675436903"); // '(234) 567-8900'
```
