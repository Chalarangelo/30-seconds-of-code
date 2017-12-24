/*
  Generates test files from /snippets markdown files to AVA format
  Run using `npm run tester`.
*/

const path = require('path');
const fs = require('fs');

const snippetsPath = './snippets';
const testsPath = './tests';

try {
  fs.readdirSync(snippetsPath)
    .forEach(snippet => {
      const snippetData = fs.readFileSync(path.join(snippetsPath, snippet), 'utf8');
      const originalCode = snippetData.slice(snippetData.indexOf('```js') + 5, snippetData.lastIndexOf('```'));

      const header = `import {test} from "ava";`;
      const comments = originalCode.split('\n')
        .filter(_ => _.startsWith('//'))
        .map(_ => _.replace('//', '').trim())
        .map(_ => {
          const [command, result] = _.split(' -> ');
          return {command, result};
        });
      const footer = comments
        .map((c, i) => `test("${snippet} #${i}", t => {
  t.deepEqual(${c.command}, ${c.result});
});`).join('\n\n');
      fs.writeFileSync(`${testsPath}/${snippet}.test.js`, `${header}\n${originalCode}\n${footer}`);
    });
} catch (err) {
  console.log('ERROR!', `During testing: ${err}`);
  process.exit(1);
}
