---
title: React rendering
language: react
tags: [render]
cover: comic-glasses
excerpt: Take a deep dive into React's rendering process to understand the basics, performance optimization and the role of state management in it.
listed: true
dateModified: 2024-06-04
---

## Rendering introduction

**Rendering** is the process during which React moves down the component tree starting at the root, looking for all the components flagged for update, asking them to describe their desired UI structure based on the current combination of `props` and `state`. For each flagged component, React will call its `render()` method (for class components) or `FunctionComponent()` (for function components), and save the output produced after converting the JSX result into a plain JS object, using `React.createElement()`.

After collecting the render output from the entire component tree, React will diff the new tree (the **virtual DOM**) with the current DOM tree and collect the list of changes that need to be made to the DOM to produce the desired UI structure. After this process, known as **reconciliation**, React applies all the calculated changes to the DOM.

## Render and commit phases

Conceptually, this work is divided into two phases:

- **Render phase**: rendering components, calculating changes
- **Commit phase**: applying the changes to the DOM

After the **commit phase** is complete, React will run `componentDidMount` and `componentDidUpdate` lifecycle methods, as well as `useLayoutEffect()` and, after a short timeout, `useEffect()` hooks.

Two key takeaways here are the following:

- Rendering is not the same as updating the DOM
- A component may be rendered without any visible changes

## Rendering reasons

After the initial render has completed, there are a few different things that will cause a re-render:

- `this.setState()` (class components)
- `this.forceUpdate()` (class components)
- `useState()` setters (function components)
- `useReducer()` dispatches (function components)
- `ReactDOM.render()` again (on the root component)

## Rendering behavior

React's default behavior is to **recursively render all child components inside of it when a parent component is rendered**. This means that it does not care if a component's `props` have changed - as long as the parent component rendered, its children will render unconditionally.

To put this another way, calling `setState()` in the root component without any other changes, will cause React to re-render every single component in the component tree. Most likely, most of the components will return the exact same render output as the last render, meaning React will not have to make any changes to the DOM, but the rendering and diffing calculations will be performed regardless, taking time and effort.

## Optimization opportunities

As we've seen already, **rendering** is React's way of knowing if it needs to make changes in the DOM, but there are certain cases where work and calculations performed during the **render phase** can be a wasted effort. After all, if a component's render output is identical, there will be no DOM updates, thus the work wasn't necessary.

Render output should always be based on the current combination of `props` and `state`, so it is possible to know ahead of time if a component's render output will be the same so long as its `props` and `state` remain unchanged. This is the key observation on top of which optimizing React rendering is based, as it hinges on our code doing less work and skipping component rendering when possible.

## Optimization techniques

React offers a handful of APIs that allow us to optimize the rendering process:

- `shouldComponentUpdate` (class components): Lifecycle method, called before rendering, returning a boolean (`false` to skip rendering, `true` to proceed as usual). Logic can vary as necessary, but the most common case is checking if the component's `props` and `state` have changed.
- `React.PureComponent` (class components): Base class that implements the previously described `props` and `state` change check in its `shouldComponentUpdate` lifecycle method.
- `React.memo()` (any component): Higher-order component (HOC) that wraps any given component. It implements the same kind of functionality as `React.PureComponent`, but can also wrap function components.

All of these techniques use **shallow equality** for comparisons. Skipping rendering a component means skipping the default recursive behavior of rendering children, effectively skipping the whole subtree of components.

## Reference memoization

Passing new references as `props` to a child component doesn't usually matter, as it will re-render regardless when the parent changes. However, if you are trying to optimize a child component's rendering by checking if its `props` have changed, passing new references will cause a render. This behavior is ok if the new references are updated data, but if it's a new reference to the same callback function passed down by the parent, it's rather problematic.

