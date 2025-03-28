class TableOfContents extends HTMLElement {
  constructor() {
    super();

    this.observer = null;
    this.current = null;
    this.timeout = null;
    this.links = [...this.querySelectorAll('a')];
    this.observableElements = document.querySelectorAll(
      'main > article > :is(h2, h3, h4) > a[id]'
    );

    this.observe();

    window.addEventListener('resize', () => {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.observe(), 200);
    });
  }

  updateCurrent(entries) {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;

      const link = this.links.find(link => link.hash === '#' + target.id);
      if (!link || this.current === link) continue;

      this.current?.removeAttribute('aria-current');
      link.setAttribute('aria-current', 'true');
      this.current = link;
      break;
    }
  }

  observe() {
    if (this.observer) return;

    this.observer = new IntersectionObserver(
      entries => this.updateCurrent(entries),
      { rootMargin: this.getRootMargin() }
    );

    this.observableElements.forEach(el => this.observer.observe(el));
  }

  getRootMargin() {
    return `-32px 0% ${128 - document.documentElement.clientHeight}px`;
  }
}

customElements.define('table-of-contents', TableOfContents);
