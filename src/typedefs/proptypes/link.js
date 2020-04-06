import { shape, string, bool } from 'prop-types';

export default shape({
  internal: bool,
  url: string,
  rel: string,
  target: string,
});
