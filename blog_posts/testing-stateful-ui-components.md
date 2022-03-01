---
title: An approach to testing stateful React components
type: story
tags: react,testing
expertise: intermediate
author: chalarangelo
cover: blog_images/lake-trees.jpg
excerpt: Testing stateful React components is by no means a difficult task, but did you know there is an elegant solution that doesn't involve testing state directly?
firstSeen: 2020-01-16T09:58:18+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Some time ago, I was tasked with writing tests for a handful of React components, an otherwise mundane and uninspiring task, that somehow ended with a "Eureka!" moment for me. The specifics of the project and its components are of little importance, however the key detail is that I was working with stateful React components that are used daily by a large team and, as such, are refactored and updated quite often.

My initial approach consisted of writing some simple tests, such as checking if the component is rendered properly and if certain events fire appropriately. In doing so, I was comparing state directly with the result I was expecting, having the component's code right next to my assertions. Of course, this isn't bad by anyone's standards, but for a codebase with many moving parts, it is not the greatest idea. Let me show you an example why:

```js
context('the component is initialized in a collapsed state', function() {
  let wrapper;
  beforeEach(function(){
    wrapper = mount(<StatefulComponent />);
  });

  it('component state.expanded is false', function() {
    expect(wrapper.state('expanded')).to.be.false;
  });
});
```

In this test, we check if the component's state has `expanded` equal to `false`. Our test will pass, as long as this simple condition is true. It's a very simple test that should be easy to understand even for someone completely unfamiliar with the codebase.

However, over time the component's implementation might change. What happens if `expanded` in our state ends up meaning something different? Or worse yet, if it isn't reflected the same way in the interface?

Enter my "Eureka!" moment:

> The application's UI should always be considered the result of combining the component's props and state.

The above statement implies that a component's state can be considered a black box while testings, an abstraction layer that should not be accessed unless absolutely necessary. So, instead of the test presented above, we should be doing something more like this:

```js
context('the component is initialized in a collapsed state', function() {
  let wrapper;
  beforeEach(function(){
    wrapper = mount(<StatefulComponent />);
  });

  it('component does not have the expanded class', function() {
    expect(wrapper.find('div').hasClass('expanded')).to.be.false;
  });
});
```

Our test is still easy to read and understand, but it's a better test in general.

By directly checking the DOM instead of the component's state, we provide information about the component's output to future code authors, instead of asking them to keep the existing implementation intact. It seems like a better way to document the component and it's easier to track future changes should someone refactor the UI in such a way that the DOM representation of the component is altered.
