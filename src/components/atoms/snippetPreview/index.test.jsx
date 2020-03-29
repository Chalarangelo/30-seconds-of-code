import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnippetPreview from './index';

import { scopedCssCode, scopedHtmlCode } from 'fixtures/strings';

configure({ adapter: new Adapter() });

describe('<SnippetPreview />', () => {
  let wrapper;
  const scopeId = 'my-special-snippet';
  const jsCode = 'const x = 5;';

  beforeEach(() => {
    wrapper = mount(
      <SnippetPreview
        scopeId={ scopeId }
        scopedCss={ scopedCssCode }
        htmlCode={ scopedHtmlCode }
        jsCode={ '' }
      />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('.snippet-preview-title');
    expect(wrapper).toContainMatchingElement(`div[data-scope="${scopeId}"]`);
  });

  it('should contain passed scopedCss', () => {
    expect(wrapper.find('style').html()).toContain(`${scopedCssCode}`);
  });

  it('should render passed htmlCode', () => {
    expect(wrapper.html()).toContain(`${scopedHtmlCode}`);
  });

  describe('with JS code', () => {
    beforeEach(() => {
      wrapper = mount(
        <SnippetPreview
          scopeId={ scopeId }
          scopedCss={ scopedCssCode }
          htmlCode={ scopedHtmlCode }
          jsCode={ jsCode }
        />);
    });

    it('should append a script element with jsCode to the body', () => {
      expect([...document.getElementsByTagName('script')].length).toBe(1);
    });
  });

});

