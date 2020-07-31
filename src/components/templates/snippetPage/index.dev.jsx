/* eslint-disable react/prop-types */
/* istanbul ignore next */
import withLiveReload from 'components/templates/withLiveReload';
import SnippetPage from './index';

export default ({ location, ...rest }) => withLiveReload(
  SnippetPage,
  location.pathname,
  false,
  rest
);
