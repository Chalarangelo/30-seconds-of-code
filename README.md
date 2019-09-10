![Logo](/logo.png)

# 30 seconds of React

> Curated collection of useful React snippets that you can understand in 30 seconds or less.

- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in React 16.8+, using hooks.

### Prerequisites

To import a snippet into your project, you must import `React` and copy-paste the component's JavaScript code like this:

```js
import React from 'react';

function MyComponent(props) {
  /* ... */
}
```

If there is any CSS related to your component, copy-paste it to a new file with the same name and the appropriate extension, then import it like this:

```js
import './MyComponent.css';
```

To render your component, make sure there is a node with and id of `"root"` present in your element (preferrably a `<div>`) and that you have imported `ReactDOM`, like this:

```js
import ReactDOM from 'react-dom';
```

#### Related projects

- [30 Seconds of Code](https://30secondsofcode.org)
- [30 Seconds of CSS](https://30-seconds.github.io/30-seconds-of-css/)
- [30 Seconds of Interviews](https://30secondsofinterviews.org/)

## Table of Contents

###  Array

<details>
<summary>View contents</summary>

* [`DataList`](#datalist)
* [`DataTable`](#datatable)
* [`MappedTable`](#mappedtable)

</details>

###  Hooks

<details>
<summary>View contents</summary>

* [`useClickInside`](#useclickinside)
* [`useClickOutside`](#useclickoutside)
* [`useFetch`](#usefetch)
* [`useInterval`](#useinterval)
* [`useSSR`](#usessr)
* [`useTimeout`](#usetimeout)

</details>

###  Input

<details>
<summary>View contents</summary>

* [`ControlledInput`](#controlledinput)
* [`LimitedTextarea`](#limitedtextarea)
* [`LimitedWordTextarea`](#limitedwordtextarea)
* [`MultiselectCheckbox`](#multiselectcheckbox)
* [`PasswordRevealer`](#passwordrevealer)
* [`Select`](#select)
* [`Slider`](#slider)
* [`TextArea`](#textarea)
* [`UncontrolledInput`](#uncontrolledinput)

</details>

###  Visual

<details>
<summary>View contents</summary>

* [`Accordion`](#accordion-)
* [`AutoLink`](#autolink-)
* [`Carousel`](#carousel)
* [`Collapse`](#collapse)
* [`CountDown`](#countdown-)
* [`FileDrop`](#filedrop)
* [`Mailto`](#mailto)
* [`Modal`](#modal)
* [`RippleButton`](#ripplebutton)
* [`StarRating`](#starrating)
* [`Tabs`](#tabs)
* [`Ticker`](#ticker)
* [`Toggle`](#toggle)
* [`Tooltip`](#tooltip)
* [`TreeView`](#treeview-)

</details>


---

##  Array


### DataList

Renders a list of elements from an array of primitives.

- Use the value of the `isOrdered` prop to conditionally render a `<ol>` or `<ul>` list.
- Use `Array.prototype.map` to render every item in `data` as a `<li>` element, give it a `key` produced from the concatenation of the its index and value.
- Omit the `isOrdered` prop to render a `<ul>` list by default.

```jsx
function DataList({ isOrdered, data }) {
  const list = data.map((val, i) => <li key={`${i}_${val}`}>{val}</li>);
  return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
}
```

<details>
<summary>Examples</summary>

```jsx
const names = ['John', 'Paul', 'Mary'];
ReactDOM.render(<DataList data={names} />, document.getElementById('root'));
ReactDOM.render(<DataList data={names} isOrdered />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### DataTable

Renders a table with rows dynamically created from an array of primitives.

- Render a `<table>` element with two columns (`ID` and `Value`).
- Use `Array.prototype.map` to render every item in `data` as a `<tr>` element, consisting of its index and value, give it a `key` produced from the concatenation of the two.

```jsx
function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((val, i) => (
          <tr key={`${i}_${val}`}>
            <td>{i}</td>
            <td>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
const people = ['John', 'Jesse'];
ReactDOM.render(<DataTable data={people} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### MappedTable

Renders a table with rows dynamically created from an array of objects and a list of property names.

- Use `Object.keys()`, `Array.prototype.filter()`, `Array.prototype.includes()` and `Array.prototype.reduce()` to produce a `filteredData` array, containing all objects with the keys specified in `propertyNames`.
- Render a `<table>` element with a set of columns equal to the amount of values in `propertyNames`.
- Use `Array.prototype.map` to render each value in the `propertyNames` array as a `<th>` element.
- Use `Array.prototype.map` to render each object in the `filteredData` array as a `<tr>` element, containing a `<td>` for each key in the object.

_This component does not work with nested objects and will break if there are nested objects inside any of the properties specified in `propertyNames`_

```jsx
function MappedTable({ data, propertyNames }) {
  let filteredData = data.map(v =>
    Object.keys(v)
      .filter(k => propertyNames.includes(k))
      .reduce((acc, key) => ((acc[key] = v[key]), acc), {})
  );
  return (
    <table>
      <thead>
        <tr>
          {propertyNames.map(val => (
            <th key={`h_${val}`}>{val}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((val, i) => (
          <tr key={`i_${i}`}>
            {propertyNames.map(p => (
              <td key={`i_${i}_${p}`}>{val[p]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
const people = [
  { name: 'John', surname: 'Smith', age: 42 },
  { name: 'Adam', surname: 'Smith', gender: 'male' }
];
const propertyNames = ['name', 'surname', 'age'];
ReactDOM.render(
  <MappedTable data={people} propertyNames={propertyNames} />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Hooks


### useClickInside

A hook that handles the event of clicking inside the wrapped component.

- Create a custom hook that takes a `ref` and a `callback` to handle the `click` event.
- Use the `React.useEffect()` hook to append and clean up the `click` event.
- Use the `React.useRef()` hook to create a `ref` for your click component and pass it to the `useClickInside` hook.

```jsx
const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
```

<details>
<summary>Examples</summary>

```jsx
const ClickBox = ({ onClickInside }) => {
  const clickRef = React.useRef();
  useClickInside(clickRef, onClickInside);
  return (
    <div
      className="click-box"
      ref={clickRef}
      style={{
        border: '2px dashed orangered',
        height: 200,
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>Click inside this element</p>
    </div>
  );
};

ReactDOM.render(
  <ClickBox onClickInside={() => alert('click inside')} />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### useClickOutside

A hook that handles the event of clicking outside of the wrapped component.

- Create a custom hook that takes a `ref` and a `callback` to handle the `click` event.
- Use the `React.useEffect()` hook to append and clean up the `click` event.
- Use the `React.useRef()` hook to create a `ref` for your click component and pass it to the `useClickOutside` hook.

```jsx
const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
```

<details>
<summary>Examples</summary>

```jsx
const ClickBox = ({ onClickOutside }) => {
  const clickRef = React.useRef();
  useClickOutside(clickRef, onClickOutside);
  return (
    <div
      className="click-box"
      ref={clickRef}
      style={{
        border: '2px dashed orangered',
        height: 200,
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>Click out of this element</p>
    </div>
  );
};

ReactDOM.render(
  <ClickBox onClickOutside={() => alert('click outside')} />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### useFetch

A hook that implements `fetch` in a declarative manner.

- Create a custom hook that takes a `url` and `options`.
- Use the `React.useState()` hook to initialize the `response` and `error` state variables.
- Use the `React.useEffect()` hook to anychronously call `fetch()` and update the state varaibles accordingly.
- Return an object containting the `response` and `error` state variables.

```jsx
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { response, error };
};
```

<details>
<summary>Examples</summary>

```jsx
const ImageFetch = props => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <div>Loading...</div>;
  }
  const dogName = res.response.status;
  const imageUrl = res.response.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  );
};

ReactDOM.render(<ImageFetch />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### useInterval

A hook that implements `setInterval` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `React.useRef()` hook to create a `ref` for the callback function.
- Use the `React.useEffect()` hook to remember the latest callback.
- Use the `React.useEffect()` hook to set up the interval and clean up.

```jsx
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
```

<details>
<summary>Examples</summary>

```jsx
const Timer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<Timer />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### useSSR

A hook that checks if the code is running on the browser or the server.

- Create a custom hook that returns an appropriate object.
- Use `typeof window`, `window.document` and `window.document.createElement` to check if the code is running on the browser.
- Use the `React.useState()` hook to define the `inBrowser` state variable.
- Use the `React.useEffect()` hook to update the `inBrowser` state variable and clean up at the end.
- Use the `React.useMemo()` to memoize the return values of the custom hook.

```jsx
const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const useSSR = (callback, delay) => {
  const [inBrowser, setInBrowser] = React.useState(isDOMavailable);

  React.useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    }
  }, []);

  const useSSRObject = React.useMemo(() => ({
    isBrowser: inBrowser,
    isServer: !inBrowser,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: inBrowser && !!window.addEventListener,
    canUseViewport: inBrowser && !!window.screen
  }), [inBrowser]);

  return React.useMemo(() => Object.assign(Object.values(useSSRObject), useSSRObject), [inBrowser]);
};

const SSRChecker = props => {
  let { isBrowser, isServer } = useSSR();

  return <p>{ isBrowser ? 'Running on browser' : 'Running on server' }</p>;
};
```

<details>
<summary>Examples</summary>

```jsx
const SSRChecker = props => {
  let { isBrowser, isServer } = useSSR();

  return <p>{ isBrowser ? 'Running on browser' : 'Running on server' }</p>;
};

ReactDOM.render(<SSRChecker />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### useTimeout

A hook that implements `setTimeout` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `React.useRef()` hook to create a `ref` for the callback function.
- Use the `React.useEffect()` hook to remember the latest callback.
- Use the `React.useEffect()` hook to set up the timeout and clean up.

```jsx
const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
```

<details>
<summary>Examples</summary>

```jsx
const OneSecondTimer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<OneSecondTimer />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Input


### ControlledInput

Renders an `<input>` element with internal state, that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<input>` element.
- Use the `React.setState()` hook to create the `value` state variable and give it a value of equal to the `defaultValue` prop.
- Use the `React.useEffect()` hook with a second parameter set to the `value` state variable to call the `callback` function every time `value` is updated.
- Render an `<input>` element with the appropriate attributes and use the the `onChange` event to upda the `value` state variable.

```jsx
function ControlledInput({
  callback,
  type = 'text',
  disabled = false,
  readOnly = false,
  defaultValue,
  placeholder = ''
}) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    callback(value);
  }, [value]);

  return (
    <input
      defaultValue={defaultValue}
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <ControlledInput
    type="text"
    placeholder="Insert some text here..."
    callback={val => console.log(val)}
  />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### LimitedTextarea

Renders a textarea component with a character limit.

- Use the `React.useState()` hook to create the `content` state variable and set its value to `value`.
  Create a method `setFormattedContent`, which trims the content of the input if it's longer than `limit`.
- Use the `React.useEffect()` hook to call the `setFormattedContent` method on the value of the `content` state variable.
- Use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to call `setFormattedContent` with the value of `event.target.value`.

```jsx
function LimitedTextarea({ rows, cols, value, limit }) {
  const [content, setContent] = React.useState(value);

  const setFormattedContent = text => {
    text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
  };

  React.useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <textarea
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
      />
      <p>
        {content.length}/{limit}
      </p>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<LimitedTextarea limit={32} value="Hello!" />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### LimitedWordTextarea

Renders a textarea component with a word limit.

- Use the `React.useState()` hook to create the `content` and `wordCount` state variables and set their values to `value` and `0` respectively.
- Create a method `setFormattedContent`, which uses `String.prototype.split(' ')` to turn the input into an array of words and check if the result of applying `Array.prototype.filter(Boolean)` has a `length` longer than `limit`.
- If the afforementioned `length` exceeds the `limit`, trim the input, otherwise return the raw input, updating `content` and `wordCount` accordingly in both cases.
- Use the `React.useEffect()` hook to call the `setFormattedContent` method on the value of the `content` state variable.
- Use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to call `setFormattedContent` with the value of `event.target.value`.

```jsx
function LimitedWordTextarea({ rows, cols, value, limit }) {
  const [content, setContent] = React.useState(value);
  const [wordCount, setWordCount] = React.useState(0);

  const setFormattedContent = text => {
    let words = text.split(' ');
    if (words.filter(Boolean).length > limit) {
      setContent(
        text
          .split(' ')
          .slice(0, limit)
          .join(' ')
      );
      setWordCount(limit);
    } else {
      setContent(text);
      setWordCount(words.filter(Boolean).length);
    }
  };

  React.useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <textarea
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
      />
      <p>
        {wordCount}/{limit}
      </p>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <LimitedWordTextArea limit={5} value="Hello there!" />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### MultiselectCheckbox

Renders a checkbox list that uses a callback function to pass its selected value/values to the parent component.

- Use `React.setState()` to create a `data` state variable and set its initial value equal to the `options` prop.
- Create a function `toggle` that is used to toggle the `checked` to update the `data` state variable and call the `onChange` callback passed via the component's props.
- Render a `<ul>` element and use `Array.prototype.map()` to map the `data` state variable to individual `<li>` elements with `<input>` elements as their children.
- Each `<input>` element has the `type='checkbox'` attribute and is marked as `readOnly`, as its click events are handled by the parent `<li>` element's `onClick` handler.

```jsx
const style = {
  listContainer: {
    listStyle: 'none',
    paddingLeft: 0
  },
  itemStyle: {
    cursor: 'pointer',
    padding: 5
  }
};

function MultiselectCheckbox({ options, onChange }) {
  const [data, setData] = React.useState(options);

  const toggle = item => {
    data.forEach((_, key) => {
      if (data[key].label === item.label) data[key].checked = !item.checked;
    });
    setData([...data]);
    onChange(data);
  };

  return (
    <ul style={style.listContainer}>
      {data.map(item => {
        return (
          <li key={item.label} style={style.itemStyle} onClick={() => toggle(item)}>
            <input readOnly type="checkbox" checked={item.checked || false} />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
const options = [{ label: 'Item One' }, { label: 'Item Two' }];

ReactDOM.render(
  <MultiselectCheckbox
    options={options}
    onChange={data => {
      console.log(data);
    }}
  />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### PasswordRevealer

Renders a password input field with a reveal button.

- Use the `React.useState()` hook to create the `shown` state variable and set its value to `false`.
- Use a`<div>` to wrap both the`<input>` and the `<button>` element that toggles the type of the input field between `"text"` and `"password"`.

```jsx
function PasswordRevealer({ value }) {
  const [shown, setShown] = React.useState(false);

  return (
    <div>
      <input type={shown ? 'text' : 'password'} value={value} onChange={() => {}} />
      <button onClick={() => setShown(!shown)}>Show/Hide</button>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<PasswordRevealer />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### Select

Renders a `<select>` element that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<select>` element.
- Render a `<select>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the textarea to the parent.
- Use destructuring on the `values` array to pass an array of `value` and `text` elements and the `selected` attribute to define the initial `value` of the `<select>` element.

```jsx
function Select({ values, callback, disabled = false, readonly = false, selected }) {
  return (
    <select
      disabled={disabled}
      readOnly={readonly}
      onChange={({ target: { value } }) => callback(value)}
    >
      {values.map(([value, text]) => (
        <option selected={selected === value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
let choices = [
  ['grapefruit', 'Grapefruit'],
  ['lime', 'Lime'],
  ['coconut', 'Coconut'],
  ['mango', 'Mango']
];
ReactDOM.render(
  <Select values={choices} selected="lime" callback={val => console.log(val)} />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### Slider

Renders a slider element that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<input>` element.
- Render an `<input>` element of type `"range"` and the appropriate attributes, use the `callback` function in the `onChange` event to pass the value of the input to the parent.

```jsx
function Slider({ callback, disabled = false, readOnly = false }) {
  return (
    <input
      type="range"
      disabled={disabled}
      readOnly={readOnly}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<Slider callback={val => console.log(val)} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### TextArea

Renders a `<textarea>` element that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<textarea>` element.
- Render a `<textarea>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the textarea to the parent.

```jsx
function TextArea({
  callback,
  cols = 20,
  rows = 2,
  disabled = false,
  readOnly = false,
  placeholder = ''
}) {
  return (
    <textarea
      cols={cols}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <TextArea placeholder="Insert some text here..." callback={val => console.log(val)} />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### UncontrolledInput

Renders an `<input>` element that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<input>` element.
- Render an `<input>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the input to the parent.

```jsx
function UncontrolledInput({
  callback,
  type = 'text',
  disabled = false,
  readOnly = false,
  placeholder = ''
}) {
  return (
    <input
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <UncontrolledInput
    type="text"
    placeholder="Insert some text here..."
    callback={val => console.log(val)}
  />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Visual


### Accordion ![advanced](/advanced.svg)

Renders an accordion menu with multiple collapsible content components.

- Define an `AccordionItem` component, pass it to the `Accordion` and remove unnecessary nodes expect for `AccordionItem` by identifying the function's name in `props.children`.
- Each `AccordionItem` component renders a `<button>` that is used to update the `Accordion` via the `props.handleClick` callback and the content of the component, passed down via `props.children`, while its appearance is determined by `props.isCollapsed` and based on `style`.
- In the `Accordion` component, use the `React.useState()` hook to initialize the value of the `bindIndex` state variable to `props.defaultIndex`.
- Use `Array.prototype.map` on the collected nodes to render the individual collapsiple elements.
- Define `changeItem`, which will be executed when clicking an `AccordionItem`'s `<button>`.
  `changeItem` executes the passed callback, `onItemClick` and updates `bindIndex` based on the clicked element.

```jsx
function AccordionItem(props) {
  const style = {
    collapsed: {
      display: 'none'
    },
    expanded: {
      display: 'block'
    },
    buttonStyle: {
      display: 'block',
      width: '100%'
    }
  };

  return (
    <div>
      <button style={style.buttonStyle} onClick={() => props.handleClick()}>
        {props.label}
      </button>
      <div
        className="collapse-content"
        style={props.isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={props.isCollapsed}
      >
        {props.children}
      </div>
    </div>
  );
}

function Accordion(props) {
  const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);

  const changeItem = itemIndex => {
    if (typeof props.onItemClick === 'function') props.onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };
  const items = props.children.filter(item => item.type.name === 'AccordionItem');

  return (
    <div className="wrapper">
      {items.map(({ props }) => (
        <AccordionItem
          isCollapsed={bindIndex === props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          children={props.children}
        />
      ))}
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Accordion defaultIndex="1" onItemClick={console.log}>
    <AccordionItem label="A" index="1">
      Lorem ipsum
    </AccordionItem>
    <AccordionItem label="B" index="2">
      Dolor sit amet
    </AccordionItem>
  </Accordion>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### AutoLink ![advanced](/advanced.svg)

Renders a string as plaintext, with URLs converted to appropriate `<a>` elements.

- Use `String.prototype.split()` and `String.prototype.match()` with a regular expression to find URLs in a string.
- Return a `<React.Fragment>` with matched URLs rendered as `<a>` elements, dealing with missing protocol prefixes if necessary, and the rest of the string rendered as plaintext.

```jsx
function AutoLink({ text }) {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;

  return (
    <React.Fragment>
      {text.split(delimiter).map(word => {
        let match = word.match(delimiter);
        if (match) {
          let url = match[0];
          return <a href={url.startsWith('http') ? url : `http://${url}`}>{url}</a>;
        }
        return word;
      })}
    </React.Fragment>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <AutoLink text="foo bar baz http://example.org bar" />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### Carousel

Renders a carousel component.

- Use the `React.setState()` hook to create the `active` state variable and give it a value of `0` (index of the first item).
- Use an object, `style`, to hold the styles for the individual components.
- Use the `React.setEffect()` hook to update the value of `active` to the index of the next item, using `setTimeout`.
- Destructure `props`, compute if visibility style should be set to `visible` or not for each carousel item while mapping over and applying the combined style to the carousel item component accordingly.
- Render the carousel items using `React.cloneElement()` and pass down rest `props` along with the computed styles.

```jsx
function Carousel(props) {
  const [active, setActive] = React.useState(0);
  let scrollInterval = null;
  const style = {
    carousel: {
      position: 'relative'
    },
    carouselItem: {
      position: 'absolute',
      visibility: 'hidden'
    },
    visible: {
      visibility: 'visible'
    }
  };
  React.useEffect(() => {
    scrollInterval = setTimeout(() => {
      const { carouselItems } = props;
      setActive((active + 1) % carouselItems.length);
    }, 2000);
  });
  const { carouselItems, ...rest } = props;
  return (
    <div style={style.carousel}>
      {carouselItems.map((item, index) => {
        const activeStyle = active === index ? style.visible : {};
        return React.cloneElement(item, {
          ...rest,
          style: {
            ...style.carouselItem,
            ...activeStyle
          }
        });
      })}
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Carousel
    carouselItems={[
      <div>carousel item 1</div>,
      <div>carousel item 2</div>,
      <div>carousel item 3</div>
    ]}
  />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### Collapse

Renders a component with collapsible content.

- Use the `React.setState()` hook to create the `isCollapsed` state variable with an initial value of `props.collapsed`.
- Use an object, `style`, to hold the styles for individual components and their states.
- Use a `<div>` to wrap both the `<button>` that alters the component's `isCollapsed` state and the content of the component, passed down via `props.children`.
- Determine the appearance of the content, based on `isCollapsed` and apply the appropriate CSS rules from the `style` object.
- Finally, update the value of the `aria-expanded` attribute based on `isCollapsed` to make the component accessible.

```jsx
function Collapse(props) {
  const [isCollapsed, setIsCollapsed] = React.useState(props.collapsed);

  const style = {
    collapsed: {
      display: 'none'
    },
    expanded: {
      display: 'block'
    },
    buttonStyle: {
      display: 'block',
      width: '100%'
    }
  };

  return (
    <div>
      <button style={style.buttonStyle} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Show' : 'Hide'} content
      </button>
      <div
        className="collapse-content"
        style={isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={isCollapsed}
      >
        {props.children}
      </div>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Collapse>
    <h1>This is a collapse</h1>
    <p>Hello world!</p>
  </Collapse>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### CountDown ![advanced](/advanced.svg)

Renders a countdown timer that prints a message when it reaches zero.

- Use object destructuring to set defaults for the `hours`, `minutes` and `seconds` props.
- Use the `React.useState()` hook to create the `time`, `paused` and `over` state variables and set their values to the values of the passed props, `false` and `false` respectively.
- Create a method `tick`, that updates the value of `time` based on the current value (i.e. decreasing the time by one second).
- If `paused` or `over` is `true`, `tick` will return immediately.
- Create a method `reset`, that resets all state variables to their initial states.
- Use the the `React.useEffect()` hook to call the `tick` method every second via the use of `setInterval()` and use `clearInterval()` to cleanup when the component is unmounted.
- Use a `<div>` to wrap a `<p>` element with the textual representation of the components `time` state variable, as well as two `<button>` elements that will pause/unpause and restart the timer respectively.
- If `over` is `true`, the timer will display a message instead of the value of `time`.

```jsx
function CountDown({ hours = 0, minutes = 0, seconds = 0 }) {
  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  });

  const tick = () => {
    if (paused || over) return;
    if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) setOver(true);
    else if (time.minutes == 0 && time.seconds == 0)
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    else if (time.seconds == 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
  };

  const reset = () => {
    setTime({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds)
    });
    setPaused(false);
    setOver(false);
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
      <div>{over ? "Time's up!" : ''}</div>
      <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={() => reset()}>Restart</button>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<CountDown hours="1" minutes="45" />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### FileDrop

Renders a file drag and drop component for a single file.

- Create a ref called `dropRef` for this component.
- Use the `React.useState()` hook to create the `drag` and `filename` variables, initialized to `false` and `''` respectively.
  The variables `dragCounter` and `drag` are used to determine if a file is being dragged, while `filename` is used to store the dropped file's name.
- Create the `handleDrag`, `handleDragIn`, `handleDragOut` and `handleDrop` methods to handle drag and drop functionality, bind them to the component's context.
- Each of the methods will handle a specific event, the listeners for which are created and removed in the `React.useEffect()` hook and its attached `cleanup()` method.
- `handleDrag` prevents the browser from opening the dragged file, `handleDragIn` and `handleDragOut` handle the dragged file entering and exiting the component, while `handleDrop` handles the file being dropped and passes it to `props.handleDrop`.
- Return an appropriately styled `<div>` and use `drag` and `filename` to determine its contents and style.
- Finally, bind the `ref` of the created `<div>` to `dropRef`.

```css
.filedrop {
  min-height: 120px;
  border: 3px solid #d3d3d3;
  text-align: center;
  font-size: 24px;
  padding: 32px;
  border-radius: 4px;
}

.filedrop.drag {
  border: 3px dashed #1e90ff;
}

.filedrop.ready {
  border: 3px solid #32cd32;
}
```

```jsx
function FileDrop(props) {
  const [drag, setDrag] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  let dropRef = React.createRef();
  let dragCounter = 0;

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setDrag(true);
  };

  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) setDrag(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files[0]);
      setFilename(e.dataTransfer.files[0].name);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  React.useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);
    return function cleanup() {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  });

  return (
    <div
      ref={dropRef}
      className={drag ? 'filedrop drag' : filename ? 'filedrop ready' : 'filedrop'}
    >
      {filename && !drag ? <div>{filename}</div> : <div>Drop files here!</div>}
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<FileDrop handleDrop={console.log} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### Mailto

Renders a link formatted to send an email.

- Destructure the component's props, use `email`, `subject` and `body` to create a `<a>` element with an appropriate `href` attribute.
- Render the link with `props.children` as its content.

```jsx
function Mailto({ email, subject, body, ...props }) {
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{props.children}</a>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Mailto email="foo@bar.baz" subject="Hello & Welcome" body="Hello world!">
    Mail me!
  </Mailto>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### Modal

Renders a Modal component, controllable through events.
To use the component, import `Modal` only once and then display it by passing a boolean value to the `isVisible` attribute.

- Use object destructuring to set defaults for certain attributes of the modal component.
- Define `keydownHandler`, a method which handles all keyboard events, which can be used according to your needs to dispatch actions (e.g. close the modal when <kbd>Esc</kbd> is pressed).
- Use `React.useEffect()` hook to add or remove the `keydown` event listener, which calls `keydownHandler`.
- Use the `isVisible` prop to determine if the modal should be shown or not.
- Use CSS to style and position the modal component.

```css
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;
}

.modal-dialog {
  width: 100%;
  max-width: 550px;
  background: white;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: slide-in;
  animation-duration: 0.5s;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  padding: 1rem;
}
.modal-header {
  border-bottom: 1px solid #dbdbdb;
  justify-content: space-between;
}
.modal-footer {
  border-top: 1px solid #dbdbdb;
  justify-content: flex-end;
}
.modal-close {
  cursor: pointer;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
}
.modal-body {
  overflow: auto;
}
.modal-content {
  padding: 1rem;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slide-in {
  from {
    transform: translateY(-150px);
  }
  to {
    transform: translateY(0);
  }
}
```

```jsx
function Modal({ isVisible = false, title, content, footer, onClose }) {
  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  function keydownHandler({ key }) {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  }

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
//Add the component to the render function
function App() {
  const [isModal, setModal] = React.useState(false);

  return (
    <React.Fragment>
      <button onClick={() => setModal(true)}>Click Here</button>
      <Modal
        isVisible={isModal}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### RippleButton

### RippleButton

Renders a button that animates a ripple effect when clicked.

- Define some appropriate CSS styles and an animation for the ripple effect.
- Use the `React.useState()` hook to create appropriate variables and setters for the pointer's coordinates and for the animation state of the button.
- Use the `React.useEffect()` hook to change the state every time the `coords` state variable changes, starting the animation.
- Use `setTimeout()` in the previous hook to clear the animation after it's done playing.
- Use the `React.useEffect()` hook a second time to reset `coords` whenever the `isRippling` state variable is `false.`
- Handle the `onClick` event by updating the `coords` state variable and calling the passed callback.
- Finally, render a `<button>` with one or two `<span>` elements, setting the position of the `.ripple` element based on the `coords` state variable.

```css
.ripple-button {
  border-radius: 4px;
  border: none;
  margin: 8px;
  padding: 14px 24px;
  background: #1976d2;
  color: #fff;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.ripple-button > .ripple {
  width: 20px;
  height: 20px;
  position: absolute;
  background: #63a4ff;
  display: block;
  content: "";
  border-radius: 9999px;
  opacity: 1;
  animation: 1.2s ease 1 forwards ripple-effect;
}

@keyframes ripple-effect {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(10);
    opacity: 0.375;
  }
  100% {
    transform: scale(35);
    opacity: 0;
  }
}

.ripple-button > .content {
  position: relative;
  z-index: 2;
}
```

```jsx
function RippleButton({ children, onClick }) {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(
    () => {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 1200);
      } else setIsRippling(false);
    },
    [coords]
  );

  React.useEffect(
    () => {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    },
    [isRippling]
  );

  return (
    <button
      className="ripple-button"
      onClick={e => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        setCoords({ x, y });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x + 10,
            top: coords.y
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{children}</span>
    </button>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <RippleButton onClick={e => console.log(e)}>Click me</RippleButton>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### StarRating

Renders a star rating component.

- Define a component, called `Star` that will render each individual star with the appropriate appearance, based on the parent component's state.
- In the `StarRating` component, use the `React.useState()` hook to define the `rating` and `selection` state variables with the initial values of `props.rating` (or `0` if invalid or not supplied) and `0`.
- Create a method, `hoverOver`, that updates `selected` and `rating` according to the provided `event`.
- Create a `<div>` to wrap the `<Star>` components, which are created using `Array.prototype.map` on an array of 5 elements, created using `Array.from`, and handle the `onMouseLeave` event to set `selection` to `0`, the `onClick` event to set the `rating` and the `onMouseOver` event to set `selection` to the `star-id` attribute of the `event.target` respectively.
- Finally, pass the appropriate values to each `<Star>` component (`starId` and `marked`).

```jsx
function Star({ marked, starId }) {
  return (
    <span star-id={starId} style={{ color: '#ff9933' }} role="button">
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
}

function StarRating(props) {
  const [rating, setRating] = React.useState(typeof props.rating == 'number' ? props.rating : 0);
  const [selection, setSelection] = React.useState(0);
  const hoverOver = event => {
    let val = 0;
    if (event && event.target && event.target.getAttribute('star-id'))
      val = event.target.getAttribute('star-id');
    setSelection(val);
  };
  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={event => setRating(event.target.getAttribute('star-id') || rating)}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1} `}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<StarRating />, document.getElementById('root'));
ReactDOM.render(<StarRating rating={2} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### Tabs

Renders a tabbed menu and view component.

- Define a `TabItem` component, pass it to the `Tab` and remove unnecessary nodes expect for `TabItem` by identifying the function's name in `props.children`.
- Use the `React.useState()` hook to initialize the value of the `bindIndex` state variable to `props.defaultIndex`.
- Use `Array.prototype.map` on the collected nodes to render the `tab-menu` and `tab-view`.
- Define `changeTab`, which will be executed when clicking a `<button>` from the `tab-menu`.
- `changeTab` executes the passed callback, `onTabClick` and updates `bindIndex`, which in turn causes a re-render, evaluating the `style` and `className` of the `tab-view` items and `tab-menu` buttons according to their `index`.

```css
.tab-menu > button {
  cursor: pointer;
  padding: 8px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
}
.tab-menu > button.focus {
  border-bottom: 2px solid #007bef;
}
.tab-menu > button:hover {
  border-bottom: 2px solid #007bef;
}
```

```jsx
function TabItem(props) {
  return <div {...props} />;
}

function Tabs(props) {
  const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);
  const changeTab = newIndex => {
    if (typeof props.onTabClick === 'function') props.onTabClick(newIndex);
    setBindIndex(newIndex);
  };
  const items = props.children.filter(item => item.type.name === 'TabItem');

  return (
    <div className="wrapper">
      <div className="tab-menu">
        {items.map(({ props: { index, label } }) => (
          <button onClick={() => changeTab(index)} className={bindIndex === index ? 'focus' : ''}>
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {items.map(({ props }) => (
          <div
            {...props}
            className="tab-view_item"
            key={props.index}
            style={{ display: bindIndex === props.index ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Tabs defaultIndex="1" onTabClick={console.log}>
    <TabItem label="A" index="1">
      Lorem ipsum
    </TabItem>
    <TabItem label="B" index="2">
      Dolor sit amet
    </TabItem>
  </Tabs>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### Ticker

Renders a ticker component.

- Use the `React.useState()` hook to initialize the `ticker` state variable to `0`.
- Define two methods, `tick` and `reset`, that will periodically increment `timer` based on `interval` and reset `interval` respectively.
- Return a `<div>` with two `<button>` elements, each of which calls `tick` and `reset` respectively.

```jsx
function Ticker(props) {
  const [ticker, setTicker] = React.useState(0);
  let interval = null;

  const tick = () => {
    reset();
    interval = setInterval(() => {
      if (ticker < props.times) setTicker(ticker + 1);
      else clearInterval(interval);
    }, props.interval);
  };

  const reset = () => {
    setTicker(0);
    clearInterval(interval);
  };

  return (
    <div>
      <span style={{ fontSize: 100 }}>{ticker}</span>
      <button onClick={tick}>Tick!</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<Ticker times={5} interval={1000} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### Toggle

Renders a toggle component.

- Use the `React.useState()` to initialize the `isToggleOn` state variable to `false`.
- Use an object, `style`, to hold the styles for individual components and their states.
- Return a `<button>` that alters the component's `isToggledOn` when its `onClick` event is fired and determine the appearance of the content based on `isToggleOn`, applying the appropriate CSS rules from the `style` object.

```jsx
function Toggle(props) {
  const [isToggleOn, setIsToggleOn] = React.useState(false);
  style = {
    on: {
      backgroundColor: 'green'
    },
    off: {
      backgroundColor: 'grey'
    }
  };

  return (
    <button onClick={() => setIsToggleOn(!isToggleOn)} style={isToggleOn ? style.on : style.off}>
      {isToggleOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<Toggle />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

### Tooltip

Renders a tooltip component.

- Use the `React.useState()` hook to create the `show` variable and initialize it to `false`.
- Return a `<div>` element that contains the `<div>` that will be the tooltip and the `children` passed to the component.
- Handle the `onMouseEnter` and `onMouseLeave` methods, by altering the value of the `show` variable.

```css
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  visibility: hidden;
  padding: 5px;
  border-radius: 5px;
}
.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent;
}
```

```jsx
function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="tooltip" style={show ? { visibility: 'visible' } : {}}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div {...rest} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Tooltip text="Simple tooltip">
    <button>Hover me!</button>
  </Tooltip>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#contents)

### TreeView ![advanced](/advanced.svg)

Renders a tree view of a JSON object or array with collapsible content.

- Use object destructuring to set defaults for certain props.
- Use the value of the `toggled` prop to determine the initial state of the content (collapsed/expanded).
- Use the `React.setState()` hook to create the `isToggled` state variable and give it the value of the `toggled` prop initially.
- Return a `<div>` to wrap the contents of the component and the `<span>` element, used to alter the component's `isToggled` state.
- Determine the appearance of the component, based on `isParentToggled`, `isToggled`, `name` and `Array.isArray()` on `data`.
- For each child in `data`, determine if it is an object or array and recursively render a sub-tree.
- Otherwise, render a `<p>` element with the appropriate style.

```css
.tree-element {
  margin: 0;
  position: relative;
}

div.tree-element:before {
  content: '';
  position: absolute;
  top: 24px;
  left: 1px;
  height: calc(100% - 48px);
  border-left: 1px solid gray;
}

.toggler {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid gray;
  cursor: pointer;
}

.toggler.closed {
  transform: rotate(90deg);
}

.collapsed {
  display: none;
}
```

```jsx
function TreeView({
  data,
  toggled = true,
  name = null,
  isLast = true,
  isChildElement = false,
  isParentToggled = true
}) {
  const [isToggled, setIsToggled] = React.useState(toggled);

  return (
    <div
      style={{ marginLeft: isChildElement ? 16 : 4 + 'px' }}
      className={isParentToggled ? 'tree-element' : 'tree-element collapsed'}
    >
      <span
        className={isToggled ? 'toggler' : 'toggler closed'}
        onClick={() => setIsToggled(!isToggled)}
      />
      {name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>}
      {Array.isArray(data) ? '[' : '{'}
      {!isToggled && '...'}
      {Object.keys(data).map((v, i, a) =>
        typeof data[v] == 'object' ? (
          <TreeView
            data={data[v]}
            isLast={i === a.length - 1}
            name={Array.isArray(data) ? null : v}
            isChildElement
            isParentToggled={isParentToggled && isToggled}
          />
        ) : (
          <p
            style={{ marginLeft: 16 + 'px' }}
            className={isToggled ? 'tree-element' : 'tree-element collapsed'}
          >
            {Array.isArray(data) ? '' : <strong>{v}: </strong>}
            {data[v]}
            {i === a.length - 1 ? '' : ','}
          </p>
        )
      )}
      {Array.isArray(data) ? ']' : '}'}
      {!isLast ? ',' : ''}
    </div>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
let data = {
  lorem: {
    ipsum: 'dolor sit',
    amet: {
      consectetur: 'adipiscing',
      elit: [
        'duis',
        'vitae',
        {
          semper: 'orci'
        },
        {
          est: 'sed ornare'
        },
        'etiam',
        ['laoreet', 'tincidunt'],
        ['vestibulum', 'ante']
      ]
    },
    ipsum: 'primis'
  }
};
ReactDOM.render(<TreeView data={data} name="data" />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#contents)

---

_This repository is a work in progress. If you want to contribute, please check the open issues to see where and how you can help out!_

_This README is built using [markdown-builder](https://github.com/30-seconds/markdown-builder)._

