import { selectAll } from '../deps/utils'

const snippets = selectAll('.snippet')
EventHub.on('Tag.click', data => {
  snippets.forEach(snippet => {
    snippet.style.display = 'block'
    if (data.type.includes('all')) return
    const tags = selectAll('.tags__tag', snippet)
    if (!tags.some(el => data.type.includes(el.dataset.type))) {
      snippet.style.display = 'none'
    }
  })
})
