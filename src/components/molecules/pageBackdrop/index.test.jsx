import { render, cleanup } from '@testing-library/react';
import PageBackdrop from './index';

describe('<PageBackdrop />', () => {
  let wrapper;
  const backdropImage = '/search-empty.svg';
  const mainText = 'Start typing a keyword to see some results.';
  const mainTextClassName = 'search-main';
  const subText = 'Search for something...';
  const subTextClassName = 'search-sub';

  beforeEach(() => {
    wrapper = render(
      <PageBackdrop
        backdropImage={backdropImage}
        mainText={mainText}
        mainTextClassName={mainTextClassName}
        subText={subText}
        subTextClassName={subTextClassName}
      />
    ).container;
  });

  afterEach(cleanup);

  it('should render a page backdrop with main text and subtext', () => {
    expect(wrapper.querySelectorAll('.page-backdrop > p')).toHaveLength(2);
  });

  it('should pass graphic name to PageGraphic', () => {
    expect(
      wrapper.querySelectorAll(`img[src="${backdropImage}"]`)
    ).toHaveLength(1);
  });

  it('should render mainText', () => {
    expect(wrapper.textContent).toContain(mainText);
  });

  it('should pass mainTextClassName to main text', () => {
    expect(
      wrapper.querySelector('.page-backdrop p:first-of-type').className
    ).toContain(mainTextClassName);
  });

  it('should pass subTextClassName to subtext', () => {
    expect(
      wrapper.querySelector('.page-backdrop p:last-of-type').className
    ).toContain(subTextClassName);
  });

  it('should render subtext', () => {
    expect(wrapper.textContent).toContain(subText);
  });

  describe('without subText', () => {
    beforeEach(() => {
      wrapper = render(
        <PageBackdrop
          backdropImage={backdropImage}
          mainText={mainText}
          mainTextClassName={mainTextClassName}
        />
      ).container;
    });

    it('should not render subText', () => {
      expect(wrapper.querySelectorAll('.page-backdrop > p')).toHaveLength(1);
    });
  });
});
