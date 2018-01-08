## Contributing

**30 seconds of code-python** is a community effort, so feel free to contribute in any way you can. Every contribution helps!

Here's what you can do to help:

- [Open issues](https://github.com/kriadmin/30-seconds-of-code-python/issues/new) for things you want to see added or modified.
- Be part of the discussion by helping out with [existing issues](https://github.com/kriadmin/30-seconds-of-code-python/issues) or talking on our [gitter channel](https://gitter.im/30-seconds-of-code-python/Lobby).
- Submit [pull requests](https://github.com/kriadmin/30-seconds-of-code-python/pulls) with snippets you have created (see below for guidelines).
- Fix typos in existing snippets, improve snippet descriptions and explanations or provide better examples.

### Snippet submission and Pull request guidelines

- **DO NOT MODIFY THE README.md FILE!** Make changes to individual snippet files. You can optionally run `npm run builder` to update the README.md file automatically, based on the changes you have made.
- **DO NOT MODIFY THE index.html FILE!** Make changes to individual snippet files. You can optionally run `npm run webber` to update the index.md file automatically, based on the changes you have made.
- **Snippet filenames** must correspond to the title of the snippet. For example, if your snippet is titled `### awesomeSnippet` the filename should be `awesomeSnippet.md`.
  - Use `camelCase`, not `kebab-case` or `snake_case`.
  - Avoid capitalization of words, except if the whole word is capitalized (e.g. `URL` should be capitalized in the filename and the snippet title).
- **Snippet titles** should have be the same as the name of the function that is present in the snippet.
  - All snippet titles must be prefixed with `###` and be at the very first line of your snippet.
  - Snippet titles must be unique (although if you cannot find a better title, just add some placeholder at the end of the filename and title and we will figure it out).
  - Follow snippet titles with an empty line.
- **Snippet descriptions** must be short and to the point. Try to explain *what* the snippet does and *how* the snippet works and what Javascript features are used. Remember to include what functions you are using and why.
  - Follow snippet descriptions with an empty line.
- **Snippet code** must be enclosed inside ` ```python ` and ` ``` `.
  - Remember to start your snippet's code on a new line below the opening backticks.
  - Please follow [This Style Guide](https://www.python.org/dev/peps/pep-0008/).
  - Try to keep your snippets' code short and to the point. Use modern techniques and features. Make sure to test your code before submitting.
  - All snippets must be followed by one (more if necessary) test case after the code, in a new block enclosed inside ` ```python ` and ` ``` `. The syntax for this is `myFunction('testInput') # 'testOutput'`. Use multiline examples only if necessary.
  - Try to make your function name unique, so that it does not conflict with existing snippets.
  - Snippet functions do not have to handle errors in input, unless it's necessary (e.g. a mathematical function that cannot be extended to negative numbers should handle negative input appropriately).
- Snippets should be short (usually below 20 - 30 lines). If your snippet is longer than that, you can still submit it, and we can help you shorten it or figure out ways to improve it.
- Snippets *should* solve real-world problems, no matter how simple.
- Snippets *should* be abstract enough to be applied to different scenarios.
- It is not mandatory but highly appreciated if you provide **test cases** and/or performance tests.
- You can start creating a new snippet, by using the [snippet template](snippet-template.md) to format your snippets.
- Updating the README.md file should only be done by altering the scripts in the **scripts** folder or altering their relative static parts in the **static-parts** folder.

<!--
### Additional guidelines and conventions regarding snippets

- When describing snippets, refer to methods, using their full name. For example, use `Array.reduce()`, instead of `reduce()`.
- If your snippet contains argument with default parameters, explain what happens if they are omitted when calling the function and what the default case is.
- If your snippet uses recursion, explain the base cases.
- If your variable is not changed anywhere in the code name it in uppercase.
- Use `camelCase` for function and variable names if they consist of more than one word.
- Try to give meaningful names to variables. For example use `letter`, instead of `lt`. Some exceptions to convention are:
  - `arr` for arrays (usually as the snippet function's argument).
  - `str` for strings.
  - `n` for a numeric value (usually as the snippet function's argument).
  - `val` or `v` for value (usually when iterating a list, mapping, sorting etc.).
  - `i` for indexes.
  - `func` for function arguments.
  - `nums` for arrays of numbers.
- Use `()` if your function takes no arguments.
- Specify default parameters for arguments, if necessary. It is preferred to put default parameters last unless you have pretty good reason not to.
- If your snippet's function takes variadic arguments, use `...args` (although in certain cases, it might be needed to use a different name).
- Always use single quotes for string literals.
- Prefer using the ternary operator (`trueResult if condition else falseResult`) instead of `if else` statements whenever possible.
- Avoid nesting ternary operators (but you can do it if you feel like you should).
- You should define multiple variables on the same line (e.g. `x,y = 0,1`) on the same line whenever possible.
- Do not use trailing or leading underscores in variable names(unless it is a helper function).
- Use lambda functions as much as possible, except when you can't.
- Leave a single space after a comma (`,`) character.
- Try to strike a balance between readability, brevity, and performance.
- Never use `eval()`. Your snippet will be disqualified immediately.-->
