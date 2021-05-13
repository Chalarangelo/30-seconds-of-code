import { render, cleanup } from '@testing-library/react';
import CodeBlock from './index';

const language = {
  short: 'js',
  long: 'JavaScript',
};

const htmlContent =
  '<span class="token keyword">const</span> <span class="token function-variable function">compose</span>';

describe('<CodeBlock />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <CodeBlock
        language={language}
        htmlContent={htmlContent}
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
      wrapper.querySelectorAll(`pre.language-${language.short}`)
    ).toHaveLength(1);
  });

  it('should append passed classes', () => {
    expect(wrapper.querySelectorAll('pre.special')).toHaveLength(1);
  });

  it('should correctly set the data-code-language', () => {
    expect(
      wrapper.querySelectorAll(`pre[data-code-language="${language.long}"]`)
    ).toHaveLength(1);
  });

  it('should render passed HTML', () => {
    expect(wrapper.innerHTML).toContain(htmlContent);
  });
});
