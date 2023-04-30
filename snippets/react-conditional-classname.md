---
title: "Tip: React conditional className, empty strings and null"
shortTitle: Conditional className
type: tip
tags: [react,components]
cover: succulent-red-light
excerpt: In React components, you might need to conditionally apply a `className`. Learn how to handle empty values correctly using this handy tip.
dateModified: 2021-11-07T16:34:37+03:00
---

When developing React components, you often need to conditionally apply a `className` attribute to one or more elements. Sometimes, you will have two or more possible values depending on a condition. But there are also times that you might apply a `className` based on a condition or leave it completely empty otherwise.

There is a correct way to handle a conditional empty `className` and an incorrect one. Surprisingly, the incorrect way is pretty common and examples of it can be found all around the web. Consider the following code:

```jsx
const MyComponent = ({ enabled }) => {
  return ( <div className={enabled ? 'enabled' : ''}> Hi </div> );
};

const OtherComponent = ({ enabled }) => {
  return ( <div className={enabled ? 'enabled' : null}> Hi </div> );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <MyComponent enabled={false} />
    <OtherComponent enabled={false} />
  </>
);
```

In this code example, we define two very similar components. Both of them conditionally set the `className` of an element based on the value of the `enabled` prop. The first one will set the `className` to an empty string if `enabled` is `false` and the second one will set it to `null`.

The resulting output is pretty similar. However, if you carefully inspect the HTML, you will notice that the first one will render `<div class>Hi</div>` whereas the second one will render `<div>Hi</div>`. This kind of markup (an attribute being present but without value) is rather uncommon and you'd rarely ever see something like that without React. This subtle difference is quite important and might be the root of a lot of problems, especially when writing CSS selectors for elements with/without any classes (e.g. `[class]`/`:not([class])`).

Therefore, you should prefer `null` when you don't want to add a `className` to an element, instead of an empty string. It keeps the markup cleaner and might help prevent some potential issues.
