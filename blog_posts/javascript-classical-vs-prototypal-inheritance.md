---
title: How does JavaScript's prototypal inheritance differ from classical inheritance?
type: question
tags: javascript,object,class
authors: chalarangelo
cover: blog_images/last-light.jpg
excerpt: Understading the difference between these two object-oriented programming paradigms is key to taking your skills to the next level.
firstSeen: 2021-11-21T05:00:00-04:00
---

### Object-oriented programming

Both classical and prototypal inheritance are object-oriented programming paradigms. Objects in object-oriented programming are abstractions that encapsulate the properties of an entity. This is known as abstraction.

When dealing with multiple levels of abstraction, each level is more general or more specific. The more general abstraction of a more specific abstraction is called a generalization.

As mentioned previously, objects are abstraction of entities. We use either classes (classical inheritance) or prototypes (prototypal inheritance) to create generalizations of these objects. Generalizations are created by inheritance.

Consider an example:

- We have two objects representing two pets: Max the dog and Claire the cat. Let's call them `max` and `claire` respectively.
- All dogs have common characteristics. Therefore we can create an abstraction, `Dog`, which encapsulates their common characteristics. We can use inheritance to pass characteristics from `Dog` to `max`.
- The same applies for cats, allowing us to create an abstraction, `Cat`. Similarly, `claire` will inherit characteristics from `Cat`.
- Cats and dogs share some common characteristics. We can create a generalization, `Animal`, to encapsulate those characteristics. `Dog` and `Cat` inherit these common characteristics from `Animal`.

### Classical inheritance

In classical object-oriented programming, there are two types of abstractions: objects and classes. An object is an abstractions of an entity, while a class is either an abstraction of an object or another class.

If we were to model the previous example using classical inheritance, it would look something like this:

```js
class Animal { }

class Dog extends Animal { }
class Cat extends Animal { }

const max = new Dog();
max.name = 'Max';

const claire = new Cat();
claire.name = 'Claire';
```

### Prototypal inheritance

In prototypal object-oriented programming, there's only one type of abstraction: objects. Objects are either abstractions of entities or other objects, in which case they're called prototypes. Hence a prototype is a generalization.

Objects can be created out of nothing or from another object, which in turn becomes the prototype of the newly created object.

If we were to model the previous example using prototypal inheritance, it would look something like this:

```js
const animal = {};

const dog = Object.create(animal);
const cat = Object.create(animal);

const max = Object.create(dog);
const claire = Object.create(cat);
```
