# iframe-has-title

`<iframe>` elements must have a unique title property to indicate its content to the user.

#### References
1. [axe-core, frame-title](https://dequeuniversity.com/rules/axe/3.2/frame-title)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<iframe title="This is a unique title" />
<iframe title={uniqueTitle} />
```

### Fail
```jsx
<iframe />
<iframe {...props} />
<iframe title="" />
<iframe title={''} />
<iframe title={``} />
<iframe title={undefined} />
<iframe title={false} />
<iframe title={true} />
<iframe title={42} />
```
