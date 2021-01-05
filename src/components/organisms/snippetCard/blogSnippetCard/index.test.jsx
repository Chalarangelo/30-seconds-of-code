import React from 'react';
import { renderConnected } from 'test/utils';
import { cleanup } from '@testing-library/react';
import BlogSnippetCard from './index';
import { fullBlogSnippet } from 'fixtures/snippets';

console.warn = jest.fn();
console.error = jest.fn();
console.log = jest.fn();

describe('<BlogSnippetCard />', () => {
  let wrapper, card, tagList;

  beforeEach(() => {
    wrapper = renderConnected(<BlogSnippetCard snippet={fullBlogSnippet} />)
      .container;
    card = wrapper.querySelector('.card');
    tagList = wrapper.querySelector('.tag-list');
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
      expect(card.querySelectorAll('.tag-list')).toHaveLength(1);
    });

    it('the card description', () => {
      expect(card.querySelectorAll('.card-description')).toHaveLength(1);
    });

    it('the card actions', () => {
      expect(card.querySelectorAll('.card-actions')).toHaveLength(1);
    });

    it('the card meta info', () => {
      expect(card.querySelectorAll('.card-meta-info')).toHaveLength(1);
    });
  });

  it('should have the correct card title', () => {
    expect(card.querySelector('h1.card-title').textContent).toBe(
      fullBlogSnippet.title
    );
  });

  it('should pass the tags data to the TagList component', () => {
    const tagsText = tagList.textContent.toLowerCase();
    fullBlogSnippet.tags.all.forEach(tag => {
      expect(tagsText).toContain(tag.toLowerCase());
    });
  });

  it('should render the correct explanation', () => {
    expect(card.querySelector('.card-description').innerHTML).toContain(
      fullBlogSnippet.html.fullDescription
    );
  });

  it('should render the correct cover', () => {
    expect(card.querySelector('img').src).toContain(fullBlogSnippet.cover);
  });

  describe('with multiple auhors', () => {
    beforeEach(() => {
      wrapper = renderConnected(
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
      expect(card.querySelectorAll('.card-meta-info')).toHaveLength(1);
    });
  });

  describe('without a cover', () => {
    beforeEach(() => {
      wrapper = renderConnected(
        <BlogSnippetCard snippet={{ ...fullBlogSnippet, cover: '' }} />
      ).container;
      card = wrapper.querySelector('.card');
    });

    it('should not render a cover', () => {
      expect(card.querySelectorAll('img')).toHaveLength(0);
    });
  });
});
