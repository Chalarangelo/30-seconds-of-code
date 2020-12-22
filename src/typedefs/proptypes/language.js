import { shape, string, arrayOf, oneOfType } from 'prop-types';

const langShape = {
  short: string,
  long: string,
};

export default oneOfType([
  string,
  shape({
    ...langShape,
    otherLanguages: arrayOf(shape({ ...langShape })),
  }),
]);
