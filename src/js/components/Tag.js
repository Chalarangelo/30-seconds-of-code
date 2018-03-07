import { select, selectAll, on } from '../deps/utils'

const tagButtons = selectAll('button.tags__tag')
let isShiftSelected = false;
const onClick = function() {
  let currentElements = [...document.querySelector('button.tags__tag.is-active')]
  if(isShiftSelected && this.dataset.type === 'all'){
    tagButtons.forEach(button => button.classList.remove('is-active'))
  }
  else if(isShiftSelected){
    document.querySelector('button[type=all]').classList.remove('is-active')
  }
  else {
    tagButtons.forEach(button => button.classList.remove('is-active'))
  }
  if(this.classList.contains('is-active') && this.dataset.type === 'all'){
    this.classList.add('is-active')
    currentElements = [this]
  }
  else if(this.classList.contains('is-active')){
    this.classList.remove('is-active')
    currentElements.splice(currentElements.indexOf(this),1)
  }
  else {
    this.classList.add('is-active');
    if(isShiftSelected){
      currentElements.push(this)
    }
    else{
      currentElements = [this]
    }
  }
  EventHub.emit('Tag.click', {
    type: currentElements.map(el => el.dataset.type)
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
