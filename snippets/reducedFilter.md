### reducedFilter

Filter an array of objects based on condition and return array with reduced objects.

#### Input

* Data: the data to be filtered (array of objects) 
* Condition: will be used for filtering (string) 
* outputProps: an array of properties that will be used to contruct new array of objects 

#### Output

* Filtered array with new objects. Properties of new objects are a subset of
properties of original objects 

#### Info

Used ES6 Array.reduce() in order to filter an array with objects based on condition.
If condition is met, then Array.reduce is used again to construct object with the predefined properties. Further more, in order to dynamically evaluate condition based in object properties, item must be passed through window to Function constructor. Finally, when new object is constructed then it is saved in the output array. 

```js
const safeEval = (condition) => new Function('return '+condition)();

const reducedFilter = (data, condition, outputProps) => 
    data.reduce( (acc, item) => {
    window.item = item;
    if(safeEval(condition)) {
      const parsedObj = outputProps.reduce( (aggr, index) => {
        aggr[index] = item[`${index}`];
        return aggr;
      }, {});
      acc[acc.length]=parsedObj; 
    } 
    return (acc);
  }, []);
  /*
  Usage example:

  Input data sample is an array of Objects

  const data = [{
  "id": 1,
  "first_name": "Jo",
  "last_name": "Blackstone",
  "email": "jblackstone0@yahoo.co.jp",
  "gender": "Male",
  "ip_address": "255.171.18.115"
}, ... ]

const condition = `window.item.first_name[0] ==='B'`;

const outputProps = ['first_name','id', 'last_name', 'ip_address'];

const output = reducedFilter(data, condition, outputProps); -->

Output conditionally filtered data sample. Properties of output objects are subset of 
the properties of the original objects. 

Filtered output data :

[
Object {
  first_name: "Bertina",
  id: 6,
  ip_address: "33.239.93.222",
  last_name: "Pinching"
},
Object {
  first_name: "Beckie",
  id: 13,
  ip_address: "239.111.225.202",
  last_name: "Thomesson"
}, ... ]


  */
```

