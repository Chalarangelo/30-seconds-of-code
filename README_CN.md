# 数组

> arrayMax   

*返回数组中的最大值。*
* Math.max()与扩展运算符(...)结合使用获取数组中的最大值。 
```js
const arrayMax = arr => Math.max(...arr);
// arrayMax([5,2,1])  # 5
```  
> arrayMin  

*返回数组中的最小值。*
* Math.min()与扩展运算符(...)结合使用获取数组中的最小值。 
```js
const arrayMin = arr => Math.min(...arr);
// arrayMin([9,8,5,1,4,3])  #1
```

> chunk

*将数组块划分为指定大小的较小数组。*
* 使用Array.from()创建新的数组, 这符合将生成的区块数。使用Array.slice()将新数组的每个元素映射到size长度的区块。如果原始数组不能均匀拆分, 则最终的块将包含剩余的元素。
```js
const chunk = (arr,size) => Array.from({length : Math.ceil(arr.length / size)},
(v,i) => arr.slice(i * size , i* size + size)); 
// chunk([1,2,3,4,5], 2)   # [[1,2],[3,4],[5]]
```

> compact 
*从数组中移除false值*
* 使用Array.filter()筛选出 falsey值(false,null,0,"",undefined 和 NaN)。
```js
const compact = (arr) => arr.filter(Boolean);
// compact ([0,1,false,2,"",3,'a','e'*10,NaN,'s',34])  # [1,2,3,'a','s',34]
```

> countOccurrences
*计算数组中值的出现次数*
* 使用Array.reduce()在每次遇到数组中的特定值时递增计数器。

```js
const countOccurrences = (arr,value) => arr.reduce((a,v)=> v===value? a+1:a+0,0);
// countOccurrences([1,1,2,2,3,3,1],1)  # 3
```

> deepFlatten
*深度拼合数组*
* 使用递归。使用Array.concat()与空数组 ([]) 和跨页运算符 (…) 来拼合数组。递归拼合作为数组的每个元素。
```js
const deepFlatten =arr=>[].concat(...arr.map(v=>Array.isArray(v)?deepFlatten(v):v))
// deepFlatten([1,2],3,[4,[5],6]) # [1,2,3,4,5,6]
```
> difference 
*返回两个数组之间的差异*
* 从b创建Set,然后使用 Array.filter() 只保留a b 中不包含的值。
```js
const difference =(a,b) =>
{ const s = new Set(b);
return a.filter(x=>!s.has(x)); }
// difference ([1,2,3],[1,2,4]) # [3]
```

> distinctValuesOfArray
*返回数组的所有不同值。*
* ES6 Set 和 ...rest 运算符放弃所有重复的值。
```js
const distinctValuesOfArray = arr =>[...new Set(arr)];
// distinctValuesOfArray([1,2,2,3,4,4,5])  # [1,2,3,4,5] 
```

> dropElements 
移除数组中的元素,直到传递的函数返回true。返回数组中的其余元素。在数组中循环，使用Array.shift() 将数组的第一个元素除去，直到函数的返回值为true。返回其余元素。

```js
const dropElements = (arr,func)=>{
    while(arr.length>0 && !func(arr[0])) arr.shift();
    return arr;
};
// dropElements ([1,2,3,4],n=>n>=3)  # [3,4]
```
> everyNth
*返回数组中的每个第n个元素。*
* 使用Array.filter()创建一个包含给定数组的每个第n个元素的新数组。
```js
const everyNth= (arr,nth) => arr.filter((e,i) => i%nth ===0);
// everyNth([1,2,3,4,5,6],2) # [1,3,5]
```

> filterNonUnique
*筛选出数组中的非唯一值。*
* 对于只包含唯一值的数组, 请使用Array.filter()。
```js
const filterNonUnique = arr => arr.filter(i=>arr.indexOf(i)===arr.lastindexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) # [1,3,5]
``` 

> flatten 
*拼合数组(2维)*
* 使用Array.reduce()获取数组中的所有元素和concat()以拼合他们。
```js
const flatten = arr=> arr.reduce((a,v)=>a.concat(v),[]);
// flatten([1,[2],3,4]) # [1,2,3,4]
```

