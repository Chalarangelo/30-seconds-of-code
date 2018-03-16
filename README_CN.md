![Logo](/logo.png)

# 30 seconds of code

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


# 浏览器
> bottomVisible

*如果页的底部可见, 则返回true, 否则为false。*

* 使用scrollY、scrollHeight和clientHeight来确定页面底部是否可见。

```js
const bottomVisible = () =>
document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight;
// bottomVisible() -> true

```

> currentURL

*返回当前 URL。*

* 使用window.location.href获取当前 URL。
```js
const currentURL = () => window.location.href;
// currentUrl() -> 'https://www.baidu.com'
```

> elementIsVisibleInViewport

*指定的元素在视区中可见, 则返回true, 否则为false。*

* 使用Element.getBoundingClientRect()和window.inner(Width|Height)值,确定给定元素在视区中是否可见。省略第二个参数以确定该元素是否完全可见, 或指定true以确定它是否部分可见。

```js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
// elementIsVisibleInViewport(el) -> false (不是全部可见)
// elementIsVisibleInViewport(el, true) -> true (部分可见)
```

> getScrollPosition

*返回当前页的滚动位置。*

* 如果已定义, 则使用pageXOffset和pageYOffset, 否则scrollLeft和scrollTop。可以省略el以使用window的默认值.
```js
const getScrollPosition = (el = window) => ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft, y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});

// getScrollPosition() -> {x: 0, y: 200}

```

> getURLParameters

*返回一个包含当前 URL 参数的对象。*

* 使用match()与适当的正则表达式来获取所有键值对,Array.reduce()可将它们映射并合并到单个对象中。将location.search作为要应用于当前url的参数传递.

```js
const getURLParameters = url => url.match(/([^?=&]+)(=([^&]*))/g).reduce(
(a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
);

// getURLParameters('http://example.com/page?name=superhan&age=28') -> {name: 'superhan', age: '28'}

```

> redirect
*重定向到指定的 URL。*

* 使用window.location.href或window.location.replace()重定向到url。传递第二个参数以模拟链接单击 (true为默认值) 或 HTTP 重定向 (false).

```js
const redirect = (url, asLink = true) =>
asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://www.baidu.com')

```

> scrollToTop 

*平滑滚动到页面顶部。*

* 使用document.documentElement.scrollTop或document.body.scrollTop从顶部获取距离。每次减少一点点到顶部的距离。使用window.requestAnimationFrame()对滚动进行动画处理。

```js
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
    }
};
// scrollToTop()

```

# 日期

> getDaysDiffBetweenDates

*返回两个日期之间的差异值*
* 计算Date对象之间的差异 (以天为单位)。
```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9
```

> JSONToDate

*将 JSON 对象转换为日期*

* 使用Date(), 将 JSON 格式的日期转换为可读格式 (dd/mm/yyyy日)).
```js
const JSONToDate = arr => {
    const dt = new Date(parseInt(arr.toString().substr(6)));
    return `${ dt.getDate() }/${ dt.getMonth() + 1 }/${ dt.getFullYear() }`
};
// JSONToDate(/Date(1489525200000)/) -> "14/3/2017"
```

> toEnglishDate
*将日期从美式转换为英文格式*
* 使用Date.toISOString()、split(‘T’)和replace()将日期从美式格式转换为英文格式。如果传递的时间不能转换为日期, 则抛出错误。
```js
const toEnglishDate  = (time) =>
{try{return new Date(time).toISOString().split('T')[0].replace(/-/g, '/')}catch(e){return}};
// toEnglishDate('09/21/2010') -> '21/09/2010'
```

# 功能
> chainAsync

*链异步函数.*
* 循环遍历包含异步事件的函数数组, 当每个异步事件完成时调用next。
```js
const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); };
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])

```

> compose
*执行从右向左的函数组合*
* 使用Array.reduce()执行从右向左的函数组合。最后一个 (最右边) 的函数可以接受一个或多个参数;其余的函数必须是一元的。
```js
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
/*
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = compose(add5, multiply)
multiplyAndAdd5(5, 2) -> 15
*/
```

> curry

