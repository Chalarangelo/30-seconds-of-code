import { render, cleanup } from '@testing-library/react';
import Image from './index';

describe('<Image />', () => {
  let wrapper;
  const src = 'https://my-site.com/assets/my-image.jpg';
  const alt = 'An image';

  beforeEach(() => {
    wrapper = render(<Image src={src} alt={alt} />).container;
  });

  afterEach(cleanup);

  it('renders a picture element', () => {
    expect(wrapper.querySelectorAll('picture')).toHaveLength(1);
  });

  it('renders an img element with the appropriate src', () => {
    expect(wrapper.querySelector('img').src).toBe(src);
  });

  it('passes additional props to img', () => {
    expect(wrapper.querySelector('img').alt).toBe(alt);
  });

  it('renders an optimized source element with a webp path', () => {
    expect(wrapper.querySelector('source').srcset).toBe(
      src.replace('jpg', 'webp')
    );
  });
});
