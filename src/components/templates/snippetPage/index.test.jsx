import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SnippetPage from './index';
import { fullSnippet, fullBlogSnippet } from 'fixtures/snippets';
import { breadcrumbs } from 'fixtures/breadcrumbs';

describe('<SnippetPage />', () => {
  const cardTemplate = 'StandardSnippetCard';
  let wrapper, snippetCard;

  beforeEach(() => {
    const utils = renderWithContext(
      <SnippetPage
        snippet={fullSnippet}
        cardTemplate={cardTemplate}
        breadcrumbs={breadcrumbs}
        pageDescription=''
      />
    );
    wrapper = utils.container;
    snippetCard = wrapper.querySelector('.snippet-card');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a Breadcrumbs component', () => {
      expect(wrapper.querySelectorAll('.breadcrumbs')).toHaveLength(1);
    });

    it('a SnippetCard component', () => {
      expect(wrapper.querySelectorAll('.snippet-card')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(document.title).toContain(fullSnippet.title);
  });

  it('should pass the breadcrumbs to the Breadcrumbs component', () => {
    expect(wrapper.querySelector('.breadcrumbs').textContent).toContain(
      breadcrumbs[0].name
    );
  });

  it('should pass the snippet data to the SnippetCard component', () => {
    expect(snippetCard.querySelector('.card-title').textContent).toContain(
      fullSnippet.title
    );
  });

  describe('with a blog post', () => {
    beforeEach(() => {
      const utils = renderWithContext(
        <SnippetPage
          snippet={fullBlogSnippet}
          cardTemplate='BlogSnippetCard'
          pageDescription=''
          breadcrumbs={breadcrumbs}
        />
      );
      wrapper = utils.container;
    });

    it('should pass the correct logoSrc to the Meta component', () => {
      expect(
        document.head.querySelector('meta[property="og:image"]').content
      ).toContain(fullBlogSnippet.cover);
    });
  });
});
