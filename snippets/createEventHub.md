### createEventHub

Creates a pub/sub ([publish–subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)) event hub with `emit`, `on`, and `off` methods.

Instantiate a new `Map` object to allow any event type (including objects) to be the key, and also so `Object.prototype` property names are not resolved.

For `emit`, resolve the array of handlers based on the `event` argument and then run
each one with `Array.forEach()` by passing in the data as an argument.

For `on`, create an array for the event if it does not yet exist, then use `Array.push()` to add the handler
to the array.

For `off`, use `Array.findIndex()` to find the index of the handler in the event array and remove it using `Array.splice()`.

```js
const createEventHub = () => ({
  hub: new Map(),
  emit(event, data) {
    (this.hub.get(event) || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub.get(event)) this.hub.set(event, []);
    this.hub.get(event).push(handler);
  },
  off(event, handler) {
    const i = (this.hub.get(event) || []).findIndex(h => h === handler);
    if (i > -1) this.hub.get(event).splice(i, 1);
  }
});
```

```js
const fn = data => console.log(data);
const obj = {};

const hub = createEventHub();
hub.on('message', fn); // subscribe a handler to listen for 'message' events
hub.on(obj, fn); // subscribe a handler to listen for the object
hub.emit('message', 'hello!'); // console logs 'hello!'
hub.emit(obj, 'hello!'); // console logs 'hello!'
hub.off('message', fn); // unsubscribe our handler from 'message', the obj event will still work
```
