import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PageBackdrop from './index';

configure({ adapter: new Adapter() });

describe('<PageBackdrop />', () => {
  let wrapper;
  const graphicName = 'search-empty';
  const mainText = 'Start typing a keyword to see some results.';
  const mainTextClassName = 'search-main';
  const subText = 'Search for something...';
  const subTextClassName = 'search-sub';

  beforeEach(() => {
    wrapper = mount(<PageBackdrop
      graphicName={ graphicName }
      mainText={ mainText }
      mainTextClassName={ mainTextClassName }
      subText={ subText }
      subTextClassName={ subTextClassName }
    />);
  });

  it('should render a page graphic', () => {
    expect(wrapper).toContainMatchingElement('.page-graphic');
  });

  it('should render page backdrop main text', () => {
    expect(wrapper).toContainMatchingElement('.page-backdrop-text');
  });

  it('should render page backdrop subtext', () => {
    expect(wrapper).toContainMatchingElement('.page-backdrop-subtext');
  });

  it('should pass graphic name to PageGraphic', () => {
    expect(wrapper).toContainMatchingElement(`.page-graphic.${graphicName}`);
  });

  it('should render mainText', () => {
    expect(wrapper.text()).toContain(mainText);
  });

  it('should pass mainTextClassName to main text', () => {
    expect(wrapper.find('.page-backdrop-text').prop('className')).toContain(mainTextClassName);
  });

  it('should pass subTextClassName to subtext', () => {
    expect(wrapper.find('.page-backdrop-subtext').prop('className')).toContain(subTextClassName);
  });

  it('should render subtext', () => {
    expect(wrapper.text()).toContain(subText);
  });

  describe('without subText', () => {

    beforeEach(() => {
      wrapper = mount(<PageBackdrop
        graphicName={ graphicName }
        mainText={ mainText }
        mainTextClassName={ mainTextClassName }
      />);
    });

    it('should not render subText', () => {
      expect(wrapper.text()).not.toContain(subText);
    });

  });

});

