---
title: React rendering optimization
type: story
tags: react,render
authors: chalarangelo
cover: blog_images/react-rendering.jpg
excerpt: Take a deeper dive into React's rendering process and understand how to make small yet powerful tweaks to optimize performance.
---

#### React rendering

- [React rendering basics](/blog/s/react-rendering-basics)
- React rendering optimization (this blog post)
- [React rendering state](/blog/s/react-rendering-state)

### Optimization opportunities

As we've seen in the [previous blog post](/blog/s/react-rendering-basics), **rendering** is React's way of knowing if it needs to make changes in the DOM, but there are certain cases where work and calculations performed during the **render phase** can be a wasted effort. After all, if a component's render output is indentical, there will be no DOM updates, thus the work wasn't necessary.

Render output should always be based on the current combination of `props` and `state`, so it is possible to know ahead of time if a component's render output will be the same so long as its `props` and `state` remain unchanged. This is the key observation on top of which optimizing React rendering is based, as it hinges on our code doing less work and skipping component rendering when possible.

### Optimization techniques

React offers a handful of APIs that allow us to optimize the rendering process:

- `shouldComponentUpdate` (class components): Lifecycle method, called before rendering, returning a boolean (`false` to skip rendering, `true` to proceed as usual). Logic can vary as necessary, but the most common case is checking if the component's `props` and `state` have changed.
- `React.PureComponent` (class components): Base class that implements the previously described `props` and `state` change check in its `shouldComponentUpdate` lifecycle method.
- `React.memo()` (any component): Higher-order component (HOC) that wraps any given component. It implements the same kind of functionality as `React.PureComponent`, but can also wrap function components.

All of these techniques use **shallow equality** for comparisons. Skipping rendering a component means skipping the default recursive behavior of rendering children, effectively skipping the whole subtree of components.

### Reference memoization

Passing new references as `props` to a child component doesn't usually matter, as it will re-render regardless when the parent changes. However, if you are trying to optimize a child component's rendering by checking if its `props` have changed, passing new references will cause a render. This behavior is ok if the new references are updated data, but if it's a new reference to the same callback function passed down by the parent, it's rather problematic.

This is less of an issue in class components, as they have instance methods whose references don't change, although any sort of generated callbacks passed down to a component's chidren can result in new references. As far as function components are concerned, React provides the `useMemo` hook for memoizing values, and the `useCallback` hook specifically for memoizing callbacks.

`useMemo` and `useCallback` can provide performance benefits but, as with any other memoization usage, it's important to think about their necessity and the net benefit they provide in the long run. A good rule of thumb is to consider using them for pure functional components that re-render often with the same `props` and/or might do heavy calculations and avoid them elsewhere.

### Performance measurement

**React Developer Tools** provide a handy **Profiler** tab that allows you to visualize and explore the rendering process of your React applications. Under this tab, you will find a settings icon which will allow you to _Highlight updates when components render_, as well as _Record why each component rendered while profiling_ - I highly suggest ticking both of them. Recording the initial render and re-renders of the website can provide invaluable insights about the application's bottlenecks and issues and also highlight optimization opportunities (often using one of the techniques described above).

Finally, remember that React's development builds are significantly slower than production builds, so take all the measurements you see with a grain of salt as absolute times in development are not a valuable metric. Identifying unnecessary renders, memoization and optimization opportunites, as well as potential bottlenecks is where you should focus.

[Continue on React rendering state](/blog/s/react-rendering-state)

**Image credit:** [Mahdiar Mahmoodi](https://unsplash.com/@mhdr_m?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
