import { shape, string } from 'prop-types';

const Html = shape({
  full: string,
  description: string,
  fullDescription: string,
  code: string,
  example: string,
});

Html.toString = () => `
type HtmlData @infer {
  full: String
  description: String
  fullDescription: String
  code: String
  example: String
}
`;

export default Html;
