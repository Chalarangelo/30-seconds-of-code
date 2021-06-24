import PropTypes from 'typedefs/proptypes';

const propTypes = {
  src: PropTypes.string.isRequired,
};

const Image = ({ src, ...rest }) => {
  return (
    <picture>
      <source
        type='image/webp'
        srcSet={`${src.slice(0, src.lastIndexOf('.'))}.webp`}
      />
      <img src={src} {...rest} />
    </picture>
  );
};

Image.propTypes = propTypes;

export default Image;
