### Sleep

If you have an async function and you want to delay executing part of it. you can put your async function to sleep(in miliseconds).

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// async function sleepyWork() {
//   console.log('I\'m going to sleep for 1 second.');
//   await sleep(1000);
//   console.log('I woke up after 1 second.');
// }
```
