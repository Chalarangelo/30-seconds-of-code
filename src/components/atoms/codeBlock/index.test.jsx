import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CodeBlock from './index';

import { codeBlockHtml } from 'fixtures/html';
import { javascript } from 'fixtures/languages';

configure({ adapter: new Adapter() });

describe('<CodeBlock />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CodeBlock language={ javascript } htmlContent={ codeBlockHtml } className='special'/>);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('pre');
  });

  it('should append language class', () => {
    expect(wrapper).toContainMatchingElement(`pre.language-${javascript.short}`);
  });

  it('should append passed classes', () => {
    expect(wrapper).toContainMatchingElement('pre.special');
  });

  it('should correctly set the data-code-language', () => {
    expect(wrapper).toContainMatchingElement(`pre[data-code-language="${javascript.long}"]`);
  });

  it('should render passed HTML', () => {
    expect(wrapper.html()).toContain(`<span class="token function-variable function">compose</span>`);
    expect(wrapper.html()).toContain(`<span class="token parameter">f<span class="token punctuation">,</span>`);
    expect(wrapper.html()).toContain(`<span class="token operator">=&gt;</span> <span class="token function">f</span>`);
  });

});

