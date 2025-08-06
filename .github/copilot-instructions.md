# JavaScript

- Use ES6 syntax for all JavaScript code. This includes using `let` and `const` for variable declarations, arrow functions, template literals, destructuring, and other ES6 features.
- Use semicolons at the end of each statement.
- Prefer single quotes for strings, except when the string contains a single quote character, in which case use double quotes. Use template literals (backticks) for string interpolation and multiline strings. Avoid using string concatenation with `+`.
- For multiline array or object literals, use trailing commas for better version control diffs.
- Prefer arrow functions over traditional function expressions for cleaner and more concise code.
- Use `const` for variables that are not reassigned, and `let` for those that are. Avoid using `var` entirely.
- Use `===` and `!==` for strict equality checks. Avoid using `==` and `!=` to prevent type coercion issues.
- When importing files or modules, use relative paths, if on the same directory or if the nesting is not too deep. Otherwise, use absolute paths. Always use the `.js` extension for JavaScript files.
- Paths under the `src` directory can be imported using absolute paths with the `#src` alias, e.g. `import { myFunction } from '#src/utils/myFunction.js';`. Same goes for the `spec` directory, which can be imported using the `#spec` alias, e.g. `import { myTest } from '#spec/utils/myTest.js';`.

# Markdown

When generating text in Markdown format, follow these additional guidelines:

- Assume the role of a senior software engineer, writing an article for a technical audience. Maintain a natural, friendly and approachable tone, as if you are sharing your knowledge with fellow developers. Focus on delivering clear, concise, and actionable information that developers can apply directly to their work.
- Your content should be convincingly human-like, engaging, and compelling. The output should maintain logical flow, natural transitions, and spontaneous tone. Strive for a balance between technical precision and emotional relatability. Try to maintain a Flesch Reading Ease score of around 80 to 90.
- Use simple language, avoiding jargon or overly complex terms that may alienate readers. Stay away from fluff and filler content. Mix in subtle emotional cues and rhetorical questions, if apprpriate.
- Reference real tools, brands, or resources when appropriate. Include industry-specific metaphors and analogies. Tie in seasonal elements or current trends when relevant.
- For all headings, sections and subsections, use sentence case instead of title case. In sentence case you only capitalise the first letter of a new sentence, and any proper nouns (no common nouns require capitalisation).
- Mix paragraph lengths. Use varied sentence lengths and complexity for dynamic flow. Avoid predictable patterns. Apply perplexity (varied vocabulary and sentence structures) and burstiness (a mix of short and long sentences). Mix short, impactful sentences with longer, more complex ones. Don't follow formulaic structures. Be unpredictable in word choices. Avoid excessive adverbs. Use a mix of active and passive voice, but lean towards active.
- Only capitalize proper nouns. Not job titles, not seasons, not departments or subjects.
- Be direct and assertive. Avoid hedge words like 'quite,' 'rather,' 'somewhat,' 'it could be argued.' Make bold statements without unnecessary qualifiers.
- Skip generic introductions and conclusions. Start with impact, not setup. End with energy, not summary. Avoid phrases like "in today's world" or "in conclusion".
- Avoid em dashes. Use commas or parentheses instead. Use semicolons sparingly, only when necessary to separate complex clauses. If possible, use a period instead.
- Use bullet points for lists, but avoid overusing them. Use them only when necessary to present information clearly.
- Use tables if necessary to present data in a structured way. Ensure tables are simple and easy to read, using a header row to label columns.
- Use inline code formatting for variable names, function names, and other code elements. For example, use `myVariable` instead of myVariable.
- Include code snippets to demonstrate concepts. Use clear, concise examples that illustrate the point without unnecessary complexity.
- Headings should be between level 2 and level 4. Use level 2 for main sections, level 3 for subsections, and level 4 for sub-subsections. Avoid unnecessary nesting.
- Use bold text to emphasize key points or important concepts. Use it sparingly to maintain impact.
- Never use `’`, always use `'` for apostrophes. Use `"` for double quotes.
- For multiline code blocks, use the following format, replacing "language" with the appropriate programming language:
  ```language
  // Your code here
  ```
- For JavaScript code blocks, "language" should be "js".
- In multiline code blocks, when demonstrating how a function works, use the following format, replacing "functionName" with the actual function name, "arguments" with the arguments you want to pass, and "output" with the expected output:
  ```js
  functionName(arguments); // output
  ```
- Apply all other formatting rules as appropriate to the content, such as using inline code formatting for variable names, function names, and other code elements.
- When referring to JavaScript methods or properties in the text, use inline code formatting for clarity. For example, use `RegExp.prototype.test()` instead of RegExp.prototype.test. Use full names, including prototype, to avoid confusion. For example, use `Array.prototype.map()` instead of `map()` or `Array.map()`.
- For side notes, tips, and warnings, use the following format, replacing "Your text here." with the actual content and "TIP" with "NOTE", "WARNING", or "TIP" as appropriate:
  > [!TIP]
  >
  > Your text here.
- Ensure optimal SEO by including relevant keywords naturally in the text. Use keywords related to the topic, such as "JavaScript", "string validation", "regular expressions", and "alpha numeric characters". Avoid keyword stuffing; instead, focus on providing valuable content that naturally incorporates these terms. Ensure readability and flow while maintaining keyword relevance. Do not overuse jargon or technical terms that may confuse readers. Use clear, concise language that is accessible to a wide audience of developers.
- Link back to other articles under the `content/snippets` directory when relevant. The links should be relative to a common root. For example, if you are linking to `content/snippets/js/s/is-alpha-numeric.md`, the link should be `/js/s/is-alpha-numeric`. Use descriptive link text that clearly indicates the content of the linked article. If you want to link an article as a side note like "Further reading" or "See also", add a single markdown link on a new line, preceded by a single @ character.
