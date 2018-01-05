### createEventHub

Creates a pubsub event hub with `emit`, `on`, and `off` methods.

For `emit`, resolve the array of handlers based on the `event` argument and then run
each one by passing in the data as an argument.

For `on`, create an array for the event if it does not yet exist, then push the handler
into the array.

For `off`, find the index of the handler in the event array and remove it.

```js
const createEventHub = () => ({
  hub: {},
  emit(event, data) {
    this.hub[event].forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = this.hub[event].findIndex(h => h === handler);
    if (i) this.hub[event].splice(i, 1);
  }
});
```

```js
const hub = createEventHub();
const fn = data => console.log(data);
hub.on('message', fn); // subscribe a handler to listen for 'message' events
hub.emit('message', 'hello!'); // console logs 'hello!'
hub.off('message', fn); // unsubscribe our handler from 'message'
```
