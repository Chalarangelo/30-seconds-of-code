import { quickParseTokens as tokenize } from '#utils/search';

class Omnisearch extends HTMLElement {
  searchIndex = {};
  searchIndexInitialized = false;
  open = false;

  constructor() {
    super();
    this.innerHTML = `
      <div class='omnisearch-overlay grid hidden'>
        <div class='omnisearch-wrapper srfc-01db br-md'>
          <div class='omnisearch-box-wrapper relative a-center flex txt-100 icon px-4 py-2'>
            <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M53.3333 18.6667C34.1875 18.6667 18.6667 34.1875 18.6667 53.3333C18.6667 72.4792 34.1875 88 53.3333 88C72.4792 88 88 72.4792 88 53.3333C88 34.1875 72.4792 18.6667 53.3333 18.6667ZM8 53.3333C8 28.2964 28.2964 8 53.3333 8C78.3702 8 98.6667 28.2964 98.6667 53.3333C98.6667 78.3702 78.3702 98.6667 53.3333 98.6667C28.2964 98.6667 8 78.3702 8 53.3333Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M84.2288 82.3621C86.3116 80.2793 89.6884 80.2793 91.7712 82.3621L115.771 106.362C117.854 108.445 117.854 111.822 115.771 113.905C113.688 115.987 110.312 115.987 108.229 113.905L84.2288 89.9046C82.146 87.8218 82.146 84.4449 84.2288 82.3621Z" fill="currentColor"/>
            </svg>
            <input
              class='omnisearch-box srfc-inset py-1 px-2 box-border'
              type='search'
              placeholder='Search...'
              aria-label='Search snippets and collections'
            />
            <button class='omnisearch-close btn icon-btn action-btn m-0 p-0'>
              <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M90.7523 97.8234C92.7049 99.776 95.8708 99.776 97.8234 97.8234C99.776 95.8708 99.776 92.705 97.8234 90.7523L70.9533 63.8823L97.8234 37.0123C99.776 35.0596 99.776 31.8938 97.8234 29.9412C95.8708 27.9886 92.7049 27.9886 90.7523 29.9412L63.8823 56.8112L37.0122 29.9412C35.0596 27.9885 31.8938 27.9885 29.9411 29.9412C27.9885 31.8938 27.9885 35.0596 29.9411 37.0122L56.8112 63.8823L29.9411 90.7524C27.9885 92.705 27.9885 95.8708 29.9411 97.8234C31.8937 99.7761 35.0596 99.7761 37.0122 97.8234L63.8823 70.9534L90.7523 97.8234Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class='omnisearch-results p-4'>
            ${this.createEmptyStateHTML()}
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.overlay = document.querySelector('.omnisearch-overlay');
    this.searchBox = document.querySelector('.omnisearch-box');
    this.results = document.querySelector('.omnisearch-results');
    this.closeButton = document.querySelector('.omnisearch-close');

    document.querySelector('.search-box').addEventListener('click', () => {
      this.openOmnisearch();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.isOpen) this.closeOmniSearch();
    });
    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.closeOmniSearch();
    });
    this.searchBox.addEventListener('keyup', e => {
      if (!this.searchIndexInitialized || !this.isOpen) return;
      const query = e.target.value;
      const results = this.searchByKeyphrase(query);
      if (results.length > 0) this.displayResults(results);
      else if (query.length <= 1) this.displayEmptyState();
      else this.displayNotFoundState(query);
    });
    this.closeButton.addEventListener('click', () => {
      this.closeOmniSearch();
    });
  }

  prepareSearchIndex() {
    if (!this.searchIndexInitialized)
      fetch('/search-data.json')
        .then(data => data.json())
        .then(json => {
          this.searchIndex = json.searchIndex;
          this.searchIndexInitialized = true;
        });
  }

  openOmnisearch() {
    this.prepareSearchIndex();
    this.isOpen = true;
    this.overlay.classList.remove('hidden');
    this.searchBox.focus();
    document.body.classList.add('scroll-lock');
  }

  closeOmniSearch() {
    this.isOpen = false;
    this.overlay.classList.add('hidden');
    document.body.classList.remove('scroll-lock');
  }

  displayResults(results) {
    const { snippets, collections } = results;

    this.results.innerHTML = `
      ${
        collections.length
          ? this.createResultsHTML('Collections', collections)
          : ''
      }
      ${snippets.length ? this.createResultsHTML('Snippets', snippets) : ''}
    `;
  }

  displayEmptyState() {
    this.results.innerHTML = this.createEmptyStateHTML();
  }

  displayNotFoundState(query) {
    this.results.innerHTML = this.createNotFoundStateHTML(query);
  }

  createResultsHTML(title, results) {
    return `
      <h2 class='fs-xs lh-tight md:fs-sm txt-100 m-0'>${title}</h2>
      <ul class='px-0 mx-0 gap-2 flex flex-col mb-6'>
        ${results.map(this.createResultHTML).join('')}
      </ul>
    `;
  }

  createResultHTML(result) {
    return `
      <li class='omnisearch-result flex py-1.5 px-2 relative'>
        <h3 class='txt-200 lh-tight fs-sm md:fs-md f-clamp m-0'><a class='lnk-inherit lnk-no-animation lnk-fill-parent' href=${result.url}>
          ${result.title}
        </a></h3>
        <span class='fs-xs txt-050'>${result.tag}</span>
      </li>
      `;
  }

  createEmptyStateHTML() {
    return `<p class='mx-0 my-2 fs-sm md:fs-md'>Start typing a keyphrase to see matching snippets.</p>`;
  }

  createNotFoundStateHTML(query) {
    const escapedQuery = query
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return `<p class='mx-0 my-2 fs-sm md:fs-md'>
      We couldn't find any results for the keyphrase <span class='txt-200'>${escapedQuery}</span class='omnisearch-query'>.
    </p>`;
  }

  searchByKeyphrase(keyphrase) {
    let q = keyphrase.toLowerCase().trim();
    if (q.length <= 1) return [];
    let results = [];
    if (q.length) {
      let t = tokenize(q);
      if (t.length && this.searchIndex && this.searchIndex.length) {
        results = this.searchIndex
          .map(snippet => {
            snippet.score =
              t.reduce(
                (acc, tkn) =>
                  snippet.searchTokens.indexOf(tkn) !== -1 ? acc + 1 : acc,
                0
              ) / t.length;
            return snippet;
          })
          .filter(snippet => snippet.score > 0.3)
          .sort((a, b) => b.score - a.score);
      }
    }
    results = results.reduce(
      (acc, result) => {
        if (result.type === 'collection') acc.collections.push(result);
        else acc.snippets.push(result);
        return acc;
      },
      { collections: [], snippets: [], length: results.length }
    );
    // Limit to 5 collections and 100 snippets
    results.collections = results.collections.slice(0, 5);
    results.snippets = results.snippets.slice(0, 100);
    return results;
  }
}

customElements.define('omni-search', Omnisearch);
