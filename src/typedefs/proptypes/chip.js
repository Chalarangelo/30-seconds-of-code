import { shape, string } from 'prop-types';

export default shape({
  url: string,
  title: string,
  icon: string,
  description: string,
});
