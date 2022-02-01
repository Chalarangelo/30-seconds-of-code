import { renderWithContext } from 'test/utils';
import { cleanup } from '@testing-library/react';
import BlogSnippetCard from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

const fullBlogSnippet = SnippetFactory.create('FullBlogSnippet');

describe('<BlogSnippetCard />', () => {
  let wrapper, card, tagList;

  beforeEach(() => {
    wrapper = renderWithContext(<BlogSnippetCard snippet={fullBlogSnippet} />)
      .container;
    card = wrapper.querySelector('.card');
    tagList = wrapper.querySelector('.card-subtitle');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Card component', () => {
      expect(wrapper.querySelectorAll('.card')).toHaveLength(1);
    });

    it('the card title', () => {
      expect(card.querySelectorAll('h1.card-title')).toHaveLength(1);
    });

    it('a TagList component', () => {
      expect(card.querySelectorAll('.card-subtitle')).toHaveLength(1);
    });

    it('the card description', () => {
      expect(card.querySelectorAll('.card-description')).toHaveLength(1);
    });

    it('the card actions', () => {
      expect(card.querySelectorAll('.card-actions')).toHaveLength(1);
    });

    it('the card meta info', () => {
      expect(card.querySelectorAll('h1 + div')).toHaveLength(1);
    });
  });

  it('should have the correct card title', () => {
    expect(card.querySelector('h1.card-title').textContent).toBe(
      fullBlogSnippet.title
    );
  });

  it('should pass the tags data to the TagList component', () => {
    const tagsText = tagList.textContent;
    expect(expect(tagsText).toContain(fullBlogSnippet.tags));
  });

  it('should render the correct explanation', () => {
    expect(card.querySelector('.card-description').innerHTML).toContain(
      fullBlogSnippet.fullDescription
    );
  });

  it('should render the correct cover', () => {
    expect(card.querySelector('img').src).toContain(fullBlogSnippet.cover);
  });

  describe('with multiple authors', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <BlogSnippetCard
          snippet={{
            ...fullBlogSnippet,
            authors: [fullBlogSnippet.authors[0], fullBlogSnippet.authors[0]],
          }}
        />
      ).container;
      card = wrapper.querySelector('.card');
    });

    it('should render the appropriate meta info', () => {
      expect(card.querySelectorAll('h1 + div')).toHaveLength(1);
    });
  });
});
