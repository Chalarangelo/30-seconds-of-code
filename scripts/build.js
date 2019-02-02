const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const util = require("./util.js");
const markdown = require("markdown-builder");
const snippets = require("../data/snippet_data.json")

const { headers, misc, lists } = markdown;
const TAG_NAMES = [...new Set(snippets.reduce((acc,v) => [...acc,v.tags[0]],[]))].sort((a,b) => a.localeCompare(b));
console.log(TAG_NAMES);

const STATIC_PARTS_PATH = "./static-parts";

let startPart = "";
let endPart = "";
let output = "";

const detailsTOC = (title, snippetsArray) =>
  `\n${misc
    .collapsible(
      title,
      lists
        .ul(snippetsArray, snippet =>
          misc.link(
            snippet.title
              .replace("\n", "")
              .split("```")[0]
              .trim(),
            misc.anchor(
              snippet.title
                .replace("\n", "")
                .split("```")[0]
                .trim()
            )
          )
        )
        .trim()
    )
    .trim()}\n\n`;

console.time("Builder");

try {
  startPart = fs.readFileSync(
    path.join(STATIC_PARTS_PATH, "README-start.md"),
    "utf8"
  );
  endPart = fs.readFileSync(
    path.join(STATIC_PARTS_PATH, "README-end.md"),
    "utf8"
  );
} catch (err) {
  console.log(`${chalk.red("ERROR!")} During static part loading: ${err}`);
  process.exit(1);
}

try {
  // add static part for start
  output += `${startPart}\n`;

  const snippetsInTag = {};

  TAG_NAMES.forEach(tag => snippetsInTag[tag] = snippets.filter(v => v.tags[0] == tag));

  // write Table of Contents
  TAG_NAMES.forEach(tag => {
    const taggedSnippets = snippetsInTag[tag];
    output += headers.h3(util.capitalize(tag));
    output += detailsTOC("View contents", taggedSnippets);
  });

  // delimeter after TOC
  output += misc.hr();

  // write actual snippets
  TAG_NAMES.forEach(tag => {
    output += headers.h2(util.capitalize(tag));
    const taggedSnippets = snippetsInTag[tag];
    taggedSnippets.forEach(snippet => {
      output += headers.h3(snippet.title).trim();
      output += `\n\n${snippet.text}${snippet.codeBlocks.slice(0,-1)}`;
      if (snippet.notes && snippet.notes.length) {
        output += headers.h4('Notes');
        output += `\n${snippet.notes}`;
      }
      output += misc.collapsible('Examples', snippet.codeBlocks.slice(-1));
      //output += detailsQuestion("View answer", question)
      output += `\n<br>${misc.link(
        "⬆ Back to top",
        misc.anchor("Table of Contents")
      )}\n\n`
    })
  })

  // add static part for end
  output += `\n${endPart}\n`

  fs.writeFileSync("README.md", output)
} catch (err) {
  console.log(`${chalk.red("ERROR!")} During README generation: ${err}`)
  process.exit(1)
}

console.log(`${chalk.green("SUCCESS!")} README file generated!`)
console.timeEnd("Builder")