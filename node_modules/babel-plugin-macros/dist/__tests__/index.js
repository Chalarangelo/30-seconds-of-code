/* eslint no-console:0 */
import path from 'path'
import cosmiconfigMock from 'cosmiconfig'
import cpy from 'cpy'
import babel from '@babel/core'
import pluginTester from 'babel-plugin-tester'
import plugin from '../'

const projectRoot = path.join(__dirname, '../../')

jest.mock('cosmiconfig', () => {
  const mockSearchSync = jest.fn()
  Object.assign(mockSearchSync, {
    mockReset() {
      return mockSearchSync.mockImplementation(
        (filename, configuredCosmiconfig) =>
          configuredCosmiconfig.searchSync(filename),
      )
    },
  })

  mockSearchSync.mockReset()

  const _cosmiconfigMock = (...args) => ({
    searchSync(filename) {
      return mockSearchSync(
        filename,
        require.requireActual('cosmiconfig')(...args),
      )
    },
  })

  return Object.assign(_cosmiconfigMock, {mockSearchSync})
})

beforeAll(() => {
  // copy our mock modules to the node_modules directory
  // so we can test how things work when importing a macro
  // from the node_modules directory.
  return cpy(['**/*.js'], path.join('..', '..', 'node_modules'), {
    parents: true,
    cwd: path.join(projectRoot, 'other', 'mock-modules'),
  })
})

afterEach(() => {
  // eslint-disable-next-line
  require('babel-plugin-macros-test-fake/macro').innerFn.mockClear()
  cosmiconfigMock.mockSearchSync.mockReset()
})

