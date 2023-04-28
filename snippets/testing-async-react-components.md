---
title: Testing React components that update asynchronously with React Testing Library
shortTitle: Asynchronous component update testing
type: story
tags: [react,testing,event]
cover: colorful-lounge
excerpt: Testing React components that update asynchronously with React Testing Library is a common scenario. Learn how to deal with common issues and speed up your testing.
dateModified: 2021-11-07T16:34:37+03:00
---

### Components that update asynchronously

Recently, while working on a side-project, we started using the [React DnD library](https://react-dnd.github.io/react-dnd), as we wanted to implement a multi-container drag and drop system with cards.

After spending the better part of a day implementing the functionality, we decided to add some tests to ensure everything will keep working as expected. In the aforementioned project, we use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to write tests for our components.

While testing the drag functionality, we came across a very stubborn test. Here's a simplified version of our `Card` component:

```jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({
  card: {
    id,
    title
  }
}) => {
  const [style, drag] = useDrag({
    item: { id, type: 'card' },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1
    })
  });

  return (
    <li className="card" id={id} ref={drag} style={style}>
      {title}
    </li>
  );
};
```

And here's the test we were trying to write originally:

```jsx
import React from 'react';
import { fireEvent } from '@testing-library/react';
import Card from './components/Card';
// This a little helper we have written to connect to redux and react-dnd
import renderDndConnected from './test_utils/renderDndConnected';

describe('<Card/>', () => {
  let card;

  beforeEach(() => {
    const utils = renderDndConnected(
      <Card card={{ id: '1', title: 'Card' }} />
    );
    card = utils.container.querySelector('.card');
  });

  it('initial opacity is 1', () => {
    expect(card.style.opacity).toEqual('1');
  });

  describe('when drag starts', () => {
    beforeEach(() => {
      fireEvent.dragStart(card);
    });

    it('opacity is 0', () => {
      expect(card.style.opacity).toEqual('0');
    });
  });
});
```

### The dreaded `act(...)` warning

While the test was obviously not working, the console was constantly nagging about wrapping the test in `act()`:

```
When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser.
```

This message wasn't very helpful in identifying the underlying issue. The only thing it highlighted was that the test didn't update the component style immediately. There were pending updates after the test completed. To put it plainly, the test was failing because the `dragStart` event didn't immediately update the `Card` components' style (i.e. set the new `opacity`).

As a side note, the `Card` component is connected to Redux, which might relate to the issue, but it would most likely happen even without Redux. That's probably due to the fact that `collect` takes some amount of time to run and send an update to the component.

### Solving the issue

Digging deeper, we found that apart from `act()`, there are also other options, such as `waitFor()` and `waitForDomChange()`. These seem more intuitive simply because of the name and way they're written (using either `async await` or promises). However, `waitForDomChange()` didn't work properly for our case and our version of `react-testing-library` (which shipped with `react-scripts`) was outdated and did not export `waitFor()`, which took us a good half an hour to figure out.

After updating `react-testing-library`, we were still not ready to go, as the console started displaying the following error:

```
TypeError: MutationObserver is not a constructor
```

This required some searching, which eventually led us to [this issue](https://github.com/testing-library/react-testing-library/issues/662) which helped us figure out that a solution was to replace the `test` script in our `package.json` with this line:

```json
{
  // ...
  "scripts": {
    "test": "react-scripts test --env=jsdom-fourteen"
    // ...
  }
}
```

Now to finally write a test that works! As mentioned above, we opted to use `waitFor()` from `react-testing-library`, which was actually the only change to the original testing code, except for the dependency bump and the script change described above. Here's the test after making the necessary changes:

```jsx
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
// This a little helper we have written to connect to redux and react-dnd
import renderDndConnected from './test_utils/renderDndConnected';
import Card from './components/Card';

describe('<Card/>', () => {
  let card;

  beforeEach(() => {
    const utils = renderDndConnected(
      <Card card={{ id: '1', title: 'Card' }} />
    );
    card = utils.container.querySelector('.card');
  });

  it('initial opacity is 1', () => {
    expect(card.style.opacity).toEqual('1');
  });

  describe('when drag starts', () => {
    beforeEach(() => {
      fireEvent.dragStart(card);
    });

    it('opacity is 0', async() => {
      await waitFor(() => expect(card.style.opacity).toEqual('0'));
    });
  });
});
```

### Summary

- A message about code that causes React state updates not being wrapped in `act(...)` might indicate that a component updated after the test ended.
- Using `waitFor()` can solve the issue by making tests asynchronous, but you might need to bump your `react-testing-library` version if you are using older versions of `react-scripts`.
- If you see errors related to `MutationObserver`, you might need to change your `test` script to include `--env=jsdom-fourteen` as a parameter.
