# chain-function
chain a bunch of functions

```sh
npm i chain-function
```

```js
 function foo() {
   console.log('foo')
 }
 
 function baz() {
   console.log('bar')
 }
 
 var foobar = chain(foo, bar)
 
 foobar() // "bar" "foo"
 
 //handles empty values just fine
 foobar = chain(foo, null, bar, undefined)
 
 foobar() // "bar" "foo"
```
