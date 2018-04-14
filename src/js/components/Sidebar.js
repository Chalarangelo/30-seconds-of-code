import jump from '../deps/jump'
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
  const link = e.target.closest('.sidebar__link')
  if (link) {
    setTimeout(toggle, 50)
    jump(link.getAttribute('href'), {
      duration: 500,
      easing: easeOutQuint,
      offset: window.innerWidth <= 991 ? -64 : -32
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

EventHub.on('Tag.click', data => {
  data.type_new = data.type.map(el => el.dataset.type)
  sections.forEach(section => {
    section.style.display = 'block'
    //console.log(data.type_new.includes('all'))
    if(!data.type_new.includes(section.dataset.type) && !data.type_new.includes('all')) {
      section.style.display = 'none'
    }
    else{
      section.style.display = ''
    }
  })
})

export default { toggle }
