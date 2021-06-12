---
title: Breaking React - a common pattern to avoid
type: story
tags: react,debugging
authors: chalarangelo
cover: blog_images/broken-screen.jpg
excerpt: As powerful as React is, it is also quite fragile at places. Did you know that just a few lines are more than enough to break your entire React application?
---

I am by no means an expert React engineer, but I have a couple years of experience under my belt. While React is an extremely powerful library for building user interfaces, it is also quite fragile at places. A very common bug I have encountered is caused by direct DOM manipulation in combination with React. This is not exactly an anti-pattern, but under the right circumstances it can break your entire React application and might be hard to debug.

Here's [a minimal example](https://codepen.io/chalarangelo/pen/jOEojVJ?editors=0010) of how one can reproduce this bug, before we dive into explaining the problem and how to fix it:

```jsx
const destroyElement = () =>
  document.getElementById('app').removeChild(document.getElementById('my-div'));

const App = () => {
  const [elementShown, updateElement] = React.useState(true);

  return (
    <div id='app'>
      <button onClick={() => destroyElement()}>
        Delete element via querySelector
      </button>
      <button onClick={() => updateElement(!elementShown)}>
        Update element and state
      </button>
    { elementShown ? <div id="my-div">I am the element</div> : null }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

This looks like a pretty simple React application, with a container, two buttons and a state variable. However, it will crash if you click the button that calls `destroyElement()` and then click the other button. _Why?_ you might ask. The issue here might not be immediately obvious, but if you look at your browser console you will notice the following exception:

```
Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

This might still be cryptic, so let me explain what is going on. React uses its own representation of the DOM, called a virtual DOM, in order to figure out what to render. Usually, the virtual DOM will match the current DOM structure and React will process changes in props and state, updating the virtual DOM and then sending the necessary changes to the real DOM.

However, in this case React's virtual DOM and the real DOM are different, because of `destroyElement()` removing the `#my-div` element. As a result, when React tries to update the real DOM with the changes from the virtual DOM, the `#my-div` element cannot be removed as it doesn't exist anymore. This results in the above exception being thrown and your application breaking.

This example is short and easy to resolve, by refactoring `destroyElement()` to be part of the `App` component and interact with its state, yet it showcases how fragile React can be under circumstances. Having a shared codebase, with many developers working on different things, can lead to issues like this being introduced and tracking them down can be rather tricky, which is why you might want to be very careful when directly manipulating the DOM when you use React.

**Image credit:** [Julia Joppien](https://unsplash.com/@vitreous_macula?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
