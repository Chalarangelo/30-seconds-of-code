import { select, selectAll, on } from '../deps/utils'

const tagButtons = selectAll('button.tags__tag')

const onClick = function() {
  tagButtons.forEach(button => button.classList.remove('is-active'))
  this.classList.add('is-active')

  EventHub.emit('Tag.click', {
    type: this.dataset.type
  })
}

tagButtons.forEach(button => on(button, 'click', onClick))
