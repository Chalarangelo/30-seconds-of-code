import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SnippetPreview from './index';
import { scopedCssCode, scopedHtmlCode } from 'fixtures/strings';

describe('<SnippetPreview />', () => {
  let wrapper;
  const scopeId = 'my-special-snippet';
  const jsCode = 'const x = 5;';

  beforeEach(() => {
    wrapper = render(
      <SnippetPreview
        scopeId={ scopeId }
        scopedCss={ scopedCssCode }
        htmlCode={ scopedHtmlCode }
        jsCode={ '' }
      />
    ).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('.snippet-preview-title')).toHaveLength(1);
    expect(wrapper.querySelectorAll(`div[data-scope="${scopeId}"]`)).toHaveLength(1);
  });

  it('should contain passed scopedCss', () => {
    expect(wrapper.querySelector('style').innerHTML).toContain(`${scopedCssCode}`);
  });

  it('should render passed htmlCode', () => {
    expect(wrapper.innerHTML).toContain(`${scopedHtmlCode}`);
  });

  describe('with JS code', () => {
    beforeEach(() => {
      wrapper = render(
        <SnippetPreview
          scopeId={ scopeId }
          scopedCss={ scopedCssCode }
          htmlCode={ scopedHtmlCode }
          jsCode={ jsCode }
        />
      ).container;
    });

    it('should append a script element with jsCode to the body', () => {
      expect([...document.getElementsByTagName('script')]).toHaveLength(1);
    });
  });
});

