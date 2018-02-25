const e = Element.prototype
if (!e.matches) {
  e.matches =
    e.matchesSelector || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector
}
if (!e.closest) {
  e.closest = function(s) {
    var el = this
    if (!document.documentElement.contains(el)) return null
    do {
      if (el.matches(s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}
