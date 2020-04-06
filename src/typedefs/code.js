const Code = {
  typeName: `CodeData`,
};

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

export default Code;
