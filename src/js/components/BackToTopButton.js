import jump from 'jump.js'
import { select, scrollY, easeOutQuint } from '../deps/utils'

const backToTopButton = select('.back-to-top-button')

window.addEventListener('scroll', () => {
  backToTopButton.classList[scrollY() > 500 ? 'add' : 'remove']('is-visible')
})
backToTopButton.onclick = () => {
  jump('.header', {
    duration: 750,
    easing: easeOutQuint
  })
}
