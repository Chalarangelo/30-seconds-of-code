import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PageBackdrop from './index';

describe('<PageBackdrop />', () => {
  let wrapper;
  const graphicName = 'search-empty';
  const mainText = 'Start typing a keyword to see some results.';
  const mainTextClassName = 'search-main';
  const subText = 'Search for something...';
  const subTextClassName = 'search-sub';

  beforeEach(() => {
    wrapper = render(
      <PageBackdrop
        graphicName={graphicName}
        mainText={mainText}
        mainTextClassName={mainTextClassName}
        subText={subText}
        subTextClassName={subTextClassName}
      />
    ).container;
  });

  afterEach(cleanup);

  it('should render a page graphic', () => {
    expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
  });

  it('should render page backdrop main text', () => {
    expect(wrapper.querySelectorAll('.page-backdrop-text')).toHaveLength(1);
  });

  it('should render page backdrop subtext', () => {
    expect(wrapper.querySelectorAll('.page-backdrop-subtext')).toHaveLength(1);
  });

  it('should pass graphic name to PageGraphic', () => {
    expect(
      wrapper.querySelectorAll(`.page-graphic.${graphicName}`)
    ).toHaveLength(1);
  });

  it('should render mainText', () => {
    expect(wrapper.textContent).toContain(mainText);
  });

  it('should pass mainTextClassName to main text', () => {
    expect(wrapper.querySelector('.page-backdrop-text').className).toContain(
      mainTextClassName
    );
  });

  it('should pass subTextClassName to subtext', () => {
    expect(wrapper.querySelector('.page-backdrop-subtext').className).toContain(
      subTextClassName
    );
  });

  it('should render subtext', () => {
    expect(wrapper.textContent).toContain(subText);
  });

  describe('without subText', () => {
    beforeEach(() => {
      wrapper = render(
        <PageBackdrop
          graphicName={graphicName}
          mainText={mainText}
          mainTextClassName={mainTextClassName}
        />
      ).container;
    });

    it('should not render subText', () => {
      expect(wrapper.textContent).not.toContain(subText);
    });
  });
});
