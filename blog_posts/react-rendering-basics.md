---
title: React rendering basics
type: story
tags: react,render
expertise: intermediate
author: chalarangelo
cover: blog_images/comic-glasses.jpg
excerpt: Take a deeper dive into React's rendering process and understand the basics behind the popular JavaScript framework.
firstSeen: 2020-06-16T20:41:02+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

#### React rendering

- React rendering basics (this blog post)
- [React rendering optimization](/blog/s/react-rendering-optimization)
- [React rendering state](/blog/s/react-rendering-state)


### Rendering introduction

**Rendering** is the process during which React moves down the component tree starting at the root, looking for all the components flagged for update, asking them to describe their desired UI structure based on the current combination of `props` and `state`. For each flagged component, React will call its `render()` method (for class components) or `FunctionComponent()` (for function components), and save the output produced after converting the JSX result into a plain JS object, using `React.createElement()`.

After collecting the render output from the entire component tree, React will diff the new tree (the **virtual DOM**) with the current DOM tree and collect the list of changes that need to be made to the DOM to produce the desired UI structure. After this process, known as **reconciliation**, React applies all the calculated changes to the DOM.

### Render and commit phases

Conceptually, this work is divided into two phases:

- **Render phase**: rendering components, calculating changes
- **Commit phase**: applying the changes to the DOM

After the **commit phase** is complete, React will run `componentDidMount` and `componentDidUpdate` lifecycle methods, as well as `useLayoutEffect()` and, after a short timeout, `useEffect()` hooks.

Two key takeaways here are the following:

- Rendering is not the same as updating the DOM
- A component may be rendered without any visible changes

### Rendering reasons

After the initial render has completed, there are a few different things that will cause a re-render:

- `this.setState()` (class components)
- `this.forceUpdate()` (class components)
- `useState()` setters (function components)
- `useReducer()` dispatches (function components)
- `ReactDOM.render()` again (on the root component)

### Rendering behavior

React's default behavior is to **recursively render all child components inside of it when a parent component is rendered**. This means that it does not care if a component's `props` have changed - as long as the parent component rendered, its children will render unconditionally.

To put this another way, calling `setState()` in the root component without any other changes, will cause React to re-render every single component in the component tree. Most likely, most of the components will return the exact same render output as the last render, meaning React will not have to make any changes to the DOM, but the rendering and diffing calculations will be performed regardless, taking time and effort.

[Continue on React rendering optimization](/blog/s/react-rendering-optimization)
