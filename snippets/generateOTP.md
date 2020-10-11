---
title: generateOTP
tags: node,function,intermediate
---

Generate an OTP of given length.

- Use `otp-generator` package to generate an OTP of given length.
- Use the optional parameters to get a specific type of OTP or omit it to use the default parameters.

```js
const otpGenerator = require("otp-generator");
const generateOTP = (
  length = 6,
  alphabets = false,
  specialChars = false,
  upperCase = false
) => otpGenerator.generate(length, { alphabets, specialChars, upperCase });
```

```js
generateOTP(); // 210188 ->default
generateOTP(4); // 0185
generateOTP(4, true); // m2oh
generateOTP(4, true, true); // hu4&
generateOTP(4, true, true, true); // egU5
```