> flattenDepth
*将数组向上拼合到指定深度*
* 使用递归，递减depth，每层深度为1. 使用Array.reduce()和Array.concat() 来合并元素和数组。基本情况下，对于等于1的depth停止递归。省略第二个元素，depth仅拼合到1的深度(单个拼合)。
```js
const flattenDepth=(arr,depth=1)=>
depth !=1 ? arr.reduce((a,v)=>a.concat(Array.isArray(v)?flattenDepth(v,depth-1):v),[]):arr.reduce((a,v)=>a.concat(v),[]);
// flattenDepth([1,[2],[[[3],4],5]],2) # [1,2,[3],4,5]
```
> groupby
*根据给定函数对数组元素进行分组。*
* 使用Array.map()将数组的值映射到函数或属性名。使用Array.reduce()创建一个对象，其中得键是从映射得结果产生的。
```js
const groupBy=(arr,func)=>arr.map(typeof func==='function'?func:val=>val[func]).reduce((acc,val,i)=>{acc[val]=(acc[val]||[]).concat(arr[i]);return acc;},{});

// groupBy([6.1,4.2,6.3],Math.floor) # {4:[4.2],6:[6.1,6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}
```
> head
*返回列表的头。*
* 使用arr[0]可返回传递的数组的第一个元素。
```js
const head = arr => arr[0];
// head([1,2,3]) -> 1
```

> initial
*返回除最后一个数组之外的所有元素。 有点类似 pop()*
* 使用 “arr.slice(0,-1)” 返回数组的最后一个元素。
```js
const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]
```

> initializeArrayWithRange
*初始化包含指定范围内的数字的数组。*
* 使用Array(end-start)创建所需长度的数组Array.map()以填充区域中所需的值。可以省略start以使用默认值0.
```js
const initializeArrayWithRange = (end, start = 0) =>
Array.from({ length: end - start }).map((v, i) => i + start);
// initializeArrayWithRange(5) # [0,1,2,3,4]
// initializeArrayWithRange(10,1)  # [1,2,3,4,5,6,7,8,9] 
```

> initializeArrayWithValues
*初始化并填充具有指定值的数组。*
* 使用Array(n)创建所需长度的数组,fill(v)以填充所需的值。可以省略value以使用默认值0.
```js
const initializeArrayWithValues = (n, value = 0) => Array(n).fill(value);
// initializeArrayWithValues(5, 2) # [2,2,2,2,2]
```


> intersection
*返回两个数组中存在的元素的列表。*
* 从b创建Set, 然后使用Array.filter()on a只保留b中包含的值.
```js
const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); };
// intersection([1,2,3], [4,3,2]) # [2,3]
```

> last
*返回数组中的最后一个元素。*
* 使用arr.length – 1可计算给定数组的最后一个元素的索引并返回它。
```js
const last = arr => arr[arr.length - 1];
// last([1,2,3]) # 3
```

> mapObject
*使用函数将数组的值映射到对象,其中键值对由原始值作为键和映射值组成。*

* 使用匿名内部函数范围来声明未定义的内存空间, 使用闭包来存储返回值。使用新的Array可将该数组与函数的映射放在其数据集上, 而逗号运算符返回第二个步骤, 而不需要从一个上下文移动到另一个环境 (由于关闭和操作顺序)。
```js
const mapObject = (arr, fn) => 
(a => (a = [arr, arr.map(fn)], a[0].reduce( (acc,val,ind) => (acc[val] = a[1][ind], acc), {}) )) ( );
/*
const squareIt = arr => mapObject(arr, a => a*a)
squareIt([1,2,3]) // { 1: 1, 2: 4, 3: 9 } */
```

> nthElement
*返回数组的第 n 个元素。*

* 使用Array.slice()可获取包含第 n 个元素的数组。如果索引超出界限, 则返回[]。省略第二个参数n, 以获取数组的第一个元素。
```js
const nthElement = (arr, n=0) => (n>0? arr.slice(n,n+1) : arr.slice(n))[0];
/*
nthElement(['a','b','c'],1) // 'b'
nthElement(['a','b','b'],-3) // 'a
*/
```

> pick
*从对象中选取给定键的键值对。*

* 使用Array.reduce()将筛选/选取的key转换回具有相应键值对的对象 (如果在 obj 中存在该键)。
```js
const pick = (obj, arr) =>
arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }

```

> sample
*返回数组中的随机元素。*

