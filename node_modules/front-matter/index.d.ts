interface FrontMatterResult<T> {
  readonly attributes: T
  readonly body: string
  readonly frontmatter?: string
}

interface FM {
  <T>(file: string): FrontMatterResult<T>
  test(file: string): boolean
}

declare const fm: FM
export = fm
