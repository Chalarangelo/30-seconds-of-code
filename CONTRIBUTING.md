# Contribution guidelines

**30 seconds of CSS** is a community effort, so feel free to contribute in any way you can. Every contribution helps!

Here's what you can do to help:

- Submit [pull requests](https://github.com/30-seconds/30-seconds-of-css/pulls) with snippets and tests that you have created (see below for guidelines).
- [Open issues](https://github.com/30-seconds/30-seconds-of-css/issues/new) for things you want to see added or modified.
- Be part of the discussion by helping out with [existing issues](https://github.com/30-seconds/30-seconds-of-css/issues).
- Tag uncategorized snippets by adding the appropriate in the snippet's frontmatter in `tags`.
- Fix typos in existing snippets, improve snippet descriptions and explanations or provide better examples.

### Snippet submission and Pull request guidelines

- **DO NOT MODIFY THE README.md FILE!** Make changes to individual snippet files. **Travis CI** will automatically build the `README.md` file when your pull request is merged.
- **Snippet filenames** must correspond to the title of the snippet. For example, if your snippet is titled `awesomeSnippet` the filename should be `awesomeSnippet.md`.
  - Use `camelCase` or `kebab-case`, not `snake_case`.
  - Avoid capitalization of words, except if the whole word is capitalized (e.g. `URL` should be capitalized in the filename and the snippet title).
- **Snippet metadata** must be included in all snippets in the form of frontmatter.
  - All snippets must contain a title.
  - All snippets must contain tags, prefixed with `tags:` and separated by commas (optional spaces in-between).
  - Make sure the first tag in your snippet's tags is one of the main categories, as seen in the `README.md` file or the website.
  - Snippet tags must include a difficulty setting (`beginner`, `intermediate` or `advanced`), preferably at the end of the list.
- **Snippet titles** should be the same as the name of the function that is present in the snippet.
  - All snippet titles must be prefixed with `title:` and be at the very first line of your snippet's frontmatter.
  - Snippet titles must be unique (although if you cannot find a better title, just add some placeholder at the end of the filename and title and we will figure it out).
  - Follow snippet titles with an empty line.
- **Snippet descriptions** must be short and to the point. Try to explain _what_ the snippet does and _how_ the snippet works and what Javascript features are used. Remember to include what functions you are using and why.
  - Follow snippet descriptions with an empty line.
- **Snippet code** must be enclosed inside ` ```html `, ` ```css ` or ` ```js ` and ` ``` `.
  - Remember to start your snippet's code on a new line below the opening backticks.
  - Please use Javascript [Semi-Standard Style](https://github.com/Flet/semistandard).
  - Try to keep your snippet's code short and to the point. Use modern techniques and features. Make sure to test your code before submitting.
  - Try to make your snippet's name unique, so that it does not conflict with existing snippets.
- **Snippet explanations** should be written as lists of points, describing the implemented functionality.
  - Use unordered lists if you have a few points, otherwise use an ordered list.
  - If you have JavaScript functionality in your snippet, it might be worthwhile separating the explanation with it, by adding a new list or a horizontal line break (`---`).
- **Snippet browser support** should be specified as a list of links to https://www.caniuse.com/ features.
  - Use the `#` next to the feature that you want in the website to get a link to it.
- Snippets should be short. If your snippet is long, you can still submit it, and we can help you shorten it or figure out ways to improve it.
- Snippets _should_ solve real-world problems, no matter how simple.
- Snippets _should_ be abstract enough to be applied to different scenarios.
- You can start creating a new snippet, by using the [snippet template](snippet-template.md) to format your snippets.
