### toHash

Reduces a given iterable type into a value hash(Object by reference) by the given property or the current iteration

```js
const toHash = ( object, key ) =>
  object.reduce( ( acc, data, index ) => ( ( acc[ data[ key || index ] ] = data ), acc ), {} )
```

```js
toHash([ 4,3,2,1 ]); // { 0: 4, 1: 3, 2: 2, 1: 1 }
toHash([ { a: 'label' } ], 'a'); // { label: { a: 'label' } }

// A more in depth example
let users = [ { id: 1, first: 'Jon' }, { id: 2, first: 'Joe' }, { id: 3, first: 'Moe' } ];
let managers = [ { manager: 1, employees: [ 2, 3 ] } ];
// We use function here because we need a bindable reference
managers.forEach( manager => manager.employees = manager.employees.map( function( id ){ return this[id]; }, toHash( users, 'id' ) ) ); // [ { manager:1, employees: [ { id: 2, first: "Joe" }, { id: 3, first: "Moe" } ] } ]
```
