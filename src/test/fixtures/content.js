// Mocked extractor output (.content/content.json)

export const repo30blog = {
  name: '30 seconds Blog',
  dirName: '30blog',
  repoUrl: 'https://github.com/30-seconds/30-seconds-blog',
  snippetPath: 'blog_posts',
  slug: 'articles',
  isBlog: true,
  featured: true,
  biasPenaltyMultiplier: 1,
  images: {
    name: 'blog_images',
    path: 'blog_images',
  },
  splash: 'laptop-view.png',
  description:
    'The coding articles collection contains curated stories, tips, questions and answers on a wide variety of topics. The main focus of these articles revolves around the languages and technologies presented in snippets, as well as career advice and lessons.',
  shortDescription:
    'Discover dozens of programming articles, covering a wide variety of topics and technologies.',
  id: '30blog',
  language: null,
  otherLanguages: null,
  icon: 'blog',
};

export const repo30code = {
  name: '30 seconds of code',
  dirName: '30code',
  repoUrl: 'https://github.com/30-seconds/30-seconds-of-code',
  snippetPath: 'snippets',
  slug: 'js',
  featured: true,
  biasPenaltyMultiplier: 1.05,
  splash: 'laptop-plant.png',
  description:
    'The JavaScript snippet collection contains a wide variety of ES6 helper functions. It includes helpers for dealing with primitives, arrays and objects, as well as algorithms, DOM manipulation functions and Node.js utilities.',
  shortDescription:
    'Browse a wide variety of ES6 helper functions, including array operations, DOM manipulation, algorithms and Node.js utilities.',
  id: '30code',
  language: 'javascript',
  otherLanguages: null,
  icon: 'js',
};

export const repo30css = {
  name: '30 seconds of CSS',
  dirName: '30css',
  repoUrl: 'https://github.com/30-seconds/30-seconds-of-css',
  snippetPath: 'snippets',
  slug: 'css',
  featured: true,
  biasPenaltyMultiplier: 1.05,
  splash: 'camera.png',
  description:
    'The CSS snippet collection contains utilities and interactive examples for CSS3. It includes modern techniques for creating commonly-used layouts, styling and animating elements, as well as snippets for handling user interactions.',
  shortDescription:
    'A snippet collection of interactive CSS3 examples, covering layouts, styling, animation and user interactions.',
  id: '30css',
  language: 'css',
  otherLanguages: ['html', 'javascript'],
  icon: 'css',
};

export const repo30react = {
  name: '30 seconds of React',
  dirName: '30react',
  repoUrl: 'https://github.com/30-seconds/30-seconds-of-react',
  snippetPath: 'snippets',
  slug: 'react',
  featured: true,
  biasPenaltyMultiplier: 1.25,
  splash: 'succulent-cluster.png',
  description:
    'The React snippet collection contains function components and reusable hooks for React 16.',
  shortDescription:
    'Discover function components and reusable hooks for React 16.',
  id: '30react',
  language: 'react',
  otherLanguages: ['css'],
  icon: 'react',
};

export const repositories = [repo30blog, repo30code, repo30css, repo30react];

export const staticCollection = {
  slug: 'c/react-rendering',
  name: 'React Rendering',
  featured: true,
  splash: 'glasses-comic.png',
  description:
    'Understanding of the rendering process is a crucial piece of knowledge when creating web applications with React. Take a deep dive into the fundamentals and core concepts as well as more advanced techniques with this series of articles.',
  shortDescription:
    "Understand the fundamentals of React's rendering process as well as more advanced techniques with this series of articles.",
  snippetIds: [
    'articles/s/react-rendering-basics',
    'articles/s/react-rendering-optimization',
    'react/s/use-interval',
  ],
  id: 'react-rendering',
  icon: 'react',
};

export const dynamicCollection = {
  slug: 'c/tips',
  name: 'Tips & Tricks',
  featured: true,
  typeMatcher: 'blog.tip',
  splash: 'laptop-plant.png',
  description:
    'Finding ways to improve and optimize your code takes a lot of time, research and energy. Level up your coding skills one step at a time with this collection of quick tips and tricks.',
  shortDescription:
    'A collection of quick tips and tricks to level up your coding skills one step at a time.',
  snippetIds: [],
  id: 'tips',
  icon: 'blog',
};

export const collections = [staticCollection, dynamicCollection];

