<table>
<tr><th>title</th><th>tags</th></tr>
<tr><td>removeArrayDuplicates</td><td>array, indexes, items</td></tr>
</table>


Below there is a simple snippet for removing identical elements in an array


```js
const removeDuplicates = array => array.filter((item, index) => array.indexOf(item) === -1 || array.indexOf(item) === index);
```
