import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PreviewCard from './index';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';

console.warn = jest.fn();
console.error = jest.fn();

describe('<PreviewCard />', () => {
  let wrapper, card, expertise, anchor, tags;

  beforeEach(() => {
    wrapper = render(<PreviewCard snippet={previewSnippet} />).container;
    anchor = wrapper.querySelector('a');
    card = wrapper.querySelector('.card');
    expertise = wrapper.querySelector('.expertise');
    tags = wrapper.querySelector('.card-subtitle');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('an anchor element', () => {
      expect(wrapper.querySelectorAll('a')).toHaveLength(1);
    });

    it('a li element with the approprite classes', () => {
      expect(wrapper.querySelectorAll('li.card.preview-card')).toHaveLength(1);
    });

    it('the card title', () => {
      expect(card.querySelectorAll('h3.card-title')).toHaveLength(1);
    });

    it('an Expertise component', () => {
      expect(card.querySelectorAll('.expertise')).toHaveLength(1);
    });

    it('the card description', () => {
      expect(card.querySelectorAll('.card-description')).toHaveLength(1);
    });
  });

  it('should have the correct card title', () => {
    expect(card.querySelector('h3.card-title').textContent).toBe(
      previewSnippet.title
    );
  });

  it('should pass the expertise data to the Expertise component', () => {
    expect(expertise.className).toContain(
      previewSnippet.expertise.toLowerCase()
    );
  });

  it('should pass the appropriate tags to the TagList component', () => {
    const tagsText = tags.textContent.toLowerCase();
    expect(tagsText).toContain(previewSnippet.language.toLowerCase());
    expect(tagsText).toContain(previewSnippet.primaryTag.toLowerCase());
  });

  it('should render the correct description', () => {
    expect(card.querySelector('.card-description').innerHTML).toContain(
      previewSnippet.description
    );
  });

  it('should link to the correct url', () => {
    expect(anchor.href).toContain(previewSnippet.url);
  });

  describe('with a blog snippet', () => {
    beforeEach(() => {
      wrapper = render(<PreviewCard snippet={previewBlogSnippet} />).container;
      tags = wrapper.querySelector('.card-subtitle');
    });

    it('should pass the appropriate tags to the TagList component', () => {
      const tagsText = tags.textContent.toLowerCase();
      expect(tagsText).toContain(previewBlogSnippet.primaryTag.toLowerCase());
      expect(tagsText).toContain(previewBlogSnippet.expertise.toLowerCase());
    });
  });
});
