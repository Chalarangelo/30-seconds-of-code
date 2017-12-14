### Validate Email
 
 Regex is taken from https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
 Returns `true` if email is valid, `false` if not.
 
 ```js
 const validateEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
 // isemail(mymail@gmail.com) -> true
 ```
 
