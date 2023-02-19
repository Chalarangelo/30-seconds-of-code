import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import aboutLiterals from 'lang/en/about';
import StaticPage from './index';

describe('<StaticPage />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(<StaticPage stringLiterals={aboutLiterals} />)
      .container;
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.page-title + p')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.card')).toHaveLength(4);
  });

  it('has the correct metadata', () => {
    expect(document.title).toContain(aboutLiterals.title);
  });
});
