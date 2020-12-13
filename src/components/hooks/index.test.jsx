import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useClickOutside } from './index';

describe('useClickOutside', () => {
  const handler = jest.fn();
  const Tester = () => {
    const testRef = React.useRef();
    useClickOutside(testRef, handler);

    return (
      <section>
        <div ref={testRef} />
      </section>
    );
  };
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <>
        <button id='out' />
        <Tester />
      </>
    ).container;
  });

  afterEach(cleanup);

  it('should not invoke the handler when clicking inside the element', async () => {
    fireEvent.click(wrapper.querySelector('div'));
    expect(handler.mock.calls).toHaveLength(0);
  });

  it('should invoke the handler when clicking outside the element', async () => {
    fireEvent.click(wrapper.querySelector('#out'));
    expect(handler.mock.calls.length).toBeGreaterThan(0);
  });
});
