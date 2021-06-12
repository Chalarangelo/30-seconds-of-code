---
title: How do I remove a property from a JavaScript object?
type: question
tags: javascript,object
authors: chalarangelo
cover: blog_images/brown-bird.jpg
excerpt: Ever wanted to delete a property from a JavaScript object? Here are a few way you can accomplish that.
---

When working with objects in JavaScript, you might come across situations where a property should be completely removed from an object. To accomplish that, there a few options you have at your disposal:

### Set the property to undefined

Setting a property to `undefined` isn't generally optimal, as the property itself will still be present in the object, albeit `undefined`. It also mutates the original object, which might be undesired. You might want to use this in cases where you check for the property's value or truthiness but not its presence.

```js
const pet = {
  species: 'dog',
  age: 3,
  name: 'celeste',
  gender: 'female'
};

pet.gender = undefined;
Object.keys(pet); // ['species', 'age', 'name', 'gender']
```

### Use the delete operator

The `delete` operator is technically the correct way to remove a property from a JavaScript object. Unlike the previous option, `delete` will completely remove the property from the object, but it will still cause a mutation.

```js
const pet = {
  species: 'dog',
  age: 3,
  name: 'celeste',
  gender: 'female'
};

delete pet.gender;
Object.keys(pet); // ['species', 'age', 'name']
```

### Use object destructuring

Using the spread syntax, (`...`), you can destructure and assign the object with specific properties omitted to a new object. This trick comes in handy especially if you want to remove a subset of properties instead of just one and has the added benefit of not mutating the original object.

```js
const pet = {
  species: 'dog',
  age: 3,
  name: 'celeste',
  gender: 'female'
};

const { gender, ...newPet } = pet;
Object.keys(pet); // ['species', 'age', 'name', 'gender]
Object.keys(newPet); // ['species', 'age', 'name']
```
