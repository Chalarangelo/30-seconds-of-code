const { sanitizeError, cleanPaths } = require(`../error-helpers`)

describe(`Errors Helpers`, () => {
  describe(`sanitizeError`, () => {
    it(`Removes env, output and converts buffers to strings from execa output`, () => {
      const error = {
        error: null,
        cmd: `git commit -m"test"`,
        file: `/bin/sh`,
        args: [`/bin/sh`, `-c`, `git commit -m"test`],
        options: {
          cwd: `here`,
          shell: true,
          envPairs: [`VERSION=1.2.3`],
          stdio: [{}, {}, {}], // pipes
        },
        envPairs: [`VERSION=1.2.3`],

        stderr: Buffer.from(`this is a an error`),
        stdout: Buffer.from(`this is a test`),
      }

      const errorString = sanitizeError(error)

      const sanitizedError = JSON.parse(errorString)

      expect(sanitizedError.stderr).toStrictEqual(`this is a an error`)
      expect(sanitizedError.stdout).toStrictEqual(`this is a test`)
      expect(sanitizedError.envPairs).toBeUndefined()
      expect(sanitizedError.options).toBeUndefined()
    })

    it(`Sanitizes current path from error stacktraces`, () => {
      const errormessage = `this is a test`
      let e
      try {
        throw new Error(errormessage)
      } catch (error) {
        e = error
      }
      expect(e).toBeDefined()
      expect(e.message).toEqual(errormessage)
      expect(e.stack).toEqual(expect.stringContaining(process.cwd()))

      const sanitizedErrorString = sanitizeError(e)

      expect(sanitizedErrorString).toEqual(
        expect.stringContaining(errormessage)
      )
      expect(sanitizedErrorString).toEqual(
        expect.not.stringContaining(process.cwd().replace(`\\`, `\\\\`))
      )
    })

    it(`Sanitizes a section of the current path from error stacktraces`, () => {
      const errormessage = `this is a test`

      const e = {
        message: errormessage,
        stack: `
        Error: this is an error
          at Object.<anonymous> (/Users/sidharthachatterjee/Code/gatsby-site/gatsby-config.js:1:32)
          at Object.<anonymous> (/Users/sidharthachatterjee/Code/gatsby-site/node_module/gatsby-telemetry/blah.js:1:69)
          at Object.<anonymous> (/Users/sidharthachatterjee/Code/gatsby-site/node_module/fake-path/index.js:1:41)
          at Object.<anonymous> (/Users/sidharthachatterjee/.fake-path/index.js:1:69)
          at Module._compile (internal/modules/cjs/loader.js:736:30)
          at Object.Module._extensions..js (internal/modules/cjs/loader.js:747:10)
          at Module.load (internal/modules/cjs/loader.js:628:32)
          at tryModuleLoad (internal/modules/cjs/loader.js:568:12)
          at Function.Module._load (internal/modules/cjs/loader.js:560:3)
          at Function.Module.runMain (internal/modules/cjs/loader.js:801:12)
          at executeUserCode (internal/bootstrap/node.js:526:15)
          at startMainThreadExecution (internal/bootstrap/node.js:439:3)
        `,
      }

      expect(e).toBeDefined()
      expect(e.message).toEqual(errormessage)
      expect(e.stack).toBeDefined()

      const mockCwd = jest
        .spyOn(process, `cwd`)
        .mockImplementation(() => `/Users/sidharthachatterjee/Code/gatsby-site`)

      expect(e.stack).toEqual(expect.stringContaining(`sidharthachatterjee`))

      const sanitizedErrorString = sanitizeError(e, `/`)

      expect(sanitizedErrorString.includes(errormessage)).toBe(true)
      expect(sanitizedErrorString).toEqual(
        expect.not.stringContaining(`sidharthachatterjee`)
      )
      expect(sanitizedErrorString.match(/\$SNIP/g).length).toBe(4)

      mockCwd.mockRestore()
    })
  })
  describe(`cleanPaths`, () => {
    it.each([`gatsby-config.js`, `src/pages/index.js`])(
      `should clean path on unix: %s`,
      filePath => {
        const cwdMockPath = `/Users/username/gatsby-site`
        const fullPath = `${cwdMockPath}/${filePath}`

        const mockCwd = jest
          .spyOn(process, `cwd`)
          .mockImplementation(() => cwdMockPath)

        const errormessage = `This path ${fullPath} is a test ${fullPath}`

        expect(cleanPaths(errormessage, `/`)).toBe(
          `This path $SNIP/${filePath} is a test $SNIP/${filePath}`
        )
        mockCwd.mockRestore()
      }
    )

    it.each([`gatsby-config.js`, `src\\pages\\index.js`])(
      `should clean path on windows: %s`,
      filePath => {
        const cwdMockPath = `C:\\Users\\username\\gatsby-site`
        const fullPath = `${cwdMockPath}\\${filePath}`

        const mockCwd = jest
          .spyOn(process, `cwd`)
          .mockImplementation(() => cwdMockPath)

        const errormessage = `This path ${fullPath} is a test ${fullPath}`

        expect(cleanPaths(errormessage, `\\`)).toBe(
          `This path $SNIP\\${filePath} is a test $SNIP\\${filePath}`
        )
        mockCwd.mockRestore()
      }
    )
  })
})
