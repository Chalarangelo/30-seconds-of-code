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
  let wrapper, pageContainer, navBar, content, title, logo;
  const innerText = 'Hi there!';

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <Shell
          isListing={ false }
          isSearch={ false }
          logoSrc={ logoSrc }
        >
          { innerText }
        </Shell>
      </Provider>
    );
    pageContainer = wrapper.find('div.page-container');
    navBar = wrapper.find('NavBar');
    content = wrapper.find('div.content');
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

  it('should create a NavBar with 4 buttons', () => {
    expect(navBar.prop('buttons').length).toBe(4);
  });

  describe('should pass a button to the NavBar', () => {
    it('for the search page', () => {
      expectArrayToContainMatchingObject(navBar.prop('buttons'), {
        icon: 'search',
      });
    });
    it('for the list page', () => {
      expectArrayToContainMatchingObject(navBar.prop('buttons'), {
        icon: 'list',
      });
    });
    it('for the github link', () => {
      expectArrayToContainMatchingObject(navBar.prop('buttons'), {
        icon: 'github',
      });
    });
    it('for the mode toggle', () => {
      expectArrayToContainMatchingObject(navBar.prop('buttons'), {
        icon: 'moon',
      });
    });
  });

  describe('with title and icon', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <Shell
            isList={ false }
            isSearch={ false }
            logoSrc={ logoSrc }
            withTitle
            withIcon
          />
        </Provider>
      );
      pageContainer = wrapper.find('div.page-container');
      navBar = wrapper.find('NavBar');
      content = wrapper.find('div.content');
      title = wrapper.find('.website-title');
      logo = wrapper.find('.website-logo');
    });

    it('should render the website title', () => {
      expect(content).toContainMatchingElement('.website-title');
    });
    it('should render the website logo', () => {
      expect(title).toContainMatchingElement('.website-logo');
    });
    it('should pass the logoSrc to the logo', () => {
      expect(logo.prop('src')).toBe(logoSrc);
    });
    it('should pass an alt attribute to the logo', () => {
      expect(logo.prop('alt')).not.toBe(undefined);
    });
  });

  describe('without title or icon', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <Shell
            isList={ false }
            isSearch={ false }
            logoSrc={ logoSrc }
            withTitle={ false }
            withIcon={ false }
          />
        </Provider>
      );
      pageContainer = wrapper.find('div.page-container');
      navBar = wrapper.find('NavBar');
      content = wrapper.find('div.content');
    });

    it('should not render a title or icon', () => {
      expect(content).not.toContainMatchingElement('.website-title');
      expect(content).not.toContainMatchingElement('.website-logo');
    });
  });

  describe('when the mode toggle is clicked', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <Shell
            isList={ false }
            isSearch={ false }
            logoSrc={ logoSrc }
            withTitle
            withIcon
          />
        </Provider>
      );
    });

    it('should change the mode', () => {
      wrapper.find('.icon-moon').at(0).simulate('click');
      expect(wrapper).toContainMatchingElement('.nav-btn.icon-sun');
      expect(wrapper).not.toContainMatchingElement('.nav-btn.icon-moon');
    });

    it('should change the mode back when clicked a second time', () => {
      wrapper.find('.icon-sun').at(0).simulate('click');
      expect(wrapper).toContainMatchingElement('.nav-btn.icon-moon');
      expect(wrapper).not.toContainMatchingElement('.nav-btn.icon-sun');
    });
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });
});