// React rendering: [0, 1]
// Tips & Tricks: [2]
// CSS: [3]
// JavaScript: [4]
// Node.js: [5]
// Regular: [6]
export const blogSnippets = [
  {
    id: 'articles/s/react-rendering-basics',
    fileName: 'react-rendering-basics.md',
    title: 'React rendering basics',
    tags: ['react', 'render'],
    firstSeen: '2020-06-16T17:41:02.000Z',
    lastUpdated: '2021-06-12T16:30:41.000Z',
    listed: true,
    type: 'blog.story',
    text: {
      full:
        "#### React rendering\n\n- React rendering basics (this blog post)\n- [React rendering optimization](/blog/s/react-rendering-optimization)\n- [React rendering state](/blog/s/react-rendering-state)\n\n\n### Rendering introduction\n\n**Rendering** is the process during which React moves down the component tree starting at the root, looking for all the components flagged for update, asking them to describe their desired UI structure based on the current combination of `props` and `state`. For each flagged component, React will call its `render()` method (for class components) or `FunctionComponent()` (for function components), and save the output produced after converting the JSX result into a plain JS object, using `React.createElement()`.\n\nAfter collecting the render output from the entire component tree, React will diff the new tree (the **virtual DOM**) with the current DOM tree and collect the list of changes that need to be made to the DOM to produce the desired UI structure. After this process, known as **reconciliation**, React applies all the calculated changes to the DOM.\n\n### Render and commit phases\n\nConceptually, this work is divided into two phases:\n\n- **Render phase**: rendering components, calculating changes\n- **Commit phase**: applying the changes to the DOM\n\nAfter the **commit phase** is complete, React will run `componentDidMount` and `componentDidUpdate` lifecycle methods, as well as `useLayoutEffect` and, after a short timeout, `useEffect` hooks.\n\nTwo key takeaways here are the following:\n\n- Rendering is not the same as updating the DOM\n- A component may be rendered without any visible changes\n\n### Rendering reasons\n\nAfter the initial render has completed, there are a few different things that will cause a re-render:\n\n- `this.setState()` (class components)\n- `this.forceUpdate()` (class components)\n- `useState()` setters (function components)\n- `useReducer()` dispatches (function components)\n- `ReactDOM.render()` again (on the root component)\n\n### Rendering behavior\n\nReact's default behavior is to **recursively render all child components inside of it when a parent component is rendered**. This means that it does not care if a component's `props` have changed - as long as the parent component rendered, its children will render unconditionally.\n\nTo put this another way, calling `setState()` in the root component without any other changes, will cause React to re-render every single component in the component tree. Most likely, most of the components will return the exact same render output as the last render, meaning React will not have to make any changes to the DOM, but the rendering and diffing calculations will be performed regardless, taking time and effort.\n\n[Continue on React rendering optimization](/blog/s/react-rendering-optimization)\n",
      short:
        "Take a deeper dive into React's rendering process and understand the basics behind the popular JavaScript framework.",
    },
    html: {
      fullDescription:
        '<h4 class="card-body-title txt-150 fs-md md:fs-lg f-alt">React rendering</h4>\n<ul>\n<li>React rendering basics (this blog post)</li>\n<li><a href="/blog/s/react-rendering-optimization">React rendering optimization</a></li>\n<li><a href="/blog/s/react-rendering-state">React rendering state</a></li>\n</ul>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Rendering introduction</h3>\n<p><strong>Rendering</strong> is the process during which React moves down the component tree starting at the root, looking for all the components flagged for update, asking them to describe their desired UI structure based on the current combination of <code class="notranslate">props</code> and <code class="notranslate">state</code>. For each flagged component, React will call its <code class="notranslate">render()</code> method (for class components) or <code class="notranslate">FunctionComponent()</code> (for function components), and save the output produced after converting the JSX result into a plain JS object, using <code class="notranslate">React.createElement()</code>.</p>\n<p>After collecting the render output from the entire component tree, React will diff the new tree (the <strong>virtual DOM</strong>) with the current DOM tree and collect the list of changes that need to be made to the DOM to produce the desired UI structure. After this process, known as <strong>reconciliation</strong>, React applies all the calculated changes to the DOM.</p>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Render and commit phases</h3>\n<p>Conceptually, this work is divided into two phases:</p>\n<ul>\n<li><strong>Render phase</strong>: rendering components, calculating changes</li>\n<li><strong>Commit phase</strong>: applying the changes to the DOM</li>\n</ul>\n<p>After the <strong>commit phase</strong> is complete, React will run <code class="notranslate">componentDidMount</code> and <code class="notranslate">componentDidUpdate</code> lifecycle methods, as well as <code class="notranslate">useLayoutEffect</code> and, after a short timeout, <code class="notranslate">useEffect</code> hooks.</p>\n<p>Two key takeaways here are the following:</p>\n<ul>\n<li>Rendering is not the same as updating the DOM</li>\n<li>A component may be rendered without any visible changes</li>\n</ul>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Rendering reasons</h3>\n<p>After the initial render has completed, there are a few different things that will cause a re-render:</p>\n<ul>\n<li><code class="notranslate">this.setState()</code> (class components)</li>\n<li><code class="notranslate">this.forceUpdate()</code> (class components)</li>\n<li><code class="notranslate">useState()</code> setters (function components)</li>\n<li><code class="notranslate">useReducer()</code> dispatches (function components)</li>\n<li><code class="notranslate">ReactDOM.render()</code> again (on the root component)</li>\n</ul>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Rendering behavior</h3>\n<p>React\'s default behavior is to <strong>recursively render all child components inside of it when a parent component is rendered</strong>. This means that it does not care if a component\'s <code class="notranslate">props</code> have changed - as long as the parent component rendered, its children will render unconditionally.</p>\n<p>To put this another way, calling <code class="notranslate">setState()</code> in the root component without any other changes, will cause React to re-render every single component in the component tree. Most likely, most of the components will return the exact same render output as the last render, meaning React will not have to make any changes to the DOM, but the rendering and diffing calculations will be performed regardless, taking time and effort.</p>\n<p><a href="/blog/s/react-rendering-optimization">Continue on React rendering optimization</a></p>',
      description:
        "<p>Take a deeper dive into React's rendering process and understand the basics behind the popular JavaScript framework.</p>",
    },
    code: {},
    cover: 'blog_images/comic-glasses.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      "Take a deeper dive into React's rendering process and understand the basics behind the popular JavaScript framework.",
    repository: '30blog',
  },
  {
    id: 'articles/s/react-rendering-optimization',
    fileName: 'react-rendering-optimization.md',
    title: 'React rendering optimization',
    tags: ['react', 'render'],
    firstSeen: '2020-06-16T17:41:02.000Z',
    lastUpdated: '2021-06-12T16:30:41.000Z',
    listed: true,
    type: 'blog.story',
    text: {
      full:
        "#### React rendering\n\n- [React rendering basics](/blog/s/react-rendering-basics)\n- React rendering optimization (this blog post)\n- [React rendering state](/blog/s/react-rendering-state)\n\n### Optimization opportunities\n\nAs we've seen in the [previous blog post](/blog/s/react-rendering-basics), **rendering** is React's way of knowing if it needs to make changes in the DOM, but there are certain cases where work and calculations performed during the **render phase** can be a wasted effort. After all, if a component's render output is identical, there will be no DOM updates, thus the work wasn't necessary.\n\nRender output should always be based on the current combination of `props` and `state`, so it is possible to know ahead of time if a component's render output will be the same so long as its `props` and `state` remain unchanged. This is the key observation on top of which optimizing React rendering is based, as it hinges on our code doing less work and skipping component rendering when possible.\n\n### Optimization techniques\n\nReact offers a handful of APIs that allow us to optimize the rendering process:\n\n- `shouldComponentUpdate` (class components): Lifecycle method, called before rendering, returning a boolean (`false` to skip rendering, `true` to proceed as usual). Logic can vary as necessary, but the most common case is checking if the component's `props` and `state` have changed.\n- `React.PureComponent` (class components): Base class that implements the previously described `props` and `state` change check in its `shouldComponentUpdate` lifecycle method.\n- `React.memo()` (any component): Higher-order component (HOC) that wraps any given component. It implements the same kind of functionality as `React.PureComponent`, but can also wrap function components.\n\nAll of these techniques use **shallow equality** for comparisons. Skipping rendering a component means skipping the default recursive behavior of rendering children, effectively skipping the whole subtree of components.\n\n### Reference memoization\n\nPassing new references as `props` to a child component doesn't usually matter, as it will re-render regardless when the parent changes. However, if you are trying to optimize a child component's rendering by checking if its `props` have changed, passing new references will cause a render. This behavior is ok if the new references are updated data, but if it's a new reference to the same callback function passed down by the parent, it's rather problematic.\n\nThis is less of an issue in class components, as they have instance methods whose references don't change, although any sort of generated callbacks passed down to a component's children can result in new references. As far as function components are concerned, React provides the `useMemo` hook for memoizing values, and the `useCallback` hook specifically for memoizing callbacks.\n\n`useMemo` and `useCallback` can provide performance benefits but, as with any other memoization usage, it's important to think about their necessity and the net benefit they provide in the long run. A good rule of thumb is to consider using them for pure functional components that re-render often with the same `props` and/or might do heavy calculations and avoid them elsewhere.\n\n### Performance measurement\n\n**React Developer Tools** provide a handy **Profiler** tab that allows you to visualize and explore the rendering process of your React applications. Under this tab, you will find a settings icon which will allow you to _Highlight updates when components render_, as well as _Record why each component rendered while profiling_ - I highly suggest ticking both of them. Recording the initial render and re-renders of the website can provide invaluable insights about the application's bottlenecks and issues and also highlight optimization opportunities (often using one of the techniques described above).\n\nFinally, remember that React's development builds are significantly slower than production builds, so take all the measurements you see with a grain of salt as absolute times in development are not a valuable metric. Identifying unnecessary renders, memoization and optimization opportunities, as well as potential bottlenecks is where you should focus.\n\n[Continue on React rendering state](/blog/s/react-rendering-state)\n",
      short:
        "Take a deeper dive into React's rendering process and understand how to make small yet powerful tweaks to optimize performance.",
    },
    html: {
      fullDescription:
        '<h4 class="card-body-title txt-150 fs-md md:fs-lg f-alt">React rendering</h4>\n<ul>\n<li><a href="/blog/s/react-rendering-basics">React rendering basics</a></li>\n<li>React rendering optimization (this blog post)</li>\n<li><a href="/blog/s/react-rendering-state">React rendering state</a></li>\n</ul>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Optimization opportunities</h3>\n<p>As we\'ve seen in the <a href="/blog/s/react-rendering-basics">previous blog post</a>, <strong>rendering</strong> is React\'s way of knowing if it needs to make changes in the DOM, but there are certain cases where work and calculations performed during the <strong>render phase</strong> can be a wasted effort. After all, if a component\'s render output is identical, there will be no DOM updates, thus the work wasn\'t necessary.</p>\n<p>Render output should always be based on the current combination of <code class="notranslate">props</code> and <code class="notranslate">state</code>, so it is possible to know ahead of time if a component\'s render output will be the same so long as its <code class="notranslate">props</code> and <code class="notranslate">state</code> remain unchanged. This is the key observation on top of which optimizing React rendering is based, as it hinges on our code doing less work and skipping component rendering when possible.</p>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Optimization techniques</h3>\n<p>React offers a handful of APIs that allow us to optimize the rendering process:</p>\n<ul>\n<li><code class="notranslate">shouldComponentUpdate</code> (class components): Lifecycle method, called before rendering, returning a boolean (<code class="notranslate">false</code> to skip rendering, <code class="notranslate">true</code> to proceed as usual). Logic can vary as necessary, but the most common case is checking if the component\'s <code class="notranslate">props</code> and <code class="notranslate">state</code> have changed.</li>\n<li><code class="notranslate">React.PureComponent</code> (class components): Base class that implements the previously described <code class="notranslate">props</code> and <code class="notranslate">state</code> change check in its <code class="notranslate">shouldComponentUpdate</code> lifecycle method.</li>\n<li><code class="notranslate">React.memo()</code> (any component): Higher-order component (HOC) that wraps any given component. It implements the same kind of functionality as <code class="notranslate">React.PureComponent</code>, but can also wrap function components.</li>\n</ul>\n<p>All of these techniques use <strong>shallow equality</strong> for comparisons. Skipping rendering a component means skipping the default recursive behavior of rendering children, effectively skipping the whole subtree of components.</p>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Reference memoization</h3>\n<p>Passing new references as <code class="notranslate">props</code> to a child component doesn\'t usually matter, as it will re-render regardless when the parent changes. However, if you are trying to optimize a child component\'s rendering by checking if its <code class="notranslate">props</code> have changed, passing new references will cause a render. This behavior is ok if the new references are updated data, but if it\'s a new reference to the same callback function passed down by the parent, it\'s rather problematic.</p>\n<p>This is less of an issue in class components, as they have instance methods whose references don\'t change, although any sort of generated callbacks passed down to a component\'s children can result in new references. As far as function components are concerned, React provides the <code class="notranslate">useMemo</code> hook for memoizing values, and the <code class="notranslate">useCallback</code> hook specifically for memoizing callbacks.</p>\n<p><code class="notranslate">useMemo</code> and <code class="notranslate">useCallback</code> can provide performance benefits but, as with any other memoization usage, it\'s important to think about their necessity and the net benefit they provide in the long run. A good rule of thumb is to consider using them for pure functional components that re-render often with the same <code class="notranslate">props</code> and/or might do heavy calculations and avoid them elsewhere.</p>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Performance measurement</h3>\n<p><strong>React Developer Tools</strong> provide a handy <strong>Profiler</strong> tab that allows you to visualize and explore the rendering process of your React applications. Under this tab, you will find a settings icon which will allow you to <em>Highlight updates when components render</em>, as well as <em>Record why each component rendered while profiling</em> - I highly suggest ticking both of them. Recording the initial render and re-renders of the website can provide invaluable insights about the application\'s bottlenecks and issues and also highlight optimization opportunities (often using one of the techniques described above).</p>\n<p>Finally, remember that React\'s development builds are significantly slower than production builds, so take all the measurements you see with a grain of salt as absolute times in development are not a valuable metric. Identifying unnecessary renders, memoization and optimization opportunities, as well as potential bottlenecks is where you should focus.</p>\n<p><a href="/blog/s/react-rendering-state">Continue on React rendering state</a></p>',
      description:
        "<p>Take a deeper dive into React's rendering process and understand how to make small yet powerful tweaks to optimize performance.</p>",
    },
    code: {},
    cover: 'blog_images/comic-glasses.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      "Take a deeper dive into React's rendering process and understand how to make small yet powerful tweaks to optimize performance.",
    repository: '30blog',
  },
  {
    id: 'articles/s/react-use-state-with-label',
    fileName: 'react-use-state-with-label.md',
    title: 'Tip: Label your useState values in React developer tools',
    tags: ['react', 'hooks'],
    firstSeen: '2021-05-06T09:00:00.000Z',
    lastUpdated: '2021-11-07T13:34:37.000Z',
    listed: true,
    type: 'blog.tip',
    text: {
      full:
        "When working with multiple `useState` hooks in React, things can get a bit complicated while debugging. Luckily, there's an easy way to label these values, using the [`useDebugValue`](https://reactjs.org/docs/hooks-reference.html#usedebugvalue) hook to create a custom `useStateWithLabel` hook:\n\n```jsx\nconst useStateWithLabel = (initialValue, label) => {\n  const [value, setValue] = useState(initialValue);\n  useDebugValue(`${label}: ${value}`);\n  return [value, setValue];\n};\n\nconst Counter = () => {\n  const [value, setValue] = useStateWithLabel(0, 'counter');\n  return (\n    <p>{value}</p>\n  );\n};\n\nReactDOM.render(<Counter />, document.getElementById('root'));\n// Inspecting `Counter` in React developer tools will display:\n//  StateWithLabel: \"counter: 0\"\n```\n\nThis hook is obviously meant mainly for development, but it can also be useful when creating React component or hook libraries. Additionally, you can easily abstract it in a way that the label is ignored in production builds. An example would be exporting a hook that defaults back to `useState` when building for a production environment.\n",
      short:
        "When working with multiple `useState` hooks in React, things can get a bit complicated while debugging. Luckily, there's an easy way to label these values.",
    },
    html: {
      fullDescription:
        '<p>When working with multiple <code class="notranslate">useState</code> hooks in React, things can get a bit complicated while debugging. Luckily, there\'s an easy way to label these values, using the <a target="_blank" rel="nofollow noopener noreferrer" href="https://reactjs.org/docs/hooks-reference.html#usedebugvalue"><code class="notranslate">useDebugValue</code></a> hook to create a custom <code class="notranslate">useStateWithLabel</code> hook:</p>\n<div class="code-highlight" data-language="jsx"><pre class="language-jsx notranslate mt-4 mb-0 mx-0" data-code-language=""><span class="token keyword">const</span> <span class="token function-variable function">useStateWithLabel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">initialValue<span class="token punctuation">,</span> label</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> setValue<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">useDebugValue</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>label<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> setValue<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Counter</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> setValue<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useStateWithLabel</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">\'counter\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>value<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Counter</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> <span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// Inspecting `Counter` in React developer tools will display:</span>\n<span class="token comment">//  StateWithLabel: "counter: 0"</span></pre></div>\n<p>This hook is obviously meant mainly for development, but it can also be useful when creating React component or hook libraries. Additionally, you can easily abstract it in a way that the label is ignored in production builds. An example would be exporting a hook that defaults back to <code class="notranslate">useState</code> when building for a production environment.</p>',
      description:
        '<p>When working with multiple <code class="notranslate">useState</code> hooks in React, things can get a bit complicated while debugging. Luckily, there\'s an easy way to label these values.</p>',
    },
    code: {},
    cover: 'blog_images/bunny-poster.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      "When working with multiple useState hooks in React, things can get a bit complicated while debugging. Luckily, there's an easy way to label these values.",
    repository: '30blog',
  },
  {
    id: 'articles/s/responsive-favicon-dark-mode',
    fileName: 'responsive-favicon-dark-mode.md',
    title: 'How can I create a custom responsive favicon for dark mode?',
    tags: ['css', 'visual'],
    firstSeen: '2020-11-27T11:25:30.000Z',
    lastUpdated: '2021-09-28T16:40:01.000Z',
    listed: true,
    type: 'blog.question',
    text: {
      full:
        'The rise of dark mode in recent years has made many website favicons feel awkward or even impossible to see in some cases. Provided you have the appropriate assets, it\'s relatively easy to create a responsive favicon that can adapt to the user\'s color scheme preferences.\n\nIn order to create a responsive favicon, you need an SVG icon with as few colors as possible and two color palettes, one for light mode and one for dark mode. Usual rules about icon clarity and complexity apply, so make sure your icon meets all the necessary criteria to be visually distinguishable in any scenario. In our example, we will be using a monochrome icon from the fantastic [Feather icon set](https://feathericons.com/).\n\nLeveraging embedded styles in SVG images and the `prefers-color-scheme` media query, we can create an appropriate `<g>` element to group all the elements of the icon. Then, using the `id` of the group, we can apply the color palette for each design. Here\'s what our final SVG asset looks like:\n\n```html\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n  <style>\n    #icon {\n      stroke: #000;\n      stroke-width: 2px;\n      stroke-linecap: round;\n      stroke-linejoin: round;\n      fill: none;\n    }\n\n    @media (prefers-color-scheme: dark) {\n      #icon {\n        stroke: #fff;\n      }\n    }\n  </style>\n  <g id="icon">\n    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>\n    <line x1="3" y1="6" x2="21" y2="6"></line>\n    <path d="M16 10a4 4 0 0 1-8 0"></path>\n  </g>\n</svg>\n```\n\nAfter creating the SVG asset, you need only include the custom SVG favicon in the page\'s `<head>` element and you\'re ready to go. Be sure to include a PNG fallback, if possible, with a rendered version of the icon in either palette:\n\n```html\n<head>\n  <!-- Provided you have a rendered PNG fallback named favicon.png -->\n  <link rel="icon" type="image/png" href="favicon.png" >\n  <!-- Provided the SVG icon is named favicon.svg -->\n  <link rel="icon" type="image/svg" href="favicon.svg" >\n</head>\n```\n',
      short:
        'Learn how to create a custom responsive favicon that can adapt its color palette for dark mode with this quick guide.',
    },
    html: {
      fullDescription:
        '<p>The rise of dark mode in recent years has made many website favicons feel awkward or even impossible to see in some cases. Provided you have the appropriate assets, it\'s relatively easy to create a responsive favicon that can adapt to the user\'s color scheme preferences.</p>\n<p>In order to create a responsive favicon, you need an SVG icon with as few colors as possible and two color palettes, one for light mode and one for dark mode. Usual rules about icon clarity and complexity apply, so make sure your icon meets all the necessary criteria to be visually distinguishable in any scenario. In our example, we will be using a monochrome icon from the fantastic <a target="_blank" rel="nofollow noopener noreferrer" href="https://feathericons.com/">Feather icon set</a>.</p>\n<p>Leveraging embedded styles in SVG images and the <code class="notranslate">prefers-color-scheme</code> media query, we can create an appropriate <code class="notranslate">&lt;g&gt;</code> element to group all the elements of the icon. Then, using the <code class="notranslate">id</code> of the group, we can apply the color palette for each design. Here\'s what our final SVG asset looks like:</p>\n<div class="code-highlight" data-language="html"><pre class="language-html notranslate mt-4 mb-0 mx-0" data-code-language=""><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>24<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>24<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">\n    <span class="token selector"><span class="token id">#icon</span></span> <span class="token punctuation">{</span>\n      <span class="token property">stroke</span><span class="token punctuation">:</span> <span class="token hexcode color">#000</span><span class="token punctuation">;</span>\n      <span class="token property">stroke-width</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token unit">px</span><span class="token punctuation">;</span>\n      <span class="token property">stroke-linecap</span><span class="token punctuation">:</span> round<span class="token punctuation">;</span>\n      <span class="token property">stroke-linejoin</span><span class="token punctuation">:</span> round<span class="token punctuation">;</span>\n      <span class="token property">fill</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">prefers-color-scheme</span><span class="token punctuation">:</span> dark<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>\n      <span class="token selector"><span class="token id">#icon</span></span> <span class="token punctuation">{</span>\n        <span class="token property">stroke</span><span class="token punctuation">:</span> <span class="token hexcode color">#fff</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>g</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>line</span> <span class="token attr-name">x1</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span> <span class="token attr-name">y1</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>6<span class="token punctuation">"</span></span> <span class="token attr-name">x2</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>21<span class="token punctuation">"</span></span> <span class="token attr-name">y2</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>6<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>line</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M16 10a4 4 0 0 1-8 0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>g</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span></pre></div>\n<p>After creating the SVG asset, you need only include the custom SVG favicon in the page\'s <code class="notranslate">&lt;head&gt;</code> element and you\'re ready to go. Be sure to include a PNG fallback, if possible, with a rendered version of the icon in either palette:</p>\n<div class="code-highlight" data-language="html"><pre class="language-html notranslate mt-4 mb-0 mx-0" data-code-language=""><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>\n  <span class="token comment">&lt;!-- Provided you have a rendered PNG fallback named favicon.png --></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/png<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>favicon.png<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>\n  <span class="token comment">&lt;!-- Provided the SVG icon is named favicon.svg --></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/svg<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>favicon.svg<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span></pre></div>',
      description:
        '<p>Learn how to create a custom responsive favicon that can adapt its color palette for dark mode with this quick guide.</p>',
    },
    code: {},
    cover: 'blog_images/dark-mode.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      'Learn how to create a custom responsive favicon that can adapt its color palette for dark mode with this quick guide.',
    repository: '30blog',
  },
  {
    id: 'articles/s/js-callbacks',
    fileName: 'js-callbacks.md',
    title: 'What is a callback function?',
    tags: ['javascript', 'function'],
    firstSeen: '2021-10-03T09:00:00.000Z',
    lastUpdated: '2021-10-03T09:00:00.000Z',
    listed: true,
    type: 'blog.question',
    text: {
      full:
        "A callback function is a function passed as an argument to another function, which is then invoked inside the outer function. Callback functions are often executed once an event has occurred or a task has completed.\n\n### Synchronous callbacks\n\nA synchronous callback is a callback function that is executed immediately. The function passed as the first argument to `Array.prototype.map()` is a great example of a synchronous callback:\n\n```js\nconst nums = [1, 2, 3];\nconst printDoublePlusOne = n => console.log(2 * n + 1);\n\nnums.map(printDoublePlusOne); // LOGS: 3, 5, 7\n```\n\n### Asynchronous callbacks\n\nAn asynchronous callback is a callback function that is used to execute code after an asynchronous operation has completed. The function executed inside `Promise.prototype.then()` is a great example of an asynchronous callback:\n\n```js\nconst nums = fetch('https://api.nums.org'); // Suppose the response is [1, 2, 3]\nconst printDoublePlusOne = n => console.log(2 * n + 1);\n\nnums.then(printDoublePlusOne); // LOGS: 3, 5, 7\n```\n",
      short:
        'JavaScript uses callback functions in various places for different purposes. From event listeners to asynchronous operations, they are an invaluable tool you need to master.',
    },
    html: {
      fullDescription:
        '<p>A callback function is a function passed as an argument to another function, which is then invoked inside the outer function. Callback functions are often executed once an event has occurred or a task has completed.</p>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Synchronous callbacks</h3>\n<p>A synchronous callback is a callback function that is executed immediately. The function passed as the first argument to <code class="notranslate">Array.prototype.map()</code> is a great example of a synchronous callback:</p>\n<div class="code-highlight" data-language="js"><pre class="language-js notranslate mt-4 mb-0 mx-0" data-code-language=""><span class="token keyword">const</span> nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">printDoublePlusOne</span> <span class="token operator">=</span> <span class="token parameter">n</span> <span class="token arrow operator">=></span> <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nnums<span class="token punctuation">.</span><span class="token method function property-access">map</span><span class="token punctuation">(</span>printDoublePlusOne<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// LOGS: 3, 5, 7</span></pre></div>\n<h3 class="card-body-title txt-150 fs-lg md:fs-xl f-alt">Asynchronous callbacks</h3>\n<p>An asynchronous callback is a callback function that is used to execute code after an asynchronous operation has completed. The function executed inside <code class="notranslate">Promise.prototype.then()</code> is a great example of an asynchronous callback:</p>\n<div class="code-highlight" data-language="js"><pre class="language-js notranslate mt-4 mb-0 mx-0" data-code-language=""><span class="token keyword">const</span> nums <span class="token operator">=</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'https://api.nums.org\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Suppose the response is [1, 2, 3]</span>\n<span class="token keyword">const</span> <span class="token function-variable function">printDoublePlusOne</span> <span class="token operator">=</span> <span class="token parameter">n</span> <span class="token arrow operator">=></span> <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nnums<span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>printDoublePlusOne<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// LOGS: 3, 5, 7</span></pre></div>',
      description:
        '<p>JavaScript uses callback functions in various places for different purposes. From event listeners to asynchronous operations, they are an invaluable tool you need to master.</p>',
    },
    code: {},
    cover: 'blog_images/rabbit-call.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      'JavaScript uses callback functions in various places for different purposes. From event listeners to asynchronous operations, they are an invaluable tool you need to master.',
    repository: '30blog',
  },
  {
    id: 'articles/s/nodejs-chrome-debugging',
    fileName: 'nodejs-chrome-debugging.md',
    title: 'Tip: Debugging Node.js using Chrome Developer Tools',
    tags: ['javascript', 'node', 'debugging'],
    firstSeen: '2020-07-15T13:10:13.000Z',
    lastUpdated: '2021-06-12T16:30:41.000Z',
    listed: true,
    type: 'blog.story',
    text: {
      full:
        "Node.js can be debugged using Chrome Developer Tools since `v6.3.0`. Here's a quick guide on how to do this:\n\n1. Download and install Node.js `v6.3.0` or newer, if you don't already have it installed on your machine.\n2. Run node with the `--inspect-brk` flag (e.g. `node --inspect-brk index.js`).\n3. Open `about:inspect` in a new tab in Chrome. You should see something like the screenshot below.\n4. Click `Open dedicated DevTools for Node` to open a new window connected to your Node.js instance.\n5. Use the Developer Tools to debug your Node.js application!\n\n![about:inspect page](./blog_images/chrome-debug-node.png)\n",
      short:
        'Did you know you can use Chrome Developer Tools to debug your Node.js code? Find out how in this short guide.',
    },
    html: {
      fullDescription:
        '<p>Node.js can be debugged using Chrome Developer Tools since <code class="notranslate">v6.3.0</code>. Here\'s a quick guide on how to do this:</p>\n<ol>\n<li>Download and install Node.js <code class="notranslate">v6.3.0</code> or newer, if you don\'t already have it installed on your machine.</li>\n<li>Run node with the <code class="notranslate">--inspect-brk</code> flag (e.g. <code class="notranslate">node --inspect-brk index.js</code>).</li>\n<li>Open <code class="notranslate">about:inspect</code> in a new tab in Chrome. You should see something like the screenshot below.</li>\n<li>Click <code class="notranslate">Open dedicated DevTools for Node</code> to open a new window connected to your Node.js instance.</li>\n<li>Use the Developer Tools to debug your Node.js application!</li>\n</ol>\n<picture>\n            <source type="image/webp" srcset="/assets/blog_images/chrome-debug-node.webp">\n            <img class="card-fw-section" src="/assets/blog_images/chrome-debug-node.png" alt="about:inspect page">\n          </picture>',
      description:
        '<p>Did you know you can use Chrome Developer Tools to debug your Node.js code? Find out how in this short guide.</p>',
    },
    code: {},
    cover: 'blog_images/bug.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      'Did you know you can use Chrome Developer Tools to debug your Node.js code? Find out how in this short guide.',
    repository: '30blog',
  },
  {
    id: 'articles/s/10-vs-code-extensions-for-js-developers',
    fileName: '10-vs-code-extensions-for-js-developers.md',
    title: '10 must-have VS Code extensions for JavaScript developers',
    tags: ['devtools', 'vscode'],
    firstSeen: '2019-12-23T08:41:56.000Z',
    lastUpdated: '2021-06-12T16:30:41.000Z',
    listed: true,
    type: 'blog.list',
    text: {
      full:
        "Developers will most likely argue for the rest of eternity about the most productive code editor and the best extensions. Here are my personal extension preferences for VS Code as a JavaScript developer:\n\n1. ESLint\n[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) turns the popular JavaScript linter into an extension of VS Code. It automatically reads your linting configuration, identifies problems and even fixes them for you, if you want.\n\n2.  GitLens\n[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) is a very powerful collaboration tool for VS Code. It provides many useful tools for git such as blame, code authorship, activity heatmaps, recent changes, file history and even commit search.\n\n3. Debugger for Chrome\n[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) allows you to debug your JavaScript code in Chrome or Chromium. Breakpoints, call stack inspection and stepping inside a function are only some of its features.\n\n4. Bracket Pair Colorizer 2\n[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) makes reading code faster as it makes matching brackets the same color. This extension for VS Code improves upon its predecessor by providing improved performance.\n\n5. Bookmarks\n[Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) is one of those extensions that will significantly reduce your time jumping between different files, as it allows you to save important positions and navigate back to them easily and quickly.\n\n6. TODO Highlight\n[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) simplifies tracking leftover tasks by allowing you to list all of your TODO annotations, as well as adding a handy background highlight to them to make them pop out immediately.\n\n7. Live Server\n[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) gives you an easy way to serve web pages from VS Code, making previewing and debugging a lot easier. One of the core features is the live reload support that many developers are used to.\n\n8. REST Client\n[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) allows you to send HTTP requests and view the responses directly in VS Code. This extension supports a wide range of formats and authorization and should work with most setups.\n\n9. One Dark Pro\n[One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) is one of the most popular VS Code themes and with very good reason. It provides a clean theme with a nice palette that has great contrast and is very comfortable to use on a daily basis.\n\n10. Fira Code\n[Fira Code](https://github.com/tonsky/FiraCode) is not a traditional VS Code extension and might take a couple more steps to set up, but it's a superb programming font with ligatures that will help you scan code faster once you get used to it.\n",
      short:
        'VS Code is steadily gaining popularity among developers. Here are 10 essential extensions for JavaScript developers that aim to increase your productivity.',
    },
    html: {
      fullDescription:
        '<p>Developers will most likely argue for the rest of eternity about the most productive code editor and the best extensions. Here are my personal extension preferences for VS Code as a JavaScript developer:</p>\n<ol class="blog-list">\n<li>ESLint</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a> turns the popular JavaScript linter into an extension of VS Code. It automatically reads your linting configuration, identifies problems and even fixes them for you, if you want.</p>\n<ol start="2">\n<li>GitLens</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens">GitLens</a> is a very powerful collaboration tool for VS Code. It provides many useful tools for git such as blame, code authorship, activity heatmaps, recent changes, file history and even commit search.</p>\n<ol start="3">\n<li>Debugger for Chrome</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome">Debugger for Chrome</a> allows you to debug your JavaScript code in Chrome or Chromium. Breakpoints, call stack inspection and stepping inside a function are only some of its features.</p>\n<ol start="4">\n<li>Bracket Pair Colorizer 2</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2">Bracket Pair Colorizer 2</a> makes reading code faster as it makes matching brackets the same color. This extension for VS Code improves upon its predecessor by providing improved performance.</p>\n<ol start="5">\n<li>Bookmarks</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks">Bookmarks</a> is one of those extensions that will significantly reduce your time jumping between different files, as it allows you to save important positions and navigate back to them easily and quickly.</p>\n<ol start="6">\n<li>TODO Highlight</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight">TODO Highlight</a> simplifies tracking leftover tasks by allowing you to list all of your TODO annotations, as well as adding a handy background highlight to them to make them pop out immediately.</p>\n<ol start="7">\n<li>Live Server</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Live Server</a> gives you an easy way to serve web pages from VS Code, making previewing and debugging a lot easier. One of the core features is the live reload support that many developers are used to.</p>\n<ol start="8">\n<li>REST Client</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">REST Client</a> allows you to send HTTP requests and view the responses directly in VS Code. This extension supports a wide range of formats and authorization and should work with most setups.</p>\n<ol start="9">\n<li>One Dark Pro</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme">One Dark Pro</a> is one of the most popular VS Code themes and with very good reason. It provides a clean theme with a nice palette that has great contrast and is very comfortable to use on a daily basis.</p>\n<ol start="10">\n<li>Fira Code</li>\n</ol>\n<p><a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/tonsky/FiraCode">Fira Code</a> is not a traditional VS Code extension and might take a couple more steps to set up, but it\'s a superb programming font with ligatures that will help you scan code faster once you get used to it.</p>',
      description:
        '<p>VS Code is steadily gaining popularity among developers. Here are 10 essential extensions for JavaScript developers that aim to increase your productivity.</p>',
    },
    code: {},
    cover: 'blog_images/computer-screens.jpg',
    authors: ['chalarangelo'],
    seoDescription:
      'VS Code is steadily gaining popularity among developers. Here are 10 essential extensions for JavaScript developers that aim to increase your productivity.',
    repository: '30blog',
  },
];

