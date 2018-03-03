import { select, selectAll, easeOutQuint } from '../deps/utils'

const menu = select('.hamburger')
const links = select('.sidebar__links')
const sections = selectAll('.sidebar__section')
const ACTIVE_CLASS = 'is-active'

const toggle = () => {
  if (window.innerWidth <= 991) {
    const els = [menu, links]
    els.forEach(el => el.classList.toggle(ACTIVE_CLASS))
    menu.setAttribute('aria-expanded', menu.classList.contains(ACTIVE_CLASS) ? 'true' : 'false')
  }
}

menu.addEventListener('click', toggle)

links.addEventListener('click', e => {
  if (e.target.classList.contains('sidebar__link')) {
    setTimeout(toggle, 100)
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

EventHub.on('Tag.click', data => {
  sections.forEach(section => {
    section.style.display = 'block'
    if (section.dataset.type !== data.type && data.type !== 'all') {
      section.style.display = 'none'
    }
  })
})

export default { toggle }
