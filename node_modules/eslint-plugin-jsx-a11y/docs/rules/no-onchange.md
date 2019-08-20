# no-onchange

Enforce usage of `onBlur` over/in parallel with `onChange` on select menu elements for accessibility. `onBlur` **should** be used instead of `onChange`, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users. `onBlur` is a more declarative action by the user: for instance in a dropdown, using the arrow keys to toggle between options will trigger the `onChange` event in some browsers. Regardless, when a change of context results from an `onBlur` event or an `onChange` event, the user should be notified of the change unless it occurs below the currently focused element.

#### References
1. [onChange Event Accessibility Issues](http://cita.disability.uiuc.edu/html-best-practices/auto/onchange.php)
2. [onChange Select Menu](http://www.themaninblue.com/writing/perspective/2004/10/19/)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<select onBlur={updateModel}>
  <option/>
</select>

<select>
  <option onBlur={handleOnBlur} onChange={handleOnChange} />
</select>
```

### Fail
```jsx
<select onChange={updateModel} />
```
