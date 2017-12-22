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

Used ES6 reduce 
Dummy data for testing 
Generated with http://www.mockaroo.com/ 

```js
const reducedFilter = (data, condition, outputProps) => 
    data.reduce( (acc, item) => {
    if(eval(condition)) {
      const parsedObj = outputProps.reduce( (aggr, index) => {
        aggr[index] = item[`${index}`];
        return aggr;
      }, {});
      acc.push(parsedObj); 
    } 
    return (acc);
  }, []);
```
###Usage Example available in :

`https://codepen.io/myapos/pen/dJGByW?editors=0112`

