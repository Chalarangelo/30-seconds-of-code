/* eslint-disable react/prop-types */
/* istanbul ignore next */
import withLiveReload from 'components/templates/withLiveReload';
import ListingPage from './index';

export default ({ location, ...rest }) => withLiveReload(
  ListingPage,
  location.pathname,
  true,
  rest
);