// Regular: [0, 1, 2]
// Node.js: [3]
export const codeSnippets = [
  {
    id: 'js/s/format-duration',
    fileName: 'formatDuration.md',
    title: 'formatDuration',
    tags: ['date', 'math', 'string', 'intermediate'],
    firstSeen: '2018-01-04T07:26:42.000Z',
    lastUpdated: '2020-10-22T17:23:47.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        "Returns the human-readable format of the given number of milliseconds.\n\n- Divide `ms` with the appropriate values to obtain the appropriate values for `day`, `hour`, `minute`, `second` and `millisecond`.\n- Use `Object.entries()` with `Array.prototype.filter()` to keep only non-zero values.\n- Use `Array.prototype.map()` to create the string for each value, pluralizing appropriately.\n- Use `String.prototype.join(', ')` to combine the values into a string.\n\n",
      short:
        'Returns the human-readable format of the given number of milliseconds.',
    },
    html: {
      fullDescription:
        '<p>Returns the human-readable format of the given number of milliseconds.</p>\n<ul>\n<li>Divide <code class="notranslate">ms</code> with the appropriate values to obtain the appropriate values for <code class="notranslate">day</code>, <code class="notranslate">hour</code>, <code class="notranslate">minute</code>, <code class="notranslate">second</code> and <code class="notranslate">millisecond</code>.</li>\n<li>Use <code class="notranslate">Object.entries()</code> with <code class="notranslate">Array.prototype.filter()</code> to keep only non-zero values.</li>\n<li>Use <code class="notranslate">Array.prototype.map()</code> to create the string for each value, pluralizing appropriately.</li>\n<li>Use <code class="notranslate">String.prototype.join(&#39;, &#39;)</code> to combine the values into a string.</li>\n</ul>',
      description:
        '<p>Returns the human-readable format of the given number of milliseconds.</p>',
      code:
        '<span class="token keyword">const</span> <span class="token function-variable function">formatDuration</span> <span class="token operator">=</span> <span class="token parameter">ms</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>ms <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> ms <span class="token operator">= -</span>ms<span class="token punctuation">;</span>\n  <span class="token keyword">const</span> time <span class="token operator">=</span> <span class="token punctuation">{</span>\n    day<span class="token operator">:</span> <span class="token known-class-name class-name">Math</span><span class="token punctuation">.</span><span class="token method function property-access">floor</span><span class="token punctuation">(</span>ms <span class="token operator">/</span> <span class="token number">86400000</span><span class="token punctuation">),</span>\n    hour<span class="token operator">:</span> <span class="token known-class-name class-name">Math</span><span class="token punctuation">.</span><span class="token method function property-access">floor</span><span class="token punctuation">(</span>ms <span class="token operator">/</span> <span class="token number">3600000</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">24</span><span class="token punctuation">,</span>\n    minute<span class="token operator">:</span> <span class="token known-class-name class-name">Math</span><span class="token punctuation">.</span><span class="token method function property-access">floor</span><span class="token punctuation">(</span>ms <span class="token operator">/</span> <span class="token number">60000</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">,</span>\n    second<span class="token operator">:</span> <span class="token known-class-name class-name">Math</span><span class="token punctuation">.</span><span class="token method function property-access">floor</span><span class="token punctuation">(</span>ms <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">,</span>\n    millisecond<span class="token operator">:</span> <span class="token known-class-name class-name">Math</span><span class="token punctuation">.</span><span class="token method function property-access">floor</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">1000</span>\n  <span class="token punctuation">};</span>\n  <span class="token keyword control-flow">return</span> <span class="token known-class-name class-name">Object</span><span class="token punctuation">.</span><span class="token method function property-access">entries</span><span class="token punctuation">(</span>time<span class="token punctuation">)\n    .</span><span class="token method function property-access">filter</span><span class="token punctuation">(</span><span class="token parameter">val</span> <span class="token arrow operator">=></span> val<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)\n    .</span><span class="token method function property-access">map</span><span class="token punctuation">((</span><span class="token parameter"><span class="token punctuation">[</span>key<span class="token punctuation">,</span> val<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>val<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>val <span class="token operator">!==</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token string">\'s\'</span> <span class="token operator">:</span> <span class="token string">\'\'</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)\n    .</span><span class="token method function property-access">join</span><span class="token punctuation">(</span><span class="token string">\', \'</span><span class="token punctuation">);\n};</span>',
      example:
        '<span class="token function">formatDuration</span><span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">);</span> <span class="token comment">// \'1 second, 1 millisecond\'</span>\n<span class="token function">formatDuration</span><span class="token punctuation">(</span><span class="token number">34325055574</span><span class="token punctuation">);</span>\n<span class="token comment">// \'397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds\'</span>',
    },
    code: {
      src:
        "const formatDuration = ms => {\n  if (ms < 0) ms = -ms;\n  const time = {\n    day: Math.floor(ms / 86400000),\n    hour: Math.floor(ms / 3600000) % 24,\n    minute: Math.floor(ms / 60000) % 60,\n    second: Math.floor(ms / 1000) % 60,\n    millisecond: Math.floor(ms) % 1000\n  };\n  return Object.entries(time)\n    .filter(val => val[1] !== 0)\n    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)\n    .join(', ');\n};",
      example:
        "formatDuration(1001); // '1 second, 1 millisecond'\nformatDuration(34325055574);\n// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'",
    },
    authors: [],
    seoDescription:
      'Returns the human-readable format of the given number of milliseconds.',
    repository: '30code',
  },
  {
    id: 'js/s/format-number',
    fileName: 'formatNumber.md',
    title: 'formatNumber',
    tags: ['string', 'math', 'beginner'],
    firstSeen: '2020-07-30T08:38:51.000Z',
    lastUpdated: '2020-10-22T17:23:47.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        'Formats a number using the local number format order.\n\n- Use `Number.prototype.toLocaleString()` to convert a number to using the local number format separators.\n\n',
      short: 'Formats a number using the local number format order.',
    },
    html: {
      fullDescription:
        '<p>Formats a number using the local number format order.</p>\n<ul>\n<li>Use <code class="notranslate">Number.prototype.toLocaleString()</code> to convert a number to using the local number format separators.</li>\n</ul>',
      description:
        '<p>Formats a number using the local number format order.</p>',
      code:
        '<span class="token keyword">const</span> <span class="token function-variable function">formatNumber</span> <span class="token operator">=</span> <span class="token parameter">num</span> <span class="token arrow operator">=></span> num<span class="token punctuation">.</span><span class="token method function property-access">toLocaleString</span><span class="token punctuation">();</span>',
      example:
        '<span class="token function">formatNumber</span><span class="token punctuation">(</span><span class="token number">123456</span><span class="token punctuation">);</span> <span class="token comment">// \'123,456\' in `en-US`</span>\n<span class="token function">formatNumber</span><span class="token punctuation">(</span><span class="token number">15675436903</span><span class="token punctuation">);</span> <span class="token comment">// \'15.675.436.903\' in `de-DE`</span>',
    },
    code: {
      src: 'const formatNumber = num => num.toLocaleString();',
      example:
        "formatNumber(123456); // '123,456' in `en-US`\nformatNumber(15675436903); // '15.675.436.903' in `de-DE`",
    },
    authors: [],
    seoDescription: 'Formats a number using the local number format order.',
    repository: '30code',
  },
  {
    id: 'js/s/format-seconds',
    fileName: 'formatSeconds.md',
    title: 'formatSeconds',
    tags: ['date', 'math', 'string', 'intermediate'],
    firstSeen: '2021-05-09T09:44:55.000Z',
    lastUpdated: '2021-10-13T17:29:39.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        "Returns the ISO format of the given number of seconds.\n\n- Divide `s` with the appropriate values to obtain the appropriate values for `hour`, `minute` and `second`.\n- Store the `sign` in a variable to prepend it to the result.\n- Use `Array.prototype.map()` in combination with `Math.floor()` and `String.prototype.padStart()` to stringify and format each segment.\n- Use `String.prototype.join(':')` to combine the values into a string.\n\n",
      short: 'Returns the ISO format of the given number of seconds.',
    },
    html: {
      fullDescription:
        '<p>Returns the ISO format of the given number of seconds.</p>\n<ul>\n<li>Divide <code class="notranslate">s</code> with the appropriate values to obtain the appropriate values for <code class="notranslate">hour</code>, <code class="notranslate">minute</code> and <code class="notranslate">second</code>.</li>\n<li>Store the <code class="notranslate">sign</code> in a variable to prepend it to the result.</li>\n<li>Use <code class="notranslate">Array.prototype.map()</code> in combination with <code class="notranslate">Math.floor()</code> and <code class="notranslate">String.prototype.padStart()</code> to stringify and format each segment.</li>\n<li>Use <code class="notranslate">String.prototype.join(&#39;:&#39;)</code> to combine the values into a string.</li>\n</ul>',
      description:
        '<p>Returns the ISO format of the given number of seconds.</p>',
      code:
        '<span class="token keyword">const</span> <span class="token function-variable function">formatSeconds</span> <span class="token operator">=</span> <span class="token parameter">s</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>hour<span class="token punctuation">,</span> minute<span class="token punctuation">,</span> second<span class="token punctuation">,</span> sign<span class="token punctuation">]</span> <span class="token operator">=</span>\n    s <span class="token operator">></span> <span class="token number">0</span>\n      <span class="token operator">?</span> <span class="token punctuation">[</span>s <span class="token operator">/</span> <span class="token number">3600</span><span class="token punctuation">, (</span>s <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">,</span> s <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">]</span>\n      <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">-</span>s <span class="token operator">/</span> <span class="token number">3600</span><span class="token punctuation">, (</span><span class="token operator">-</span>s <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token operator">-</span>s <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token string">\'-\'</span><span class="token punctuation">];</span>\n\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    sign <span class="token operator">+</span>\n    <span class="token punctuation">[</span>hour<span class="token punctuation">,</span> minute<span class="token punctuation">,</span> second<span class="token punctuation">]\n      .</span><span class="token method function property-access">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token arrow operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token known-class-name class-name">Math</span><span class="token punctuation">.</span><span class="token method function property-access">floor</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">.</span><span class="token method function property-access">padStart</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">\'0\'</span><span class="token punctuation">))\n      .</span><span class="token method function property-access">join</span><span class="token punctuation">(</span><span class="token string">\':\'</span><span class="token punctuation">)\n  );\n};</span>',
      example:
        '<span class="token function">formatSeconds</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">);</span> <span class="token comment">// \'00:03:20\'</span>\n<span class="token function">formatSeconds</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">);</span> <span class="token comment">// \'-00:03:20\'</span>\n<span class="token function">formatSeconds</span><span class="token punctuation">(</span><span class="token number">99999</span><span class="token punctuation">);</span> <span class="token comment">// \'27:46:39\'</span>',
    },
    code: {
      src:
        "const formatSeconds = s => {\n  const [hour, minute, second, sign] =\n    s > 0\n      ? [s / 3600, (s / 60) % 60, s % 60, '']\n      : [-s / 3600, (-s / 60) % 60, -s % 60, '-'];\n\n  return (\n    sign +\n    [hour, minute, second]\n      .map(v => `${Math.floor(v)}`.padStart(2, '0'))\n      .join(':')\n  );\n};",
      example:
        "formatSeconds(200); // '00:03:20'\nformatSeconds(-200); // '-00:03:20'\nformatSeconds(99999); // '27:46:39'",
    },
    authors: [],
    seoDescription: 'Returns the ISO format of the given number of seconds.',
    repository: '30code',
  },
  {
    id: 'js/s/hash-node',
    fileName: 'hashNode.md',
    title: 'hashNode',
    tags: ['node', 'promise', 'advanced'],
    firstSeen: '2018-01-17T12:09:01.000Z',
    lastUpdated: '2021-10-13T17:29:39.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        'Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm.\nReturns a promise.\n\n- Use `crypto.createHash()` to create a `Hash` object with the appropriate algorithm.\n- Use `hash.update()` to add the data from `val` to the `Hash`, `hash.digest()` to calculate the digest of the data.\n- Use `setTimeout()` to prevent blocking on a long operation. Return a `Promise` to give it a familiar interface.\n\n',
      short:
        'Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm.\nReturns a promise.',
    },
    html: {
      fullDescription:
        '<p>Creates a hash for a value using the <a target="_blank" rel="nofollow noopener noreferrer" href="https://en.wikipedia.org/wiki/SHA-2">SHA-256</a> algorithm.\nReturns a promise.</p>\n<ul>\n<li>Use <code class="notranslate">crypto.createHash()</code> to create a <code class="notranslate">Hash</code> object with the appropriate algorithm.</li>\n<li>Use <code class="notranslate">hash.update()</code> to add the data from <code class="notranslate">val</code> to the <code class="notranslate">Hash</code>, <code class="notranslate">hash.digest()</code> to calculate the digest of the data.</li>\n<li>Use <code class="notranslate">setTimeout()</code> to prevent blocking on a long operation. Return a <code class="notranslate">Promise</code> to give it a familiar interface.</li>\n</ul>',
      description:
        '<p>Creates a hash for a value using the <a target="_blank" rel="nofollow noopener noreferrer" href="https://en.wikipedia.org/wiki/SHA-2">SHA-256</a> algorithm.\nReturns a promise.</p>',
      code:
        '<span class="token keyword">const</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'crypto\'</span><span class="token punctuation">);</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">hashNode</span> <span class="token operator">=</span> <span class="token parameter">val</span> <span class="token arrow operator">=></span>\n  <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token arrow operator">=></span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(\n      ()</span> <span class="token arrow operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span>crypto<span class="token punctuation">.</span><span class="token method function property-access">createHash</span><span class="token punctuation">(</span><span class="token string">\'sha256\'</span><span class="token punctuation">).</span><span class="token method function property-access">update</span><span class="token punctuation">(</span>val<span class="token punctuation">).</span><span class="token method function property-access">digest</span><span class="token punctuation">(</span><span class="token string">\'hex\'</span><span class="token punctuation">)),</span>\n      <span class="token number">0</span>\n    <span class="token punctuation">)\n  );</span>',
      example:
        '<span class="token function">hashNode</span><span class="token punctuation">(</span><span class="token known-class-name class-name">JSON</span><span class="token punctuation">.</span><span class="token method function property-access">stringify</span><span class="token punctuation">({</span> a<span class="token operator">:</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">],</span> foo<span class="token operator">:</span> <span class="token punctuation">{</span> c<span class="token operator">:</span> <span class="token string">\'bar\'</span> <span class="token punctuation">} })).</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>\n  <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token property-access">log</span>\n<span class="token punctuation">);</span>\n<span class="token comment">// \'04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393\'</span>',
    },
    code: {
      src:
        "const crypto = require('crypto');\n\nconst hashNode = val =>\n  new Promise(resolve =>\n    setTimeout(\n      () => resolve(crypto.createHash('sha256').update(val).digest('hex')),\n      0\n    )\n  );",
      example:
        "hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(\n  console.log\n);\n// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'",
    },
    authors: [],
    seoDescription:
      'Creates a hash for a value using the SHA-256 algorithm.Returns a promise.',
    repository: '30code',
  },
];

