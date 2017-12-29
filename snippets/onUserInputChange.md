### onUserInputChange

Will run the callback whenever the user changes their input type (either `mouse` or `touch`). This is useful
if you want to disable certain code depending on if the user is using touch as input or a mouse (including trackpads).

Use two event listeners. Assume `mouse` input initially and bind a `touchstart` event listener to the document. 
On `touchstart`, the callback is run and supplied with the current input type as an argument. 
Then, add a `mousemove` event listener to listen for two consecutive `mousemove` events firing within 20ms 
using `performance.now()` (browsers recently fire them every animation frame). Run the callback and supply the new type
`mouse` as the argument. This process needs to happen dynamically because of hybrid devices (such as a touchscreen laptop), 
where the user can switch between either input type at will.

```js
const onUserInputChange = callback => {
  let type = 'mouse', lastTime = 0;
  const mousemoveHandler = () => {
    const now = performance.now();
    if (now - lastTime < 20) {
      type = 'mouse', callback(type), document.removeEventListener('mousemove', mousemoveHandler);
    }
    lastTime = now;
  };
  document.addEventListener('touchstart', () => {
    if (type === 'touch') return;
    type = 'touch', callback(type), document.addEventListener('mousemove', mousemoveHandler);
  });
};
```

```js
onUserInputChange(type => {
  console.log('The user is now using', type, 'as an input method.');
});
```
