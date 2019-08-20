/**
 * @flow
 */
export default function JSXTextMock(value: string) {
  return {
    type: 'JSXText',
    value,
    raw: value,
  };
}