// Regular: [0]
// With JavaScript: [1]
export const cssSnippets = [
  {
    id: 'css/s/triangle',
    fileName: 'triangle.md',
    title: 'Triangle',
    tags: ['visual', 'beginner'],
    firstSeen: '2018-02-25T13:14:39.000Z',
    lastUpdated: '2021-10-13T17:29:39.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        'Creates a triangular shape with pure CSS.\n\n- Use three borders to create a triangle shape.\n- All borders should have the same `border-width` (`20px`).\n- The opposite side of where the triangle points towards (i.e. top if the triangle points downwards) should have the desired `border-color`. The adjacent borders (i.e. left and right) should have a `border-color` of `transparent`.\n- Altering the `border-width` values will change the proportions of the triangle.\n\n',
      short: 'Creates a triangular shape with pure CSS.',
    },
    html: {
      fullDescription:
        '<p>Creates a triangular shape with pure CSS.</p>\n<ul>\n<li>Use three borders to create a triangle shape.</li>\n<li>All borders should have the same <code class="notranslate">border-width</code> (<code class="notranslate">20px</code>).</li>\n<li>The opposite side of where the triangle points towards (i.e. top if the triangle points downwards) should have the desired <code class="notranslate">border-color</code>. The adjacent borders (i.e. left and right) should have a <code class="notranslate">border-color</code> of <code class="notranslate">transparent</code>.</li>\n<li>Altering the <code class="notranslate">border-width</code> values will change the proportions of the triangle.</li>\n</ul>',
      description: '<p>Creates a triangular shape with pure CSS.</p>',
      html:
        '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>triangle<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',
      css:
        '<span class="token selector"><span class="token class">.triangle</span></span> <span class="token punctuation">{</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token property">border-top</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span> solid <span class="token hexcode color">#9C27B0</span><span class="token punctuation">;</span>\n  <span class="token property">border-left</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span> solid <span class="token color">transparent</span><span class="token punctuation">;</span>\n  <span class="token property">border-right</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span> solid <span class="token color">transparent</span><span class="token punctuation">;\n}</span>',
    },
    code: {
      html: '<div class="triangle"></div>',
      css:
        '.triangle {\n  width: 0;\n  height: 0;\n  border-top: 20px solid #9C27B0;\n  border-left: 20px solid transparent;\n  border-right: 20px solid transparent;\n}',
      scopedCss:
        '[data-scope="snippet-preview"] .triangle {\n  width: 0;\n  height: 0;\n  border-top: 20px solid #9C27B0;\n  border-left: 20px solid transparent;\n  border-right: 20px solid transparent; }\n',
    },
    authors: [],
    seoDescription: 'Creates a triangular shape with pure CSS.',
    repository: '30css',
  },
  {
    id: 'css/s/mouse-cursor-gradient-tracking',
    fileName: 'mouse-cursor-gradient-tracking.md',
    title: 'Mouse cursor gradient tracking',
    tags: ['visual', 'interactivity', 'advanced'],
    firstSeen: '2018-02-25T13:14:39.000Z',
    lastUpdated: '2021-01-07T21:52:15.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        "A hover effect where the gradient follows the mouse cursor.\n\n- Declare two CSS variables, `--x` and `--y`, used to track the position of the mouse on the button.\n- Declare a CSS variable, `--size`, used to modify the gradient's dimensions.\n- Use `background: radial-gradient(circle closest-side, pink, transparent);` to create the gradient at the correct position.\n- Use `Document.querySelector()` and `EventTarget.addEventListener()` to register a handler for the `'mousemove'` event.\n- Use `Element.getBoundingClientRect()` and `CSSStyleDeclaration.setProperty()` to update the values of the `--x` and `--y` CSS variables.\n\n",
      short: 'A hover effect where the gradient follows the mouse cursor.',
    },
    html: {
      fullDescription:
        '<p>A hover effect where the gradient follows the mouse cursor.</p>\n<ul>\n<li>Declare two CSS variables, <code class="notranslate">--x</code> and <code class="notranslate">--y</code>, used to track the position of the mouse on the button.</li>\n<li>Declare a CSS variable, <code class="notranslate">--size</code>, used to modify the gradient\'s dimensions.</li>\n<li>Use <code class="notranslate">background: radial-gradient(circle closest-side, pink, transparent);</code> to create the gradient at the correct position.</li>\n<li>Use <code class="notranslate">Document.querySelector()</code> and <code class="notranslate">EventTarget.addEventListener()</code> to register a handler for the <code class="notranslate">&#39;mousemove&#39;</code> event.</li>\n<li>Use <code class="notranslate">Element.getBoundingClientRect()</code> and <code class="notranslate">CSSStyleDeclaration.setProperty()</code> to update the values of the <code class="notranslate">--x</code> and <code class="notranslate">--y</code> CSS variables.</li>\n</ul>',
      description:
        '<p>A hover effect where the gradient follows the mouse cursor.</p>',
      html:
        '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mouse-cursor-gradient-tracking<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>Hover me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>',
      css:
        '<span class="token selector"><span class="token class">.mouse-cursor-gradient-tracking</span></span> <span class="token punctuation">{</span>\n  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode color">#7983ff</span><span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token number">0.5</span><span class="token unit">rem</span> <span class="token number">1</span><span class="token unit">rem</span><span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token number">1.2</span><span class="token unit">rem</span><span class="token punctuation">;</span>\n  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token color">white</span><span class="token punctuation">;</span>\n  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>\n  <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.mouse-cursor-gradient-tracking</span> span</span> <span class="token punctuation">{</span>\n  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.mouse-cursor-gradient-tracking</span><span class="token pseudo-element">:before</span></span> <span class="token punctuation">{</span>\n  <span class="token variable">--size</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">\'\'</span><span class="token punctuation">;</span>\n  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>\n  <span class="token property">left</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span><span class="token variable">--x</span><span class="token punctuation">);</span>\n  <span class="token property">top</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span><span class="token variable">--y</span><span class="token punctuation">);</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span><span class="token variable">--size</span><span class="token punctuation">);</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span><span class="token variable">--size</span><span class="token punctuation">);</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">radial-gradient</span><span class="token punctuation">(</span>circle closest-side<span class="token punctuation">,</span> <span class="token color">pink</span><span class="token punctuation">,</span> <span class="token color">transparent</span><span class="token punctuation">);</span>\n  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span><span class="token number">-50</span><span class="token unit">%</span><span class="token punctuation">,</span> <span class="token number">-50</span><span class="token unit">%</span><span class="token punctuation">);</span>\n  <span class="token property">transition</span><span class="token punctuation">:</span> width <span class="token number">0.2</span><span class="token unit">s</span> ease<span class="token punctuation">,</span> height <span class="token number">0.2</span><span class="token unit">s</span> ease<span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.mouse-cursor-gradient-tracking</span><span class="token pseudo-class">:hover</span><span class="token pseudo-element">:before</span></span> <span class="token punctuation">{</span>\n  <span class="token variable">--size</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token unit">px</span><span class="token punctuation">;\n}</span>',
      js:
        '<span class="token keyword">let</span> btn <span class="token operator">=</span> <span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">querySelector</span><span class="token punctuation">(</span><span class="token string">\'.mouse-cursor-gradient-tracking\'</span><span class="token punctuation">);</span>\nbtn<span class="token punctuation">.</span><span class="token method function property-access">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'mousemove\'</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> rect <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token property-access">target</span><span class="token punctuation">.</span><span class="token method function property-access">getBoundingClientRect</span><span class="token punctuation">();</span>\n  <span class="token keyword">let</span> x <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token property-access">clientX</span> <span class="token operator">-</span> rect<span class="token punctuation">.</span><span class="token property-access">left</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> y <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token property-access">clientY</span> <span class="token operator">-</span> rect<span class="token punctuation">.</span><span class="token property-access">top</span><span class="token punctuation">;</span>\n  btn<span class="token punctuation">.</span><span class="token property-access">style</span><span class="token punctuation">.</span><span class="token method function property-access">setProperty</span><span class="token punctuation">(</span><span class="token string">\'--x\'</span><span class="token punctuation">,</span> x <span class="token operator">+</span> <span class="token string">\'px\'</span><span class="token punctuation">);</span>\n  btn<span class="token punctuation">.</span><span class="token property-access">style</span><span class="token punctuation">.</span><span class="token method function property-access">setProperty</span><span class="token punctuation">(</span><span class="token string">\'--y\'</span><span class="token punctuation">,</span> y <span class="token operator">+</span> <span class="token string">\'px\'</span><span class="token punctuation">);\n});</span>',
    },
    code: {
      html:
        '<button class="mouse-cursor-gradient-tracking">\n  <span>Hover me</span>\n</button>',
      css:
        ".mouse-cursor-gradient-tracking {\n  position: relative;\n  background: #7983ff;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  border: none;\n  color: white;\n  cursor: pointer;\n  outline: none;\n  overflow: hidden;\n}\n\n.mouse-cursor-gradient-tracking span {\n  position: relative;\n}\n\n.mouse-cursor-gradient-tracking:before {\n  --size: 0;\n  content: '';\n  position: absolute;\n  left: var(--x);\n  top: var(--y);\n  width: var(--size);\n  height: var(--size);\n  background: radial-gradient(circle closest-side, pink, transparent);\n  transform: translate(-50%, -50%);\n  transition: width 0.2s ease, height 0.2s ease;\n}\n\n.mouse-cursor-gradient-tracking:hover:before {\n  --size: 200px;\n}",
      scopedCss:
        '[data-scope="snippet-preview"] .mouse-cursor-gradient-tracking {\n  position: relative;\n  background: #7983ff;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  border: none;\n  color: white;\n  cursor: pointer;\n  outline: none;\n  overflow: hidden; }\n\n[data-scope="snippet-preview"] .mouse-cursor-gradient-tracking span {\n  position: relative; }\n\n[data-scope="snippet-preview"] .mouse-cursor-gradient-tracking:before {\n  --size: 0;\n  content: \'\';\n  position: absolute;\n  left: var(--x);\n  top: var(--y);\n  width: var(--size);\n  height: var(--size);\n  background: radial-gradient(circle closest-side, pink, transparent);\n  transform: translate(-50%, -50%);\n  transition: width 0.2s ease, height 0.2s ease; }\n\n[data-scope="snippet-preview"] .mouse-cursor-gradient-tracking:hover:before {\n  --size: 200px; }\n',
      js:
        "let btn = document.querySelector('.mouse-cursor-gradient-tracking');\nbtn.addEventListener('mousemove', e => {\n  let rect = e.target.getBoundingClientRect();\n  let x = e.clientX - rect.left;\n  let y = e.clientY - rect.top;\n  btn.style.setProperty('--x', x + 'px');\n  btn.style.setProperty('--y', y + 'px');\n});",
    },
    authors: [],
    seoDescription:
      'A hover effect where the gradient follows the mouse cursor.',
    repository: '30css',
  },
];

