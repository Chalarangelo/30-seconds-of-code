import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/reactUtils';
import SnippetPage from 'components/templates/snippetPage';
import { breadcrumbs } from 'test/fixtures/breadcrumbs';
import { fullSnippet } from 'test/fixtures/snippet';

describe('<SnippetPage />', () => {
  let wrapper, snippetCard, codeBlocks;

  beforeEach(() => {
    const utils = renderWithContext(
      <SnippetPage
        snippet={fullSnippet}
        breadcrumbs={breadcrumbs}
        pageDescription=''
        recommendations={{ items: [] }}
      />
    );
    wrapper = utils.container;
    snippetCard = wrapper.querySelector('.snippet-card');
    codeBlocks = wrapper.querySelectorAll('pre');
  });

  afterEach(cleanup);

  it('has the correct metadata', () => {
    expect(document.title).toContain(fullSnippet.title);
  });

  it('renders the correct breadcrumbs', () => {
    expect(wrapper.querySelectorAll('.breadcrumbs')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.breadcrumb-item > a')).toHaveLength(
      breadcrumbs.length
    );
    expect(wrapper.querySelector('.breadcrumbs').textContent).toContain(
      breadcrumbs[0].name
    );
  });

  it('breadcrumbs links are accessible', () => {
    expect(
      wrapper.querySelectorAll('nav[aria-label="breadcrumbs"]')
    ).toHaveLength(1);
    expect(
      wrapper.querySelectorAll(
        '.breadcrumb-item:last-of-type > a[aria-current="page"]'
      )
    ).toHaveLength(1);
  });

  it('renders the correct data in the snippet card', () => {
    expect(wrapper.querySelectorAll('.card')).toHaveLength(1);
    expect(snippetCard.querySelector('.ar-wide').src).toContain(
      fullSnippet.cover
    );
    expect(snippetCard.querySelector('h1.card-title').textContent).toBe(
      fullSnippet.title
    );
    expect(snippetCard.querySelectorAll('.card-title + p')).toHaveLength(1);
    expect(expect(snippetCard.textContent).toContain(fullSnippet.tags));
    expect(snippetCard.querySelector('.card-description').innerHTML).toContain(
      fullSnippet.fullDescription
    );
    expect(snippetCard.querySelectorAll('.card-source-content')).toHaveLength(
      1
    );
    expect(codeBlocks[0].innerHTML).toBe(fullSnippet.codeBlocks[0].htmlContent);
    expect(snippetCard.querySelectorAll('.card-author')).toHaveLength(1);
    expect(snippetCard.querySelectorAll('.card-actions')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.icon-github')).toHaveLength(1);
  });

  it('renders the cover image correctly, providing a WEBP alternative', () => {
    expect(wrapper.querySelectorAll('picture')).toHaveLength(1);
    expect(wrapper.querySelector('picture img').src).toBe(fullSnippet.cover);
    expect(wrapper.querySelector('picture source').srcset).toBe(
      fullSnippet.cover.replace('jpg', 'webp')
    );
  });
});
