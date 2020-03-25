import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Search from './index';

configure({ adapter: new Adapter() });

const { store } = createStore();

describe('<Search />', () => {
  let wrapper;
  store.dispatch = jest.fn();
  let input;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <Search />
      </Provider>
    );
    input = wrapper.find('input');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('input[type="search"]');
  });

  it('should call dispatch on keyUp event', () => {
    input.simulate('keypress', { target: { value: 'p'} });
    expect(store.dispatch.mock.calls.length).toBeGreaterThan(0);
  });
});

