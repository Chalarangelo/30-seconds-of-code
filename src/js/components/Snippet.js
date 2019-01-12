import { selectAll } from '../deps/utils'

const snippets = selectAll('.snippet')
EventHub.on('Tag.click', data => {
  data.type_new = data.type.map(el => el.dataset.type)
  snippets.forEach(snippet => {
    snippet.style.display = 'block'
    if (data.type_new.includes('all')) return
    const tags = selectAll('.tags__tag', snippet)
    if (!tags.some(el => data.type_new.includes(el.dataset.type))) {
      snippet.style.display = 'none'
    } else {
      snippet.style.display = ''
    }
  })
})
