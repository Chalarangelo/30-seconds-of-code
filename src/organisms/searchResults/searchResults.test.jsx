import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchResults from './index';

configure({ adapter: new Adapter() });

const { store } = createStore();

describe('<SearchResults />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <SearchResults />
      </Provider>
    );
  });

  it('should render properly', () => {
    expect(wrapper).toContainMatchingElement('PageBackdrop');
  });

  describe('compact version', () => {

    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <SearchResults isCompact/>
        </Provider>
      );
    });

    it('should render properly', () => {
      expect(wrapper).toContainMatchingElement('PageSubtitle');

    });
  });
});
