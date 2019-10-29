import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import CssSnippetCard from './index';
console.warn = jest.fn();
console.log = jest.fn();

configure({ adapter: new Adapter() });

describe('<CssSnippetCard />', () => {
  const snippet = {
    id: 'snippet/compose',
    title: 'compose',
    language: { short: 'css', long: 'CSS' },
    tags: {
      primary: 'function',
      all: ['function', 'recursion'],
    },
    expertise: 'intermediate',
    browserSupport: {
      supportPercentage: 96.51,
    },
    html: {
      description: '<p>Performs right-to-left function composition.</p>',
      fullDescription: '<p>Performs right-to-left function composition.</p>\n<p> Use <code class="language-text"> Array.prototype.reduce()</code> to perform right-to-left function composition.\nThe last(rightmost) function can accept one or more arguments; the remaining functions must be unary.</p>',
      htmlCode: '<span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">="</span>my-special-snippet<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>Hi!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>',
      cssCode: `<span class="token selector">.my-special-snippet</span> <span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>`,
      jsCode: 'console.log("hello");',
      browserSupport: '<ul><li><a href="https://caniuse.com/#feat=css-animation">https://caniuse.com/#feat=css-animation</a></li></ul>',
    },
    code: {
      html: '<p class="my-special-snippet">Hi</p>',
      css: `.my-special-snippet {
        background: red;
        color: white;
      }`,
      js: 'console.log("hello");',
      scopedCss: `[data-scope="my-special-snippet"] .my-special-snippet {
        background: red;
        color: white;
      }`,
    },
  };
  let wrapper, card, expertise, tagList,
    browserSupport, snippetPreview, codepenButton,
    codeBlocks;

  beforeEach(() => {
    wrapper = mount(
      <CssSnippetCard snippet={ snippet } />
    );
    card = wrapper.find('Card');
    expertise = wrapper.find('Expertise');
    tagList = wrapper.find('TagList');
    browserSupport = wrapper.find('BrowserSupport');
    snippetPreview = wrapper.find('SnippetPreview');
    codepenButton = wrapper.find('CodepenButton');
    codeBlocks = wrapper.find('CodeBlock');
  });

  describe('should render', () => {
    it('a Card component', () => {
      expect(wrapper).toContainMatchingElement('Card');
    });

    it('the card title', () => {
      expect(card).toContainMatchingElement('h4.card-title');
    });

    it('an Expertise component', () => {
      expect(card).toContainMatchingElement('Expertise');
    });

    it('a TagList component', () => {
      expect(card).toContainMatchingElement('TagList');
    });

    it('the card description', () => {
      expect(card).toContainMatchingElement('.card-description');
    });

    it('the card preview content', () => {
      expect(card).toContainMatchingElement('.card-preview-content');
    });

    it('a SnippetPreview component', () => {
      expect(card).toContainMatchingElement('SnippetPreview');
    });

    it('a CodepenButton component', () => {
      expect(card).toContainMatchingElement('CodepenButton');
    });

    it('the card source content', () => {
      expect(card).toContainMatchingElement('.card-source-content');
    });

    it('three CodeBlock components', () => {
      expect(card).toContainMatchingElements(3, 'CodeBlock');
    });
  });

  it('should have the correct card title', () => {
    expect(card.find('h4.card-title').text()).toBe(snippet.title);
  });

  it('should pass the expertise data to the Expertise component', () => {
    expect(expertise.prop('level')).toBe(snippet.expertise);
  });

  it('should pass the tags data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(...snippet.tags.all);
  });

  it('should pass the language data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(snippet.language.long);
  });

  it('should render the correct explanation', () => {
    expect(card.find('.card-description').html()).toContain(snippet.html.fullDescription);
  });

  it('should pass the browser support data to the BrowserSupport component', () => {
    expect(browserSupport.prop('supportPercentage')).toBe(snippet.browserSupport.supportPercentage);
    expect(browserSupport.prop('browserSupportHtml')).toBe(snippet.html.browserSupport);
  });

  it('should pass the snippet code data to the SnippetPreview component', () => {
    expect(snippetPreview.prop('scopeId')).toBe(snippet.id.slice(snippet.id.lastIndexOf('/') + 1));
    expect(snippetPreview.prop('scopedCss')).toBe(snippet.code.scopedCss);
    expect(snippetPreview.prop('htmlCode')).toBe(snippet.code.html);
    expect(snippetPreview.prop('jsCode')).toBe(snippet.code.js);
  });

  it('should pass the snippet code data to the CodepenButton component', () => {
    expect(codepenButton.prop('cssCode')).toBe(snippet.code.css);
    expect(codepenButton.prop('htmlCode')).toBe(snippet.code.html);
    expect(codepenButton.prop('jsCode')).toBe(snippet.code.js);
  });

  it('should pass the html data to the first CodeBlock component', () => {
    expect(codeBlocks.at(0).prop('htmlContent')).toBe(snippet.html.htmlCode);
  });

  it('should pass the css data to the first CodeBlock component', () => {
    expect(codeBlocks.at(1).prop('htmlContent')).toBe(snippet.html.cssCode);
  });

  it('should pass the js data to the first CodeBlock component', () => {
    expect(codeBlocks.at(2).prop('htmlContent')).toBe(snippet.html.jsCode);
  });
});

