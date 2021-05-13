import { renderWithContext } from 'test/utils';
import { cleanup } from '@testing-library/react';
import literals from 'lang/en/client/common';
import CodepenButton from './index';

const codepenHtmlCode =
  '<p class="my-special-snippet">Hello, this is white on red.</p>';

const codepenCssCode = `.my-special-snippet {
  background: red;
  color: white;
}`;

jest.useFakeTimers();

describe('<CodepenButton />', () => {
  let wrapper;
  let button, input;

  beforeEach(() => {
    wrapper = renderWithContext(
      <CodepenButton htmlCode={codepenHtmlCode} cssCode={codepenCssCode} />
    ).container;
    button = wrapper.querySelector('button');
    input = wrapper.querySelector('input');
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('form')).toHaveLength(1);
    expect(wrapper.querySelectorAll('form > input')).toHaveLength(1);
    expect(wrapper.querySelectorAll('button.btn')).toHaveLength(1);
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper.querySelectorAll('button.btn[title]')).toHaveLength(1);
    expect(button.title).toBe(literals.codepen);
  });

  it('should pass data to the input field', () => {
    expect(input.value).not.toBe(undefined);
  });
});
