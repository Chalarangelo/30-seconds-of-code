import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Shell from './index';

configure({ adapter: new Adapter() });

const { store } = createStore();

const expectArrayToContainMatchingObject = (arr, obj) => {
  return expect(arr).toEqual(
    expect.arrayContaining([
      expect.objectContaining(obj),
    ])
  );
};

describe('<Shell />', () => {
  const logoSrc = '/assets/logo.png';
  let wrapper, pageContainer;
  const innerText = 'Hi there!';

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <Shell
          isSearch={ false }
          logoSrc={ logoSrc }
        >
          { innerText }
        </Shell>
      </Provider>
    );
    pageContainer = wrapper.find('div.page-container');
  });

  describe('should render', () => {
    it('the page container', () => {
      expect(wrapper).toContainMatchingElement('div.page-container');
    });

    it('a NavBar component', () => {
      expect(pageContainer).toContainMatchingElement('NavBar');
    });

    it('the content container', () => {
      expect(pageContainer).toContainMatchingElement('div.content');
    });
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });
});