* Math.random()生成一个随机数, 与length相乘, 将其舍入到最接近的整数Math.floor()。此方法也适用于字符串。
```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// sample([3, 7, 9, 11]) -> 9
```

> shuffle
* 随机数组元素的顺序。* 

* 使用Array.sort()可在比较器中使用Math.random()重新排序元素。
```js
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]
```

> pull
* 对原始数组进行修改, 过滤掉指定的值。*

* 使用Array.filter()和Array.includes()来拉出不需要的值。使用Array.length = 0可将传入的数组中的长度重置为零, 并将其设置为Array.push(), 以便仅使用所提取的值填充它。
```js
const pull = (arr, ...args) => {
let pulled = arr.filter((v, i) => !args.includes(v));
arr.length = 0; pulled.forEach(v => arr.push(v));
};
// let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
// pull(myArray, 'a', 'c');
// console.log(myArray) -> [ 'b', 'b' ]
```

> remove
* 从数组中移除给定函数返回false的元素. * 

* 使用Array.filter()查找返回 truthy 值的数组元素和Array.reduce()以使用Array.splice()删除元素。使用三参数 (func value, index, array调用函数).
```js
const remove = (arr, func) =>
Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
arr.splice(arr.indexOf(val), 1); return acc.concat(val);
}, [])
: [];
// remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]
```


> similarity
*返回两个数组中都含有的元素的数组。*

* 使用filter()可删除不属于values的值, 使用includes()确定.
```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]

```

> symmetricDifference
*返回两个数组非相同元素组成的数组。*

* 从每个数组创建一个Set, 然后对它们中的每一个都使用Array.filter(), 只保留其他值中不包含的数值。
```js
const symmetricDifference = (a, b) => {
const sA = new Set(a), sB = new Set(b);
return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
}
// symmetricDifference([1,2,3], [1,2,4]) -> [3,4]

```

> tail
*返回数组中的所有元素, 除第一个。*

* 如果数组的length大于1, 则返回arr.slice(1), 否则返回整个数组。
```js
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]
```

> take
*返回一个数组, 其中 n 个元素从开始处移除。*

* 使用Array.slice()创建数组的切片, 其中包含从开始处取出的n元素。
```js
const take = (arr, n = 1) => arr.slice(0, n);
// take([1, 2, 3], 5) -> [1, 2, 3]
// take([1, 2, 3], 0) -> []

```

> takeRight
*返回一个数组, 其中 n 个元素从末尾移除。*

* 使用Array.slice()创建数组的切片, 其中包含从末尾取出的n元素。
```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
// takeRight([1, 2, 3], 2) -> [ 2, 3 ]
// takeRight([1, 2, 3]) -> [3]
```

> union
*返回在两个数组中合并后去除重复元素的数组。*

* 创建一个Set, 其中包含a和b的所有值, 并将其转换为数组。
```js
const union = (a, b) => Array.from(new Set([...a, ...b]));
// union([1,2,3], [4,3,2]) -> [1,2,3,4]
```

> without
*过滤掉数组中指定值的元素。*

* 使用Array.filter()创建不包括的数组 (使用!Array.includes()) 所有给定值。

```js
const without = (arr, ...args) => arr.filter(v => !args.includes(v));
// without([2, 1, 2, 3], 1, 2) -> [3]
```

> zip
*创建基于原始数组中的位置分组的元素数组。* 

* 使用Math.max.apply()获取参数中最长的数组。创建一个以该长度为返回值的数组, 并使用 map 函数创建一个分组元素的数组Array.from()如果参数数组的长度不同, 则在未找到任何值的情况下使用undefined。
```js
const zip = (...arrays) => {
const maxLength = Math.max(...arrays.map(x => x.length));
return Array.from({length: maxLength}).map((_, i) => {
return Array.from({length: arrays.length}, (_, k) => arrays[k][i]);
})
}
//zip(['a', 'b'], [1, 2], [true, false]); -> [['a', 1, true], ['b', 2, false]]
//zip(['a'], [1, 2], [true, false]); -> [['a', 1, true], [undefined, 2, false]]
```


***
> 翻译仍未完待续。。。

[参考项目 30-seconds-of-code](https://github.com/Chalarangelo/30-seconds-of-code "30-seconds-of-code")   