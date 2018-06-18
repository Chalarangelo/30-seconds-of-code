const smoothScroll = element =>
document.querySelector(element).scrollIntoView({
behavior: 'smooth'

module.exports = smoothScroll;