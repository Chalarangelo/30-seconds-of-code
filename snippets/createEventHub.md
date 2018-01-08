### createEventHub

Creates a pub/sub ([publish–subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)) event hub with `emit`, `on`, and `off` methods.

Create an empty `hub` property using `Object.create(null)` to create a truly empty object that does not inherit properties from `Object.prototype` (which would be resolved if the event name matched one of the properties).

For `emit`, resolve the array of handlers based on the `event` argument and then run
each one with `Array.forEach()` by passing in the data as an argument.

For `on`, create an array for the event if it does not yet exist, then use `Array.push()` to add the handler
to the array.

For `off`, use `Array.findIndex()` to find the index of the handler in the event array and remove it using `Array.splice()`.

```js
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});
```

```js
const fn = data => console.log(data);
const hub = createEventHub();

hub.on('message', fn); // subscribe a handler to listen for 'message' events
hub.emit('message', 'hello!'); // console logs 'hello!'
hub.off('message', fn); // unsubscribe our handler from 'message'
```
