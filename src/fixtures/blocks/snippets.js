export const rawSnippets = {
  normal: {
    body:
      'Checks if the provided predicate function returns `true` for at least one element in a collection.\n\n- Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.\n- Omit the second argument, `fn`, to use `Boolean` as a default.\n\n```js\nconst any = (arr, fn = Boolean) => arr.some(fn);\n```\n\n```js\nany([0, 1, 2, 0], x => x >= 2); // true\nany([0, 0, 1, 0]); // true\n```\n',
    title: 'any',
    tags: 'array,object,beginner',
    fileName: 'any.md',
    firstSeen: '1569006619',
    lastUpdated: '1607946666',
  },
  unlisted: {
    body:
      'Checks if the provided predicate function returns `true` for at least one element in a collection.\n\n- Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.\n- Omit the second argument, `fn`, to use `Boolean` as a default.\n\n```js\nconst any = (arr, fn = Boolean) => arr.some(fn);\n```\n\n```js\nany([0, 1, 2, 0], x => x >= 2); // true\nany([0, 0, 1, 0]); // true\n```\n',
    title: 'any',
    tags: 'array,object,beginner',
    fileName: 'none.md',
    firstSeen: '1569006619',
    lastUpdated: '1607946666',
    unlisted: true,
  },
  css: {
    body:
      'Creates a list with floating headings for each section.\n\n- Use `overflow-y: auto` to allow the list container to overflow vertically.\n- Use `display: grid` on the inner container (`dl`) to create a layout with two columns.\n- Set headings (`dt`) to `grid-column: 1` and content (`dd`) to `grid-column: 2`\n- Finally, apply `position: sticky` and `top: 0.5rem` to headings to create a floating effect.\n\n```html\n<div class="container">\n  <div class="floating-stack">\n    <dl>\n      <dt>A</dt>\n      <dd>Algeria</dd>\n      <dd>Angola</dd>\n\n      <dt>B</dt>\n      <dd>Benin</dd>\n      <dd>Botswana</dd>\n      <dd>Burkina Faso</dd>\n      <dd>Burundi</dd>\n\n      <dt>C</dt>\n      <dd>Cabo Verde</dd>\n      <dd>Cameroon</dd>\n      <dd>Central African Republic</dd>\n      <dd>Chad</dd>\n      <dd>Comoros</dd>\n      <dd>Congo, Democratic Republic of the</dd>\n      <dd>Congo, Republic of the</dd>\n      <dd>Cote d\'Ivoire</dd>\n\n      <dt>D</dt>\n      <dd>Djibouti</dd>\n\n      <dt>E</dt>\n      <dd>Egypt</dd>\n      <dd>Equatorial Guinea</dd>\n      <dd>Eritrea</dd>\n      <dd>Eswatini (formerly Swaziland)</dd>\n      <dd>Ethiopia</dd>\n    </dl>\n  </div>\n</div>\n```\n\n```css\n.container {\n  display: grid;\n  place-items: center;\n  min-height: 400px;\n}\n\n.floating-stack {\n  background: #455A64;\n  color: #fff;\n  height: 80vh;\n  height: 320px;\n  border-radius: 1rem;\n  overflow-y: auto;\n}\n\n.floating-stack > dl {\n  margin: 0 0 1rem;\n  display: grid;\n  grid-template-columns: 2.5rem 1fr;\n  align-items: center;\n}\n\n.floating-stack dt {\n  position: sticky;\n  top: 0.5rem;\n  left: 0.5rem;\n  font-weight: bold;\n  background: #263238;\n  color: #cfd8dc;\n  height: 2rem;\n  width: 2rem;\n  border-radius: 50%;\n  padding: 0.25rem 1rem;\n  grid-column: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n.floating-stack dd {\n  grid-column: 2;\n  margin: 0;\n  padding: 0.75rem;\n}\n\n.floating-stack > dl:first-of-type > dd:first-of-type {\n  margin-top: 0.25rem;\n}\n```\n',
    title: 'List with floating section headings',
    tags: 'visual,advanced',
    fileName: 'floating-list-titles.md',
    firstSeen: '1569006619',
    lastUpdated: '1607946666',
  },
  blog: {
    body:
      "#### React rendering\n\n- React rendering basics (this blog post)\n- [React rendering optimization](/blog/s/react-rendering-optimization)\n- [React rendering state](/blog/s/react-rendering-state)\n\n\n### Rendering introduction\n\n**Rendering** is the process during which React moves down the component tree starting at the root, looking for all the components flagged for update, asking them to describe their desired UI structure based on the current combination of `props` and `state`. For each flagged component, React will call its `render()` method (for class components) or `FunctionComponent()` (for function components), and save the output produced after converting the JSX result into a plain JS object, using `React.createElement()`.\n\nAfter collecting the render output from the entire component tree, React will diff the new tree (the **virtual DOM**) with the current DOM tree and collect the list of changes that need to be made to the DOM to produce the desired UI structure. After this process, known as **reconciliation**, React applies all the calculated changes to the DOM.\n\n### Render and commit phases\n\nConceptually, this work is divided into two phases:\n\n- **Render phase**: rendering components, calculating changes\n- **Commit phase**: applying the changes to the DOM\n\nAfter the **commit phase** is complete, React will run `componentDidMount` and `componentDidUpdate` lifecycle methods, as well as `useLayoutEffect` and, after a short timeout, `useEffect` hooks.\n\nTwo key takeaways here are the following:\n\n- Rendering is not the same as updating the DOM\n- A component may be rendered without any visible changes\n\n### Rendering reasons\n\nAfter the initial render has completed, there are a few different things that will cause a re-render:\n\n- `this.setState()` (class components)\n- `this.forceUpdate()` (class components)\n- `useState()` setters (function components)\n- `useReducer()` dispatches (function components)\n- `ReactDOM.render()` again (on the root component)\n\n### Rendering behavior\n\nReact's default behavior is to **recursively render all child components inside of it when a parent component is rendered**. This means that it does not care if a component's `props` have changed - as long as the parent component rendered, its children will render unconditionally.\n\nTo put this another way, calling `setState()` in the root component without any other changes, will cause React to re-render every single component in the component tree. Most likely, most of the components will return the exact same render output as the last render, meaning React will not have to make any changes to the DOM, but the rendering and diffing calculations will be performed regardless, taking time and effort.\n\n[Continue on React rendering optimization](/blog/s/react-rendering-optimization)\n\n**Image credit:** [Mahdiar Mahmoodi](https://unsplash.com/@mhdr_m?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)\n",
    title: 'React rendering basics',
    type: 'story',
    tags: 'react,render',
    authors: 'chalarangelo',
    cover: 'blog_images/react-rendering.jpg',
    excerpt:
      "Take a deeper dive into React's rendering process and understand the basics behind the popular JavaScript framework.",
    fileName: 'react-rendering-basics.md',
    firstSeen: '1569006619',
    lastUpdated: '1607946666',
  },
};
