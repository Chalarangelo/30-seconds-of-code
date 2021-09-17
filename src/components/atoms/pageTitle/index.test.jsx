import { render, cleanup } from '@testing-library/react';
import PageTitle from './index';

describe('<PageTitle />', () => {
  let wrapper;
  const innerText = 'This is a title';

  beforeEach(() => {
    wrapper = render(<PageTitle className='light'>{innerText}</PageTitle>)
      .container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('h2.page-title')).toHaveLength(1);
  });

  it('should append passed classes', () => {
    expect(wrapper.querySelectorAll('.page-title.light')).toHaveLength(1);
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toContain(innerText);
  });
});
