import jump from '../deps/jump'
import { select, selectAll, easeOutQuint } from '../deps/utils'

const menu = select('.hamburger')
const links = select('.sidebar__links')
const ACTIVE_CLASS = 'is-active'

const toggle = () => [menu, links].forEach(el => el.classList.toggle(ACTIVE_CLASS))

menu.addEventListener('click', toggle)

links.addEventListener('click', e => {
  setTimeout(toggle, 40)
  if (e.target.classList.contains('sidebar__link')) {
    e.preventDefault()
    jump(e.target.getAttribute('href'), {
      duration: 750,
      offset: window.innerWidth <= 768 ? -64 : -32,
      easing: easeOutQuint
    })
  }
})

document.addEventListener('click', e => {
  if (
    !e.target.closest('.sidebar__links') &&
    !e.target.closest('.hamburger') &&
    links.classList.contains(ACTIVE_CLASS)
  ) {
    toggle()
  }
})

export default { toggle }
