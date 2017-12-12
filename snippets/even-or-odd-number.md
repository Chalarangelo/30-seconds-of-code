### Even or odd number

Bitwise operator converts the given number in a 32 bits representation. 
In this case we can do an AND operation. So, for example:

```
     123 (base 10) = 0000 0000 0000 0000 0000 0000 0111 1011 (base 2)
       1 (base 10) = 0000 0000 0000 0000 0000 0000 0000 0001 (base 2)
                     ---------------------------------------
 123 & 1 (base 10) = 0000 0000 0000 0000 0000 0000 0000 0001 (base 2)
```

So the function return `true` if the result is equal to 0 because 
the less significant bit is 0 for the even numbers and 1 for the odd ones.


```js
var isEven = num => (num & 1) === 0;
```
