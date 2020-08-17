import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import aboutLiterals from 'lang/en/about';

import StaticPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<StaticPage />', () => {
  let wrapper, meta;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <StaticPage pageContext={ { stringLiterals: aboutLiterals } } />
      </Provider>
    );
    meta = wrapper.find('Meta');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a PageTitle component', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('a subtitle element', () => {
      expect(wrapper).toContainMatchingElement('.page-sub-title');
    });

    it('3 SimpleCard components', () => {
      expect(wrapper).toContainMatchingElements(3, 'SimpleCard');
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('title')).toBe(aboutLiterals.title);
  });
});

