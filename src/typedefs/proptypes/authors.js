import { shape, string, arrayOf } from 'prop-types';

export default arrayOf(
  shape({
    profile: string,
    name: string,
  })
);
