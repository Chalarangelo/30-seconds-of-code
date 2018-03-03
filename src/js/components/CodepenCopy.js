import { selectAll } from '../deps/utils'

const snippets = selectAll('.snippet')
snippets.forEach(snippet => {
  var codepenForm = document.createElement('form');
  codepenForm.action = 'https://codepen.io/pen/define';
  codepenForm.method = 'POST';
  codepenForm.target = '_blank';
  var codepenInput = document.createElement('input');
  codepenInput.type = 'hidden';
  codepenInput.name = 'data';
  var codepenButton = document.createElement('button');
  codepenButton.classList = 'btn is-large codepen-btn';
  codepenButton.innerHTML = 'View on Codepen';
  var css = snippet.querySelector('pre code.lang-css');
  var html = snippet.querySelector('pre code.lang-html');
  var js = snippet.querySelector('pre code.lang-js');
  console.log(css);
  codepenInput.value = `{
    "title": "${snippet.querySelector('h3 > span').textContent}",
    "css": "${css.textContent}"
    ${html ? `,"html" : "${html.textContent.replace(/"/g, "&apos;")}"` : ''}
    ${js ? `,"js" : "${js.textContent.replace(/"/g, "&apos;")}"` : ''}
  }`.replace(/"/g, "&quot;");//, html: ${html}, css: ${css}, js: ${js}}`;
  codepenForm.appendChild(codepenInput);
  codepenForm.appendChild(codepenButton);
  snippet.appendChild(codepenForm);
});
