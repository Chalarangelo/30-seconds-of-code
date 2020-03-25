import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnippetPreview from './index';

configure({ adapter: new Adapter() });

describe('<SnippetPreview />', () => {
  let wrapper;
  const scopeId = 'my-special-snippet';
  const scopedCss = `[data-scope="my-special-snippet] .my-special-snippet {
    background: red;
    color: white;
  }`;
  const htmlCode = '<p class="my-special-snippet">Hello, this is white on red.</p>';
  const jsCode = '';

  beforeEach(() => {
    wrapper = mount(
      <SnippetPreview
        scopeId={ scopeId }
        scopedCss={ scopedCss }
        htmlCode={ htmlCode }
        jsCode={ jsCode }
      />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('.snippet-preview-title');
    expect(wrapper).toContainMatchingElement(`div[data-scope="${scopeId}"]`);
  });

  it('should contain passed scopedCss', () => {
    expect(wrapper.find('style').html()).toContain(`${scopedCss}`);
  });

  it('should render passed htmlCode', () => {
    expect(wrapper.html()).toContain(`${htmlCode}`);
  });

});

