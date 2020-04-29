import { shape, string, oneOfType } from 'prop-types';

export default oneOfType([
  shape({
    full: string,
    description: string,
    fullDescription: string,
    code: string,
    style: string,
    example: string,
  }),
  shape({
    full: string,
    description: string,
    fullDescription: string,
    htmlCode: string,
    cssCode: string,
    jsCode: string,
  }),
]);