* 使用递归。 如果提供的参数（args）数量足够，则调用传递的函数fn。 否则，返回一个curried函数fn，它需要其余的参数。 如果您想要curry一个接受可变数量参数的函数（一个可变参数函数，例如Math.min（）），您可以选择将参数个数传递给第二个参数。
```js
const curry = (fn, arity = fn.length, ...args) =>
arity <= args.length
? fn(...args)
: curry.bind(null, fn, arity, ...args);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2
```

> functionName
*记录函数的名称*
* 使用console.debug()和传递的方法的name属性将方法的名称记录到控制台的debug通道中。
```js
const functionName = fn => (console.debug(fn.name), fn);
// functionName(Math.max) -> max (logged in debug channel of console)
```

> pipe
*执行从左向右的函数组合。*

* 使用Array.reduce()与扩展运算符 (…) 执行从左向右的函数组合。第一个 (最左边的) 函数可以接受一个或多个参数;其余的函数必须是一元的。
```js
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
/*
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = pipeFunctions(multiply, add5)
multiplyAndAdd5(5, 2) -> 15
*/
```

> promisify
*转换异步函数以返回一个承诺。*

* 转换异步函数以返回promise。使用currying返回一个函数，返回一个调用原始函数的Promise。 使用... rest操作符传入所有参数。在node8+中，您可以使用util.promisify
```js
const promisify = func =>
(...args) =>
new Promise((resolve, reject) =>
func(...args, (err, result) =>
err ? reject(err) : resolve(result))
);
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s
```

> runPromisesInSeries
*运行一系列promise。*

* 使用Array.reduce()创建一个promise链, 每个promise在解决时返回下一个promise。
```js
const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// runPromisesInSeries([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete
```
> sleep
*延迟异步函数的执行。*

> 延迟执行async函数的一部分, 将其放入休眠状态, 返回Promise.
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/

```

# 数学
> arrayAverage
*返回数字数组的平均值。*

* 使用Array.reduce()将每个值添加到累加器中, 并以0的值初始化, 除以数组的length。
```js
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// arrayAverage([1,2,3]) -> 2
```

> arraySum
*返回一个数字数组的总和。*

* 使用Array.reduce()将每个值添加到累加器中, 并以0值初始化.
```js
const arraySum = arr => arr.reduce((acc, val) => acc + val, 0);
// arraySum([1,2,3,4]) -> 10
```

> collatz
*应用 Collatz 算法。*

* 如果n是偶数, 则返回n/2。否则返回3n+1.
```
const collatz = n => (n % 2 == 0) ? (n / 2) : (3 * n + 1);
// collatz(8) --> 4
// collatz(5) --> 16
```

> collatz
*将数字转换为数字数组。*

* 将数字转换为字符串, 在 ES6 ([…string]) 中使用扩展运算符生成数组。使用Array.map()和parseInt()将每个值转换为整数。
```js
const digitize = n => [...''+n].map(i => parseInt(i));
// digitize(2334) -> [2, 3, 3, 4]
```

> digitize
*返回两点之间的距离。*

* 使用Math.hypot()计算两个点之间的欧氏距离。
```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979
```

> distance
*计算阶乘。*

* 使用递归。如果n小于或等于1, 则返回1。否则, 返回n的乘积和n – 1的阶乘。如果n为负数, 则引发异常。
```js
const factorial = n =>
n < 0 ? (() => { throw new TypeError('Negative numbers are not allowed!') })()
: n <= 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720

