import React from 'react';
import { renderConnected } from 'test/utils';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import literals from 'lang/en/client/common';
import copyToClipboard from 'copy-to-clipboard';
import CopyButton from './index';

const copyToClipboardMock = jest.fn();
console.error = jest.fn();
jest.mock('copy-to-clipboard');
jest.useFakeTimers();

describe('<CopyButton />', () => {
  let wrapper;
  let button;
  const copyText = 'Lorem ipsum';

  beforeAll(() => {
    copyToClipboard.mockImplementation(copyToClipboardMock);
  });

  beforeEach(() => {
    wrapper = renderConnected(
      <CopyButton text={ copyText } />
    ).container;
    button = wrapper.querySelector('button');
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('button.btn.copy-btn')).toHaveLength(1);
  });

  it('should have an appropriate title attribute', () => {
    expect(wrapper.querySelectorAll('button.btn.copy-btn[title]')).toHaveLength(1);
    expect(button.title).toBe(literals.copyToClipboard);
  });

  describe('when clicked', () => {
    it('should copy to clipboard and play the microinteraction animation', async() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(100);
      expect(copyToClipboardMock.mock.calls.length).toBeGreaterThan(0);
      expect(setTimeout).toHaveBeenCalled();
      await waitFor(() =>
        expect(wrapper.querySelectorAll('button.btn.copy-btn.active')).toHaveLength(1)
      );
      fireEvent.click(button);
      jest.advanceTimersByTime(750);
      await waitFor(() =>
        expect(wrapper.querySelectorAll('button.btn.copy-btn:not(.active)')).toHaveLength(1)
      );
    });
  });
});

