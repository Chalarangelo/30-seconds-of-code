---
title: otpGenerator
tags: Math,String,intermediate
---

The snippet generates OTP of supplied length. If no length is supplied it generates a 6 digit OTP.

- We initiate an empty string for otp.
- We loop from 0 till length of the otp and keep attaching random numbers to the OTP using Math.random() and Math.floor().

```js
const otpGenerator = (otpLength) => {
  const length = otpLength ? otpLength : 6;
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
```

```js
otpGenerator(4); // "9954"
otpGenerator(); // "649880"
otpGenerator(5); // "82139"
```
