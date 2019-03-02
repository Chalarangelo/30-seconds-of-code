# Contribution Guidelines

**30 seconds of React** is a community effort, so feel free to contribute in any way you can. Every contribution helps!

Here's what you can do to help:

- Submit [pull requests](https://github.com/30-seconds/30-seconds-of-react/pulls) with snippets that you have created (see below for guidelines).
- [Open issues](https://github.com/30-seconds/30-seconds-of-react/issues/new) for things you want to see added or modified.
- Be part of the discussion by helping out with [existing issues](https://github.com/30-seconds/30-seconds-of-react/issues).
- Fix typos in existing snippets, improve snippet descriptions and explanations or provide better examples.

### Snippet submission and Pull request guidelines

- **DO NOT MODIFY THE README.md or index.html FILES!** Make changes to individual snippet files. **Travis CI** will automatically build the `README.md` and `index.html` files when your pull request is merged.
- **Snippet filenames** must correspond to the title of the snippet. For example, if your snippet is titled `### AwesomeComponent` the filename should be `AwesomeComponent.md`.
  - Use `TitleCase`, not `camelCase`, `kebab-case` or `snake_case` when naming components.
  - Avoid capitalization of words, except if the whole word is capitalized (e.g. `URL` should be capitalized in the filename and the snippet title).
- **Snippet titles** should be the same as the name of the component that is present in the snippet.
  - All snippet titles must be prefixed with `###` and be at the very first line of your snippet.
  - Snippet titles must be unique (although if you cannot find a better title, just add some placeholder at the end of the filename and title and we will figure it out).
  - Follow snippet titles with an empty line.
- **Snippet descriptions** must be short and to the point. Try to explain _what_ the snippet does and _how_ the snippet works and what Javascript/React features are used. Remember to include what functions you are using and why.
  - Follow snippet descriptions with an empty line.
- **Snippet code** must be enclosed inside ` ```jsx ` and ` ``` `.
  - If your snippet is accompanied by CSS code, enclose it inside ` ```css ` and ` ``` ` and present it before the JS/JSX code.
  - Remember to start your snippet's code on a new line below the opening backticks.
  - Use standard function notation to define your component. For example `function MyComponent(props) { ... }`.
  - Do not write components using classes, use [React Hooks](https://reactjs.org/docs/hooks-intro.html) instead.
  - Please use Javascript [Semi-Standard Style](https://github.com/Flet/semistandard).
  - Try to keep your snippets' code short and to the point. Use modern techniques and features. Make sure to test your code before submitting.
  - All snippets must be followed by one (more if necessary) test case after the code, in a new block enclosed inside ` ```jsx ` and ` ``` `. The syntax for this is `ReactDOM.render(<MyComponent />, document.getElementById("root"));`. Use multiline examples only if necessary.
  - Try to make your component name unique, so that it does not conflict with existing snippets.
- Snippets should be as brief as possible, without sacrificing functionality. If your snippet seems longer than most, you can still submit it, and we can help you shorten it or figure out ways to improve it.
- Snippets _should_ solve real-world problems, no matter how simple.
- Snippets _should_ be abstract enough to be applied to different scenarios.
- You can start creating a new snippet, by using the [snippet template](snippet-template.md) to format your snippets.

### Additional guidelines and conventions regarding snippets

- When describing snippets, refer to methods, using their full name. For example, use `Array.prototype.reduce()`, instead of `reduce()`.
- When using React Hooks, refer to the specific hooks with their full names, such as `React.useState()` and `React.useEffect()`.
- When using `React.useState()`, try matching the name of the state variable to the function that sets it. For example, use `[isShown, setIsShown]` instead of `[isShown, setShown]`.
- When using `React.useEffect()`, only return a function if you have to clean up. In that case, name that function `cleanup()`.
- Destructure your component's `props` whenever possible. If any of your props take default parameters, specify their default values in the destructured object.
- If your snippet uses recursion, explain the base cases.
- Always use `function MyComponent(props)` or `function MyComponent({ ... })` for function definitions.
- Use variables only when necessary. Prefer `const` when the values are not altered after assignment, otherwise, use `let`. Avoid using `var`.
- Use `camelCase` for function and variable names, if they consist of more than one word.
- Use `TitleCase` for component names.
- Try to give meaningful names to variables. For example use `letter`, instead of `lt`. Some exceptions to convention are:
  - `arr` for arrays (usually as the snippet function's argument).
  - `str` for strings.
  - `num` or `n` for a numeric value (usually as the snippet function's argument).
  - `el` for DOM elements (usually as the snippet function's argument).
  - `val` or `v` for value (usually when iterating a list, mapping, sorting etc.).
  - `acc` for accumulators in `Array.prototype.reduce()`.
  - `(a,b)` for the two values compared when using `Array.prototype.sort()`.
  - `i` for indexes.
  - `fn` for function arguments.
  - `nums` for arrays of numbers.
- Use `()` if your function takes no arguments.
- Use `_` if an argument inside some function (e.g. `Array.prototype.reduce()`) is not used anywhere in your code.
- Specify default parameters for arguments, if necessary. It is preferred to put default parameters last unless you have a pretty good reason not to.
- If your snippet's function takes variadic arguments, use `...args` or `...rest` (although in certain cases, it might be needed to use a different name).
- Always use soft tabs (2 spaces), never hard tabs.
- Omit curly braces (`{` and `}`) whenever possible.
- Always use single quotes for string literals. Use template literals, instead, if necessary.
- When rendering JSX, use double quotes, instead of single quotes.
- Prefer using `Array` methods whenever possible.
- Prefer `Array.prototype.concat()` instead of `Array.prototype.push()` when working with `Array.prototype.reduce()`.
- Use strict equality checking (`===` and `!==` instead of `==` and `!=`), unless you specifically have reason not to.
- Prefer using the ternary operator (`condition ? trueResult : falseResult`) instead of `if else` statements whenever possible.
- Avoid nesting ternary operators (but you can do it if you feel like you should).
- You should define multiple variables (e.g. `const x = 0, y = 0`) on the same line whenever possible.
- Do not use trailing or leading underscores in variable names.
- Use dot notation (`object.property`) for object properties, when possible. Use bracket notation (`object[variable]`) when accessing object properties using a variable.
- Use arrow functions as much as possible, except when you can't.
- Use semicolons whenever necessary.
- Leave a single space after a comma (`,`) character.
- Try to strike a balance between readability, brevity, and performance.
- Never use `eval()`. Your snippet will be disqualified immediately.
