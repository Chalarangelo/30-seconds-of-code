# no-static-element-interactions

Static HTML elements do not have semantic meaning. This is clear in the case of `<div>` and `<span>`. It is less so clear in the case of elements that _seem_ semantic, but that do not have a semantic mapping in the accessibility layer. For example `<a>`, `<big>`, `<blockquote>`, `<footer>`, `<picture>`, `<strike>` and `<time>` -- to name a few -- have no semantic layer mapping. They are as void of meaning as `<div>`.

The [WAI-ARIA `role` attribute](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) confers a semantic mapping to an element. The semantic value can then be expressed to a user via assistive technology.

In order to add interactivity such as a mouse or key event listener to a static element, that element must be given a role value as well.

## How do I resolve this error?

### Case: This element acts like a button, link, menuitem, etc.

Indicate the element's role with the `role` attribute:

```jsx
<div
  onClick={onClickHandler}
  onKeyPress={onKeyPressHandler}
  role="button"
  tabIndex="0">
  Save
</div>
```

Common interactive roles include:

  1. `button`
  1. `link`
  1. `checkbox`
  1. `menuitem`
  1. `menuitemcheckbox`
  1. `menuitemradio`
  1. `option`
  1. `radio`
  1. `searchbox`
  1. `switch`
  1. `textbox`

Note: Adding a role to your element does **not** add behavior. When a semantic HTML element like `<button>` is used, then it will also respond to Enter key presses when it has focus. The developer is responsible for providing the expected behavior of an element that the role suggests it would have: focusability and key press support.

### Case: The event handler is only being used to capture bubbled events

If a static element has an event handler for the sole purpose of capturing events from its descendants, you can tell the linter to ignore it by setting `role="presentation"`:

```jsx
<div
  onClick={this.handleButtonClick}
  role="presentation">
  <button>Save</button>
  <button>Cancel</button>
</div>
```

This `role` has no effect on static elements, but it clarifies your intent.

### References

  1. [WAI-ARIA `role` attribute](https://www.w3.org/TR/wai-aria-1.1/#usage_intro)
  1. [WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex)
  1. [Fundamental Keyboard Navigation Conventions](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav)
  1. [Mozilla Developer Network - ARIA Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus)

## Rule details

You may configure which handler props should be taken into account when applying this rule. The recommended configuration includes the following 6 handlers.

```javascript
'jsx-a11y/no-static-element-interactions': [
  'error',
  {
    handlers: [
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onKeyPress',
      'onKeyDown',
      'onKeyUp',
    ],
  },
],
```

Adjust the list of handler prop names in the handlers array to increase or decrease the coverage surface of this rule in your codebase.

### Succeed

```jsx
<button onClick={() => {}} className="foo" />
<div className="foo" onClick={() => {}} role="button" />
<input type="text" onClick={() => {}} />
```

### Fail

```jsx
<div onClick={() => {}} />
```
