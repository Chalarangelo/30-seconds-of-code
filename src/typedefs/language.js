import { shape, string } from 'prop-types';

const Language = shape({
  short: string,
  long: string,
});

Language.toString = () => `
type LanguageData @infer {
  long: String
  short: String
}
`;

export default Language;
