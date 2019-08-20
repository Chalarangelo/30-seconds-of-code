import "@babel/polyfill"
const {
  reportError,
  clearError,
  errorMap,
} = require(`../error-overlay-handler`)

import * as ErrorOverlay from "react-error-overlay"

jest.mock(`react-error-overlay`, () => {
  return {
    reportBuildError: jest.fn(),
    dismissBuildError: jest.fn(),
    startReportingRuntimeErrors: jest.fn(),
    setEditorHandler: jest.fn(),
  }
})

beforeEach(() => {
  ErrorOverlay.reportBuildError.mockClear()
  ErrorOverlay.dismissBuildError.mockClear()
})

describe(`errorOverlayHandler`, () => {
  describe(`clearError()`, () => {
    beforeEach(() => {
      reportError(`foo`, `error`)
      reportError(`bar`, `error`)
    })
    afterAll(() => {
      clearError(`foo`)
      clearError(`bar`)
    })
    it(`should clear specific error type`, () => {
      expect(Object.keys(errorMap)).toHaveLength(2)
      clearError(`foo`)
      expect(Object.keys(errorMap)).toHaveLength(1)
      expect(ErrorOverlay.dismissBuildError).not.toHaveBeenCalled()
    })

    it(`should call ErrorOverlay to dismiss build errors`, () => {
      clearError(`foo`)
      clearError(`bar`)
      expect(ErrorOverlay.dismissBuildError).toHaveBeenCalled()
    })
  })
  describe(`reportErrorOverlay()`, () => {
    it(`should not add error if it's empty and not call ErrorOverlay`, () => {
      reportError(`foo`, null)
      expect(Object.keys(errorMap)).toHaveLength(0)
      expect(ErrorOverlay.reportBuildError).not.toHaveBeenCalled()
    })
    it(`should add error if it has a truthy value and call ErrorOverlay`, () => {
      reportError(`foo`, `bar`)
      expect(Object.keys(errorMap)).toHaveLength(1)
      expect(ErrorOverlay.reportBuildError).toHaveBeenCalled()
    })
  })
})
