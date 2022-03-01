---
title: Testing Redux-connected components with React Testing Library
type: story
tags: react,testing
expertise: advanced
author: chalarangelo
cover: blog_images/sparkles.jpg
excerpt: Testing Redux-connected components with React Testing Library is a very common scenario. Learn how to use this simple utility function to speed up your testing.
firstSeen: 2020-07-15T13:54:26+03:00
lastUpdated: 2021-11-07T16:34:37+03:00
---

Testing Redux-connected components with React Testing Library is a very common scenario. However, it might be a little complicated without the proper tools and you could end up repeating yourself. This is especially true when writing the boilerplate to connect to your redux store.

Here's a simple utility function adapted from [React Testing Library's docs on the subject](https://testing-library.com/docs/example-react-redux) to help you speed up your testing:

```jsx
// src/test/utils/renderConnected.js
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Replace this with the appropriate imports for your project
import { reducer, reducerInitialState } from './myReduxStore';

const renderConnected = (
  ui, {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions});
};

export default renderConnected;
```

This utility uses the `createStore` function and the `<Provider>` component to wrap a redux-connected component to the passed state. Then it uses React Testing Library's `render` to finally render the result.

Remember to replace `import` statements with the appropriate files and exports to set up the utility as necessary. After creating the utility function and saving it in an appropriate file, you can use it like this:

```jsx
// src/test/SomeComponent.test.jsx
import React from 'react';
// Replace this with the appropriate location of your component
import SomeComponent from 'src/components/SomeComponent';
// Replace this with the appropriate location of your testing utility
import renderConnected from 'src/test/utils/renderConnected';

describe('<SomeComponent/>', () => {
  let wrapper, getByText;
  const initialState = {
    // ... Add your initial testing state here
  };

  beforeEach(() => {
    const utils = renderConnected(<SomeComponent />, { initialState });
    wrapper = utils.container;
    getByText = utils.getByText;
  });

  it('renders the component', () => {
    expect(wrapper.querySelector('.some-component')).toBeInTheDocument();
  });
});
```
