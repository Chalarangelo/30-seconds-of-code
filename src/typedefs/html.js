const Html = {
  typeName: `HtmlData`,
};

Html.toString = () => `
type HtmlData @infer {
  full: String
  description: String
  fullDescription: String
  code: String
  style: String
  example: String
  browserSupport: String
  htmlCode: String
  cssCode: String
  jsCode: String
}
`;

export default Html;
