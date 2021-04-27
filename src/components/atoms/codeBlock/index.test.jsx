import { render, cleanup } from '@testing-library/react';
import CodeBlock from './index';
import { codeBlockHtml } from 'fixtures/html';
import { javascript } from 'fixtures/languages';

describe('<CodeBlock />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <CodeBlock
        language={javascript}
        htmlContent={codeBlockHtml}
        className='special'
      />
    ).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('pre')).toHaveLength(1);
  });

  it('should append language class', () => {
    expect(
      wrapper.querySelectorAll(`pre.language-${javascript.short}`)
    ).toHaveLength(1);
  });

  it('should append passed classes', () => {
    expect(wrapper.querySelectorAll('pre.special')).toHaveLength(1);
  });

  it('should correctly set the data-code-language', () => {
    expect(
      wrapper.querySelectorAll(`pre[data-code-language="${javascript.long}"]`)
    ).toHaveLength(1);
  });

  it('should render passed HTML', () => {
    expect(wrapper.innerHTML).toContain(
      `<span class="token function-variable function">compose</span>`
    );
    expect(wrapper.innerHTML).toContain(
      `<span class="token parameter">f<span class="token punctuation">,</span>`
    );
    expect(wrapper.innerHTML).toContain(
      `<span class="token operator">=&gt;</span> <span class="token function">f</span>`
    );
  });
});
