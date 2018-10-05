export const select = (s, parent = document) => parent.querySelector(s)

export const selectAll = (s, parent = document) => [].slice.call(parent.querySelectorAll(s))

export const scrollY = () => window.scrollY || window.pageYOffset

export const easeOutQuint = (t, b, c, d) => c * ((t = t / d - 1) * t ** 4 + 1) + b

export const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e)
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false)
  if (opts.target) return delegatorFn
}

export const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    ;(this.hub[event] || []).forEach(handler => handler(data))
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = []
    this.hub[event].push(handler)
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler)
    if (i > -1) this.hub[event].splice(i, 1)
  }
})

window.EventHub = createEventHub()

/*
* Make iOS behave normally.
*/
if (/iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream) {
  document.body.style.cursor = 'pointer'
}

if (/Mac/.test(navigator.platform)) {
  document.documentElement.classList.add('macOS')
}

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
