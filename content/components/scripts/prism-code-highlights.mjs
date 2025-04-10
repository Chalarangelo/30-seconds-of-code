import styles from '../styles/prism-code-highlights.css' with { type: 'css' };

document.addEventListener('DOMContentLoaded', () => {
  document.adoptedStyleSheets.push(styles);
});
