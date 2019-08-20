// This is by no means a full test file for loader.js so feel free to add more tests.
import mock from "xhr-mock"
import DevLoader from "../dev-loader"
import emitter from "../emitter"

jest.mock(`../emitter`)
jest.mock(`../socketIo`, () => {
  return {
    default: jest.fn(),
    getPageData: jest.fn(),
  }
})

describe(`Dev loader`, () => {
  describe(`loadPageDataJson`, () => {
    let originalBasePath
    let originalPathPrefix
    let xhrCount

    /**
     * @param {string} path
     * @param {number} status
     * @param {string|Object?} responseText
     * @param {boolean?} json
     */
    const mockPageData = (path, status, responseText = ``, json = false) => {
      mock.get(`/page-data${path}/page-data.json`, (req, res) => {
        xhrCount++
        if (json) {
          res.header(`content-type`, `application/json`)
        }

        return res
          .status(status)
          .body(
            typeof responseText === `string`
              ? responseText
              : JSON.stringify(responseText)
          )
      })
    }

    const defaultPayload = {
      path: `/mypage/`,
      webpackCompilationHash: `1234`,
    }

    // replace the real XHR object with the mock XHR object before each test
    beforeEach(() => {
      originalBasePath = global.__BASE_PATH__
      originalPathPrefix = global.__PATH_PREFIX__
      global.__BASE_PATH__ = ``
      global.__PATH_PREFIX__ = ``
      xhrCount = 0
      mock.setup()
    })

    // put the real XHR object back and clear the mocks after each test
    afterEach(() => {
      global.__BASE_PATH__ = originalBasePath
      global.__PATH_PREFIX__ = originalPathPrefix
      mock.teardown()
    })

    it(`should return a pageData json on success`, async () => {
      const devLoader = new DevLoader(null, [])

      mockPageData(`/mypage`, 200, defaultPayload, true)

      const expectation = {
        status: `success`,
        pagePath: `/mypage`,
        payload: defaultPayload,
      }
      expect(await devLoader.loadPageDataJson(`/mypage/`)).toEqual(expectation)
      expect(devLoader.pageDataDb.get(`/mypage`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should return a pageData json on success without contentType`, async () => {
      const devLoader = new DevLoader(null, [])

      mockPageData(`/mypage`, 200, defaultPayload)

      const expectation = {
        status: `success`,
        pagePath: `/mypage`,
        payload: defaultPayload,
      }
      expect(await devLoader.loadPageDataJson(`/mypage/`)).toEqual(expectation)
      expect(devLoader.pageDataDb.get(`/mypage`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should return a pageData json with an empty compilation hash (gatsby develop)`, async () => {
      const devLoader = new DevLoader(null, [])

      const payload = { ...defaultPayload, webpackCompilationHash: `` }
      mockPageData(`/mypage`, 200, payload)

      const expectation = {
        status: `success`,
        pagePath: `/mypage`,
        payload,
      }
      expect(await devLoader.loadPageDataJson(`/mypage/`)).toEqual(expectation)
      expect(devLoader.pageDataDb.get(`/mypage`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should load a 404 page when page-path file is not a gatsby json`, async () => {
      const devLoader = new DevLoader(null, [])

      const payload = { ...defaultPayload, path: `/404.html/` }
      mockPageData(`/unknown-page`, 200, { random: `string` }, true)
      mockPageData(`/404.html`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/404.html`,
        notFound: true,
        payload,
      }
      expect(await devLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(devLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should load a 404 page when page-path file is not a json`, async () => {
      const devLoader = new DevLoader(null, [])

      const payload = { ...defaultPayload, path: `/404.html/` }
      mockPageData(`/unknown-page`, 200)
      mockPageData(`/404.html`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/404.html`,
        notFound: true,
        payload,
      }
      expect(await devLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(devLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should load a 404 page when path returns a 404`, async () => {
      const devLoader = new DevLoader(null, [])

      const payload = { ...defaultPayload, path: `/404.html/` }
      mockPageData(`/unknown-page`, 200)
      mockPageData(`/404.html`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/404.html`,
        notFound: true,
        payload,
      }
      expect(await devLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(devLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should return the dev-404-page when no 404 page can be found`, async () => {
      const devLoader = new DevLoader(null, [])

      const payload = { ...defaultPayload, path: `/dev-404-page/` }
      mockPageData(`/unknown-page`, 404)
      mockPageData(`/404.html`, 404)
      mockPageData(`/dev-404-page`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/dev-404-page`,
        notFound: true,
        payload,
      }
      expect(await devLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )

      expect(devLoader.pageDataDb.get(`/unknown-page`)).toEqual({
        notFound: true,
        pagePath: `/404.html`,
        status: `failure`,
      })
      expect(xhrCount).toBe(3)
    })

    it(`should return an error when status is 500`, async () => {
      const devLoader = new DevLoader(null, [])

      mockPageData(`/error-page`, 500)

      const expectation = {
        status: `error`,
        pagePath: `/error-page`,
      }
      expect(await devLoader.loadPageDataJson(`/error-page/`)).toEqual(
        expectation
      )
      expect(devLoader.pageDataDb.get(`/error-page`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should retry 3 times before returning an error`, async () => {
      const devLoader = new DevLoader(null, [])

      mockPageData(`/blocked-page`, 0)

      const expectation = {
        status: `error`,
        retries: 3,
        pagePath: `/blocked-page`,
      }
      expect(await devLoader.loadPageDataJson(`/blocked-page/`)).toEqual(
        expectation
      )
      expect(devLoader.pageDataDb.get(`/blocked-page`)).toEqual(expectation)
      expect(xhrCount).toBe(4)
    })

    it(`should recover if we get 1 failure`, async () => {
      const devLoader = new DevLoader(null, [])
      const payload = {
        path: `/blocked-page/`,
        webpackCompilationHash: `1234`,
      }

      let xhrCount = 0
      mock.get(`/page-data/blocked-page/page-data.json`, (req, res) => {
        if (xhrCount++ === 0) {
          return res.status(0).body(``)
        } else {
          res.header(`content-type`, `application/json`)
          return res.status(200).body(JSON.stringify(payload))
        }
      })

      const expectation = {
        status: `success`,
        retries: 1,
        pagePath: `/blocked-page`,
        payload,
      }
      expect(await devLoader.loadPageDataJson(`/blocked-page/`)).toEqual(
        expectation
      )
      expect(devLoader.pageDataDb.get(`/blocked-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`shouldn't load pageData multiple times`, async () => {
      const devLoader = new DevLoader(null, [])

      mockPageData(`/mypage`, 200, defaultPayload, true)

      const expectation = await devLoader.loadPageDataJson(`/mypage/`)
      expect(await devLoader.loadPageDataJson(`/mypage/`)).toBe(expectation)
      expect(xhrCount).toBe(1)
    })
  })

  describe(`loadPage`, () => {
    const createSyncRequires = components => {
      return {
        components,
      }
    }

    beforeEach(() => emitter.emit.mockReset())

    it(`should be successful when component can be loaded`, async () => {
      const syncRequires = createSyncRequires({
        chunk: `instance`,
      })
      const devLoader = new DevLoader(syncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
        result: {
          pageContext: `something something`,
        },
      }
      devLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `success`,
        })
      )

      const expectation = await devLoader.loadPage(`/mypage/`)
      expect(expectation).toMatchSnapshot()
      expect(Object.keys(expectation)).toEqual([`component`, `json`, `page`])
      expect(devLoader.pageDb.get(`/mypage`)).toEqual(
        expect.objectContaining({
          payload: expectation,
          status: `success`,
        })
      )
      expect(emitter.emit).toHaveBeenCalledTimes(1)
      expect(emitter.emit).toHaveBeenCalledWith(`onPostLoadPageResources`, {
        page: expectation,
        pageResources: expectation,
      })
    })

    it(`should load page path first before falling back to matchPath`, async () => {
      const syncRequires = createSyncRequires({
        chunk: () => `instance`,
      })
      const prodLoader = new DevLoader(syncRequires, [
        {
          matchPath: `/app/*`,
          path: `/app`,
        },
      ])
      const pageData = {
        path: `/app/login/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
        result: {
          pageContext: `something something`,
        },
      }

      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `success`,
        })
      )

      const expectation = await prodLoader.loadPage(`/app/login/`)
      expect(expectation).toMatchSnapshot()
      expect(Object.keys(expectation)).toEqual([`component`, `json`, `page`])
      expect(prodLoader.pageDb.get(`/app/login`)).toEqual(
        expect.objectContaining({
          payload: expectation,
          status: `success`,
        })
      )
    })

    it(`should load matchPath pageData if current page returns notFound`, async () => {
      const syncRequires = createSyncRequires({
        chunk: () => `instance`,
      })
      const pageData = {
        path: `/app/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
        result: {
          pageContext: `something something`,
        },
      }
      const prodLoader = new DevLoader(syncRequires, [
        {
          matchPath: `/app/*`,
          path: `/app`,
        },
      ])

      prodLoader.loadPageDataJson = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            notFound: true,
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            payload: pageData,
            status: `success`,
          })
        )

      const expectation = await prodLoader.loadPage(`/app/mypage/`)
      expect(expectation).toMatchSnapshot()
      expect(Object.keys(expectation)).toEqual([`component`, `json`, `page`])
      expect(prodLoader.pageDb.has(`/app/mypage`)).toBe(true)
      expect(prodLoader.pageDb.has(`/app`)).toBe(true)
      expect(prodLoader.pageDb.get(`/app/mypage`)).toEqual(
        expect.objectContaining({
          payload: expectation,
          status: `success`,
        })
      )
      expect(prodLoader.loadPageDataJson).toHaveBeenCalledTimes(2)
      expect(emitter.emit).toHaveBeenCalledTimes(1)
      expect(emitter.emit).toHaveBeenCalledWith(`onPostLoadPageResources`, {
        page: expectation,
        pageResources: expectation,
      })
    })

    it(`should set not found on finalResult`, async () => {
      const syncRequires = createSyncRequires({
        chunk: `instance`,
      })
      const devLoader = new DevLoader(syncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
      }
      devLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `success`,
          notFound: true,
        })
      )

      await devLoader.loadPage(`/mypage/`)
      const expectation = devLoader.pageDb.get(`/mypage`)
      expect(expectation).toHaveProperty(`notFound`, true)
      expect(emitter.emit).toHaveBeenCalledTimes(1)
      expect(emitter.emit).toHaveBeenCalledWith(`onPostLoadPageResources`, {
        page: expectation.payload,
        pageResources: expectation.payload,
      })
    })

    it(`should return an error when component cannot be loaded`, async () => {
      const syncRequires = createSyncRequires({
        chunk: false,
      })
      const devLoader = new DevLoader(syncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
      }
      devLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `success`,
        })
      )

      await devLoader.loadPage(`/mypage/`)
      const expectation = devLoader.pageDb.get(`/mypage`)
      expect(expectation).toHaveProperty(`status`, `error`)
      expect(emitter.emit).toHaveBeenCalledTimes(0)
    })

    it(`should return an error pageData contains an error`, async () => {
      const syncRequires = createSyncRequires({
        chunk: `instance`,
      })
      const devLoader = new DevLoader(syncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
      }
      devLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `error`,
        })
      )

      expect(await devLoader.loadPage(`/mypage/`)).toEqual({ status: `error` })
      expect(devLoader.pageDb.size).toBe(0)
      expect(emitter.emit).toHaveBeenCalledTimes(0)
    })

    it(`should throw an error when 404 cannot be fetched`, async () => {
      const devLoader = new DevLoader(null, [])

      devLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          status: `failure`,
        })
      )

      try {
        await devLoader.loadPage(`/404.html/`)
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(`404 page could not be found`)
        )
      }
      expect(devLoader.pageDb.size).toBe(0)
      expect(emitter.emit).toHaveBeenCalledTimes(0)
    })

    it(`should cache the result of loadPage`, async () => {
      const syncRequires = createSyncRequires({
        chunk: `instance`,
      })
      const devLoader = new DevLoader(syncRequires, [])
      devLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: {
            componentChunkName: `chunk`,
          },
          status: `success`,
        })
      )

      const expectation = await devLoader.loadPage(`/mypage/`)
      expect(await devLoader.loadPage(`/mypage/`)).toBe(expectation)
      expect(devLoader.loadPageDataJson).toHaveBeenCalledTimes(1)
    })
  })

  describe(`loadPageSync`, () => {
    it(`returns page resources when already fetched`, () => {
      const devLoader = new DevLoader(null, [])

      devLoader.pageDb.set(`/mypage`, { payload: true })
      expect(devLoader.loadPageSync(`/mypage/`)).toBe(true)
    })

    it(`returns page resources when already fetched`, () => {
      const devLoader = new DevLoader(null, [])

      expect(devLoader.loadPageSync(`/mypage/`)).toBeUndefined()
    })
  })

  describe(`prefetch`, () => {
    const flushPromises = () => new Promise(resolve => setImmediate(resolve))

    it(`shouldn't prefetch when shouldPrefetch is false`, () => {
      const devLoader = new DevLoader(null, [])
      devLoader.shouldPrefetch = jest.fn(() => false)
      devLoader.doPrefetch = jest.fn()
      devLoader.apiRunner = jest.fn()

      expect(devLoader.prefetch(`/mypath/`)).toBe(false)
      expect(devLoader.shouldPrefetch).toHaveBeenCalledWith(`/mypath/`)
      expect(devLoader.apiRunner).not.toHaveBeenCalled()
      expect(devLoader.doPrefetch).not.toHaveBeenCalled()
    })

    it(`should trigger custom prefetch logic when core is disabled`, () => {
      const devLoader = new DevLoader(null, [])
      devLoader.shouldPrefetch = jest.fn(() => true)
      devLoader.doPrefetch = jest.fn()
      devLoader.apiRunner = jest.fn()
      devLoader.prefetchDisabled = true

      expect(devLoader.prefetch(`/mypath/`)).toBe(false)
      expect(devLoader.shouldPrefetch).toHaveBeenCalledWith(`/mypath/`)
      expect(devLoader.apiRunner).toHaveBeenCalledWith(`onPrefetchPathname`, {
        pathname: `/mypath/`,
      })
      expect(devLoader.doPrefetch).not.toHaveBeenCalled()
    })

    it(`should prefetch when not yet triggered`, async () => {
      jest.useFakeTimers()
      const devLoader = new DevLoader(null, [])
      devLoader.shouldPrefetch = jest.fn(() => true)
      devLoader.apiRunner = jest.fn()
      devLoader.doPrefetch = jest.fn(() => Promise.resolve({}))

      expect(devLoader.prefetch(`/mypath/`)).toBe(true)

      // wait for doPrefetchPromise
      await flushPromises()

      expect(devLoader.apiRunner).toHaveBeenCalledWith(`onPrefetchPathname`, {
        pathname: `/mypath/`,
      })
      expect(devLoader.apiRunner).toHaveBeenNthCalledWith(
        2,
        `onPostPrefetchPathname`,
        {
          pathname: `/mypath/`,
        }
      )
    })

    it(`should only run apis once`, async () => {
      const devLoader = new DevLoader(null, [])
      devLoader.shouldPrefetch = jest.fn(() => true)
      devLoader.apiRunner = jest.fn()
      devLoader.doPrefetch = jest.fn(() => Promise.resolve({}))

      expect(devLoader.prefetch(`/mypath/`)).toBe(true)
      expect(devLoader.prefetch(`/mypath/`)).toBe(true)

      // wait for doPrefetchPromise
      await flushPromises()

      expect(devLoader.apiRunner).toHaveBeenCalledTimes(2)
      expect(devLoader.apiRunner).toHaveBeenNthCalledWith(
        1,
        `onPrefetchPathname`,
        expect.anything()
      )
      expect(devLoader.apiRunner).toHaveBeenNthCalledWith(
        2,
        `onPostPrefetchPathname`,
        expect.anything()
      )
    })
  })
})
