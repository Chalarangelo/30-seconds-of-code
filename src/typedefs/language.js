import { shape, string, arrayOf, oneOfType } from 'prop-types';

const langShape = {
  short: string,
  long: string,
};

const Language = oneOfType([
  string,
  shape({
    ...langShape,
    otherLanguages: arrayOf(
      shape({...langShape})
    ),
  }),
]);

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

Language.typeName = `LanguageData`;

export default Language;
