---
title: filterArrayOfObjects
tags: array,filter,beginner
---

Filters out only desired values from the array of objects.

- Use `Array.prototype.filter()` method on an array of objects to get the filtered result.
- For instance, we have `cars` array in which we want to filter out all the cars with type as `SUV`.
- Apply `Array.prototype.filter()` method on `cars` array and add a condition for car type as `SUV`.

```js
const filterCars = (cars) => cars.filter((car) => car.type === 'SUV');
```

```js
const cars = [
  { name: 'BMW', type: 'SUV' },
  { name: 'BMW', type: 'Sedan' },
  { name: 'Audi', type: 'SUV' },
];
filterCars(cars); // [{name: 'BMW', type: 'SUV'}, {name: 'Audi', type: 'SUV'}]
```
