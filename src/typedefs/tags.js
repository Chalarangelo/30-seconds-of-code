const Tags = {
  typeName: `TagData`,
};

Tags.toString = () => `
type TagData @infer {
  primary: String
  all: [String]
}
`;

export default Tags;
