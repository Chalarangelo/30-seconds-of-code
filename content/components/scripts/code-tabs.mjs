import styles from '../styles/code-tabs.css' with { type: 'css' };

class CodeTabs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.prepareTabs();

    window.addEventListener('resize', () => {
      this.style.cssText = this.cssAtributes;
      this.maxScrollWidth = this.scrollWidth;
      this.setAttribute('scrollable-left', this.canScrollLeft);
      this.setAttribute('scrollable-right', this.canScrollRight);
      if (!this.scrollable) this.scrollLeft = 0;
    });

    this.addEventListener('scroll', () => {
      this.style.cssText = this.cssAtributes;
      this.setAttribute('scrollable-left', this.canScrollLeft);
      this.setAttribute('scrollable-right', this.canScrollRight);
    });

    this.addEventListener('click', e => {
      if (e.target.tagName === 'SUMMARY') {
        const details = e.target.parentElement;
        const isOpen = details.hasAttribute('open');

        if (isOpen) e.preventDefault();
      }
    });

    this.setAttribute('interactive', 'true');
  }

  prepareTabs() {
    const codeBlocks = [...this.querySelectorAll('pre')];
    const selectedTab = Number.parseInt(this.dataset.selectedTab ?? '0', 10);

    this.name = (
      this.querySelector('details > summary')?.innerText ?? crypto.randomUUID()
    )
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-');

    [...this.children].forEach(child => child.remove());

    this.tabs = [];

    codeBlocks.forEach(codeBlock => {
      const tab = document.createElement('details');
      const tabHandler = document.createElement('summary');
      const label =
        codeBlock.dataset.codeTitle || codeBlock.dataset.codeLanguage;

      tabHandler.innerText = label;
      tab.setAttribute('name', this.name);
      tab.appendChild(tabHandler);
      tab.appendChild(codeBlock);
      this.appendChild(tab);
      this.tabs.push(tab);
    });

    this.maxScrollWidth = this.scrollWidth;
    this.style.cssText = this.cssAtributes;
    this.tabs[selectedTab].setAttribute('open', 'true');
    requestAnimationFrame(() => {
      this.maxScrollWidth = this.scrollWidth;
      this.setAttribute('scrollable-left', false);
      this.setAttribute('scrollable-right', this.scrollable);
    });
  }

  get containerWidth() {
    return this.getBoundingClientRect().width;
  }

  get scrollable() {
    return this.scrollWidth > this.clientWidth;
  }

  get canScrollRight() {
    return (
      this.scrollable &&
      Math.ceil(this.scrollLeft) <
        Math.ceil(this.maxScrollWidth - this.clientWidth)
    );
  }

  get canScrollLeft() {
    return this.scrollable && this.scrollLeft > 0;
  }

  get scrollRightOffset() {
    return Math.ceil(
      Math.min(this.scrollLeft + this.clientWidth, this.maxScrollWidth)
    );
  }

  get scrollLeftOffset() {
    return Math.floor(this.scrollLeft);
  }

  get cssAtributes() {
    return [
      `--code-tabs_tab-count: ${this.tabs.length}`,
      `--code-tabs_container-width: ${this.containerWidth}px`,
      `--code-tabs_scroll-right-offset: ${this.scrollRightOffset}px`,
      `--code-tabs_scroll-left-offset: ${this.scrollLeftOffset}px`,
    ].join(';');
  }
}

class CodeTabsUnsupported extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('interactive', 'unsupported');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if the browser supports the ::details-content pseudo-element. If
  // not, do not make the component interactive at all or load the styles. Use
  // the unsupported version instead, to prevent the error message.
  if (!CSS.supports('selector(::details-content)')) {
    customElements.define('code-tabs', CodeTabsUnsupported);
    return;
  }

  document.adoptedStyleSheets.push(styles);
  customElements.define('code-tabs', CodeTabs);
});
