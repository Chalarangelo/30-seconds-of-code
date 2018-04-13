import { select, selectAll, on } from '../deps/utils'

const tagButtons = selectAll('button.tags__tag')
let isShiftSelected = false;
const onClick = function() {
  if(isShiftSelected && this.dataset.type === 'all'){
    tagButtons.forEach(button => button.classList.remove('is-active'));
    this.classList.add('is-active');
  }
  else if(isShiftSelected) {
    this.classList.add('is-active');
    select('button[data-type=all]').classList.reomove('is-active');
  }
  else {
    tagButtons.forEach(button => button.classList.remove('is-active'));
    this.classList.add('is-active');
  }
  EventHub.emit('Tag.click', {
    type: [...selectAll('button.tags__tag.is-active')]
  })
}
onkeydown = e => {
  if(e.shiftKey){
    isShiftSelected = true;
}};

onkeyup = e => {
  if(e.shiftKey){
    isShiftSelected = false;
}};
tagButtons.forEach(button => on(button, 'click', onClick))
