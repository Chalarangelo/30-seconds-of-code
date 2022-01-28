const Image = ({ src, ...rest }) => (
  <picture>
    <source
      type='image/webp'
      srcSet={`${src.slice(0, src.lastIndexOf('.'))}.webp`}
    />
    <img src={src} {...rest} />
  </picture>
);

export default Image;
