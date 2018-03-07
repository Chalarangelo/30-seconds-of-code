import { select, selectAll, on } from '../deps/utils'

const tagButtons = selectAll('button.tags__tag')
let isShiftSelected = false;
const onClick = function() {
  if(isShiftSelected){
    document.querySelector.classList.remove('is-active')
  }
  else{
  tagButtons.forEach(button => button.classList.remove('is-active'))
  }
  this.classList.add('is-active')

  EventHub.emit('Tag.click', {
    type: this.dataset.type
  })
}
onkeydown = e => (
  if(e.shiftKey){
    isShiftSelected = true;
});

onkeyup = e => (
  if(e.shiftKey){
    isShiftSelected = false;
});
tagButtons.forEach(button => on(button, 'click', onClick))
