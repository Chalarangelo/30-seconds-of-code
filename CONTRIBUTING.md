# Contribution Guidelines

**30 seconds of code** is powered by the community, so feel free to contribute in any way you can to help us!

## How you can help

- Participate in community Discussions.
- Submit Pull Requests with new snippets or collections.
- Submit Issues or Pull Requests related to bugs, improvements, typos etc.

## Ground rules

Breaking any of these rules will result in your pull request being closed. Please follow these guidelines above all else:

- **Always be polite and respectful to others** and try to follow the advice of the moderators/collaborators/owners.
- **Only create or modify snippet and collecton files**, never touch the `assets` or `languages` directories or any of the files in the root directory.
- **Use existing templates for snippets and collections**, ensuring to follow guidelines and that files are in the correct location.
- **Follow snippet and collection format exactly**, otherwise your content will not be recognized correctly by the tools responsible for publishing them on the website. Consult the templates or previous snippets/collections if you are unsure.
- **Snippets should solve real-world problems**, no matter how simple and should be abstract enough to be applied to different scenarios.
- **Stories should cover topics of interest to the community**, be well-written and concise, providing code examples as necessary.
- **Collections should be tied together by a common theme**, covering a narrow topic and providing a good number of snippets.

## Snippet creation

In order to create a new snippet, you should follow the steps below:

- Create a copy of the snippet or story template in the relevant subdirectory of the `snippets` directory and move it under the `s` directory.
- Change the name of the newly created file to the name of your snippet.
- Edit the file, adding your snippet based on the guidelines.

## Snippet guidelines

- Snippet must follow [these general writing guidelines](https://github.com/30-seconds/brand-and-design/blob/master/writing-guidelines.md).
- Snippets must have all their frontmatter sections (title, tags, cover etc.) filled.
- Snippet filenames must be in `kebab-case` and end in `.md`. Use SEO-friendly names and avoid unnecessary words.
- Snippet titles must loosely correspond to the filename and follow the language and repository's naming conventions.
- Snippet tags must be comma-separated, contain a primary tag as seen on the website as their first tag.
- Snippets must include a cover image from the `assets/cover` directory, without the file extension.
- Snippets must have their `dateModified` dates formatted using [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- Snippet descriptions must be short and to the point. Explain *what* the snippet does and detail *how* the snippet works and the language features used in it.
- Snippet code and examples must be enclosed in appropriate, language-tagged blocks as shown in the snippet template, be short and use modern techniques and features. Also make sure to test your code before submitting.
- Try to strike a balance between readability, brevity, and performance.
- Always use soft tabs (2 spaces), never hard tabs.
- Leave a single space after a comma (`,`) character (both in the description and code).
- Define multiple variables on the same line, if possible. Use meaningful variable names (e.g. `letter` instead of `lt`) and follow existing conventions as seen in other snippets. Do not use trailing or leading underscores in variable names.
- Whenever appropriate, an excerpt should be used to provide a short summary of the snippet. Excerpts should be up to 140 characters long and end in a period (`.`).
- Do not add or edit the `author` field in the frontmatter. This is reserved for organization members only.

## Collection creation

In order to create a new collection, you should follow the steps below:

- Create a copy of the collection template in the `collections` directory and move it under the relevant subdirectory.
- Change the name of the newly created file to the name of your collection.
- Edit the file, adding your collection based on the guidelines.

## Collection guidelines

- Collections must habe all their metadata sections (title, splash, description etc.) filled.
- Collection filenames must be in `kebab-case` and end in `.yaml`. Use SEO-friendly names and avoid unnecessary words.
- Collection titles must loosely correspond to the filename and follow the language and repository's naming conventions.
- Collection descriptions must be short and to the point. Briefly explain the topic of the collection.
- Collection splashes must be images from the `assets/splash` directory, with the file extension.
- Collections must contain at least 3 snippets.
