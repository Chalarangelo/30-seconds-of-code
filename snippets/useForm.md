---
title: React useForm hook
tags: hooks,state
cover: blog_images/cave-view.jpg
firstSeen: 2021-09-17T05:00:00-04:00
---

Creates a stateful value from the fields in a form.

- Use the `useState()` hook to create a state variable for the values in the form.
- Create a function that will be called with an appropriate event by a form field and update the state variable accordingly.

```jsx
const useForm = initialValues => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
};
```

```jsx
const Form = () => {
  const initialState = { email: '', password: '' };
  const [values, setValues] = useForm(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={setValues} />
      <input type="password" name="password" onChange={setValues} />
      <button type="submit">Submit</button>
    </form>
  );
};

ReactDOM.render(<Form />, document.getElementById('root'));
```
