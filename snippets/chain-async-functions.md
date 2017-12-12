### Chain asynchronous functions

Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

```js
const chainAsync = fns => {
	let curr = 0; const next = () => fns[curr++](next); next()
}
chainAsync([
	next => { console.log('This happens at 0 seconds'); setTimeout(next, 1000) },
	next => { console.log('This happens at 1 second'); setTimeout(next, 1000) },
	next => { console.log('This happens at 2 seconds'); setTimeout(next, 1000) },
	next => { console.log('Done at 3 seconds!') }
])
```
