import React from "react"
import fs from "fs"
const { join } = require(`path`)

import DevelopStaticEntry from "../develop-static-entry"

jest.mock(`fs`, () => {
  const fs = jest.requireActual(`fs`)
  return {
    ...fs,
    readFileSync: jest.fn(),
  }
})
jest.mock(`gatsby/package.json`, () => {
  return {
    version: `2.0.0`,
  }
})

jest.mock(
  `../sync-requires`,
  () => {
    return {
      components: {
        "page-component---src-pages-test-js": () => null,
      },
    }
  },
  {
    virtual: true,
  }
)

const MOCK_FILE_INFO = {
  [`${process.cwd()}/public/webpack.stats.json`]: `{}`,
  [`${process.cwd()}/public/chunk-map.json`]: `{}`,
  [join(
    process.cwd(),
    `/public/page-data/about/page-data.json`
  )]: JSON.stringify({
    componentChunkName: `page-component---src-pages-test-js`,
    path: `/about/`,
    webpackCompilationHash: `1234567890abcdef1234`,
  }),
}

let StaticEntry
beforeEach(() => {
  fs.readFileSync.mockImplementation(file => MOCK_FILE_INFO[file])
  StaticEntry = require(`../static-entry`).default
})

const reverseHeadersPlugin = {
  plugin: {
    onPreRenderHTML: ({ getHeadComponents, replaceHeadComponents }) => {
      const headComponents = getHeadComponents()
      headComponents.reverse()
      replaceHeadComponents(headComponents)
    },
  },
}

const injectValuePlugin = (hookName, methodName, value) => {
  return {
    plugin: {
      [hookName]: staticEntry => {
        const method = staticEntry[methodName]
        method(value)
      },
    },
  }
}

const checkSanitized = components => {
  expect(components.includes(null)).toBeFalsy()
  expect(
    components.find(val => Array.isArray(val) && val.length === 0)
  ).toBeFalsy()
  expect(components.find(val => Array.isArray(val))).toBeFalsy()
}

const checkNonEmptyHeadersPlugin = {
  plugin: {
    onPreRenderHTML: ({
      getHeadComponents,
      getPreBodyComponents,
      getPostBodyComponents,
    }) => {
      const headComponents = getHeadComponents()
      const preBodyComponents = getPreBodyComponents()
      const postBodyComponents = getPostBodyComponents()
      checkSanitized(headComponents)
      checkSanitized(preBodyComponents)
      checkSanitized(postBodyComponents)
    },
  },
}

const fakeStylesPlugin = {
  plugin: {
    onRenderBody: ({ setHeadComponents }) =>
      setHeadComponents([
        <style key="style1"> .style1 {} </style>,
        <style key="style2"> .style2 {} </style>,
        <style key="style3"> .style3 {} </style>,
      ]),
  },
}

const reverseBodyComponentsPluginFactory = type => {
  return {
    plugin: {
      onPreRenderHTML: props => {
        const components = props[`get${type}BodyComponents`]()
        components.reverse()
        props[`replace${type}BodyComponents`](components)
      },
    },
  }
}

const fakeComponentsPluginFactory = type => {
  return {
    plugin: {
      onRenderBody: props => {
        props[`set${type}BodyComponents`]([
          <div key="div1"> div1 </div>,
          <div key="div2"> div2 </div>,
          <div key="div3"> div3 </div>,
        ])
      },
    },
  }
}

describe(`develop-static-entry`, () => {
  test(`onPreRenderHTML can be used to replace headComponents`, done => {
    global.plugins = [fakeStylesPlugin, reverseHeadersPlugin]

    DevelopStaticEntry(`/about/`, (_, html) => {
      expect(html).toMatchSnapshot()
      done()
    })
  })

  test(`onPreRenderHTML can be used to replace postBodyComponents`, done => {
    global.plugins = [
      fakeComponentsPluginFactory(`Post`),
      reverseBodyComponentsPluginFactory(`Post`),
    ]

    DevelopStaticEntry(`/about/`, (_, html) => {
      expect(html).toMatchSnapshot()
      done()
    })
  })

  test(`onPreRenderHTML can be used to replace preBodyComponents`, done => {
    global.plugins = [
      fakeComponentsPluginFactory(`Pre`),
      reverseBodyComponentsPluginFactory(`Pre`),
    ]

    DevelopStaticEntry(`/about/`, (_, html) => {
      expect(html).toMatchSnapshot()
      done()
    })
  })

  test(`onPreRenderHTML adds metatag note for development environment`, done => {
    DevelopStaticEntry(`/about/`, (_, html) => {
      expect(html).toContain(
        `<meta name="note" content="environment=development"/>`
      )
      done()
    })
  })

  test(`onPreRenderHTML adds metatag note for development environment after replaceHeadComponents`, done => {
    global.plugins = [reverseHeadersPlugin]

    DevelopStaticEntry(`/about/`, (_, html) => {
      expect(html).toContain(
        `<meta name="note" content="environment=development"/>`
      )
      done()
    })
  })
})

