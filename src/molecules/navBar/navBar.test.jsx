import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './index';

configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
  let wrapper, links = [];
  const mockOnClickCallback = jest.fn();
  const buttons = [
    {
      icon: 'search',
      link: {
        internal: true,
        url: '/search',
        title: 'Search',
      },
    },
    {
      icon: 'list',
      link: {
        internal: true,
        url: '/list',
        title: 'Snippet list',
      },
    },
    {
      icon: 'github',
      link: {
        internal: false,
        url: 'https://github.com/',
        title: 'Snippet list',
        rel: 'noopener',
        target: '_blank',
      },
    },
    {
      icon: 'moon',
      link: {
        internal: false,
        url: '#',
        title: 'Switch to dark mode',
      },
      onClick: e => { e.preventDefault();mockOnClickCallback(); },
    },
  ];

  beforeEach(() => {
    wrapper = mount(<NavBar buttons={ buttons } />);
    [0, 1, 2, 3].map(i => links[i] = wrapper.find('a.nav-btn').at(i));
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('header.nav-bar');
  });

  it('should render the correct amount of children', () => {
    expect(wrapper.find('a.nav-btn').length).toBe(4);
  });

  it('should render the correct children types', () => {
    buttons.forEach((btn, i) =>
      expect(links[i].hasClass(btn.icon)).toBe(true)
    );
  });

  it('should pass the correct rel and target properties whenever passed', () => {
    expect(links[2].prop('rel')).toBe(buttons[2].link.rel);
    expect(links[2].prop('target')).toBe(buttons[2].link.target);
  });

  it('should pass the correct onClick callback whenever passed', () => {
    expect(links[3].prop('onClick')).not.toBe(undefined);
  });

  it('should call passed callback on click event whenever passed', () => {
    links[3].simulate('click');
    expect(mockOnClickCallback.mock.calls.length).toBeGreaterThan(0);
  });
});

