import { quickParseTokens as tokenize } from 'utils/search';

class Omnisearch extends HTMLElement {
  searchIndex = {};
  searchIndexInitialized = false;
  open = false;

  constructor() {
    super();
    this.innerHTML = `
      <div class='omnisearch-overlay grid hidden'>
        <div class='omnisearch-wrapper srfc-01db br-md'>
          <div class='omnisearch-box-wrapper relative a-center flex txt-100 icon icon-search before:fs-sm px-4 py-2'>
            <input
              class='omnisearch-box srfc-inset py-1 px-2 box-border'
              type='search'
              placeholder='Search...'
              aria-label='Search snippets and collections'
            />
            <button class='omnisearch-close btn icon-btn action-btn icon icon-close'></button>
          </div>
          <div class='omnisearch-results p-4'>
            ${this.createEmptyStateHTML()}
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.searchBox = document.querySelector('.search-box');
    this.omnisearchOverlay = document.querySelector('.omnisearch-overlay');
    this.omnisearchBox = document.querySelector('.omnisearch-box');
    this.omnisearchResults = document.querySelector('.omnisearch-results');
    this.omnisearchClose = document.querySelector('.omnisearch-close');

    this.searchBox.addEventListener('click', () => {
      this.openOmnisearch();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.open) this.closeOmniSearch();
    });
    this.omnisearchOverlay.addEventListener('click', e => {
      if (e.target === this.omnisearchOverlay) this.closeOmniSearch();
    });
    this.omnisearchBox.addEventListener('keyup', e => {
      const query = e.target.value;
      if (!this.searchIndexInitialized || !this.open) return;
      const results = this.searchByKeyphrase(query);
      if (results.length > 0) this.displayResults(results);
      else if (query.length <= 1) this.displayEmptyState();
      else this.displayNotFoundState(query);
    });
    this.omnisearchClose.addEventListener('click', () => {
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
    this.open = true;
    this.omnisearchOverlay.classList.remove('hidden');
    this.omnisearchBox.focus();
    document.body.classList.add('scroll-lock');
  }

  closeOmniSearch() {
    this.open = false;
    this.omnisearchOverlay.classList.add('hidden');
    document.body.classList.remove('scroll-lock');
  }

  displayResults(results) {
    const { snippets, collections } = results;

    let resultsHTML = '';

    if (collections.length) {
      resultsHTML += `
        <h2 class='omnisearch-result-title fs-sm txt-100 m-0'>Collections</h2>
        <ul class='px-0 mx-0 gap-2 flex flex-col mb-6'>
          ${collections.map(this.createResultHTML).join('')}
        </ul>
      `;
    }
    if (snippets.length) {
      resultsHTML += `
        <h2 class='omnisearch-result-title fs-sm txt-100 m-0'>Snippets</h2>
        <ul class='px-0 mx-0 gap-2 flex flex-col'>
          ${snippets.map(this.createResultHTML).join('')}
        </ul>
      `;
    }

    this.omnisearchResults.innerHTML = resultsHTML;
  }

  displayEmptyState() {
    this.omnisearchResults.innerHTML = this.createEmptyStateHTML();
  }

  displayNotFoundState(query) {
    this.omnisearchResults.innerHTML = this.createNotFoundStateHTML(query);
  }

  createResultHTML(result) {
    return `
      <li class='omnisearch-result flex py-1.5 px-2 relative'>
        <h3 class='txt-200 fs-md f-clamp m-0'><a class='inherit no-animation fill-parent' href=${
          result.url
        }>
          ${result.shortTitle || result.title}
        </a></h3>
        <span class='fs-xs txt-050'>${result.searchResultTag}</span>
      </li>
      `;
  }

  createEmptyStateHTML() {
    return `<p class='mx-0'>Start typing a keyphrase to see matching snippets.</p>`;
  }

  createNotFoundStateHTML(query) {
    return `<p class='mx-0'>
      We couldn't find any results for the keyphrase <span class='txt-200'>${query}</span class='omnisearch-query'>.
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
          .sort((a, b) => b.score - a.score)
          .slice(0, 100);
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
    // Limit to 5 results
    results.collections = results.collections.slice(0, 5);
    return results;
  }
}

customElements.define('omni-search', Omnisearch);
