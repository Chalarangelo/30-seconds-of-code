import { shape, string, oneOfType } from 'prop-types';

const Html = oneOfType([
  shape({
    full: string,
    description: string,
    fullDescription: string,
    code: string,
    example: string,
  }),
  shape({
    full: string,
    description: string,
    fullDescription: string,
    browserSupport: string,
    htmlCode: string,
    cssCode: string,
    jsCode: string,
  }),
]);

Html.toString = () => `
type HtmlData @infer {
  full: String
  description: String
  fullDescription: String
  code: String
  example: String
  browserSupport: String
  htmlCode: String
  cssCode: String
  jsCode: String
}
`;

Html.typeName = `HtmlData`;

export default Html;
