import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { useClickOutside } from './index';

configure({ adapter: new Adapter() });

describe('useClickOutside', () => {
  const map = {};
  document.addEventListener = (event, cb) => {
    map[event] = cb;
  };

  const listenerRemover = jest.fn();
  document.removeListener = (event, cb) => {
    listenerRemover(event, cb);
  };

  const handler = jest.fn();
  const Tester = () => {
    const testRef = React.useRef();
    useClickOutside(testRef, handler);

    return (
      <section>
        <div ref={ testRef } />
      </section>
    );
  };
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Tester />
    );
  });

  it('should not invoke the handler when clicking inside the element', () => {
    act(() => {
      wrapper.find('div').simulate('click');
      wrapper.update();
    });
    expect(handler.mock.calls.length).toBe(0);
  });

  it('should invoke the handler when clicking outside the element', () => {
    act(() => {
      const el = document.createElement('button');
      map.click({ target: el });
      wrapper.update();
    });
    expect(handler.mock.calls.length).toBeGreaterThan(0);
  });
});