expect.addSnapshotSerializer({
  print(val) {
    return (
      val
        .split(projectRoot)
        .join('<PROJECT_ROOT>/')
        .replace(/\\/g, '/')
        // Remove the path of file which thrown an error
        .replace(/Error:[^:]*:/, 'Error:')
    )
  },
  test(val) {
    return typeof val === 'string'
  },
})

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
    parserOpts: {
      plugins: ['jsx'],
    },
    generatorOpts: {quotes: 'double'},
  },
  tests: [
    {
      title: 'does nothing to code that does not import macro',
      snapshot: false,
      code: `
        import foo from "./some-file-without-macro";

        const bar = require("./some-other-file-without-macro");
      `,
    },
    {
      title: 'does nothing but remove macros if it is unused',
      snapshot: true,
      code: `
        import foo from "./fixtures/eval.macro";

        const bar = 42;
      `,
    },
    {
      title: 'raises an error if macro does not exist',
      error: true,
      code: `
        import foo from './some-macros-that-doesnt-even-need-to-exist.macro'
        export default 'something else'
      `,
    },
    {
      title: 'works with import',
      code: `
        import myEval from './fixtures/eval.macro'
        const x = myEval\`34 + 45\`
      `,
    },
    {
      title: 'works with require',
      code: `
        const evaler = require('./fixtures/eval.macro')
        const x = evaler\`34 + 45\`
      `,
    },
    {
      title: 'works with require destructuring',
      code: `
        const {css, styled} = require('./fixtures/emotion.macro')
        const red = css\`
          background-color: red;
        \`

        const Div = styled.div\`
          composes: \${red}
          color: blue;
        \`
      `,
    },
    {
      title: 'works with require destructuring and aliasing',
      code: `
        const {css: CSS, styled: STYLED} = require('./fixtures/emotion.macro')
        const red = CSS\`
          background-color: red;
        \`

        const Div = STYLED.div\`
          composes: \${red}
          color: blue;
        \`
      `,
    },
    {
      title: 'works with function calls',
      code: `
        import myEval from './fixtures/eval.macro'
        const x = myEval('34 + 45')
      `,
    },
    {
      title: 'Works as a JSXElement',
      code: `
        import MyEval from './fixtures/eval.macro'
        const x = <MyEval>34 + 45</MyEval>
      `,
    },
    {
      title: 'Supports named imports',
      code: `
        import {css as CSS, styled as STYLED} from './fixtures/emotion.macro'
        const red = CSS\`
          background-color: red;
        \`

        const Div = STYLED.div\`
          composes: \${red}
          color: blue;
        \`
      `,
    },
    {
      title: 'supports compiled macros (`__esModule` + `export default`)',
      code: `
        import {css, styled} from './fixtures/emotion-esm.macro'
        const red = css\`
          background-color: red;
        \`

        const Div = styled.div\`
          composes: \${red}
          color: blue;
        \`
      `,
    },
    {
      title: 'supports macros from node_modules',
      code: `
        import fakeMacro from 'babel-plugin-macros-test-fake/macro'
        fakeMacro('hi')
      `,
      teardown() {
        try {
          // kinda abusing the babel-plugin-tester API here
          // to make an extra assertion
          // eslint-disable-next-line
          const fakeMacro = require('babel-plugin-macros-test-fake/macro')
          expect(fakeMacro.innerFn).toHaveBeenCalledTimes(1)
          expect(fakeMacro.innerFn).toHaveBeenCalledWith({
            references: expect.any(Object),
            source: expect.stringContaining(
              'babel-plugin-macros-test-fake/macro',
            ),
            state: expect.any(Object),
            babel: expect.any(Object),
            isBabelMacrosCall: true,
          })
          expect(fakeMacro.innerFn.mock.calls[0].babel).toBe(babel)
        } catch (e) {
          console.error(e)
          throw e
        }
      },
    },
    {
      title: 'optionally keep imports (variable assignment)',
      code: `
        const macro = require('./fixtures/keep-imports.macro')
        const red = macro('noop');
      `,
    },
    {
      title: 'optionally keep imports (import declaration)',
      code: `
        import macro from './fixtures/keep-imports.macro'
        const red = macro('noop');
      `,
    },
    {
      title:
        'optionally keep imports in combination with babel-preset-env (#80)',
      code: `
        import macro from './fixtures/keep-imports.macro'
        const red = macro('noop')
      `,
      babelOptions: {
        plugins: [
          require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
        ],
      },
    },
    {
      title: 'throws an error if the macro is not properly wrapped',
      error: true,
      code: `
        import unwrapped from './fixtures/non-wrapped.macro'
        unwrapped('hey')
      `,
    },
    {
      title: 'forwards MacroErrors thrown by the macro',
      error: true,
      code: `
        import errorThrower from './fixtures/macro-error-thrower.macro'
        errorThrower('hey')
      `,
    },
    {
      title: 'prepends the relative path for errors thrown by the macro',
      error: true,
      code: `
        import errorThrower from './fixtures/error-thrower.macro'
        errorThrower('hey')
      `,
    },
    {
      title: 'appends the npm URL for errors thrown by node modules',
      error: true,
      code: `
        import errorThrower from 'babel-plugin-macros-test-error-thrower.macro'
        errorThrower('hi')
      `,
    },
    {
      title:
        'appends the npm URL for errors thrown by node modules with a slash',
      error: true,
      code: `
        import errorThrower from 'babel-plugin-macros-test-error-thrower/macro'
        errorThrower('hi')
      `,
    },
    {
      title: 'macros can set their configName and get their config',
      fixture: path.join(__dirname, 'fixtures/config/code.js'),
      teardown() {
        try {
          const babelMacrosConfig = require('./fixtures/config/babel-plugin-macros.config')
          const configurableMacro = require('./fixtures/config/configurable.macro')
          expect(configurableMacro.realMacro).toHaveBeenCalledTimes(1)
          expect(configurableMacro.realMacro.mock.calls[0][0].config).toEqual(
            babelMacrosConfig[configurableMacro.configName],
          )

          configurableMacro.realMacro.mockClear()
        } catch (e) {
          console.error(e)
          throw e
        }
      },
    },
    {
      title:
        'when there is an error reading the config, a helpful message is logged',
      error: true,
      fixture: path.join(__dirname, 'fixtures/config/code.js'),
      setup() {
        cosmiconfigMock.mockSearchSync.mockImplementationOnce(() => {
          throw new Error('this is a cosmiconfig error')
        })
        const originalError = console.error
        console.error = jest.fn()
        return function teardown() {
          try {
            expect(console.error).toHaveBeenCalledTimes(1)
            expect(console.error.mock.calls[0]).toMatchSnapshot()
            console.error = originalError
          } catch (e) {
            console.error(e)
            throw e
          }
        }
      },
    },
    {
      title: 'when there is no config to load, then no config is passed',
      fixture: path.join(__dirname, 'fixtures/config/code.js'),
      setup() {
        cosmiconfigMock.mockSearchSync.mockImplementationOnce(() => null)
        return function teardown() {
          try {
            const configurableMacro = require('./fixtures/config/configurable.macro')
            expect(configurableMacro.realMacro).toHaveBeenCalledTimes(1)
            expect(configurableMacro.realMacro.mock.calls[0][0].config).toEqual(
              {},
            )
            configurableMacro.realMacro.mockClear()
          } catch (e) {
            console.error(e)
            throw e
          }
        }
      },
    },
    {
      title: 'when configuration is specified in plugin options',
      pluginOptions: {
        configurableMacro: {
          someConfig: false,
          somePluginConfig: true,
        },
      },
      fixture: path.join(__dirname, 'fixtures/config/code.js'),
      teardown() {
        try {
          const configurableMacro = require('./fixtures/config/configurable.macro')
          expect(configurableMacro.realMacro).toHaveBeenCalledTimes(1)
          expect(configurableMacro.realMacro.mock.calls[0][0].config).toEqual({
            fileConfig: true,
            someConfig: true,
            somePluginConfig: true,
          })
          configurableMacro.realMacro.mockClear()
        } catch (e) {
          console.error(e)
          throw e
        }
      },
    },
    {
      title: 'when configuration is specified in plugin options',
      pluginOptions: {
        configurableMacro: {
          someConfig: false,
          somePluginConfig: true,
        },
      },
      fixture: path.join(__dirname, 'fixtures/config/cjs-code.js'),
      teardown() {
        try {
          const configurableMacro = require('./fixtures/config/configurable.macro')
          expect(configurableMacro.realMacro).toHaveBeenCalledTimes(1)
          expect(configurableMacro.realMacro.mock.calls[0][0].config).toEqual({
            fileConfig: true,
            someConfig: true,
            somePluginConfig: true,
          })
          configurableMacro.realMacro.mockClear()
        } catch (e) {
          console.error(e)
          throw e
        }
      },
    },
    {
      title: 'when configuration is specified incorrectly in plugin options',
      fixture: path.join(__dirname, 'fixtures/config/code.js'),
      pluginOptions: {
        configurableMacro: 2,
      },
      teardown() {
        try {
          const configurableMacro = require('./fixtures/config/configurable.macro')
          expect(configurableMacro.realMacro).toHaveBeenCalledTimes(1)
          expect(configurableMacro.realMacro).not.toHaveBeenCalledWith(
            expect.objectContaining({
              config: expect.any,
            }),
          )
          configurableMacro.realMacro.mockClear()
        } catch (e) {
          console.error(e)
          throw e
        }
      },
    },
    {
      title:
        'when plugin options configuration cannot be merged with file configuration',
      error: true,
      fixture: path.join(__dirname, 'fixtures/primitive-config/code.js'),
      pluginOptions: {
        configurableMacro: {},
      },
    },
    {
      title:
        'when a plugin that replaces paths is used, macros still work properly',
      fixture: path.join(
        __dirname,
        'fixtures/path-replace-issue/variable-assignment.js',
      ),
      babelOptions: {
        babelrc: true,
      },
    },
    {
      title: 'Macros are applied in the order respecting plugins order',
      code: `
        import Wrap from "./fixtures/jsx-id-prefix.macro";

        const bar = Wrap(<div id="d1"><p id="p1"></p></div>);
      `,
      babelOptions: {
        presets: [{plugins: [require('./fixtures/jsx-id-prefix.plugin')]}],
      },
    },
  ],
})
