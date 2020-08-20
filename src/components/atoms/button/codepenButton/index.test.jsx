import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import literals from 'lang/en/client/common';
import { codepenHtmlCode, codepenCssCode } from 'fixtures/strings';
import CodepenButton from './index';

console.error = jest.fn();
jest.useFakeTimers();

describe('<CodepenButton />', () => {
  let wrapper;
  let button, input;

  beforeEach(() => {
    wrapper = render(
      <CodepenButton htmlCode={ codepenHtmlCode } cssCode={ codepenCssCode } />
    ).container;
    button = wrapper.querySelector('button');
    input = wrapper.querySelector('input');
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('form')).toHaveLength(1);
    expect(wrapper.querySelectorAll('form > input')).toHaveLength(1);
    expect(wrapper.querySelectorAll('button.btn.codepen-btn')).toHaveLength(1);
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper.querySelectorAll('button.btn.codepen-btn[title]')).toHaveLength(1);
    expect(button.title).toBe(literals.codepen);
  });

  it('should pass data to the input field', () => {
    expect(input.value).not.toBe(undefined);
  });

  describe('when clicked', () => {
    it('should play the microinteraction animation', async() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(100);
      expect(setTimeout).toHaveBeenCalled();
      await waitFor(() =>
        expect(wrapper.querySelectorAll('button.btn.codepen-btn.active')).toHaveLength(1)
      );

      fireEvent.click(button);
      jest.advanceTimersByTime(750);
      await waitFor(() =>
        expect(wrapper.querySelectorAll('button.btn.codepen-btn:not(.active)')).toHaveLength(1)
      );
    });
  });
});