// Regular: [0]
// With CSS: [1]
export const reactSnippets = [
  {
    id: 'react/s/use-interval',
    fileName: 'useInterval.md',
    title: 'useInterval',
    tags: ['hooks', 'effect', 'intermediate'],
    firstSeen: '2019-08-21T10:18:52.000Z',
    lastUpdated: '2020-11-16T12:17:53.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        'Implements `setInterval` in a declarative manner.\n\n- Create a custom hook that takes a `callback` and a `delay`.\n- Use the `useRef()` hook to create a `ref` for the callback function.\n- Use a `useEffect()` hook to remember the latest `callback` whenever it changes.\n- Use a `useEffect()` hook dependent on `delay` to set up the interval and clean up.\n\n',
      short: 'Implements `setInterval` in a declarative manner.',
    },
    html: {
      fullDescription:
        '<p>Implements <code class="notranslate">setInterval</code> in a declarative manner.</p>\n<ul>\n<li>Create a custom hook that takes a <code class="notranslate">callback</code> and a <code class="notranslate">delay</code>.</li>\n<li>Use the <code class="notranslate">useRef()</code> hook to create a <code class="notranslate">ref</code> for the callback function.</li>\n<li>Use a <code class="notranslate">useEffect()</code> hook to remember the latest <code class="notranslate">callback</code> whenever it changes.</li>\n<li>Use a <code class="notranslate">useEffect()</code> hook dependent on <code class="notranslate">delay</code> to set up the interval and clean up.</li>\n</ul>',
      description:
        '<p>Implements <code class="notranslate">setInterval</code> in a declarative manner.</p>',
      code:
        '<span class="token keyword">const</span> <span class="token function-variable function">useInterval</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span> delay</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> savedCallback <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useRef</span><span class="token punctuation">();</span>\n\n  <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useEffect</span><span class="token punctuation">(()</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    savedCallback<span class="token punctuation">.</span><span class="token property-access">current</span> <span class="token operator">=</span> callback<span class="token punctuation">;\n  }, [</span>callback<span class="token punctuation">]);</span>\n\n  <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useEffect</span><span class="token punctuation">(()</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token function-variable function">tick</span> <span class="token operator">=</span> <span class="token punctuation">()</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n      savedCallback<span class="token punctuation">.</span><span class="token method function property-access">current</span><span class="token punctuation">();\n    }</span>\n    <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>delay <span class="token operator">!==</span> <span class="token keyword null nil">null</span><span class="token punctuation">) {</span>\n      <span class="token keyword">let</span> id <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span>tick<span class="token punctuation">,</span> delay<span class="token punctuation">);</span>\n      <span class="token keyword control-flow">return</span> <span class="token punctuation">()</span> <span class="token arrow operator">=></span> <span class="token function">clearInterval</span><span class="token punctuation">(</span>id<span class="token punctuation">);\n    }\n  }, [</span>delay<span class="token punctuation">]);\n};</span>',
      example:
        '<span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Timer</span></span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>seconds<span class="token punctuation">,</span> setSeconds<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">);</span>\n  <span class="token function">useInterval</span><span class="token punctuation">(()</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">setSeconds</span><span class="token punctuation">(</span>seconds <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">);\n  },</span> <span class="token number">1000</span><span class="token punctuation">);</span>\n\n  <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>seconds<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">;\n};</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timer</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> <span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">));</span>',
    },
    code: {
      style: '',
      src:
        'const useInterval = (callback, delay) => {\n  const savedCallback = React.useRef();\n\n  React.useEffect(() => {\n    savedCallback.current = callback;\n  }, [callback]);\n\n  React.useEffect(() => {\n    const tick = () => {\n      savedCallback.current();\n    }\n    if (delay !== null) {\n      let id = setInterval(tick, delay);\n      return () => clearInterval(id);\n    }\n  }, [delay]);\n};',
      example:
        "const Timer = props => {\n  const [seconds, setSeconds] = React.useState(0);\n  useInterval(() => {\n    setSeconds(seconds + 1);\n  }, 1000);\n\n  return <p>{seconds}</p>;\n};\n\nReactDOM.render(<Timer />, document.getElementById('root'));",
    },
    authors: [],
    seoDescription: 'Implements setInterval in a declarative manner.',
    repository: '30react',
  },
  {
    id: 'react/s/tag-input',
    fileName: 'TagInput.md',
    title: 'TagInput',
    tags: ['components', 'input', 'state', 'intermediate'],
    firstSeen: '2019-10-02T07:06:11.000Z',
    lastUpdated: '2020-11-25T19:12:16.000Z',
    listed: true,
    type: 'snippet',
    text: {
      full:
        'Renders a tag input field.\n\n- Define a `TagInput` component and use the `useState()` hook to initialize an array from `tags`.\n- Use `Array.prototype.map()` on the collected nodes to render the list of tags.\n- Define the `addTagData` method, which will be executed when pressing the `Enter` key.\n- The `addTagData` method calls `setTagData` to add the new tag using the spread (`...`) operator to prepend the existing tags and add the new tag at the end of the `tagData` array.\n- Define the `removeTagData` method, which will be executed on clicking the delete icon in the tag.\n- Use `Array.prototype.filter()` in the `removeTagData` method to remove the tag using its `index` to filter it out from the `tagData` array.\n\n',
      short: 'Renders a tag input field.',
    },
    html: {
      fullDescription:
        '<p>Renders a tag input field.</p>\n<ul>\n<li>Define a <code class="notranslate">TagInput</code> component and use the <code class="notranslate">useState()</code> hook to initialize an array from <code class="notranslate">tags</code>.</li>\n<li>Use <code class="notranslate">Array.prototype.map()</code> on the collected nodes to render the list of tags.</li>\n<li>Define the <code class="notranslate">addTagData</code> method, which will be executed when pressing the <code class="notranslate">Enter</code> key.</li>\n<li>The <code class="notranslate">addTagData</code> method calls <code class="notranslate">setTagData</code> to add the new tag using the spread (<code class="notranslate">...</code>) operator to prepend the existing tags and add the new tag at the end of the <code class="notranslate">tagData</code> array.</li>\n<li>Define the <code class="notranslate">removeTagData</code> method, which will be executed on clicking the delete icon in the tag.</li>\n<li>Use <code class="notranslate">Array.prototype.filter()</code> in the <code class="notranslate">removeTagData</code> method to remove the tag using its <code class="notranslate">index</code> to filter it out from the <code class="notranslate">tagData</code> array.</li>\n</ul>',
      description: '<p>Renders a tag input field.</p>',
      style:
        '<span class="token selector"><span class="token class">.tag-input</span></span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>\n  <span class="token property">min-height</span><span class="token punctuation">:</span> <span class="token number">48</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token number">8</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">border</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token unit">px</span> solid <span class="token hexcode color">#d6d8da</span><span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token number">6</span><span class="token unit">px</span><span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.tag-input</span> input</span> <span class="token punctuation">{</span>\n  <span class="token property">flex</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span>\n  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">46</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token number">14</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token unit">px</span> <span class="token number">0</span> <span class="token number">0</span><span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.tag-input</span> input<span class="token pseudo-class">:focus</span></span> <span class="token punctuation">{</span>\n  <span class="token property">outline</span><span class="token punctuation">:</span> <span class="token color">transparent</span><span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.tags</span></span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token number">8</span><span class="token unit">px</span> <span class="token number">0</span> <span class="token number">0</span><span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.tag</span></span> <span class="token punctuation">{</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">32</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token hexcode color">#fff</span><span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token number">8</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token number">14</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token number">6</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token number">8</span><span class="token unit">px</span> <span class="token number">8</span><span class="token unit">px</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode color">#0052cc</span><span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.tag-title</span></span> <span class="token punctuation">{</span>\n  <span class="token property">margin-top</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token unit">px</span><span class="token punctuation">;\n}</span>\n\n<span class="token selector"><span class="token class">.tag-close-icon</span></span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token number">16</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">16</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">line-height</span><span class="token punctuation">:</span> <span class="token number">16</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token number">14</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">margin-left</span><span class="token punctuation">:</span> <span class="token number">8</span><span class="token unit">px</span><span class="token punctuation">;</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token hexcode color">#0052cc</span><span class="token punctuation">;</span>\n  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token unit">%</span><span class="token punctuation">;</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token hexcode color">#fff</span><span class="token punctuation">;</span>\n  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;\n}</span>',
      code:
        '<span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">TagInput</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> tags <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>tagData<span class="token punctuation">,</span> setTagData<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useState</span><span class="token punctuation">(</span>tags<span class="token punctuation">);</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">removeTagData</span> <span class="token operator">=</span> <span class="token parameter">indexToRemove</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">setTagData</span><span class="token punctuation">([</span><span class="token spread operator">...</span>tagData<span class="token punctuation">.</span><span class="token method function property-access">filter</span><span class="token punctuation">((</span><span class="token parameter">_<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> index <span class="token operator">!==</span> indexToRemove<span class="token punctuation">)]);\n  };</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">addTagData</span> <span class="token operator">=</span> <span class="token parameter">event</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span><span class="token property-access">target</span><span class="token punctuation">.</span><span class="token property-access">value</span> <span class="token operator">!==</span> <span class="token string">\'\'</span><span class="token punctuation">) {</span>\n      <span class="token function">setTagData</span><span class="token punctuation">([</span><span class="token spread operator">...</span>tagData<span class="token punctuation">,</span> event<span class="token punctuation">.</span><span class="token property-access">target</span><span class="token punctuation">.</span><span class="token property-access">value</span><span class="token punctuation">]);</span>\n      event<span class="token punctuation">.</span><span class="token property-access">target</span><span class="token punctuation">.</span><span class="token property-access">value</span> <span class="token operator">=</span> <span class="token string">\'\'</span><span class="token punctuation">;\n    }\n  };</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tag-input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tags<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token punctuation">{</span>tagData<span class="token punctuation">.</span><span class="token method function property-access">map</span><span class="token punctuation">((</span><span class="token parameter">tag<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tag<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tag-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>tag<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>\n              <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tag-close-icon<span class="token punctuation">"</span></span>\n              <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{()</span> <span class="token arrow operator">=></span> <span class="token function">removeTagData</span><span class="token punctuation">(</span>index<span class="token punctuation">)}</span></span>\n            <span class="token punctuation">></span></span><span class="token plain-text">\n              x\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">))}</span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>\n        <span class="token attr-name">onKeyUp</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token parameter">event</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span><span class="token property-access">key</span> <span class="token operator">===</span> <span class="token string">\'Enter\'</span> <span class="token operator">?</span> <span class="token function">addTagData</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword null nil">null</span><span class="token punctuation">)}</span></span>\n        <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Press enter to add a tag<span class="token punctuation">"</span></span>\n      <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">);\n};</span>',
      example:
        '<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TagInput</span></span> <span class="token attr-name">tags</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{[</span><span class="token string">\'Nodejs\'</span><span class="token punctuation">,</span> <span class="token string">\'MongoDB\'</span><span class="token punctuation">]}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  <span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)\n);</span>',
    },
    code: {
      style:
        '.tag-input {\n  display: flex;\n  flex-wrap: wrap;\n  min-height: 48px;\n  padding: 0 8px;\n  border: 1px solid #d6d8da;\n  border-radius: 6px;\n}\n\n.tag-input input {\n  flex: 1;\n  border: none;\n  height: 46px;\n  font-size: 14px;\n  padding: 4px 0 0;\n}\n\n.tag-input input:focus {\n  outline: transparent;\n}\n\n.tags {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0;\n  margin: 8px 0 0;\n}\n\n.tag {\n  width: auto;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  padding: 0 8px;\n  font-size: 14px;\n  list-style: none;\n  border-radius: 6px;\n  margin: 0 8px 8px 0;\n  background: #0052cc;\n}\n\n.tag-title {\n  margin-top: 3px;\n}\n\n.tag-close-icon {\n  display: block;\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n  text-align: center;\n  font-size: 14px;\n  margin-left: 8px;\n  color: #0052cc;\n  border-radius: 50%;\n  background: #fff;\n  cursor: pointer;\n}',
      src:
        'const TagInput = ({ tags }) => {\n  const [tagData, setTagData] = React.useState(tags);\n  const removeTagData = indexToRemove => {\n    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);\n  };\n  const addTagData = event => {\n    if (event.target.value !== \'\') {\n      setTagData([...tagData, event.target.value]);\n      event.target.value = \'\';\n    }\n  };\n  return (\n    <div className="tag-input">\n      <ul className="tags">\n        {tagData.map((tag, index) => (\n          <li key={index} className="tag">\n            <span className="tag-title">{tag}</span>\n            <span\n              className="tag-close-icon"\n              onClick={() => removeTagData(index)}\n            >\n              x\n            </span>\n          </li>\n        ))}\n      </ul>\n      <input\n        type="text"\n        onKeyUp={event => (event.key === \'Enter\' ? addTagData(event) : null)}\n        placeholder="Press enter to add a tag"\n      />\n    </div>\n  );\n};',
      example:
        "ReactDOM.render(\n  <TagInput tags={['Nodejs', 'MongoDB']} />,\n  document.getElementById('root')\n);",
    },
    authors: [],
    seoDescription: 'Renders a tag input field.',
    repository: '30react',
  },
];

