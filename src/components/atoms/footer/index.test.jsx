import { render, cleanup } from '@testing-library/react';
import Footer from './index';

describe('<Footer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Footer />).container;
  });

  afterEach(cleanup);

  it('renders the appropriate component', () => {
    expect(wrapper.querySelectorAll('footer')).toHaveLength(1);
  });

  it('renders two sections', () => {
    expect(wrapper.querySelectorAll('p')).toHaveLength(2);
  });

  it('renders the links section', () => {
    expect(wrapper.querySelectorAll('footer > p:first-child a')).toHaveLength(
      6
    );
  });
});
