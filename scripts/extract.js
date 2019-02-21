const fs = require("fs-extra")
const path = require("path")
const chalk = require("chalk")
const {
  attempt,
  readSnippets,
  getCodeBlocks,
  getSection,
  getTitle,
  getTextualContent
} = require("./util");

console.time("Extractor");

attempt("snippet_data.json generation", () => {
  const output = Object.entries(readSnippets()).map(([name, contents]) => {
    const title = getTitle(contents);
    const text = getTextualContent(contents);
    const codeBlocks = getCodeBlocks(contents);
    const notes = getSection("#### Notes", contents, false)
      .split("\n")
      .map(v => v.replace(/[*-] /g, ""))
      .filter(v => v.trim() !== "")
    
    return {
      name,
      title,
      text,
      codeBlocks,
      expertise: parseInt(
        (contents.match(/<!--\s*expertise:\s*\(*(.+)\)*/) || [])[1],
        10
      ),
      tags: (contents.match(/<!--\s*tags:\s*\(*(.+)\)*\s*-->/) || [])[1].split(",").map(v => v.trim()),
      notes
    }
  })

  fs.writeFileSync("./data/snippet_data.json", JSON.stringify(output, null, 2))
})

console.log(`${chalk.green("SUCCESS!")} snippet_data.json file generated!`);
console.timeEnd("Extractor");
