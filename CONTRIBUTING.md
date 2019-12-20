# Contribution Guidelines

**30 seconds of blog** is a community effort, so feel free to contribute in any way you can. Every contribution helps!

Here's what you can do to help:

- Submit [pull requests](https://github.com/30-seconds/30-seconds-blog/pulls) with snippets that you have created (see below for guidelines).
- [Open issues](https://github.com/30-seconds/30-seconds-blog/issues/new) for things you want to see added or modified.
- Be part of the discussion by helping out with [existing issues](https://github.com/30-seconds/30-seconds-blog/issues).
- Fix typos in existing snippets, improve snippet descriptions and explanations or provide better examples.

### Snippet submission and Pull request guidelines

- **DO NOT MODIFY THE FILES INSIDE THE snippet_data DIRECTORY!** Doing so will result in your Pull Request being closed immediately.
- **Snippet filenames** must closely resemble the title of the snippet. For example, if your snippet is titled `### My Snippet` the filename should be `my-snippet.md`.
- **Snippet metadata** must be included in all snippets in the form of frontmatter.
  - All snippets must contain a title.
  - All snippets must contain tags, prefixed with `tags:` and separated by commas (optional spaces in-between).
  - Make sure the first tag in your snippet's tags is one of the main categories, as seen in the website.
  - Snippet tags must include a difficulty setting (`begginer`, `intermediate` or `advanced`), preferrably at the end of the list.
- **Snippet titles** should be the same as the name of the main entity that is present in the snippet.
  - All snippet titles must be prefixed with `title:` and be at the very first line of your snippet's frontmatter.
  - Snippet titles must be unique (although if you cannot find a better title, just add some placeholder at the end of the filename and title and we will figure it out).
  - Follow snippet titles with an empty line.
- **Snippet descriptions** must be short and to the point. Try to explain _what_ the snippet does and _how_ the snippet works and what language features are used. Remember to include what functions/methods/classes you are using and why.
  - Follow snippet descriptions with an empty line.
- **Snippet code** must be enclosed inside ` ```blog ` and ` ``` `.
  - Remember to start your snippet's code on a new line below the opening backticks.
  - Use standard function notation to define your snippet.
  - Please indent with 2 spaces per indentation level. This helps keep the format consistent across the website and increases readability.
  - Try to keep your snippets' code short and to the point. Use modern techniques and features. Make sure to test your code thoroughly before submitting.
  - All snippets must be followed by one (more if necessary) test case after the code, in a new block enclosed inside ` ```blog ` and ` ``` `. Use multiline examples only if necessary.
  - Try to make your snippet name unique, so that it does not conflict with existing snippets.
- Snippets should be as brief as possible, without sacrificing functionality. If your snippet seems longer than most, you can still submit it, and we can help you shorten it or figure out ways to improve it.
- Snippets _should_ solve real-world problems, no matter how simple.
- Snippets _should_ be abstract enough to be applied to different scenarios.
- You can start creating a new snippet, by using the [snippet template](snippet-template.md) to format your snippets.
