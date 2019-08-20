# click-events-have-key-events

Enforce `onClick` is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<div onClick={() => {}} onKeyDown={this.handleKeyDown} />
<div onClick={() => {}} onKeyUp={this.handleKeyUp} />
<div onClick={() => {}} onKeyPress={this.handleKeyPress} />
```

### Fail
```jsx
<div onClick={() => {}} />
```
