import PropTypes from 'typedefs/proptypes';

const propTypes = {
  backdropImage: PropTypes.string,
  mainText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  mainTextClassName: PropTypes.string,
  subText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  subTextClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

/**
 * Renders the backdrop of a page.
 * Used in 404 and Search pages.
 * @param {*} backdropImage - The path of the backdrop image
 * @param {*} mainText - Main text for the backdrop
 * @param {*} mainTextClassName - Additional classΝames to be passed to the main text
 * @param {*} subText - Secondary text for the backdrop
 * @param {*} subTextClassName - Additional classΝames to be passed to the secondary text
 */
const PageBackdrop = ({
  backdropImage,
  mainText,
  mainTextClassName = '',
  subText,
  subTextClassName = '',
  children,
}) => (
  <div className='page-graphic f-center txt-050'>
    <picture>
      <source
        type='image/webp'
        srcSet={`${backdropImage.slice(
          0,
          backdropImage.lastIndexOf('.')
        )}.webp`}
      />
      <img src={backdropImage} />
    </picture>
    <p className={`page-backdrop-text f-center ${mainTextClassName}`}>
      {mainText}
    </p>
    {subText ? (
      <p className={`page-backdrop-subtext f-center ${subTextClassName}`}>
        {subText}
      </p>
    ) : null}
    {children}
  </div>
);

PageBackdrop.propTypes = propTypes;

export default PageBackdrop;
