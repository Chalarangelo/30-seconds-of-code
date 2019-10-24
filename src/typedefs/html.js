import { shape, string } from 'prop-types';

export default shape({
  full: string,
  description: string,
  fullDescription: string,
  code: string,
  example: string,
});
