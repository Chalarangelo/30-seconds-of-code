// This is by no means a full test file for loader.js so feel free to add more tests.
import mock from "xhr-mock"
import { ProdLoader } from "../loader"
import emitter from "../emitter"

jest.mock(`../emitter`)

describe(`Production loader`, () => {
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
      const prodLoader = new ProdLoader(null, [])

      mockPageData(`/mypage`, 200, defaultPayload, true)

      const expectation = {
        status: `success`,
        pagePath: `/mypage`,
        payload: defaultPayload,
      }
      expect(await prodLoader.loadPageDataJson(`/mypage/`)).toEqual(expectation)
      expect(prodLoader.pageDataDb.get(`/mypage`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should return a pageData json on success without contentType`, async () => {
      const prodLoader = new ProdLoader(null, [])

      mockPageData(`/mypage`, 200, defaultPayload)

      const expectation = {
        status: `success`,
        pagePath: `/mypage`,
        payload: defaultPayload,
      }
      expect(await prodLoader.loadPageDataJson(`/mypage/`)).toEqual(expectation)
      expect(prodLoader.pageDataDb.get(`/mypage`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should return a pageData json with an empty compilation hash (gatsby develop)`, async () => {
      const prodLoader = new ProdLoader(null, [])

      const payload = { ...defaultPayload, webpackCompilationHash: `` }
      mockPageData(`/mypage`, 200, payload)

      const expectation = {
        status: `success`,
        pagePath: `/mypage`,
        payload,
      }
      expect(await prodLoader.loadPageDataJson(`/mypage/`)).toEqual(expectation)
      expect(prodLoader.pageDataDb.get(`/mypage`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should load a 404 page when page-path file is not a gatsby json`, async () => {
      const prodLoader = new ProdLoader(null, [])

      const payload = { ...defaultPayload, path: `/404.html/` }
      mockPageData(`/unknown-page`, 200, { random: `string` }, true)
      mockPageData(`/404.html`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/404.html`,
        notFound: true,
        payload,
      }
      expect(await prodLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should load a 404 page when page-path file is not a json`, async () => {
      const prodLoader = new ProdLoader(null, [])

      const payload = { ...defaultPayload, path: `/404.html/` }
      mockPageData(`/unknown-page`, 200)
      mockPageData(`/404.html`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/404.html`,
        notFound: true,
        payload,
      }
      expect(await prodLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should load a 404 page when path returns a 404`, async () => {
      const prodLoader = new ProdLoader(null, [])

      const payload = { ...defaultPayload, path: `/404.html/` }
      mockPageData(`/unknown-page`, 200)
      mockPageData(`/404.html`, 200, payload, true)

      const expectation = {
        status: `success`,
        pagePath: `/404.html`,
        notFound: true,
        payload,
      }
      expect(await prodLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should return a failure when status is 404 and 404 page is fetched`, async () => {
      const prodLoader = new ProdLoader(null, [])

      mockPageData(`/unknown-page`, 404)
      mockPageData(`/404.html`, 404)

      const expectation = {
        status: `failure`,
        pagePath: `/404.html`,
        notFound: true,
      }
      expect(await prodLoader.loadPageDataJson(`/unknown-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/unknown-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`should return an error when status is 500`, async () => {
      const prodLoader = new ProdLoader(null, [])

      mockPageData(`/error-page`, 500)

      const expectation = {
        status: `error`,
        pagePath: `/error-page`,
      }
      expect(await prodLoader.loadPageDataJson(`/error-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/error-page`)).toEqual(expectation)
      expect(xhrCount).toBe(1)
    })

    it(`should retry 3 times before returning an error`, async () => {
      const prodLoader = new ProdLoader(null, [])

      mockPageData(`/blocked-page`, 0)

      const expectation = {
        status: `error`,
        retries: 3,
        pagePath: `/blocked-page`,
      }
      expect(await prodLoader.loadPageDataJson(`/blocked-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/blocked-page`)).toEqual(expectation)
      expect(xhrCount).toBe(4)
    })

    it(`should recover if we get 1 failure`, async () => {
      const prodLoader = new ProdLoader(null, [])
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
      expect(await prodLoader.loadPageDataJson(`/blocked-page/`)).toEqual(
        expectation
      )
      expect(prodLoader.pageDataDb.get(`/blocked-page`)).toEqual(expectation)
      expect(xhrCount).toBe(2)
    })

    it(`shouldn't load pageData multiple times`, async () => {
      const prodLoader = new ProdLoader(null, [])

      mockPageData(`/mypage`, 200, defaultPayload, true)

      const expectation = await prodLoader.loadPageDataJson(`/mypage/`)
      expect(await prodLoader.loadPageDataJson(`/mypage/`)).toBe(expectation)
      expect(xhrCount).toBe(1)
    })
  })

  describe(`loadPage`, () => {
    const createAsyncRequires = components => {
      return {
        components,
      }
    }

    beforeEach(() => emitter.emit.mockReset())

    it(`should be successful when component can be loaded`, async () => {
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const prodLoader = new ProdLoader(asyncRequires, [])
      const pageData = {
        path: `/mypage/`,
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

      const expectation = await prodLoader.loadPage(`/mypage/`)
      expect(expectation).toMatchSnapshot()
      expect(Object.keys(expectation)).toEqual([`component`, `json`, `page`])
      expect(prodLoader.pageDb.get(`/mypage`)).toEqual(
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
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const prodLoader = new ProdLoader(asyncRequires, [
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
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const pageData = {
        path: `/app/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
        result: {
          pageContext: `something something`,
        },
      }
      const prodLoader = new ProdLoader(asyncRequires, [
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
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const prodLoader = new ProdLoader(asyncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
      }
      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `success`,
          notFound: true,
        })
      )

      await prodLoader.loadPage(`/mypage/`)
      const expectation = prodLoader.pageDb.get(`/mypage`)
      expect(expectation).toHaveProperty(`notFound`, true)
      expect(emitter.emit).toHaveBeenCalledTimes(1)
      expect(emitter.emit).toHaveBeenCalledWith(`onPostLoadPageResources`, {
        page: expectation.payload,
        pageResources: expectation.payload,
      })
    })

    it(`should return an error when component cannot be loaded`, async () => {
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(false),
      })
      const prodLoader = new ProdLoader(asyncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
      }
      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `success`,
        })
      )

      await prodLoader.loadPage(`/mypage/`)
      const expectation = prodLoader.pageDb.get(`/mypage`)
      expect(expectation).toHaveProperty(`status`, `error`)
      expect(emitter.emit).toHaveBeenCalledTimes(0)
    })

    it(`should return an error pageData contains an error`, async () => {
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const prodLoader = new ProdLoader(asyncRequires, [])
      const pageData = {
        path: `/mypage/`,
        componentChunkName: `chunk`,
        webpackCompilationHash: `123`,
      }
      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: pageData,
          status: `error`,
        })
      )

      expect(await prodLoader.loadPage(`/mypage/`)).toEqual({ status: `error` })
      expect(prodLoader.pageDb.size).toBe(0)
      expect(emitter.emit).toHaveBeenCalledTimes(0)
    })

    it(`should throw an error when 404 cannot be fetched`, async () => {
      const prodLoader = new ProdLoader(null, [])

      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          status: `failure`,
        })
      )

      try {
        await prodLoader.loadPage(`/404.html/`)
      } catch (err) {
        expect(err.message).toEqual(
          expect.stringContaining(`404 page could not be found`)
        )
      }
      expect(prodLoader.pageDb.size).toBe(0)
      expect(emitter.emit).toHaveBeenCalledTimes(0)
    })

    it(`should cache the result of loadPage`, async () => {
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const prodLoader = new ProdLoader(asyncRequires, [])
      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: {
            componentChunkName: `chunk`,
          },
          status: `success`,
        })
      )

      const expectation = await prodLoader.loadPage(`/mypage/`)
      expect(await prodLoader.loadPage(`/mypage/`)).toBe(expectation)
      expect(prodLoader.loadPageDataJson).toHaveBeenCalledTimes(1)
    })

    it(`should only run 1 network request even when called multiple times`, async () => {
      const asyncRequires = createAsyncRequires({
        chunk: () => Promise.resolve(`instance`),
      })
      const prodLoader = new ProdLoader(asyncRequires, [])
      prodLoader.loadPageDataJson = jest.fn(() =>
        Promise.resolve({
          payload: {
            componentChunkName: `chunk`,
          },
          status: `success`,
        })
      )

      const loadPagePromise = prodLoader.loadPage(`/test-page/`)
      expect(prodLoader.inFlightDb.size).toBe(1)
      expect(prodLoader.loadPage(`/test-page/`)).toBe(loadPagePromise)
      expect(prodLoader.inFlightDb.size).toBe(1)

      const expectation = await loadPagePromise

      expect(prodLoader.inFlightDb.size).toBe(0)
      expect(emitter.emit).toHaveBeenCalledTimes(1)
      expect(emitter.emit).toHaveBeenCalledWith(`onPostLoadPageResources`, {
        page: expectation,
        pageResources: expectation,
      })
    })
  })

  describe(`loadPageSync`, () => {
    it(`returns page resources when already fetched`, () => {
      const prodLoader = new ProdLoader(null, [])

      prodLoader.pageDb.set(`/mypage`, { payload: true })
      expect(prodLoader.loadPageSync(`/mypage/`)).toBe(true)
    })

    it(`returns page resources when already fetched`, () => {
      const prodLoader = new ProdLoader(null, [])

      expect(prodLoader.loadPageSync(`/mypage/`)).toBeUndefined()
    })
  })

  describe(`prefetch`, () => {
    const flushPromises = () => new Promise(resolve => setImmediate(resolve))

    it(`shouldn't prefetch when shouldPrefetch is false`, () => {
      const prodLoader = new ProdLoader(null, [])
      prodLoader.shouldPrefetch = jest.fn(() => false)
      prodLoader.doPrefetch = jest.fn()
      prodLoader.apiRunner = jest.fn()

      expect(prodLoader.prefetch(`/mypath/`)).toBe(false)
      expect(prodLoader.shouldPrefetch).toHaveBeenCalledWith(`/mypath/`)
      expect(prodLoader.apiRunner).not.toHaveBeenCalled()
      expect(prodLoader.doPrefetch).not.toHaveBeenCalled()
    })

    it(`should trigger custom prefetch logic when core is disabled`, () => {
      const prodLoader = new ProdLoader(null, [])
      prodLoader.shouldPrefetch = jest.fn(() => true)
      prodLoader.doPrefetch = jest.fn()
      prodLoader.apiRunner = jest.fn()
      prodLoader.prefetchDisabled = true

      expect(prodLoader.prefetch(`/mypath/`)).toBe(false)
      expect(prodLoader.shouldPrefetch).toHaveBeenCalledWith(`/mypath/`)
      expect(prodLoader.apiRunner).toHaveBeenCalledWith(`onPrefetchPathname`, {
        pathname: `/mypath/`,
      })
      expect(prodLoader.doPrefetch).not.toHaveBeenCalled()
    })

    it(`should prefetch when not yet triggered`, async () => {
      jest.useFakeTimers()
      const prodLoader = new ProdLoader(null, [])
      prodLoader.shouldPrefetch = jest.fn(() => true)
      prodLoader.apiRunner = jest.fn()
      prodLoader.doPrefetch = jest.fn(() => Promise.resolve({}))

      expect(prodLoader.prefetch(`/mypath/`)).toBe(true)

      // wait for doPrefetchPromise
      await flushPromises()

      expect(prodLoader.apiRunner).toHaveBeenCalledWith(`onPrefetchPathname`, {
        pathname: `/mypath/`,
      })
      expect(prodLoader.apiRunner).toHaveBeenNthCalledWith(
        2,
        `onPostPrefetchPathname`,
        {
          pathname: `/mypath/`,
        }
      )
    })

    it(`should only run apis once`, async () => {
      const prodLoader = new ProdLoader(null, [])
      prodLoader.shouldPrefetch = jest.fn(() => true)
      prodLoader.apiRunner = jest.fn()
      prodLoader.doPrefetch = jest.fn(() => Promise.resolve({}))

      expect(prodLoader.prefetch(`/mypath/`)).toBe(true)
      expect(prodLoader.prefetch(`/mypath/`)).toBe(true)

      // wait for doPrefetchPromise
      await flushPromises()

      expect(prodLoader.apiRunner).toHaveBeenCalledTimes(2)
      expect(prodLoader.apiRunner).toHaveBeenNthCalledWith(
        1,
        `onPrefetchPathname`,
        expect.anything()
      )
      expect(prodLoader.apiRunner).toHaveBeenNthCalledWith(
        2,
        `onPostPrefetchPathname`,
        expect.anything()
      )
    })
  })
})
