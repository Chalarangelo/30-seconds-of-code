import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AnchorButton from './index';

import { internalLink } from 'fixtures/links';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<AnchorButton />', () => {
  let wrapper, button, anchor;
  const innerText = 'Click me!';

  beforeEach(() => {
    wrapper = mount(<AnchorButton link={ internalLink }>{ innerText }</AnchorButton>);
    button = wrapper.find('a.btn');
    anchor = wrapper.find('Anchor');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('a.btn');
  });

  it('should pass the link prop to the anchor component', () => {
    expect(anchor.prop('link')).toEqual(internalLink);
  });

  it('should render passed children', () => {
    expect(button.text()).toBe(innerText);
  });

  describe('with additional classNames', () => {
    beforeEach(() => {
      wrapper = mount(
        <AnchorButton
          link={ internalLink }
          className="secondary"
        >
          { innerText }
        </AnchorButton>);
    });

    it('should render appending passed classNames', () => {
      expect(wrapper).toContainMatchingElement('a.btn.secondary');
    });
  });
});

