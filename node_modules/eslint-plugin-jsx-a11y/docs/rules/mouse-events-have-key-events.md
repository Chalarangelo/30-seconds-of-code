# mouse-events-have-key-events

Enforce onmouseover/onmouseout are accompanied by onfocus/onblur. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<div onMouseOver={ () => void 0 } onFocus={ () => void 0 } />
<div onMouseOut={ () => void 0 } onBlur={ () => void 0 } />
<div onMouseOver={ () => void 0 } onFocus={ () => void 0 } {...otherProps} />
<div onMouseOut={ () => void 0 } onBlur={ () => void 0 } {...otherProps} />
```

### Fail
In example 3 and 4 below, even if otherProps contains onBlur and/or onFocus, this rule will still fail. Props should be passed down explicitly for rule to pass.

```jsx
<div onMouseOver={ () => void 0 } />
<div onMouseOut={ () => void 0 } />
<div onMouseOver={ () => void 0 } {...otherProps} />
<div onMouseOut={ () => void 0 } {...otherProps} />
```
