import { shape, string, oneOfType } from 'prop-types';

export default oneOfType([
  shape({
    src: string,
    example: string,
    style: string,
  }),
  shape({
    html: string,
    css: string,
    js: string,
    scopedCss: string,
  }),
]);
