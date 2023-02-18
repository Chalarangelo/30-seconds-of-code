import { renderWithContext } from 'test/utils';
import { cleanup } from '@testing-library/react';
import SnippetCard from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

const fullSnippet = SnippetFactory.create('FullSnippet');
const fullReactSnippet = SnippetFactory.create('FullReactSnippet');
const fullCssSnippet = SnippetFactory.create('FullCssSnippet');
const fullCssWithJsSnippet = SnippetFactory.create('FullCssSnippet', 'with js');
const fullBlogSnippet = SnippetFactory.create('FullBlogSnippet');

global.navigator.clipboard = {
  writeText: jest.fn(),
};

describe('<SnippetCard />', () => {
  let wrapper, card, snippetPreview, codeBlocks;

  afterEach(cleanup);

  describe('with a regular snippet', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SnippetCard snippet={fullSnippet} />)
        .container;
      card = wrapper.querySelector('.card');
      codeBlocks = wrapper.querySelectorAll('pre');
    });

    describe('should render', () => {
      it('a Card component', () => {
        expect(wrapper.querySelectorAll('.card')).toHaveLength(1);
      });

      it('the card title', () => {
        expect(card.querySelectorAll('h1.card-title')).toHaveLength(1);
      });

      it('a TagList component', () => {
        expect(card.querySelectorAll('.card-title + p')).toHaveLength(1);
      });

      it('the card description', () => {
        expect(card.querySelectorAll('.card-description')).toHaveLength(1);
      });

      it('the card source content', () => {
        expect(card.querySelectorAll('.card-source-content')).toHaveLength(1);
      });

      it('two CodeBlock components', () => {
        expect(card.querySelectorAll('pre')).toHaveLength(2);
      });

      it('the card code blocks', () => {
        expect(card.querySelectorAll('.card-code')).toHaveLength(2);
      });

      it('a CopyButton component', () => {
        expect(
          card.querySelectorAll('.btn.icon-clipboard').length
        ).toBeGreaterThanOrEqual(1);
      });

      it('the card actions', () => {
        expect(card.querySelectorAll('.card-actions')).toHaveLength(1);
      });

      it('should render a github link', () => {
        expect(wrapper.querySelectorAll('.icon-github')).toHaveLength(1);
      });
    });

    it('should have the correct card title', () => {
      expect(card.querySelector('h1.card-title').textContent).toBe(
        fullSnippet.title
      );
    });

    it('should pass the tags data to the TagList component', () => {
      expect(expect(card.textContent).toContain(fullSnippet.tags));
    });

    it('should render the correct explanation', () => {
      expect(card.querySelector('.card-description').innerHTML).toContain(
        fullSnippet.fullDescription
      );
    });

    it('should pass the code data to the first CodeBlock component', () => {
      expect(codeBlocks[0].innerHTML).toBe(
        fullSnippet.codeBlocks[0].htmlContent
      );
    });

    it('should pass the example data to the seconds CodeBlock component', () => {
      expect(codeBlocks[1].innerHTML).toBe(
        fullSnippet.codeBlocks[1].htmlContent
      );
    });
  });

  describe('with a React snippet', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SnippetCard snippet={fullReactSnippet} />)
        .container;
    });

    it('should render a CodepenButton', () => {
      expect(wrapper.querySelectorAll('.btn.icon-codepen')).toHaveLength(1);
    });
  });

  describe('with a CSS snippet', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SnippetCard snippet={fullCssSnippet} />)
        .container;
      card = wrapper.querySelector('.card');
      snippetPreview = wrapper.querySelector('.snippet-preview');
      codeBlocks = wrapper.querySelectorAll('pre');
    });

    it('should render a snipet preview', () => {
      expect(card.querySelectorAll('.card-preview-content')).toHaveLength(1);
      expect(card.querySelectorAll('.snippet-preview')).toHaveLength(1);
    });

    it('should pass the snippet code data to the snippet preview', () => {
      expect(snippetPreview.dataset.scope).toBe('snippet-preview');
      expect(snippetPreview.innerHTML).toContain(fullCssSnippet.code.scopedCss);
      expect(snippetPreview.innerHTML).toContain(fullCssSnippet.code.html);
    });

    it('should render a CodepenButton', () => {
      expect(wrapper.querySelectorAll('.btn.icon-codepen')).toHaveLength(1);
    });
  });

  describe('with a CSS snippet with JS code', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SnippetCard snippet={fullCssWithJsSnippet} />
      ).container;
      card = wrapper.querySelector('.card');
      snippetPreview = wrapper.querySelector('.snippet-preview');
      codeBlocks = wrapper.querySelectorAll('pre');
    });

    it('should render three CodeBlock components', () => {
      expect(card.querySelectorAll('pre')).toHaveLength(3);
    });

    it('should pass the js data to the first CodeBlock component', () => {
      expect(codeBlocks[2].innerHTML).toBe(
        fullCssWithJsSnippet.codeBlocks[2].htmlContent
      );
    });
  });

  describe('with a blog snippet', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<SnippetCard snippet={fullBlogSnippet} />)
        .container;
      card = wrapper.querySelector('.card');
    });

    it('should render the correct cover', () => {
      expect(card.querySelector('.ar-wide').src).toContain(
        fullBlogSnippet.cover
      );
    });

    it('should render the author', () => {
      expect(card.querySelectorAll('.card-author')).toHaveLength(1);
    });
  });
});
