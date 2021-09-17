import { renderWithContext } from 'test/utils';
import { cleanup } from '@testing-library/react';
import CssSnippetCard from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

const fullCssSnippet = SnippetFactory.create('FullCssSnippet');
const fullCssWithJsSnippet = SnippetFactory.create('FullCssSnippet', 'with js');

describe('<CssSnippetCard />', () => {
  let wrapper, card, tagList, snippetPreview, codeBlocks;

  beforeEach(() => {
    wrapper = renderWithContext(<CssSnippetCard snippet={fullCssSnippet} />)
      .container;
    card = wrapper.querySelector('.card');
    tagList = wrapper.querySelector('.card-subtitle');
    snippetPreview = wrapper.querySelector('.snippet-preview');
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

    it('the card preview content', () => {
      expect(card.querySelectorAll('.card-preview-content')).toHaveLength(1);
    });

    it('a SnippetPreview component', () => {
      expect(card.querySelectorAll('.snippet-preview')).toHaveLength(1);
    });

    it('a CodepenButton component', () => {
      expect(card.querySelectorAll('.btn.icon-codepen')).toHaveLength(1);
    });

    it('the card source content', () => {
      expect(card.querySelectorAll('.card-source-content')).toHaveLength(1);
    });

    it('three CodeBlock components', () => {
      expect(card.querySelectorAll('pre')).toHaveLength(2);
    });

    it('the card actions', () => {
      expect(card.querySelectorAll('.card-actions')).toHaveLength(1);
    });
  });

  it('should have the correct card title', () => {
    expect(card.querySelector('h1.card-title').textContent).toBe(
      fullCssSnippet.title
    );
  });

  it('should pass the tags data to the TagList component', () => {
    const tagsText = tagList.textContent.toLowerCase();
    fullCssSnippet.tags.all.forEach(tag => {
      expect(tagsText).toContain(tag.toLowerCase());
    });
  });

  it('should pass the language data to the TagList component', () => {
    expect(tagList.textContent.toLowerCase()).toContain(
      fullCssSnippet.language.long.toLowerCase()
    );
  });

  it('should render the correct explanation', () => {
    expect(card.querySelector('.card-description').innerHTML).toContain(
      fullCssSnippet.html.fullDescription
    );
  });

  it('should pass the snippet code data to the SnippetPreview component', () => {
    expect(snippetPreview.dataset.scope).toBe(
      fullCssSnippet.id.slice(fullCssSnippet.id.lastIndexOf('/') + 1)
    );
    expect(snippetPreview.innerHTML).toContain(fullCssSnippet.code.scopedCss);
    expect(snippetPreview.innerHTML).toContain(fullCssSnippet.code.html);
  });

  it('should pass the html data to the first CodeBlock component', () => {
    expect(codeBlocks[0].innerHTML).toBe(fullCssSnippet.html.html);
  });

  it('should pass the css data to the first CodeBlock component', () => {
    expect(codeBlocks[1].innerHTML).toBe(fullCssSnippet.html.css);
  });

  describe('including JS code', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <CssSnippetCard snippet={fullCssWithJsSnippet} />
      ).container;
      card = wrapper.querySelector('.card');
      tagList = wrapper.querySelector('.card-subtitle');
      snippetPreview = wrapper.querySelector('.snippet-preview');
      codeBlocks = wrapper.querySelectorAll('pre');
    });

    it('should render three CodeBlock components', () => {
      expect(card.querySelectorAll('pre')).toHaveLength(3);
    });

    it('should pass the js data to the first CodeBlock component', () => {
      expect(codeBlocks[2].innerHTML).toBe(fullCssWithJsSnippet.html.js);
    });
  });
});
