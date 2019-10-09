import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CodeBlock from './index';

configure({ adapter: new Adapter() });

describe('<CodeBlock />', () => {
  let wrapper;
  const htmlContent = '<span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">((</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)));</span>';
  const language = 'js';

  beforeEach(() => {
    wrapper = mount(<CodeBlock language={ language } htmlContent={ htmlContent } className='special'/>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('pre');
  });

  it('should append language class', () => {
    expect(wrapper).toContainMatchingElement(`pre.language-${language}`);
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('pre.special');
  });

  it('should render passed HTML', () => {
    expect(wrapper.html()).toContain(`<span class="token function-variable function">compose</span>`);
    expect(wrapper.html()).toContain(`<span class="token parameter">f<span class="token punctuation">,</span>`);
    expect(wrapper.html()).toContain(`<span class="token operator">=&gt;</span> <span class="token function">f</span>`);
  });

});

