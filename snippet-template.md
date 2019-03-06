### ComponentName

Explain briefly what the snippet does.

* Explain briefly how the snippet works.
* Use bullet points for your snippet's explanation.
* Try to explain everything briefly but clearly.

```jsx
function ComponentName(props) {
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    setState(0);
  });
  return <div>{props}</div>;
}
```

```jsx
ReactDOM.render(<ComponentName />, document.getElementById('root'));
```

<!-- OPTIONAL -->

#### Notes:

- Things to remember when using this
- Other options that might be less appealing or have lower compatibility
- Common mistakes and issues

<!-- tags: (separate each by a comma) -->

<!-- expertise: (0,1,2,3) -->
<!-- Expertise levels (pick only one, no parentheses):
  0: beginner
  1: intermediate
  2: advanced
  3: expert
-->
