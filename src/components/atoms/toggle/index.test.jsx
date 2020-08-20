import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Toggle from './index';

describe('<Toggle />', () => {
  let wrapper, toggle;
  const innerText = 'Toggle me!';
  let mockOnChangeCallback = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <Toggle onChange={ mockOnChangeCallback }>
        { innerText }
      </Toggle>
    ).container;
    toggle = wrapper.querySelector('input');
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('.toggle')).toHaveLength(1);
    expect(wrapper.querySelectorAll('label > input[type="checkbox"]')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.toggle-switch')).toHaveLength(1);
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toBe(innerText);
  });

  describe('when clicked', () => {
    beforeEach(() => {
      fireEvent.click(toggle);
    });

    it('should call passed callback on click event', () => {
      expect(mockOnChangeCallback.mock.calls.length).toBeGreaterThan(0);
    });
  });
});

