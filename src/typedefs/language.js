const Language = {
  typeName: `LanguageData`,
};

Language.toString = () => `
type SimpleLanguageData @infer {
  long: String
  short: String
}

type LanguageData @infer {
  long: String
  short: String
  otherLanguages: [SimpleLanguageData]
}
`;

export default Language;
