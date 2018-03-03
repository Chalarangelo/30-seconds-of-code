import { selectAll } from '../deps/utils'

const snippets = selectAll('.snippet')
EventHub.on('Tag.click', data => {
  snippets.forEach(snippet => {
    snippet.style.display = 'block'
    if (data.type === 'all') return
    const tags = selectAll('.tags__tag', snippet)
    if (!selectAll('.tags__tag', snippet).some(el => el.dataset.type === data.type)) {
      snippet.style.display = 'none'
    }
  })
})
