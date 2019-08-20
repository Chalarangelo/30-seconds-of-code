/**
 * @flow
 */
export default function LiteralMock(value: string) {
  return {
    type: 'Literal',
    value,
    raw: value,
  };
}
