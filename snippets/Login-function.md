---
title: Login-Function
tags: login,intermediate
---

Asks user for login credentials stored in an array.

- User's credentials are stored in the data[] array.
- Prompts for the username and password.
- If the username and password are matching, returns result variable storing personal info.

```js
var data = [
    {
        username: "Arpan",
        password: "super"
    }
];

var result = "This is where all the user's personal info or data is stored and only given on successful login.";

var userNamePrompt = prompt("What's your username?");

userNameCorrect(userNamePrompt);

function userNameCorrect (user) {

     if (user === data[0].username) {
        console.log(" ");

    } else {

        alert("wrong username, please try again.");
        throw new Error("incorrect username, dude.");

    }
}
var passwordPompt = prompt("What's your password");

function signIn (user, pass) {

    if (user === data[0].username &&
         pass === data[0].password) {
             
        console.log(result);
        alert("Logged in!");
         }
         
    else {
        alert("sorry, wrong password");
    }


}


```

```js
signIn( userNamePrompt, passwordPompt);
```
