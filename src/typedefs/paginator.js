import { shape, string, number } from 'prop-types';

export default shape({
  pageNumber: number,
  totalPages: number,
  baseUrl: string,
});
