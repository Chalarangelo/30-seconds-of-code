import { shape, string } from 'prop-types';

const Code = shape({
  src: string,
  example: string,
});

Code.toString = () => `
type CodeData @infer {
  src: String
  example: String
}
`;

export default Code;
