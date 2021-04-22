import React from 'react';
import Helmet from 'react-helmet';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import aboutLiterals from 'lang/en/about';
import StaticPage from './index';

describe('<StaticPage />', () => {
  let wrapper, meta;

  beforeEach(() => {
    wrapper = renderWithContext(
      <StaticPage pageContext={{ stringLiterals: aboutLiterals }} />
    ).container;
    meta = Helmet.peek();
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a PageTitle component', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('a subtitle element', () => {
      expect(wrapper.querySelectorAll('.page-sub-title')).toHaveLength(1);
    });

    it('3 SimpleCard components', () => {
      expect(wrapper.querySelectorAll('.card')).toHaveLength(3);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(aboutLiterals.title);
  });
});