```


> fibonacci
*生成一个数组, 包含斐波那契数列, 直到第 n 个项。*

* 创建一个指定长度的空数组, 初始化前两个值 (0和1)。使用Array.reduce(),将值添加到数组中, 方法是使用前两个值的总和, 但前两个数值除外。
```js
const fibonacci = n =>
Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]
```

> gcd
*计算两个数字之间最大的公约数。*

* 使用递归。基本情况是当y等于0时。在这种情况下, 返回x。否则, 返回y的 GCD 和除法的其余部分x/y.
```js
const gcd = (x, y) => !y ? x : gcd(y, x % y);
// gcd (8, 36) -> 4
```


> hammingDistance
*计算两个值之间的汉明距离。*

* 使用 XOR 运算符 (^) 可查找两个数字之间的位差, 使用toString(2)转换为二进制字符串。使用match(/1/g)计算并返回字符串中1的数目。
```js
const hammingDistance = (num1, num2) =>
((num1 ^ num2).toString(2).match(/1/g) || '').length;
// hammingDistance(2,3) -> 1
```

> isDivisible
*检查第一个数值是否可被另一个数字整除。*

* 使用模数运算符 (%) 检查余数是否等于0.
```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true
```

> iseven
*如果给定的数字为偶数, 则返回true, 否则为false。*

* 检查一个数字是奇数还是偶数使用模数 (%) 运算符。如果数字为偶数, 则返回true, 如果数字为奇数, 则为false。
```js
const isEven = num => num % 2 === 0;
// isEven(3) -> false
```

> lcm
*返回两个数字最小公倍数。*

使用最大的公共除数 (GCD) 公式和Math.abs()来确定最小公倍数。GCD 公式使用递归。
```js
const lcm = (x,y) => {
const gcd = (x, y) => !y ? x : gcd(y, x % y);
return Math.abs(x*y)/(gcd(x,y));
};
// lcm(12,7) -> 84
```

> median
*返回数字数组的中间值。*

* 找到数组的中间, 使用Array.sort()来对值进行排序。如果length为奇数, 则返回中点的数字, 否则为两个中间数的平均值。
```js
const median = arr => {
const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5
```

> palindrome
*如果给定字符串为回文, 则返回true, 否则为false。*

* 转换字符串toLowerCase()并使用replace()从其中删除非字母数字字符。然后,split(”)到各个字符,reverse(),join(”), 并将其与原始的、不可逆转的字符串进行比较, 然后将其转换为tolowerCase().
```js
const palindrome = str => {
const s = str.toLowerCase().replace(/[\W_]/g,'');
return s === s.split('').reverse().join('');
}
// palindrome('tacocat') -> true
```

> percentile
*使用百分比公式计算给定数组中有多少个数小于或等于给定值。*

* 使用Array.reduce()计算值的下面有多少, 有多少个数是相同的值, 并应用百分比公式。
```js
const percentile = (arr, val) =>
100 * arr.reduce((acc,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
```

> powerset
*返回给定数字数组的 powerset。*

* 使用Array.reduce()与Array.map()组合, 以循环访问元素并将其合并到包含所有组合的数组中。
```js
const powerset = arr =>
arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]
```

> randomIntegerInRange
*返回指定范围内的随机整数。*

* 使用Math.random()生成一个随机数并将其映射到所需的范围, 使用Math.floor()使其成为整数。
```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2
```

> randomNumberInRange
*返回指定范围内的随机数。*

* 使用Math.random()生成随机值, 并使用乘法将其映射到所需的范围。
```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
// randomNumberInRange(2,10) -> 6.0211363285087005
```

> round
*将数字四舍五入到指定的位数。*

* 使用Math.round()和模板文本将数字舍入到指定的位数。省略第二个参数,decimals舍入为整数。
```js
const round = (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
// round(1.005, 2) -> 1.01
```

> standardDeviation
*返回数字数组的标准偏差。*

* 使用Array.reduce()计算值的平均值、方差和方差的总和, 值的方差, 然后确定标准偏差。可以省略第二个参数以获取样本标准偏差, 或将其设置为true以获取总体标准偏差。
```js
const standardDeviation = (arr, usePopulation = false) => {
const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
return Math.sqrt(
arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
.reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1))
);
};
// standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample)
// standardDeviation([10,2,38,23,38,23,21], true) -> 12.29899614287479 (population)
```

# 媒体
> speechSynthesis
*执行语音合成 (实验)。*

* 使用SpeechSynthesisUtterance.voice和window.speechSynthesis.getVoices()将邮件转换为语音。使用window.speechSynthesis.speak()播放该消息。了解有关Web 语音 API 的 SpeechSynthesisUtterance 接口的详细信息.
```js
const speechSynthesis = message => {
const msg = new SpeechSynthesisUtterance(message);
msg.voice = window.speechSynthesis.getVoices()[0];
window.speechSynthesis.speak(msg);
};
// speechSynthesis('Hello, World') -> plays the message
```



***
> 翻译仍未完待续。。。

[参考项目 30-seconds-of-code](https://github.com/Chalarangelo/30-seconds-of-code "30-seconds-of-code")   