import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import SnippetCard from './index';

configure({ adapter: new Adapter() });

describe('<SnippetCard />', () => {
  const snippet = {
    title: 'compose',
    language: { short: 'js', long: 'JavaScript' },
    tags: {
      primary: 'function',
      all: ['function', 'recursion'],
    },
    expertise: 'intermediate',
    descriptionHtml: '<p>Performs right-to-left function composition.</p>',
    explanationHtml: '<p> Use <code class="language-text"> Array.prototype.reduce()</code> to perform right-to-left function composition.\nThe last(rightmost) function can accept one or more arguments; the remaining functions must be unary.</p>',
    codeHtml: '<span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">((</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)));</span>',
    exampleHtml: '<span class="token keyword">const</span> <span class="token function-variable function">add5</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class= "token keyword" >const</span> <span class="token function-variable function">multiply</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token parameter">x<span class="token punctuation">,</span> y</span> <span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">*</span> y <span class="token punctuation" >;</span >\n<span class="token keyword">const</span> multiplyAndAdd5 <span class="token operator" >=</span > <span class="token function">compose</span> <span class="token punctuation">(</span>add5 <span class="token punctuation" >,</span >multiply<span class="token punctuation" >);</span >\n<span class="token function">multiplyAndAdd5</span> <span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">);</span> <span class="token comment">// 15</span>',
    code: 'const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));',
  };
  let wrapper, card, expertise, tagList, codeBlocks;

  beforeEach(() => {
    wrapper = mount(
      <SnippetCard snippet={ snippet } />
    );
    card = wrapper.find('Card');
    expertise = wrapper.find('Expertise');
    tagList = wrapper.find('TagList');
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

    it('the card source content', () => {
      expect(card).toContainMatchingElement('.card-source-content');
    });

    it('the card examples title', () => {
      expect(card).toContainMatchingElement('h5.card-example-title');
    });

    it('two CodeBlock components', () => {
      expect(card).toContainMatchingElements(2, 'CodeBlock');
    });

    it('the card code', () => {
      expect(card).toContainMatchingElement('.card-code');
    });

    it('the card examples', () => {
      expect(card).toContainMatchingElement('.card-example');
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

  it('should render the correct description', () => {
    expect(card.find('.card-description').html()).toContain(snippet.descriptionHtml);
  });

  it('should render the correct explanation', () => {
    expect(card.find('.card-description').html()).toContain(snippet.explanationHtml);
  });

  it('should have the appropriate examples title', () => {
    expect(card.find('.card-example-title').text()).toBe(_l('Examples'));
  });

  it('should pass the code data to the first CodeBlock component', () => {
    expect(codeBlocks.at(0).prop('htmlContent')).toBe(snippet.codeHtml);
  });

  it('should pass the example data to the seconds CodeBlock component', () => {
    expect(codeBlocks.at(1).prop('htmlContent')).toBe(snippet.exampleHtml);
  });
});