export const snippets = [
  ...blogSnippets,
  ...codeSnippets,
  ...cssSnippets,
  ...reactSnippets,
];

export const authors = [
  {
    name: 'Angelos Chalaris',
    profile: 'https://twitter.com/chalarangelo',
    id: 'chalarangelo',
  },
  {
    name: 'Isabelle Viktoria Maciohsek',
    profile: 'https://github.com/Trinityyi',
    id: 'maciv',
  },
];

export const languages = [
  {
    id: 'html',
    long: 'html',
    short: 'html',
    name: 'HTML',
  },
  {
    id: 'javascript',
    long: 'javascript',
    short: 'js',
    name: 'JavaScript',
    icon: 'js',
  },
  {
    id: 'css',
    long: 'css',
    short: 'css',
    name: 'CSS',
    icon: 'css',
  },
  {
    id: 'react',
    long: 'react',
    short: 'jsx',
    name: 'React',
    icon: 'react',
  },
];

export const tags = [
  {
    id: '30blog_css',
    slugPrefix: '/articles/t/css',
    name: 'CSS Articles',
    shortName: 'CSS Articles',
    description:
      'The coding articles collection contains curated stories, tips, questions and answers on a wide variety of topics. The main focus of these articles revolves around the languages and technologies presented in snippets, as well as career advice and lessons.',
    shortDescription:
      'Discover dozens of programming articles, covering a wide variety of topics and technologies.',
    splash: 'camera.png',
    icon: 'css',
    repository: '30blog',
  },
  {
    id: '30blog_javascript',
    slugPrefix: '/articles/t/javascript',
    name: 'JavaScript Articles',
    shortName: 'JavaScript Articles',
    description:
      'The coding articles collection contains curated stories, tips, questions and answers on a wide variety of topics. The main focus of these articles revolves around the languages and technologies presented in snippets, as well as career advice and lessons.',
    shortDescription:
      'Discover dozens of programming articles, covering a wide variety of topics and technologies.',
    splash: 'laptop-plant.png',
    icon: 'js',
    repository: '30blog',
  },
  {
    id: '30blog_react',
    slugPrefix: '/articles/t/react',
    name: 'React Articles',
    shortName: 'React Articles',
    description:
      'The coding articles collection contains curated stories, tips, questions and answers on a wide variety of topics. The main focus of these articles revolves around the languages and technologies presented in snippets, as well as career advice and lessons.',
    shortDescription:
      'Discover dozens of programming articles, covering a wide variety of topics and technologies.',
    splash: 'plant-window.png',
    icon: 'react',
    repository: '30blog',
  },
  {
    id: '30code_date',
    slugPrefix: '/js/t/date',
    name: 'JavaScript Date Snippets',
    shortName: 'JavaScript Date',
    description:
      'The JavaScript snippet collection contains a wide variety of ES6 helper functions. It includes helpers for dealing with primitives, arrays and objects, as well as algorithms, DOM manipulation functions and Node.js utilities.',
    shortDescription:
      'Browse a wide variety of ES6 helper functions, including array operations, DOM manipulation, algorithms and Node.js utilities.',
    splash: 'succulent.png',
    icon: 'js',
    repository: '30code',
  },
  {
    id: '30code_node',
    slugPrefix: '/js/t/node',
    name: 'Node.js Snippets',
    shortName: 'Node.js',
    description:
      'The Node.js snippet collection contains JavaScript utilities for Node.js 14.x. It includes helper functions related to server-side code and filesystem operations, while general-purpose helpers can be found in the JavaScript snippet collection.',
    shortDescription:
      'Discover a collection of server-side JavaScript utility functions for Node.js 14.x.',
    splash: 'coffee-drip.png',
    icon: 'node',
    repository: '30code',
  },
  {
    id: '30code_string',
    slugPrefix: '/js/t/string',
    name: 'JavaScript String Snippets',
    shortName: 'JavaScript String',
    description:
      'The JavaScript snippet collection contains a wide variety of ES6 helper functions. It includes helpers for dealing with primitives, arrays and objects, as well as algorithms, DOM manipulation functions and Node.js utilities.',
    shortDescription:
      'Browse a wide variety of ES6 helper functions, including array operations, DOM manipulation, algorithms and Node.js utilities.',
    splash: 'laptop-plant.png',
    icon: 'js',
    repository: '30code',
  },
  {
    id: '30css_visual',
    slugPrefix: '/css/t/visual',
    name: 'CSS Visual Snippets',
    shortName: 'CSS Visual',
    description:
      'The CSS snippet collection contains utilities and interactive examples for CSS3. It includes modern techniques for creating commonly-used layouts, styling and animating elements, as well as snippets for handling user interactions.',
    shortDescription:
      'A snippet collection of interactive CSS3 examples, covering layouts, styling, animation and user interactions.',
    splash: 'camera.png',
    icon: 'css',
    repository: '30css',
  },
  {
    id: '30react_components',
    slugPrefix: '/react/t/components',
    name: 'React Components',
    shortName: 'React Components',
    description:
      'The React snippet collection contains function components and reusable hooks for React 16.',
    shortDescription:
      'Discover a collection of reusable function components for React 16.',
    splash: 'succulent.png',
    icon: 'react',
    repository: '30react',
  },
  {
    id: '30react_hooks',
    slugPrefix: '/react/t/hooks',
    name: 'React Hooks',
    shortName: 'React Hooks',
    description:
      'The React snippet collection contains function components and reusable hooks for React 16.',
    shortDescription: 'Discover a collection of reusable hooks for React 16.',
    splash: 'succulent-cluster.png',
    icon: 'react',
    repository: '30react',
  },
];

