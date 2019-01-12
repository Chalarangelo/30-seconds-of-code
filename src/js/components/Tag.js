import { select, selectAll, on } from '../deps/utils'

const tagButtons = selectAll('button.tags__tag')
var isShiftSelected = false
const onClick = function() {
  if (isShiftSelected && this.dataset.type === 'all') {
    tagButtons.forEach(button => button.classList.remove('is-active'))
    this.classList.add('is-active')
  } else if (isShiftSelected) {
    select('button[data-type=all]').classList.remove('is-active')
    if (
      this.classList.contains('is-active') &&
      selectAll('button.tags__tag.is-active').length > 1
    ) {
      this.classList.remove('is-active')
    } else if (this.classList.contains('is-active')) {
      this.classList.remove('is-active')
      select('button[data-type=all]').classList.add('is-active')
    } else {
      this.classList.add('is-active')
    }
  } else {
    tagButtons.forEach(button => button.classList.remove('is-active'))
    this.classList.add('is-active')
  }
  EventHub.emit('Tag.click', {
    type: [...selectAll('button.tags__tag.is-active')]
  })
}
onkeydown = e => {
  if (e.shiftKey) {
    isShiftSelected = true
  }
}

onkeyup = e => {
  if (e.key == 'Shift') {
    isShiftSelected = false
  }
}
tagButtons.forEach(button => on(button, 'click', onClick))
