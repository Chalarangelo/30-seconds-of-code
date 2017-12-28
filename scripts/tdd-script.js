const fs = require('fs-extra');

const SNIPPETS_PATH = '../snippets';
const TEST_PATH = '../test';

const snippetFiles = fs.readdirSync(SNIPPETS_PATH, 'utf8')
                       .map(fileName => fileName.slice(0, -3));

snippetFiles
  .map(fileName => { fs.ensureDirSync(`${TEST_PATH}/${fileName}`); return fileName})
  .map(fileName => { 
    const fileData = fs.readFileSync(`${SNIPPETS_PATH}/${fileName}.md`, 'utf8');
    const fileCode = fileData.slice( fileData.indexOf('```js'), fileData.lastIndexOf('```') + 3 ); 
    const blockMarkers = fileCode.split('\n').map((line, lineIndex) => line.slice(0, 3) === '```' ? lineIndex : '//CLEAR//').filter(x => !(x === '//CLEAR//'))
    const fileFunction = fileCode.split('\n').map(line => line.trim()).filter((_, i) => blockMarkers[0] < i && i < blockMarkers[1]);
    const fileExample = fileCode.split('\n').map(line => line.trim()).filter((_, i) => blockMarkers[2] < i && i < blockMarkers[3]);
    const exportFile = `module.exports = ${fileFunction.join('\n').slice(17)}`;

    fs.writeFileSync(`${TEST_PATH}/${fileName}/${fileName}.js`, exportFile);

    return fileName; 
  })
