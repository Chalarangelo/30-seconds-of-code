---
title: focusTabModal
tags: browser,intermediate
---

Focus tab functionality within modal.

- Allows keyboard users to remain focused within modal while using the tab key.
- Requires user to have a modal to has an id assigned to the modal element and all desired elements be constrained within as children.
- Requires state management of modal mounting and un-mounting (the example is managed by a react class state and turned on and off based off state being either true or false).

```js
const focusTabModal (e, modalId) {
    var lastFocusableElement = document.querySelector('#' + modalId)
      .lastElementChild // last element within modal
    var firstFocusableElement = document.querySelector('#' + modalId).firstElementChild // first element within modal
    let isTabPressed = e.key === "Tab" || e.keyCode === 9
    if (!isTabPressed) {
      return
    }
    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus() // add focus for the last focus-able element
        e.preventDefault()
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focus-able element then focus first focus-able element after pressing tab
        firstFocusableElement.focus() // add focus for the first focus-able element
        e.preventDefault()
      }
    }
  }
```

```js
  componentDidUpdate () {
    if (this.state.open === true) {
      document.addEventListener("keydown", e => this.focusTabModal(e, 'modalId'))
      document.querySelector('#' + modalId)
      .fistElementChild.focus()
    } else {
      document.removeEventListener("keydown", this.focusTabModal, true)
    }
  }
  // no sample output 
```
