export default `
  type Snippet implements Node {
    html: HtmlData
    tags: TagData
    title: String
    code: CodeData
    id: String
    slug: String
    path: String
    text: TextData
    archived: Boolean
    language: LanguageData
  }

  type HtmlData @infer {
    full: String
    text: String
    fullText: String
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
