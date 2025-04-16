import { BaselineStatus } from 'https://cdn.jsdelivr.net/npm/baseline-status@1/baseline-status.min.js';
import styles from '../styles/baseline-support.css' with { type: 'css' };

class BaselineSupport extends BaselineStatus {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('interactive', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.adoptedStyleSheets.push(styles);
  customElements.define('baseline-support', BaselineSupport);
});
