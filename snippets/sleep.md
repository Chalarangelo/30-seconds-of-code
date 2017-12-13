### Sleep

Use a `while` loop to block execution thread for `ms` milliseconds.

```js
const sleep = ms => {
  const end = Date.now() + ms;
  while(Date.now() < end){}
}
// sleep(10); 
// console.log('end') -> log 'end' after 10 milliseconds
```