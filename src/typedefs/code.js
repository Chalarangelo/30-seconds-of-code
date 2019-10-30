import { shape, string, oneOfType } from 'prop-types';

const Code = oneOfType([
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

Code.toString = () => `
type CodeData @infer {
  src: String
  example: String
  style: String
  html: String
  css: String
  js: String
  scopedCss: String
}
`;

Code.typeName = `CodeData`;

export default Code;
