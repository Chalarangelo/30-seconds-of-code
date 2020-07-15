---
title: Testing Redux-connected components with React Testing Library
type: story
tags: react,testing
authors: chalarangelo
cover: blog_images/testing-redux-connected-components.jpg
excerpt: Testing Redux-connected components with React Testing Library is a very common scenario. Learn how to use this simple utility function to speed up your testing.
---

Testing Redux-connected components with React Testing Library is a very common scenario. However, it might be a little complicated without the proper tools and you could end up repeating yourself, especially when writing the boilerplate to connect to your redux store.

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

The utility above uses the `createStore` function and the `<Provider>` component to wrap a redux-connected component to the passed state, while using React Testing Library's `render` to finally render the result.

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

**Image credit:** [israel palacio](https://unsplash.com/@othentikisra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
