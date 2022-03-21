---
title: Testing React portals
shortTitle: Portal testing
type: story
tags: react,testing
expertise: advanced
author: chalarangelo
cover: blog_images/portal-timelapse.jpg
excerpt: Testing React components that use portals can be difficult until you understand what you really need to be testing.
firstSeen: 2022-03-13T05:00:00-04:00
---

Testing React components can get pretty complicated, especially when dealing with portals. While they seem intimidating, what they are in essence is a way to render a component in a different place in the DOM. Apart from that, when writing tests, one should avoid testing framework internals. This obviously applies to React internals as well.

Putting these two points together, all we really care about when testing React portals is if the portalized output is correct. Based on that, mocking portals shouldn't be all that hard. We just need to mock `ReactDOM.createPortal()` to render the input element in place. Here's what that looks like in Jest:

```jsx
describe('MyComponent', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('should render correctly', () => {
    const component = renderer.create(<MyComponent>Hello World!</MyComponent>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
```

This kind of mock will work in most cases and it will help ensure that the portalized output is correct. It comes with some caveats, though. First and foremost, the tested DOM is different from the actual DOM of the application. This can make tests less robust, reducing confidence in their result. Secondly, issues that might arise from the use of portals, such as the portal node missing, must be tested separately.
