---
title: useDropdown
tags: hooks,intermediate
firstSeen: 2021-06-13T05:00:00-04:00
---

The Simple Dropdown hook component for React which will observe clicks to open and close the dropdown when they happen.

- Use the useState() hook to initialize the value to defaultValue.
- requires React >= 16.8

```js
const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map((item) => (
          <option key={item} value={item}></option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};
```
