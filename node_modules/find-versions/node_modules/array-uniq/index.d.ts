/**
Create an array without duplicates.

@param array - The array to remove duplicates from.

@example
```
import arrayUniq = require('array-uniq');

arrayUniq([1, 1, 2, 3, 3]);
//=> [1, 2, 3]

arrayUniq(['foo', 'foo', 'bar', 'foo']);
//=> ['foo', 'bar']
```
*/
declare function arrayUniq<ValueType>(
	array: ReadonlyArray<ValueType>
): ValueType[];

export = arrayUniq;
