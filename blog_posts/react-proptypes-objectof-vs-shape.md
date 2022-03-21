---
title: React PropTypes - objectOf vs shape
shortTitle: PropTypes - objectOf vs shape
type: story
tags: react,components,proptypes
expertise: intermediate
author: chalarangelo
cover: blog_images/shapes.jpg
excerpt: Learn the differences between `PropTypes.objectOf()` and `PropTypes.shape()` and where to use each one with this quick guide.
firstSeen: 2021-01-18T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

The `prop-types` package is used by millions of React developers every day in order to type check the props passed to their components. Most of us are probably familiar with a variety of its built-in validators, but many a developer seems to fall short when dealing with object props. Luckily, the `PropTypes.objectOf()` and `PropTypes.shape()` validators are here to help.

### PropTypes.shape()

The `PropTypes.shape()` validator can be used when describing an object whose keys are known ahead of time, and may represent different types. For example:

```js
import PropTypes from 'prop-types';
// Expected prop object - keys known ahead of time
const myProp = {
  name: 'John',
  surname: 'Smith',
  age: 27
};
// PropTypes validation for the prop object
MyComponent.propTypes = {
  myProp: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    age: PropTypes.number
  })
};
```

### PropTypes.objectOf()

The `PropTypes.objectOf()` validator is used when describing an object whose keys might not be known ahead of time, and often represent the same type. For example:

```js
import PropTypes from 'prop-types';
// Expected prop object - dynamic keys (i.e. user ids)
const myProp = {
  25891102: 'johnsmith',
  34712915: 'ducklord',
  76912999: 'mrquacks'
};
// PropTypes validation for the prop object
MyComponent.propTypes = {
  myProp: PropTypes.objectOf(PropTypes.number)
};
```
