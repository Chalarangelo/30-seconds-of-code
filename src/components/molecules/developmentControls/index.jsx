import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import { toggleDarkMode } from 'state/shell';
import { useClickOutside } from 'components/hooks';
import settings from 'settings/global';
import literals from 'lang/en/client/common';

const propTypes = {
  isDarkMode: PropTypes.bool,
  dispatch: PropTypes.func,
  pageContext: PropTypes.shape({
    snippet: PropTypes.snippet,
  }),
};

/**
 * Renders a floating button with development controls.
 * @param {bool} isDarkMode - Should dark mode be applied?
 */
const DevelopmentControls = ({
  isDarkMode,
  dispatch,
  pageContext: { snippet } = {},
}) => {
  const [opened, setOpened] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState();
  const controlsRef = React.useRef();

  useClickOutside(controlsRef, () => {
    setOpened(false);
  });

  React.useEffect(() => {
    setCoverImage(
      typeof document !== 'undefined' &&
        document.querySelector('.card-cover-image')
    );
  });

  return (
    <div className='floating-controls-container' ref={controlsRef}>
      {opened ? (
        <>
          <a href='/developer' className='btn btn-dev'>
            {literals.contentManager}
          </a>
          <button
            className='btn btn-dev'
            onClick={() => dispatch(toggleDarkMode(!isDarkMode))}
          >
            {literals.toggleDarkMode}
          </button>
          {snippet ? (
            <a
              className='btn btn-dev'
              href={snippet.vscodeUrl}
              rel='nofollow noopener noreferrer'
              target='_blank'
            >
              {literals.openInVscode}
            </a>
          ) : null}
          {coverImage ? (
            <button
              className='btn btn-dev'
              onClick={() => {
                const img = prompt('Cover image URL', coverImage.src);
                coverImage.src = img;
              }}
            >
              {literals.editCoverImage}
            </button>
          ) : null}
          <a
            className='btn btn-dev'
            href={`${settings.websiteUrl}${location.pathname}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {literals.viewLive}
          </a>
        </>
      ) : null}
      <button
        className='btn btn-dev-controls icon icon-deduck'
        title={literals.developerControls}
        onClick={() => {
          setOpened(!opened);
        }}
      ></button>
    </div>
  );
};

DevelopmentControls.propTypes = propTypes;

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    acceptsCookies: state.shell.acceptsCookies,
    includeArchive: state.search.includeArchive,
  }),
  null
)(DevelopmentControls);
