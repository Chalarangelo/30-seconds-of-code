import { cleanPath, findMatchPath, setMatchPaths } from "../find-path"

describe(`find-path`, () => {
  describe(`cleanPath`, () => {
    beforeEach(() => {
      global.__BASE_PATH__ = ``
    })

    it(`should strip out ? & # from a pathname`, () => {
      expect(cleanPath(`/mypath#anchor?gatsby=cool`)).toBe(`/mypath`)
    })

    it(`should convert a /index.html to root dir`, () => {
      expect(cleanPath(`/index.html`)).toBe(`/`)
    })

    it(`strip out a basePrefix`, () => {
      global.__BASE_PATH__ = `/blog`
      expect(cleanPath(`/blog/mypath`)).toBe(`/mypath`)
    })
  })

  describe(`findMatchPath`, () => {
    beforeEach(() => {
      // reset matchPaths
      setMatchPaths([])
      global.__BASE_PATH__ = ``
    })

    it(`should find a path when matchPath found`, () => {
      setMatchPaths([
        {
          matchPath: `/app/*`,
          path: `/app`,
        },
      ])

      expect(findMatchPath(`/app/dynamic-page#anchor?gatsby=cool`)).toBe(`/app`)
    })

    it(`should return null when no matchPathFound`, () => {
      setMatchPaths([
        {
          matchPath: `/app/*`,
          path: `/app`,
        },
      ])

      expect(findMatchPath(`/notanapp/dynamic-page`)).toBeNull()
    })
  })
})
