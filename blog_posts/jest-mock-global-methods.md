---
title: Mocking global object methods in Jest
type: story
tags: javascript,testing
author: chalarangelo
cover: blog_images/trippy-chemicals.jpg
excerpt: Testing your code is important, but mocking can be tricky at times. Here's a quick guide on how to mock global object methods in Jest.
firstSeen: 2022-03-27T05:00:00-04:00
---

Testing is a big part of the development process. It's also where a lot of mistakes can be overlooked, which can pile up and lead to hard-to-debug issues. A common problem is poorly-written mocks, especially regarding global objects and their methods. Let's take a look at how to mock global object methods in Jest.

When mocking global object methods in Jest, the optimal way to do so is using the `jest.spyOn()` method. It takes the object and name of the method you want to mock, and returns a mock function. The resulting mock function can then be chained to a mocked implementation or a mocked return value. For example:

```js
jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

jest.spyOn(Date, 'now').mockReturnValue('123456789');
```

In this example, we mock two global object methods and return a fixed value. You could as easily mock their implementation using `mockFn.mockImplementation()`. Using either of these options allows you to get predictable values from the mocked methods. This comes in especially handy when working, for example, with `Math.random()` or `Date.now()`.
