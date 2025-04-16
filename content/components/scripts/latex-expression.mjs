import katex from 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.mjs';
import katexStyles from 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.css' with { type: 'css' };
import styles from '../styles/latex-expression.css' with { type: 'css' };

class LatexExpression extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    try {
      const innerFigure = this.querySelector('figure');
      const otherChildren = [...this.children].filter(
        child => child.tagName !== 'FIGURE' && child.tagName !== 'PRE'
      );
      const tex = innerFigure?.innerText || this.innerText;
      const rendered = katex.renderToString(tex, {
        displayMode: true,
        output: 'html',
        throwOnError: true,
      });
      const figure = document.createElement('figure');
      figure.innerHTML = rendered;
      figure.setAttribute('aria-hidden', 'true');

      if (otherChildren.length) {
        const figcaption = document.createElement('figcaption');
        otherChildren.forEach(child => {
          figcaption.appendChild(child);
        });
        figure.appendChild(figcaption);
      }

      this.innerHTML = '';
      this.appendChild(figure);

      this.setAttribute('interactive', 'true');
    } catch {
      this.setAttribute('aria-hidden', 'true');
      this.setAttribute('interactive', 'error');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.adoptedStyleSheets.push(katexStyles, styles);
  customElements.define('latex-expression', LatexExpression);
});
