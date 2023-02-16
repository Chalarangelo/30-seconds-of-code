---
title: Breaking React - a common pattern to avoid
type: story
tags: react,debugging
author: chalarangelo
cover: broken-screen
excerpt: As powerful as React is, it is also quite fragile at places. Did you know that just a few lines are more than enough to break your entire React application?
firstSeen: 2020-01-30T12:35:19+02:00
lastUpdated: 2021-11-06T20:51:47+03:00
---

I am by no means an expert React engineer, but I have a couple years of experience under my belt. React is a powerful library for building user interfaces, but it's also quite fragile at places. A common bug I have encountered is caused by **direct DOM manipulation in combination with React**. This is sort of an anti-pattern, as it can break your entire React application under the right circumstances and it's hard to debug.

Here's [a minimal example](https://codepen.io/chalarangelo/pen/jOEojVJ?editors=0010) of how to reproduce this bug, before we dive into explaining the problem and how to fix it:

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

This is a pretty simple React application, with a container, two buttons and a state variable. The problem is it will crash if you click the button that calls `destroyElement()` and then click the other one. _Why?_ you might ask. The issue here might not be immediately obvious, but if you look at your browser console you will notice the following exception:

```
Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

This might still be cryptic, so let me explain what's going on. React uses its own representation of the DOM, called a **virtual DOM**, in order to figure out what to render. Usually, the virtual DOM will match the current DOM structure and React will process changes in props and state. It will then update the virtual DOM and then batch and send the necessary changes to the real DOM.

However, in this case React's virtual DOM and the real DOM are different, because of `destroyElement()` removing the `#my-div` element. As a result, when React tries to update the real DOM with the changes from the virtual DOM, the element cannot be removed as it doesn't exist anymore. This results in the above exception being thrown and your application breaking.

You can refactor `destroyElement()` to be part of the `App` component and interact with its state to fix the issue in this example. Regardless of the simplicity of the problem or the fix, it showcases how fragile React can be under circumstances. This is only compounded in a large codebase where many developers contribute code daily in different areas. In such a setting, issues like this can be easily introduced and tracking them down can be rather tricky. This is why I would advice you to be very careful when directly manipulating the DOM in combination with React.
