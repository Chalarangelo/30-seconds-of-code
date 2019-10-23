export default `
  type Snippet implements Node {
    id: String
    slug: String
    path: String
    archived: Boolean
    title: String
    tags: TagData
    expertise: String
    html: HtmlData
    code: CodeData
    text: TextData
    language: LanguageData
  }

  type HtmlData @infer {
    full: String
    description: String
    fullDescription: String
    code: String
    example: String
  }

  type CodeData @infer {
    src: String
    example: String
  }

  type TextData @infer {
    full: String
    short: String
  }

  type TagData @infer {
    primary: String
    all: [String]
  }

  type LanguageData @infer {
    long: String
    short: String
  }
`;