export const collectionListingConfig = {
  name: 'Snippet Collections',
  splash: 'widescreen.png',
  description:
    '30 seconds of code provides a wide variety of snippet and article collections for all your development needs. Explore individual language collections or browse through collections about specific topics and programming concepts.',
  featuredListings: [
    'language/js',
    'language/css',
    'tag/react/t/hooks',
    'language/python',
    'tag/js/t/algorithm',
    'language/git',
    'tag/react/t/components',
    'blog/articles',
    'tag/js/t/node',
    'collection/c/js-data-structures',
    'collection/c/react-rendering',
    'collection/c/tips',
    'collection/c/css-centering',
    'collection/c/js-colors',
    'collection/c/js-array-tricks',
    'collection/c/js-comparison',
    'collection/c/react-testing',
    'collection/c/js-generators',
    'collection/c/cheatsheets',
  ],
};

export const mainListingConfig = {
  name: 'Snippets & Articles',
  splash: 'laptop-plant.png',
  description:
    '30 seconds of code provides a curated collection of short code snippets for all your development needs. Our collection spans many topics, ranging from simple coding problems to theoretical concepts and development techniques.',
};

export const content = {
  repositories,
  collections,
  snippets,
  authors,
  languages,
  tags,
  collectionListingConfig,
  mainListingConfig,
};
