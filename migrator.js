const snippets = require('./snippet_data/snippets.json');
const fs = require('fs-extra');
const path = require('path');

snippets.data.forEach(snippet => {
  fs.writeFileSync(
    path.join(
      snippet.meta.archived ? './snippets_archive' : './snippets', 
      `${snippet.attributes.fileName}`),
`---
title: ${snippet.id}
tags: ${snippet.attributes.tags.join(',')}
---

${snippet.attributes.text}

\`\`\`js
${snippet.attributes.codeBlocks.es6}
\`\`\`

\`\`\`js
${snippet.attributes.codeBlocks.example}
\`\`\``);
});