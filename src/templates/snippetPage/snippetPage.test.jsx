import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import SnippetPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const createStore = () => reduxCreateStore(rootReducer);

describe('<SnippetPage />', () => {
  const logoSrc = '/assets/logo.png';
  const snippet = {
    title: 'compose',
    language: { short: 'js', long: 'JavaScript' },
    tags: {
      primary: 'function',
      all: ['function', 'recursion'],
    },
    expertise: 'intermediate',
    html: {
      description: '<p>Performs right-to-left function composition.</p>',
      fullDescription: '<p>Performs right-to-left function composition.</p>\n<p> Use <code class="language-text"> Array.prototype.reduce()</code> to perform right-to-left function composition.\nThe last(rightmost) function can accept one or more arguments; the remaining functions must be unary.</p>',
      code: '<span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">((</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)));</span>',
      example: '<span class="token keyword">const</span> <span class="token function-variable function">add5</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class= "token keyword" >const</span> <span class="token function-variable function">multiply</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token parameter">x<span class="token punctuation">,</span> y</span> <span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">*</span> y <span class="token punctuation" >;</span >\n<span class="token keyword">const</span> multiplyAndAdd5 <span class="token operator" >=</span > <span class="token function">compose</span> <span class="token punctuation">(</span>add5 <span class="token punctuation" >,</span >multiply<span class="token punctuation" >);</span >\n<span class="token function">multiplyAndAdd5</span> <span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">);</span> <span class="token comment">// 15</span>',
    },
    code: {
      src: 'const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));',
      example: '',
    },
  };
  let wrapper, shell, meta, linkBack, snippetCard;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ createStore() }>
        <SnippetPage pageContext={ { snippet } } logoSrc={ logoSrc } />
      </Provider>
    );
    shell = wrapper.find('Shell');
    meta = wrapper.find('Meta');
    linkBack = wrapper.find('LinkBackAnchor');
    snippetCard = wrapper.find('SnippetCard');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a LinkBackAnchor component', () => {
      expect(wrapper).toContainMatchingElement('LinkBackAnchor');
    });

    it('a SnippetCard component', () => {
      expect(wrapper).toContainMatchingElement('SnippetCard');
    });

    it('the toast container', () => {
      expect(wrapper).toContainMatchingElement('div#toast-container');
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('logoSrc')).toBe(logoSrc);
    expect(shell.prop('isSearch')).toBe(false);
    expect(shell.prop('isList')).toBe(false);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('logoSrc')).toBe(logoSrc);
    expect(meta.prop('title')).toBe(snippet.title);
    expect(meta.prop('description')).toBe(snippet.description);
  });

  it('should pass a link to the LinkBackAnchor component', () => {
    expect(linkBack.prop('link')).not.toBe(undefined);
  });

  it('should pass the snippet data to the SnippetCard component', () => {
    expect(snippetCard.prop('snippet')).toEqual(snippet);
  });

  it('should pass the toast container to the SnippetCard component', () => {
    expect(snippetCard.prop('toastContainer')).toEqual('toast-container');
  });
});