describe(`static-entry sanity checks`, () => {
  beforeEach(() => {
    global.__PATH_PREFIX__ = ``
    global.__BASE_PATH__ = ``
    global.__ASSET_PREFIX__ = ``
  })

  const methodsToCheck = [
    `replaceHeadComponents`,
    `replacePreBodyComponents`,
    `replacePostBodyComponents`,
  ]

  methodsToCheck.forEach(methodName => {
    test(`${methodName} can filter out null value`, done => {
      const plugin = injectValuePlugin(`onPreRenderHTML`, methodName, null)
      global.plugins = [plugin, checkNonEmptyHeadersPlugin]

      StaticEntry(`/about/`, (_, html) => {
        done()
      })
    })

    test(`${methodName} can filter out null values`, done => {
      const plugin = injectValuePlugin(`onPreRenderHTML`, methodName, [
        null,
        null,
      ])
      global.plugins = [plugin, checkNonEmptyHeadersPlugin]

      StaticEntry(`/about/`, (_, html) => {
        done()
      })
    })

    test(`${methodName} can filter out empty array`, done => {
      const plugin = injectValuePlugin(`onPreRenderHTML`, methodName, [])
      global.plugins = [plugin, checkNonEmptyHeadersPlugin]

      StaticEntry(`/about/`, (_, html) => {
        done()
      })
    })

    test(`${methodName} can filter out empty arrays`, done => {
      const plugin = injectValuePlugin(`onPreRenderHTML`, methodName, [[], []])
      global.plugins = [plugin, checkNonEmptyHeadersPlugin]

      StaticEntry(`/about/`, (_, html) => {
        done()
      })
    })

    test(`${methodName} can flatten arrays`, done => {
      const plugin = injectValuePlugin(`onPreRenderHTML`, methodName, [
        <style key="style1"> .style1 {} </style>,
        <style key="style2"> .style2 {} </style>,
        <style key="style3"> .style3 {} </style>,
        [<style key="style4"> .style3 {} </style>],
      ])
      global.plugins = [plugin, checkNonEmptyHeadersPlugin]

      StaticEntry(`/about/`, (_, html) => {
        done()
      })
    })
  })
})

describe(`static-entry`, () => {
  beforeEach(() => {
    global.__PATH_PREFIX__ = ``
    global.__BASE_PATH__ = ``
  })

  test(`onPreRenderHTML can be used to replace headComponents`, done => {
    global.plugins = [fakeStylesPlugin, reverseHeadersPlugin]

    StaticEntry(`/about/`, (_, html) => {
      expect(html).toMatchSnapshot()
      done()
    })
  })

  test(`onPreRenderHTML can be used to replace postBodyComponents`, done => {
    global.plugins = [
      fakeComponentsPluginFactory(`Post`),
      reverseBodyComponentsPluginFactory(`Post`),
    ]

    StaticEntry(`/about/`, (_, html) => {
      expect(html).toMatchSnapshot()
      done()
    })
  })

  test(`onPreRenderHTML can be used to replace preBodyComponents`, done => {
    global.plugins = [
      fakeComponentsPluginFactory(`Pre`),
      reverseBodyComponentsPluginFactory(`Pre`),
    ]

    StaticEntry(`/about/`, (_, html) => {
      expect(html).toMatchSnapshot()
      done()
    })
  })

  test(`onPreRenderHTML does not add metatag note for development environment`, done => {
    StaticEntry(`/about/`, (_, html) => {
      expect(html).not.toContain(
        `<meta name="note" content="environment=development"/>`
      )
      done()
    })
  })
})

describe(`sanitizeComponents`, () => {
  let sanitizeComponents

  beforeEach(() => {
    fs.readFileSync.mockImplementation(file => MOCK_FILE_INFO[file])
    sanitizeComponents = require(`../static-entry`).sanitizeComponents
  })

  it(`strips assetPrefix for manifest link`, () => {
    global.__PATH_PREFIX__ = `https://gatsbyjs.org/blog`
    global.__BASE_PATH__ = `/blog`
    global.__ASSET_PREFIX__ = `https://gatsbyjs.org`

    const sanitizedComponents = sanitizeComponents([
      <link
        rel="manifest"
        href="https://gatsbyjs.org/blog/manifest.webmanifest"
      />,
    ])
    expect(sanitizedComponents[0].props.href).toBe(`/blog/manifest.webmanifest`)
  })
})
