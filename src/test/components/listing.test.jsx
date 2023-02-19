import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/reactUtils';
import ListingPage from 'components/templates/listingPage';
import { chipItems } from 'test/fixtures/listingChips';
import { snippetList, previewSnippet } from 'test/fixtures/snippet';
import { paginator } from 'test/fixtures/paginator';

describe('<ListingPage />', () => {
  const listingName = 'Snippet list';
  const pageDescription = 'Browse 100 snippets on 30 seconds of code';
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(
      <ListingPage
        snippetList={snippetList}
        paginator={paginator}
        listingName={listingName}
        pageDescription={pageDescription}
        listingSublinks={chipItems}
        listingCover='/splash.png'
      />
    ).container;
  });

  afterEach(cleanup);

  it('has the correct metadata', () => {
    expect(document.title).toContain(listingName);
  });

  it('renders correctly', () => {
    expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    expect(wrapper.querySelector('.page-title').textContent).toBe(listingName);
  });

  it('renders the correct listing chips', () => {
    expect(wrapper.querySelectorAll('.listing-chips')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.listing-chips a')).toHaveLength(
      chipItems.length
    );
    expect(wrapper.querySelectorAll('.selected')).toHaveLength(1);
  });

  it('renders the correct paginator', () => {
    expect(wrapper.querySelectorAll('.paginator a.btn')).toHaveLength(4);
    expect(wrapper.querySelectorAll('.btn.previous-page')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.btn.next-page')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.paginator span')).toHaveLength(1);
  });

  it('paginator links have the correct "rel" attributes', () => {
    expect(
      wrapper.querySelector('.btn.previous-page').getAttribute('rel')
    ).toBe('prev');
    expect(wrapper.querySelector('.btn.next-page').getAttribute('rel')).toBe(
      'next'
    );
  });

  it('renders the correct preview card list', () => {
    expect(wrapper.querySelectorAll('.list-card')).toHaveLength(
      snippetList.length
    );
    const card = wrapper.querySelector('.list-card');
    expect(card.querySelector('h3.card-title').textContent).toBe(
      previewSnippet.title
    );
    expect(card.querySelector('a').href).toContain(previewSnippet.url);
    expect(card.textContent).toContain(previewSnippet.tags);
    expect(card.querySelector('p').innerHTML).toContain(
      previewSnippet.description
    );
  });
});
