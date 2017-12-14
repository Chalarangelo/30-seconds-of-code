### Validate email
 
Use a regular experssion to check if the email is valid.
Returns `true` if email is valid, `false` if not.
 
 ```js
const validateEmail = str => 
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
 // isemail(mymail@gmail.com) -> true
 ```
 
