import { shape, string, arrayOf } from 'prop-types';

export default shape({
  primary: string,
  all: arrayOf(string),
});
