---
title: Writing readable reducers in Redux
type: story
tags: react,logic
expertise: advanced
author: chalarangelo
cover: blog_images/beach-from-above.jpg
excerpt: When working with state in your code, you often run into issues with maintaining complexity and readability. Oftentimes, these issues are easily fixable.
firstSeen: 2021-04-05T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

_This article's examples are based on Redux, where the issues described are more common. As these issues are not limited to Redux, you might still find some value in the tips and solutions presented if you are struggling with maintaining complexity and readability in your code._

When working with state in your code, you might often run into issues with maintaining complexity, keeping the code readable and even figuring out how to properly test it. Oftentimes, these issues are easily fixable if you take a step back and identify the root of the problem.

Let's start with an example of what a redux reducer might look like. We'll follow this example throughout this post, making changes and improvements, so make sure you understand it before continuing.

```js
const initialState = {
  id: null,
  name: '',
  properties: {},
};

const generateID = () => Math.floor(Math.random() * 1000);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'createID':
      return {
        ...state,
        id: generateID(),
      };
    case 'setName':
      return {
        ...state,
        name: action.name,
      };
    case 'addProperty':
      return {
        ...state,
        properties: {
          ...state.properties,
          [action.propertyName]: action.propertyValue,
        },
      };
    case 'removeProperty':
      return {
        ...state,
        properties: Object.keys(state.properties).reduce((acc, key) => {
          if (key !== action.propertyName) acc[key] = state.properties[key];
          return acc;
        }, {}),
      };
    default:
      return state;
  }
};
```

### Identifying the problems

While the code in the example is not that complicated right now, complexity can increase very fast as more action types need to be handled by our application. This is due to the fact that each `action.type`'s logic is nested inside the `reducer` function, thus adding more code and complexity with each new action.

Another issue we can identify is that each `action` has a different structure, which increases congitive load for future maintainers, as they have to remember what keys their `action` needs to have. There's also the added issue of running into a case where `action.type` might be needed to pass actual data to the state (i.e. `state.type` could exist).

Finally, our `action.type` values are hardcoded inside the `reducer` function, making it hard to remember and sync across other files and components. This might seem like the least of our problems, but it's probably the easiest one to fix, so let's start there.

### Define action types

Starting with removing the hardcoded strings for each of the `action.type` values, we can make the code more maintainable and easier to read by extracting them to an object:

```js
const ACTION_TYPES = {
  CREATE_ID: 'createID',
  SET_NAME: 'setName',
  ADD_PROPERTY: 'addProperty',
  REMOVE_PROPERTY: 'removeProperty'
};
```

### Create a common action structure

Our `action` objects aren't consistent in terms of structure with the exception of sharing a `type` key which we use to identify each action. If we hope to reduce mental strain and minimize headaches, we should make these more consistent. The easiest way to do so would be to put the whole action `payload` under a top-level key and nest any values passed to the action inside it:

```js
// Strucure of any action passed to our reducer function
const action = {
  // Any of the previously defined action types
  type: ACTION_TYPES.CREATE_ID,
  // Nest name, propertyValue and propertyKey inside this object
  payload: { /* ... */ }
}
```

If you plug it into the previous code right away, it might seem counter-intuitive at first, but bear with me for a minute. It will all come together soon.

### Extract nested logic

Finally, we are ready to implement the most drastic fix which the previous two changes will help us facilitate - extracting nested logic. The first issue we identified was that each `action.type`'s logic was nested inside the `reducer` function. We can fix that by moving each `case` into its own function:

```js
const createID = state => ({
  ...state,
  id: generateID(),
});

const setName = (state, { name }) => ({
  ...state,
  name,
});

const addProperty = (state, { propertyName, propertyValue }) => ({
  ...state,
  [propertyName]: propertyValue,
});

const removeProperty = (state, { propertyName }) => {
  const properties = Object.keys(state.properties).reduce((acc, key) => {
    if (key !== propertyName) acc[key] = state.properties[key];
    return acc;
  }, {});
  return { ...state, properties };
};
```

Each function has a single responsibility. Any complexity associated with each `action.type` is now part of a function responsible for that specific action type. Testing these smaller functions is a lot easier now, as they are focused on a single task, instead of being nested into a larger, more complex `reducer`.

### Putting it all together

Having implemented the above changes, let's take a look at what our final code looks like:

```js
const initialState = {
  id: null,
  name: '',
  properties: {},
};

const ACTION_TYPES = {
  CREATE_ID: 'createID',
  SET_NAME: 'setName',
  ADD_PROPERTY: 'addProperty',
  REMOVE_PROPERTY: 'removeProperty'
};

const generateID = () => Math.floor(Math.random() * 1000);

const createID = state => ({
  ...state,
  id: generateID(),
});

const setName = (state, { name }) => ({
  ...state,
  name,
});

const addProperty = (state, { propertyName, propertyValue }) => ({
  ...state,
  [propertyName]: propertyValue,
});

const removeProperty = (state, { propertyName }) => {
  const properties = Object.keys(state.properties).reduce((acc, key) => {
    if (key !== propertyName) acc[key] = state.properties[key];
    return acc;
  }, {});
  return { ...state, properties };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE_ID:
      return createId(state, action.payload);
    case TYPES.SET_NAME:
      return setName(state, action.payload);
    case TYPES.ADD_PROPERTY:
      return addProperty(state, action.payload);
    case TYPES.REMOVE_PROPERTY:
      return removeProperty(state, action.payload);
    default:
      return state;
  }
};
```