This is less of an issue in class components, as they have instance methods whose references don't change, although any sort of generated callbacks passed down to a component's children can result in new references. As far as function components are concerned, React provides the `useMemo()` hook for memoizing values, and the `useCallback()` hook specifically for memoizing callbacks.

`useMemo()` and `useCallback()` can provide performance benefits but, as with any other memoization usage, it's important to think about their necessity and the net benefit they provide in the long run. A good rule of thumb is to consider using them for pure functional components that re-render often with the same `props` and/or might do heavy calculations and avoid them elsewhere.

## Performance measurement

**React Developer Tools** provide a handy **Profiler** tab that allows you to visualize and explore the rendering process of your React applications. Under this tab, you will find a settings icon which will allow you to _Highlight updates when components render_, as well as _Record why each component rendered while profiling_ - I highly suggest ticking both of them. Recording the initial render and re-renders of the website can provide invaluable insights about the application's bottlenecks and issues and also highlight optimization opportunities (often using one of the techniques described above).

Finally, remember that React's development builds are significantly slower than production builds, so take all the measurements you see with a grain of salt as absolute times in development are not a valuable metric. Identifying unnecessary renders, memoization and optimization opportunities, as well as potential bottlenecks is where you should focus.

## React rendering state

## Context API

React's **Context API** provides a way to pass data through the component tree without using `props`, but should not be used for state management as it requires manual updating. Any component inside a context's `Provider` can access the data in the context instance using a `Consumer` component or, for function components only, the `useContext()` hook.

When a new reference is passed to a context `Provider` it will cause any connected components to update. React will look for any components consuming the context in the component tree and update them to reflect the change in the context's value. Passing a new object to a context `Provider` is essentially a new reference, as the context holds a single value (in this case an object).

## Context optimization

By default, any update to a parent component that renders a context `Provider` will cause all of the child components to re-render regardless of changes in the context, due to React's rendering process. To avoid re-rendering child components when a parent changes, **memoization** can be used, which will cause React to skip the whole subtree of a skipped component.

When the context is updated, React additionally checks for components consuming the context down the subtree. This allows context-consuming components under a memoized parent that does not re-render to consume the updated context and render as necessary. After a context-consuming component re-renders, React will keep on recursively rendering its child components as usual.

Oftentimes, it's a good idea to memoize the component immediately under a context `Provider`. That way updates to the parent component will not cause a re-render for the whole subtree, but only the components that consume the context.

## React-Redux

React-Redux provides bindings for **Redux**, a state container for JavaScript applications, and works a little differently from React's Context API. One of the key differences is that React-Redux only re-renders components that need to render, due to the fact that components subscribed to the Redux store read the latest store state, diff the values and force re-render only if the relevant data has changed, while React is not involved at all in the subscription callback process.

While this most likely means that fewer components will have to re-render compared to using a context, React-Redux always executes its `mapStateToProps` and `useSelector` functions for every connected component in the tree whenever the store state is updated. These calculations are usually less expensive than React's rendering, but if there are costly calculations performed or new references returned when they shouldn't, it might become problematic.

## React-Redux optimization

React-Redux provides two ways of connecting to its store, performing the necessary work and returning the combined `props`:

- `connect` (any component): Higher-order component (HOC) that wraps any given component
- `useSelector` (function components): Hook called inside function components

`connect` acts a lot like memoizing a React component (i.e. using `React.PureComponent` or `React.memo()`), updating the wrapped component only when the combined `props` have changed. This means that passing new references from the parent or the passed functions will still cause a re-render. Components wrapped with `connect` usually read smaller pieces of data from the store state, are less likely to re-render due to that and usually affect fewer components down their tree.

On the other hand, `useSelector` has no way of stopping a component from rendering when its parent component renders. When exclusively using `useSelector`, larger parts of the component tree will re-render due to Redux store updates than they would with `connect`, since there aren't other components using `connect` to prevent them from doing so. You can use `React.memo()` as necessary, to optimize this behavior by preventing unnecessary re-rendering.
