import React from 'react';
import { renderWithContext } from 'test/utils';
import { cleanup } from '@testing-library/react';
import literals from 'lang/en/client/common';
import SnippetCard from './index';
import { fullSnippet, fullReactSnippet } from 'fixtures/snippets';

describe('<SnippetCard />', () => {
  let wrapper, card, tagList, codeBlocks;

  beforeEach(() => {
    wrapper = renderWithContext(<SnippetCard snippet={fullSnippet} />)
      .container;
    card = wrapper.querySelector('.card');
    tagList = wrapper.querySelector('.card-subtitle');
    codeBlocks = wrapper.querySelectorAll('pre');
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

    it('the card source content', () => {
      expect(card.querySelectorAll('.card-source-content')).toHaveLength(1);
    });

    it('the card examples title', () => {
      expect(card.querySelectorAll('h5.card-example-title')).toHaveLength(1);
    });

    it('two CodeBlock components', () => {
      expect(card.querySelectorAll('pre')).toHaveLength(2);
    });

    it('the card code', () => {
      expect(card.querySelectorAll('.card-code')).toHaveLength(1);
    });

    it('the card examples', () => {
      expect(card.querySelectorAll('.card-example')).toHaveLength(1);
    });

    it('a CopyButton component', () => {
      expect(card.querySelectorAll('.btn.icon-clipboard')).toHaveLength(1);
    });

    it('the card actions', () => {
      expect(card.querySelectorAll('.card-actions')).toHaveLength(1);
    });
  });

  it('should have the correct card title', () => {
    expect(card.querySelector('h1.card-title').textContent).toBe(
      fullSnippet.title
    );
  });

  it('should pass the expertise data to the TagList component', () => {
    expect(tagList.textContent.toLowerCase()).toContain(
      fullSnippet.expertise.toLowerCase()
    );
  });

  it('should pass the tags data to the TagList component', () => {
    const tagsText = tagList.textContent.toLowerCase();
    fullSnippet.tags.all.forEach(tag => {
      expect(tagsText).toContain(tag.toLowerCase());
    });
  });

  it('should pass the language data to the TagList component', () => {
    expect(tagList.textContent.toLowerCase()).toContain(
      fullSnippet.language.long.toLowerCase()
    );
  });

  it('should render the correct explanation', () => {
    expect(card.querySelector('.card-description').innerHTML).toContain(
      fullSnippet.html.fullDescription
    );
  });

  it('should have the appropriate examples title', () => {
    expect(card.querySelector('.card-example-title').textContent).toBe(
      literals.examples
    );
  });

  it('should pass the code data to the first CodeBlock component', () => {
    expect(codeBlocks[0].innerHTML).toBe(fullSnippet.html.code);
  });

  it('should pass the example data to the seconds CodeBlock component', () => {
    expect(codeBlocks[1].innerHTML).toBe(fullSnippet.html.example);
  });

  describe('with additional languages', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SnippetCard snippet={fullReactSnippet} />)
        .container;
    });

    it('should render a CodepenButton', () => {
      expect(wrapper.querySelectorAll('.btn.icon-codepen')).toHaveLength(1);
    });
  });
});
