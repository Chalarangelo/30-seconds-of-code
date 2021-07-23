# Contribution Guidelines

**30 seconds of code** is powered by the community, so feel free to contribute in any way you can to help us!

## How you can help

- Submit pull requests with new snippets (see guidelines below) or snippet updates (tags, descriptions, explanations, typos, examples, code improvements).
- Open issues for things you want to see added, modified, discuss ideas or help out with existing issues.

## Ground rules

Breaking any of these rules will result in your pull request being closed. Please follow these guidelines above all else:

- **Always be polite and respectful to others** and try to follow the advice of the moderators/collaborators/owners.
- **Only modify snippet files**, never modify the generated files in the `blog_data` directory, except for the `blog_authors.json` file.
- **Use the snippet template** to create new snippets, ensure they have the correct name and are in the correct location.
- **Follow snippet format exactly**, otherwise your snippets will not be recognized correctly by the tools responsible for publishing them on the website. This includes such things as spacing and empty lines - if you accidentally make a mistake, consult the repository's [snippet template](snippet-template.md).
- **Snippets should solve real-world problems**, no matter how simple and should be abstract enough to be applied to different scenarios.

## Snippet creation

In order to create a new snippet, you should follow the steps below:

- Create a copy of the [snippet template](snippet-template.md) in the `blog_posts` directory.
- Change the name of the newly created file to the name of your snippet.
- Edit the file, adding your snippet based on the guidelines.

## Snippet guidelines

- Snippets must have all their frontmatter sections (title, tags etc.) filled.
- Snippet filenames must roughly correspond to the snippet title and be in `kebab-case`.
- Snippet titles must be short enough and correspond to the type of the snippet. Titles for each type must follow the format of previous snippets (e.g. `The trickiest thing about X` for a story, `X things that are awesome` for a list, `How do I do X in Y?` for a question).
- Snippet types must be one of the following: `story`, `list`, `tip`, `cheatsheet` or `question`.
- Snippet tags must be comma-separated. You are allowed to specify a single language tag (e.g. `react` or `javascript`), preferably as the first tag.
- Snippets must have their `firstSeen` dates formatted using [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- Snippet authors must be comma-separated and should be added in JSON format as seen in `blog_data/blog_authors.json`.
- Snippet covers must be added inside the `blog_images` directory and have the exact same name as the snippet filename. Snippet covers must be Unsplash images of appropriate theme and content and their links must be provided as part of the PR, so that they can be added to the appropriate collection.
- Snippet excerpts must be a very short description of the snippet's content, up to 180 characters in length. The excerpt must contain some of the main keywords and a general intro to the snippet, as it will be used for social sharing and previewing the snippet itself.
- Snippets that are of the `list` type must be written as such, check previously submitted snippets for more details.
- Snippet code and examples must be enclosed in appropriate, language-tagged blocks, be short and use modern techniques and features. Also make sure to test your code before submitting. Always use soft tabs (2 spaces), never hard tabs.
- Snippets with code examples should follow the related language repository's guidelines in regards to code formatting and conventions.
