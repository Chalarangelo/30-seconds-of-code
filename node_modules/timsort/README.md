# Node-TimSort: Fast Sorting for Node.js

[![Build Status](https://travis-ci.org/mziccard/node-timsort.svg?branch=master)](https://travis-ci.org/mziccard/node-timsort)
[![npm version](https://badge.fury.io/js/timsort.svg)](https://www.npmjs.com/package/timsort)

An adaptive and **stable** sort algorithm based on merging that requires fewer than nlog(n) 
comparisons when run on partially sorted arrays. The algorithm uses O(n) memory and still runs in O(nlogn) 
(worst case) on random arrays.  
This implementation is based on the original 
[TimSort](http://svn.python.org/projects/python/trunk/Objects/listsort.txt) developed 
by Tim Peters for Python's lists (code [here](http://svn.python.org/projects/python/trunk/Objects/listobject.c)).
TimSort has been also adopted in Java starting from version 7.

## Acknowledgments

- @novacrazy: ported the module to ES6/ES7 and made it available via bower
- @kasperisager: implemented faster lexicographic comparison of small integers

## Usage

Install the package with npm:
```
npm install --save timsort
```
And use it:
```javascript
var TimSort = require('timsort');

var arr = [...];
TimSort.sort(arr);
```
You can also install it with bower:
```
bower install timsort
```
As `array.sort()` by default the `timsort` module sorts according to 
lexicographical order. 
You can also provide your own compare function (to sort any object) as:
```javascript
function numberCompare(a,b) {
    return a-b;
}

var arr = [...];
var TimSort = require('timsort');
TimSort.sort(arr, numberCompare);
```
You can also sort only a specific subrange of the array:
```javascript
TimSort.sort(arr, 5, 10);
TimSort.sort(arr, numberCompare, 5, 10);
```

## Performance

A benchmark is provided in `benchmark/index.js`. It compares the `timsort` module against 
the default `array.sort` method in the numerical sorting of different types of integer array 
(as described [here](http://svn.python.org/projects/python/trunk/Objects/listsort.txt)):

-  *Random array*
-  *Descending array*
-  *Ascending array*
-  *Ascending array with 3 random exchanges*
-  *Ascending array with 10 random numbers in the end*
-  *Array of equal elements*
-  *Random Array with many duplicates*
-  *Random Array with some duplicates*

For any of the array types the sorting is repeated several times and for 
different array sizes, average execution time is then printed. 
I run the benchmark on Node v6.3.1 (both pre-compiled and compiled from source,
results are very similar), obtaining the following values:

<table>
  <tr>
    <th></th><th></th>
    <th colspan="2">Execution Time (ns)</th>
    <th rowspan="2">Speedup</th>
  </tr>
  <tr>
    <th>Array Type</th>
    <th>Length</th>
    <th>TimSort.sort</th>
    <th>array.sort</th>
  </tr>
<tbody>
 <tr>
  <td rowspan="4">Random</td><td>10</td><td>404</td><td>1583</td><td>3.91</td>
 </tr>
 <tr>
  <td>100</td><td>7147</td><td>4442</td><td>0.62</td>
 </tr>
 <tr>
  <td>1000</td><td>96395</td><td>59979</td><td>0.62</td>
 </tr>
 <tr>
  <td>10000</td><td>1341044</td><td>6098065</td><td>4.55</td>
 </tr>
 <tr>
  <td rowspan="4">Descending</td><td>10</td><td>180</td><td>1881</td><td>10.41</td>
 </tr>
 <tr>
  <td>100</td><td>682</td><td>19210</td><td>28.14</td>
</tr>
 <tr>
  <td>1000</td><td>3809</td><td>185185</td><td>48.61</td>
 </tr>
 <tr>
  <td>10000</td><td>35878</td><td>5392428</td><td>150.30</td>
 </tr>
 <tr>
  <td rowspan="4">Ascending</td><td>10</td><td>173</td><td>816</td><td>4.69</td>
 </tr>
 <tr>
  <td>100</td><td>578</td><td>18147</td><td>31.34</td>
 </tr>
 <tr>
  <td>1000</td><td>2551</td><td>331993</td><td>130.12</td>
 </tr>
 <tr>
  <td>10000</td><td>22098</td><td>5382446</td><td>243.57</td>
 </tr>
 <tr>
  <td rowspan="4">Ascending + 3 Rand Exc</td><td>10</td><td>232</td><td>927</td><td>3.99</td>
 </tr>
 <tr>
  <td>100</td><td>1059</td><td>15792</td><td>14.90</td>
 </tr>
 <tr>
  <td>1000</td><td>3525</td><td>300708</td><td>85.29</td>
 </tr>
 <tr>
  <td>10000</td><td>27455</td><td>4781370</td><td>174.15</td>
 </tr>
 <tr>
  <td rowspan="4">Ascending + 10 Rand End</td><td>10</td><td>378</td><td>1425</td><td>3.77</td>
 </tr>
 <tr>
  <td>100</td><td>1707</td><td>23346</td><td>13.67</td>
 </tr>
 <tr>
  <td>1000</td><td>5818</td><td>334744</td><td>57.53</td>
 </tr>
 <tr>
  <td>10000</td><td>38034</td><td>4985473</td><td>131.08</td>
 </tr>
 <tr>
  <td rowspan="4">Equal Elements</td><td>10</td><td>164</td><td>766</td><td>4.68</td>
 </tr>
 <tr>
  <td>100</td><td>520</td><td>3188</td><td>6.12</td>
 </tr>
 <tr>
  <td>1000</td><td>2340</td><td>27971</td><td>11.95</td>
 </tr>
 <tr>
  <td>10000</td><td>17011</td><td>281672</td><td>16.56</td>
 </tr>
 <tr>
  <td rowspan="4">Many Repetitions</td><td>10</td><td>396</td><td>1482</td><td>3.74</td>
 </tr>
 <tr>
  <td>100</td><td>7282</td><td>25267</td><td>3.47</td>
 </tr>
 <tr>
  <td>1000</td><td>105528</td><td>420120</td><td>3.98</td>
 </tr>
 <tr>
  <td>10000</td><td>1396120</td><td>5787399</td><td>4.15</td>
 </tr>
 <tr>
  <td rowspan="4">Some Repetitions</td><td>10</td><td>390</td><td>1463</td><td>3.75</td>
 </tr>
 <tr>
  <td>100</td><td>6678</td><td>20082</td><td>3.01</td>
 </tr>
 <tr>
  <td>1000</td><td>104344</td><td>374103</td><td>3.59</td>
 </tr>
 <tr>
  <td>10000</td><td>1333816</td><td>5474000</td><td>4.10</td>
 </tr>
</tbody>
</table>

`TimSort.sort` **is faster** than `array.sort` on almost of the tested array types.
In general, the more ordered the array is the better `TimSort.sort` performs with respect to `array.sort` (up to 243 times faster on already sorted arrays).
And also, in general, the bigger the array the more we benefit from using
the `timsort` module.  

These data strongly depend on Node.js version and the machine on which the benchmark is run. I strongly encourage you to run the benchmark on your own setup with:
```
npm run benchmark
```
Please also notice that:

-  This benchmark is far from exhaustive. Several cases are not considered 
and the results must be taken as partial
-  *inlining* is surely playing an active role in `timsort` module's good performance
-  A more accurate comparison of the algorithms would require implementing `array.sort` in pure javascript
and counting element comparisons

## Stability

TimSort is *stable* which means that equal items maintain their relative order 
after sorting. Stability is a desirable property for a sorting algorithm. 
Consider the following array of items with an height and a weight.
```javascript
[ 
  { height: 100, weight: 80 },
  { height: 90, weight: 90 },
  { height: 70, weight: 95 },
  { height: 100, weight: 100 },
  { height: 80, weight: 110 },
  { height: 110, weight: 115 },
  { height: 100, weight: 120 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 100, weight: 135 },
  { height: 75, weight: 140 },
  { height: 70, weight: 140 } 
]
```
Items are already sorted by `weight`. Sorting the array 
according to the item's `height` with the `timsort` module 
results in the following array:
```javascript
[ 
  { height: 70, weight: 95 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 70, weight: 140 },
  { height: 75, weight: 140 },
  { height: 80, weight: 110 },
  { height: 90, weight: 90 },
  { height: 100, weight: 80 },
  { height: 100, weight: 100 },
  { height: 100, weight: 120 },
  { height: 100, weight: 135 },
  { height: 110, weight: 115 } 
]
```
Items with the same  `height` are still sorted by `weight` which means they preserved their relative order.

`array.sort`, instead, is not guarranteed to be *stable*. In Node v0.12.7 
sorting the previous array by `height` with `array.sort` results in:
```javascript
[ 
  { height: 70, weight: 140 },
  { height: 70, weight: 95 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 75, weight: 140 },
  { height: 80, weight: 110 },
  { height: 90, weight: 90 },
  { height: 100, weight: 100 },
  { height: 100, weight: 80 },
  { height: 100, weight: 135 },
  { height: 100, weight: 120 },
  { height: 110, weight: 115 } 
]
```
As you can see the sorting did not preserve `weight` ordering for items with the 
same `height`.
