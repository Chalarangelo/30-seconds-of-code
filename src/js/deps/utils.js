export const select = s => document.querySelector(s)
export const selectAll = s => [].slice.call(document.querySelectorAll(s))
export const scrollY = () => window.scrollY || window.pageYOffset
export const easeOutQuint = (t, b, c, d) => c * ((t = t / d - 1) * t ** 4 + 1) + b

/*
* A small utility to fix the letter kerning on macOS Chrome and Firefox when using the system font
* (San Francisco). It is now fixed in the text rendering engine in FF 58 and Chrome 64.
* UPDATE: It appears the applied fix doesn't work when the font is in italics. New fix has been added.
* Must be applied to all browsers for now.
*/
;(() => {
  const ua = navigator.userAgent

  // macOS 10.11 (El Capitan) came with San Francisco. Previous versions used Helvetica
  const isRelevantMacOS =
    /Mac/.test(navigator.platform) && (ua.match(/OS X 10[._](\d{1,2})/) || [])[1] >= 11

  // Chrome v64 and FF v58 fix the issue
  const isAffectedBrowser =
    (ua.match(/Chrome\/(\d+)\./) || [])[1] < 64 || (ua.match(/Firefox\/(\d+)\./) || [])[1] < 58

  const allEls = [].slice.call(document.querySelectorAll('*'))

  if (isRelevantMacOS && isAffectedBrowser) {
    document.documentElement.style.letterSpacing = '-0.3px'
    allEls.forEach(el => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize)
      if (fontSize >= 20) el.style.letterSpacing = '0.3px'
    })
  } else if (isRelevantMacOS && !isAffectedBrowser) {
    // Italics fix
    allEls.forEach(el => {
      const { fontSize, fontStyle } = getComputedStyle(el)
      if (fontStyle === 'italic') {
        el.style.letterSpacing = parseFloat(fontSize) >= 20 ? '0.3px' : '-0.3px'
      }
    })
  }
})()
