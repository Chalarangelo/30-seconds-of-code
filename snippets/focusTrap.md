---
title: focusTrap
tags: javascript,browser,advanced
---

This snippet creates a focusTrap constant that allows developers to lock focus
within an element for accessibility purposes

- Stores a reference to an optional trigger element to pass focus back to the
triggering element when focus is released
- Causes focus to release when `esc` is pressed or when a user clicks outside
of the focus trap's wrapper
- Causes focus to loop from the last focusable element in a wrapper to the first
and from the first to the last when `tab` or `shift + tab` are pressed

```js
const focusTrap = {
  active: false,
  trigger: false,
  container: false,
  selectables: 'a[href],area[href],input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]',
  items: [],
  init: function(container, trigger = false) {
    this.active = true;
    this.container = container;
    this.items = [];
    this.trigger = trigger;
    trap = this;
    Array.from(container.querySelectorAll(this.selectables)).forEach(function(el){
      if (el.getBoundingClientRect().width > 0) {
        trap.items.push(el);
      }
    });
    this.items[0].focus();
    document.addEventListener('click', this.clickListener);
    document.addEventListener('keydown', this.keyListener);
  },
  clickListener: function(e) {
    const trap = focusTrap;
    const path = getDomPath(e.target);
    if (!path.includes(trap.container)) {
      focusTrap.destroy();
    }
  },
  keyListener: function(e) {
    //handle tab
    if (e.keyCode === 9) {
      e.preventDefault();

      const i = focusTrap.items.indexOf(e.target);
      let j;

      if (e.shiftKey) {
        if (i == 0) {
          console.log(trap.items.length);
          j = focusTrap.items.length - 1;
        } else {
          j = i - 1;
        }
      } else {
        if (i == (focusTrap.items.length - 1)) {
          j = 0
        } else {
          j = i + 1;
        }
      }
      focusTrap.items[j].focus();
    }

    //handle escape
    if (e.keyCode === 27) {
      trap.destroy();
    }
  },
  destroy: function() {
    if (this.active) {
      if (this.trigger) {
        this.trigger.focus();
      }
      this.container.dispatchEvent(new CustomEvent('exitfocustrap', {bubbles:true,cancelable:true}));
      this.active = false;
      this.trigger = false;
      this.container = false;
      this.items = [];
      document.removeEventListener('click', this.clickListener);
      document.removeEventListener('keydown', this.keyListener);
    } else {
      console.error('Cannot destroy inactive focus trap.')
    }
  }
};
```

```js
focusTrap.init(wrapperElement, triggerElement)
```
