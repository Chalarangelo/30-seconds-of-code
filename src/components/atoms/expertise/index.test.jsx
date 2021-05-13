import { render, cleanup } from '@testing-library/react';
import Expertise from './index';

describe('<Expertise />', () => {
  const level = 'Beginner';
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Expertise level={level} />).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('span.expertise')).toHaveLength(1);
  });

  it('should get the appropriate class from expertise level', () => {
    expect(
      wrapper.querySelectorAll(`.expertise.${level.toLowerCase()}`)
    ).toHaveLength(1);
  });

  it('should get the appropriate title from expertise level', () => {
    expect(
      wrapper.querySelectorAll(`.expertise[title="${level}"`)
    ).toHaveLength(1);
  });

  describe('without a level value', () => {
    beforeEach(() => {
      wrapper = render(<Expertise />).container;
    });

    it('should render the default expertise tag', () => {
      expect(
        wrapper.querySelectorAll('span.expertise.intermediate')
      ).toHaveLength(1);
    });
  });
});
