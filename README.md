![Logo](/logo.png)

# 30 seconds of React

> Curated collection of useful React snippets that you can understand in 30 seconds or less.

#### Related projects

* [30 Seconds of Code](https://30secondsofcode.org)
* [30 Seconds of CSS](https://30-seconds.github.io/30-seconds-of-css/)
* [30 Seconds of Interviews](https://30secondsofinterviews.org/)

## Table of Contents


### Array

<details>
<summary>View contents</summary>

* [DataList](#datalist)
* [DataTable](#datatable)
* [MappedTable](#mappedtable)
</details>


### Input

<details>
<summary>View contents</summary>

* [Input](#input)
* [LimitedTextarea](#limitedtextarea)
* [PasswordRevealer](#passwordrevealer)
* [Select](#select)
* [TextArea](#textarea)
</details>


### Object

<details>
<summary>View contents</summary>

* [TreeView](#treeview)
</details>


### String

<details>
<summary>View contents</summary>

* [AutoLink](#autolink)
</details>


### Visual

<details>
<summary>View contents</summary>

* [Carousel](#carousel)
* [Collapse](#collapse)
* [FileDrop](#filedrop)
* [Mailto](#mailto)
* [ModalDialog](#modaldialog)
* [StarRating](#starrating)
* [Tab](#tab)
* [Ticker](#ticker)
* [Toggle](#toggle)
* [Tooltip](#tooltip)
</details>


---

## Array
### DataList

Renders a list of elements from an array of primitives.

Use the value of the `isOrdered` prop to conditionally render a `<ol>` or `<ul>` list.
Use `Array.prototype.map` to render every item in `data` as a `<li>` element, give it a `key` produced from the concatenation of the its index and value.
Omit the `isOrdered` prop to render a `<ul>` list by default.

```jsx
function DataList({ isOrdered, data }) {
  const list = data.map((val, i) => (
    <li key={`${i}_${val}`}>{val}</li>
  ));
  return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
}
```

<details>
<summary>Examples</summary>

```jsx
const names = ['John', 'Paul', 'Mary'];
ReactDOM.render(<DataList data={names}/>, document.getElementById('root'));
ReactDOM.render(<DataList data={names} isOrdered/>, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### DataTable

Renders a table with rows dynamically created from an array of primitives.

Render a `<table>` element with two columns (`ID` and `Value`).
Use `Array.prototype.map` to render every item in `data` as a `<tr>` element, consisting of its index and value, give it a `key` produced from the concatenation of the two.

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
        {data.map((val, i) =>
          <tr key={`${i}_${val}`}>
            <td>{i}</td>
            <td>{val}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
const people = ['John', 'Jesse'];
ReactDOM.render(
  <DataTable data={people} />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### MappedTable

Renders a table with rows dynamically created from an array of objects and a list of property names.

Use `Object.keys()`, `Array.prototype.filter()`, `Array.prototype.includes()` and `Array.prototype.reduce()` to produce a `filteredData` array, containing all objects with the keys specified in `propertyNames`.
Render a `<table>` element with a set of columns equal to the amount of values in `propertyNames`.
Use `Array.prototype.map` to render each value in the `propertyNames` array as a `<th>` element.
Use `Array.prototype.map` to render each object in the `filteredData` array as a `<tr>` element, containing a `<td>` for each key in the object.

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
        <tr>{propertyNames.map(val => <th key={`h_${val}`}>{val}</th>)}</tr>
      </thead>
      <tbody>
        {filteredData.map((val, i) => (
          <tr key={`i_${i}`}>
            {propertyNames.map(p => <td key={`i_${i}_${p}`}>{val[p]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
#### Notes

This component does not work with nested objects and will break if there are nested objects inside any of the properties specified in `propertyNames`.,<!-tags: array,object,functional -->,<!-expertise: 1 -->

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

<br>[⬆ Back to top](#table-of-contents)


## Input
### Input

Renders an `<input>` element that uses a callback function to pass its value to the parent component.

Use object destructuring to set defaults for certain attributes of the `<input>` element.
Render an `<input>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the input to the parent.

```jsx
function Input ({ callback, type = 'text', disabled = false, readOnly = false, placeholder = '' }) {
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
  <Input type='text' placeholder='Insert some text here...' callback={(val) => console.log(val)}/>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### LimitedTextarea

Renders a textarea component with a character limit.

Use the value of the `value` prop to determine the initial `state.content` and `state.characterCount` and the value of the `limit` props to determine the value of `state.limit`.
Create a method, `handleChange`, which trims the `event.target.value` data if necessary and uses `Component.prototype.setState` to update `state.content` and `state.characterCount`, and bind it to the component's context.
In the`render()` method, use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to the `handleChange` method.

```jsx
class LimitedTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.value,
      characterCount: props.value.length,
      limit: props.limit
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    let newContent = event.target.value;
    if(newContent.length >= this.state.limit) newContent = newContent.slice(0, this.state.limit);
    this.setState(state => ({ content: newContent, characterCount: newContent.length }));
  }
  render() {
    return (
      <div>
        <textarea 
          rows={this.props.rows} 
          cols={this.props.cols} 
          onChange={this.handleChange} 
          value={this.state.content}
        >
        </textarea>
        <p>{this.state.characterCount}/{this.props.limit}</p>
      </div>
    );
  }
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <LimitedTextarea limit={32} value='Hello!' />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### PasswordRevealer

Renders a password input field with a reveal button.

Initially set `state.shown` to `false` to ensure that the password is not shown by default.
Create a method, `toggleShown`, which uses `Component.prototype.setState` to change the input's state from shown to hidden and vice versa, bind it to the component's context.
In the`render()` method, use a`<div>` to wrap both the`<input>` and the `<button>` element that toggles the type of the input field.
Finally, bind the `<button>`'s `onClick` event to the `toggleShown` method.

```jsx
class PasswordRevealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
    };
    this.toggleShown = this.toggleShown.bind(this);
  }

  toggleShown() {
    this.setState(state => ({ shown: !state.shown }));
  }

  render() {
    return (
      <div>
        <input
          type={this.state.shown ? 'text' : 'password'}
          value={this.props.value}
        />
        <button onClick={this.toggleShown}>Show/Hide</button>
      </div>
    );
  }
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<PasswordRevealer />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Select

Renders a `<select>` element that uses a callback function to pass its value to the parent component.

Use object destructuring to set defaults for certain attributes of the `<select>` element.
Render a `<select>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the textarea to the parent.
Use destructuring on the `values` array to pass an array of `value` and  `text` elements and the `selected` attribute to define the initial `value` of the `<select>` element.

```jsx
function Select ({ values, callback, disabled = false, readonly = false, selected }) {
  return (
    <select
      disabled={disabled}
      readOnly={readonly}
      onChange={({ target : { value } }) => callback(value)}
    >
      {values.map(([value, text]) => <option selected={selected === value}value={value}>{text}</option>)}
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
  <Select values={choices} selected='lime' callback={(val) => console.log(val)}/>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### TextArea

Renders a `<textarea>` element that uses a callback function to pass its value to the parent component.

Use object destructuring to set defaults for certain attributes of the `<textarea>` element.
Render a `<textarea>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the textarea to the parent.

```jsx
function TextArea ({ callback, cols = 20, rows = 2, disabled = false, readOnly = false, placeholder='' }) {
  return (
    <textarea
      cols={cols}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target : { value } }) => callback(value)}
    />
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <TextArea placeholder='Insert some text here...' callback={(val) => console.log(val)}/>,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)


## Object
### TreeView

Renders a tree view of a JSON object or array with collapsible content.

Use `defaultProps` to set the default values of certain props.
Use the value of the `toggled` prop to determine the initial state of the content (collapsed/expanded).
Set the `state` of the component to the value of the `toggled` prop and bind the `toggle` method to the component's context.
Create a method, `toggle`, which uses `Component.prototype.setState` to change the component's `state` from collapsed to expanded and vice versa.
In the `render()` method, use a `<div>` to wrap the contents of the component and the `<span>` element, used to alter the component's `state`.
Determine the appearance of the component, based on `this.props.isParentToggled`, `this.state.toggled`, `this.props.name` and `Array.isArray()` on `this.props.data`. 
For each child in `this.props.data`, determine if it is an object or array and recursively render a sub-tree.
Otherwise, render a `<p>` element with the appropriate style.

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
class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: props.toggled
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ toggled: !state.toggled }));
  }

  render() {
    return (
      <div
        style={{ marginLeft: this.props.isChildElement ? 16 : 4 + "px" }}
        className={
          this.props.isParentToggled ? "tree-element" : "tree-element collapsed"
        }
      >
        <span
          className={this.state.toggled ? "toggler" : "toggler closed"}
          onClick={this.toggle}
        />
        {this.props.name ? (
          <strong>&nbsp;&nbsp;{this.props.name}: </strong>
        ) : (
          <span>&nbsp;&nbsp;</span>
        )}
        {Array.isArray(this.props.data) ? "[" : "{"}
        {!this.state.toggled && "..."}
        {Object.keys(this.props.data).map(
          (v, i, a) =>
            typeof this.props.data[v] == "object" ? (
              <TreeView
                data={this.props.data[v]}
                isLast={i === a.length - 1}
                name={Array.isArray(this.props.data) ? null : v}
                isChildElement
                isParentToggled={
                  this.props.isParentToggled && this.state.toggled
                }
              />
            ) : (
              <p
                style={{ marginLeft: 16 + "px" }}
                className={
                  this.state.toggled ? "tree-element" : "tree-element collapsed"
                }
              >
                {Array.isArray(this.props.data) ? "" : <strong>{v}: </strong>}
                {this.props.data[v]}
                {i === a.length - 1 ? "" : ","}
              </p>
            )
        )}
        {Array.isArray(this.props.data) ? "]" : "}"}
        {!this.props.isLast ? "," : ""}
      </div>
    );
  }
}

TreeView.defaultProps = {
  isLast: true,
  toggled: true,
  name: null,
  isChildElement: false,
  isParentToggled: true
}
```

<details>
<summary>Examples</summary>

```jsx
let data = {
  lorem: {
    ipsum: "dolor sit",
    amet: {
      consectetur: "adipiscing",
      elit: [
        "duis",
        "vitae",
        {
          semper: "orci"
        },
        {
          est: "sed ornare"
        },
        "etiam",
        ["laoreet", "tincidunt"],
        ["vestibulum", "ante"]
      ]
    },
    ipsum: "primis"
  }
};
ReactDOM.render(<TreeView data={data} name='data'/>, document.getElementById("root"));
```
</details>

<br>[⬆ Back to top](#table-of-contents)


## String
### AutoLink

Renders a string as plaintext, with URLs converted to appropriate `<a>` elements.

Use `String.prototype.split()` and `String.prototype.match()` with a regular expression to find URLs in a string.
Return a  `<React.Fragment>` with matched URLs rendered as `<a>` elements, dealing with missing protocol prefixes if necessary, and the rest of the string rendered as plaintext.

```jsx
function AutoLink({ text }) {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;

  return (
    <React.Fragment>
      {text.split(delimiter).map(word => {
        let match = word.match(delimiter);
        if (match) {
          let url = match[0];
          return (
            <a href={url.startsWith("http") ? url : `http://${url}`}>{url}</a>
          );
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
  <AutoLink text='foo bar baz http://example.org bar' />,
  document.getElementById('root')
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)


## Visual
### Carousel

Renders a carousel component.

Initially set `state.active` to `0` (index of the first item).
Use an object, `style`, to hold the styles for the individual components.
Define a method, `setActiveItem`, which uses `this.setState` to change the state's `active` property to the index of the next item.
Define another method, `changeItem`, which is called by `setActiveItem` after updating the state each time and also when the component
first renders (on `ComponentDidMount`).
In the `render()` method, destructure `state`, `style` and `props`, compute if visibility style should be set to `visible` or not for each carousel item while mapping over and applying the combined style to the carousel item component accordingly.
Render the carousel items using [React.cloneElement](https://reactjs.org/docs/react-api.html#cloneelement) and pass down rest
`props` along with the computed styles.

```jsx
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
    this.scrollInterval = null;
    this.style = {
      carousel: {
        position: "relative"
      },
      carouselItem: {
        position: "absolute",
        visibility: "hidden"
      },
      visible: {
        visibility: "visible"
      }
    };
  }
  componentDidMount() {
    this.changeItem();
  }
  setActiveItem = () => {
    const { carouselItems } = this.props;
    this.setState(
      prevState => ({
        active: (prevState.active + 1) % carouselItems.length
      }),
      this.changeItem
    );
  };
  changeItem = () => {
    this.scrollInterval = setTimeout(this.setActiveItem, 2000);
  };
  render() {
    const { carouselItems, ...rest } = this.props;
    const { active } = this.state;
    const { visible, carousel, carouselItem } = this.style;
    return (
      <div style={carousel}>
        {carouselItems.map((item, index) => {
          const activeStyle = active === index ? visible : {};
          return React.cloneElement(item, {
            ...rest,
            style: {
              ...carouselItem,
              ...activeStyle
            }
          });
        })}
      </div>
    );
  }
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
  document.getElementById("root")
);
 ```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Collapse

Renders a component with collapsible content.

Use the value of the `collapsed` prop to determine the initial state of the content (collapsed/expanded).
Set the `state` of the component to the value of the `collapsed` prop (cast to a boolean value) and bind the `toggleCollapse` method to the component's context.
Use an object, `style`, to hold the styles for individual components and their states.
Create a method, `toggleCollapse`, which uses `Component.prototype.setState` to change the component's `state` from collapsed to expanded and vice versa.
In the `render()` method, use a `<div>` to wrap both the `<button>` that alters the component's `state` and the content of the component, passed down via `props.children`.
Determine the appearance of the content, based on `state.collapsed` and apply the appropriate CSS rules from the `style` object.
Finally, update the value of the `aria-expanded` attribute based on `state.collapsed` to make the component accessible.

```jsx
class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: !!props.collapsed
    };
    this.style = {
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
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  
  toggleCollapse() {
    this.setState(state => ({ collapsed: !state.collapsed }));
  }
  
  render() {
    return (
      <div>
        <button style={this.style.buttonStyle} onClick={this.toggleCollapse}>
          {this.state.collapsed ? 'Show' : 'Hide'} content
        </button>
        <div 
          style= {this.state.collapsed ? this.style.collapsed : this.style.expanded} 
          aria-expanded = {this.state.collapsed}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
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

<br>[⬆ Back to top](#table-of-contents)

### FileDrop

Renders a file drag and drop component for a single file.

Create a ref called `dropRef` for this component.
Initialize `state.drag` and `state.filename` to `false` and `''` respectively.
The variables `dragCounter` and `state.drag` are used to determine if a file is being dragged, while `state.filename` is used to store the dropped file's name.
Create the `handleDrag`, `handleDragIn`, `handleDragOut` and `handleDrop` methods to handle drag and drop functionality,  bind them to the component's context.
Each of the methods will handle a specific event, the listeners for which are created and removed in `componentDidMount` and `componentWillUnmount` respectively.
`handleDrag` prevents the browser from opening the dragged file, `handleDragIn` and `handleDragOut` handle the dragged file entering and exiting the component, while `handleDrop` handles the file being dropped and passes it to `this.props.handleDrop`.
In the `render()` method, create an appropriately styled `<div>` and use `state.drag` and `state.filename` to determine its contents and style. 
Finally, bind the `ref` of the created `<div>` to `dropRef`.


```css
.filedrop {
  min-height: 120px;
  border: 3px solid #D3D3D3;
  text-align: center;
  font-size: 24px;
  padding: 32px;
  border-radius: 4px;
}

.filedrop.drag {
  border: 3px dashed #1E90FF;
}

.filedrop.ready {
  border: 3px solid #32CD32;
}
```

```jsx
class FileDrop extends React.Component {
  constructor(props) {
    super(props);
    this.dropRef = React.createRef();
    this.state = {
      drag: false,
      filename: ''
    }
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) 
      this.setState({ drag: true });
  }

  handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) 
      this.setState({ drag: false });
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files[0]);
      this.setState({ filename : e.dataTransfer.files[0].name});
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  }

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  render() {
    return (
      <div ref={this.dropRef} className={this.state.drag ? 'filedrop drag' : this.state.filename ? 'filedrop ready' : 'filedrop'}>
        {this.state.filename && !this.state.drag ? 
          <div>{this.state.filename}</div>
          : <div>Drop files here!</div>
        }
      </div>
    )
  }
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<FileDrop handleDrop={console.log}/>, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Mailto

Renders a link formatted to send an email.

Destructure the component's props, use `email`, `subject` and `body` to create a `<a>` element with an appropriate `href` attribute.
Render the link with `props.children` as its content.

```jsx
function Mailto({ email, subject, body, ...props }) {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Mailto email="foo@bar.baz" subject="Hello" body="Hello world!">
    Mail me!
  </Mailto>,
  document.getElementById("root")
);
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### ModalDialog

Renders a dialog component in a modal, controllable through events. 
To use the component, import `ModalDialog` only once and then display it using `ModalDialog.show()`, passing the JSX templates and data as parameters.

Define `modalHandler`, a method that will handle showing the modal dialog, set `state` to the default values initially and bind the `close` and `modalClick` methods to the component's context.
Define `close` and `modalClick` to toggle the visibility of the modal dialog, based on `state.closeOnClick`.
Use the CustomEvent API to listen for `modal` events, that can be dispatched from the `static` `show()` method, handle listeners appropriately from `componentDidMount` and `componentWillUnmount`.

The `show()` method accepts an argument, that should contain three parameters:
* `title`, a string for the dialog's title
* `closeOnClick`, `true` if the modal should close on click or `false` if it should only close when clicking the *X* button
* `content`, which is the JSX content to be rendered inside the dialog

Finally, in the `render()` method, use a `<div>` to wrap everything and render the modal dialog with the content passed to `show()`.

```css
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
  }
  .dialog-title {
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border-bottom: 0.5px solid #c3c3c3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dialog-close {
    font-size: 32px;
    color: #c3c3c3;
    cursor: pointer;
    transform: rotate(45deg);
    user-select: none;
  }
  .dialog-close:hover {
    color: red;
  }
  .dialog-content {
    min-width: 300px;
  }
```

```jsx
class ModalDialog extends React.Component {
  constructor() {
    super();
    this.modalHandler = (e) => {
      this.setState({
        data: e.detail.data,
        visible: true
      });
    };
    this.state = {
      data: {
        title: '',
        closeOnClick: false,
        content: ''
      },
      visible: false
    };
    this.close = this.close.bind(this);
    this.modalClick = this.modalClick.bind(this);
  }
  render() {
    return !this.state.visible ? null : <div className="modal" onClick={this.modalClick}>
      <div className="dialog">
        <div className="dialog-title">{ this.state.data.title }<span className="dialog-close" onClick={this.close}>+</span></div>
        <div className="dialog-content">
          {
            this.state.data.content
          }
        </div>
      </div>
    </div>
  }
  componentDidMount() {
    document.addEventListener('modal', this.modalHandler);
  }
  componentWillUnmount() {
    document.removeEventListener('modal', this.modalHandler);
  }
  close() {
    this.setState({
      visible: false,
      data: {
        title: '',
        closeOnClick: false,
        content: ''
      }
    });
  }
  static show(data) {
    document.dispatchEvent(new CustomEvent('modal', {
      detail: {
        data
      }
    }));
  }
  modalClick() {
    if (this.state.data.closeOnClick) this.close();
  }
}
```
#### Notes

This component includes a lot of CSS, which might conflict with other CSS in your project. It is recomended for the modal to be a direct child of the body tag.,A more up-to-date method with lower compatibility is to use [Portals](https://reactjs.org/docs/portals.html) in React 16+.,<!-tags: visual,static,children,state,class -->,<!-expertise: 1 -->

<details>
<summary>Examples</summary>

```jsx
// add to render function
<ModalDialog />

// every time you wanna call the dialog
// content is a jsx element
ModalDialog.show({
  title: 'Hello, world!',
  closeOnClick: true,
  content: <img src="https://github.com/30-seconds/30-seconds-of-react/blob/master/logo.png"/>
});  
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### StarRating

Renders a star rating component.

Use and IIFE to define a functional component, called `Star` that will render each individual star with the appropriate appearance, based on the parent component's `state` and return the class component `StarRating`.
Use the value of the `rating` prop to determine if a valid rating is supplied and store it in `state.rating` (or `0` if invalid or not supplied).
Initialize `state.selection` to `0`.
Create two methods, `hoverOver` and `setRating`, that take an event as argument and update `state.selected` and `state.rating` according to it, bind them both to the component's context.
In the `render()` method, create a `<div>` to wrap the `<Star>` components, which are created using `Array.prototype.map` on an array of 5 elements, created using `Array.from`, and handle the `onMouseLeave` event to set `state.selection` to `0`, the `onClick` event to set
the `state.rating` and the `onMouseOver` event to set `state.selection` to the `star-id` attribute of the `event.target` respectively. 
Finally, pass the appropriate values to each `<Star>` component (`starId` and `marked`).

```jsx
const StarRating = (function() {
  function Star({ marked, starId }) {
    return (
      <span star-id={starId} style={{ color: '#ff9933' }} role='button'>
        {marked ? '\u2605' : '\u2606'}
      </span>
    );
  }

  return class StarRating extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rating: typeof props.rating == 'number' ? props.rating : 0,
        selection: 0
      };
      this.hoverOver = this.hoverOver.bind(this);
      this.hoverOut = this.hoverOver.bind(this, null);
      this.handleClick = this.handleClick.bind(this);
    }
    hoverOver(event) {
      let val = 0;
      if (event && event.target && event.target.getAttribute('star-id'))
        val = event.target.getAttribute('star-id');
      this.setState(state => ({ selection: val }));
    }
    handleClick(event) {
      const val = event.target.getAttribute('star-id') || this.state.rating;
      this.setState(state => ({ rating: val }));
    }
    render() {
      return (
        <div
          onMouseOut={this.hoverOut}
          onClick={this.handleClick}
          onMouseOver={this.hoverOver}
        >
          {Array.from({ length: 5 }, (v, i) => (
            <Star
              starId={i+1}
              key={`star_${i+1} `}
              marked={
                this.state.selection
                  ? this.state.selection >= i+1
                  : this.state.rating >= i+1
              }
            />
          ))}
        </div>
      );
    }
  };
})();
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<StarRating/>, document.getElementById('root'));
ReactDOM.render(<StarRating rating={2} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Tab

Renders a tabbed menu and view component.

Define `TabItem` as a middleware, pass it to the `Tab` and remove unnecessary nodes expect for `TabItem` by identifying the function's name in `props.children`.
Use `Array.prototype.map` on the collected nodes to render the `tab-menu` and `tab-view`. 
Define `changeTab`, which will be executed when clicking a `<button>` from the `tab-menu`.
`changeTab` executes the passed callback, `onTabClick` and updates `state.bindIndex`, which in turn causes a re-render, evaluating the `style` and `className` of the `tab-view` items and `tab-menu` buttons according to their `index`.

```css
.tab-menu > button {
  cursor: pointer;
  padding: 8px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
}
.tab-menu > button.focus {
  border-bottom: 2px solid #007BEF;
}
.tab-menu > button:hover {
  border-bottom: 2px solid #007BEF;
}
```

```jsx
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bindIndex: props.defaultIndex
    };
  }
  changeTab(newIndex) {
    if (typeof this.props.onTabClick === "function")
      this.props.onTabClick(newIndex);
    this.setState({
      bindIndex: newIndex
    });
  }
  buttonClass(index) {
    return this.state.bindIndex === index ? "focus" : "";
  }
  itemStyle(index) {
    return {
      display: this.state.bindIndex === index ? "block" : "none"
    };
  }
  render() {
    const items = this.props.children.filter(
      item => item.type.name === "TabItem"
    );
    return (
      <div className="wrapper">
        <div className="tab-menu">
          {items.map(({ props: { index, label } }) => (
            <button
              onClick={() => this.changeTab(index)}
              className={this.buttonClass(index)}
            >
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
              style={this.itemStyle(props.index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
function TabItem(props) {
  return <div {...props} />;
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(
  <Tab defaultIndex="1" onTabClick={console.log}>
    <TabItem label="A" index="1">
      Lorem ipsum
    </TabItem>
    <TabItem label="B" index="2">
      Dolor sit amet
    </TabItem>
  </Tab>,
  document.getElementById("root")
);

```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Ticker

Renders a ticker component.

- The ticker state is initially set to zero 
- When the `Tick!` button is clicked, `timer` is incremented periodically at the given `interval`
- When the `Reset` button is clicked, the value of the timer is set to zero and the `setInterval` is cleared
- The `setInterval` is cleared once the desired `time` is reached
- `time` and `interval` are the required props

```jsx
class Ticker extends Component {
	constructor(props) {
		super(props);
		this.state = {ticker: 0}
		this.interval = null
	}

	tick = () => {
		this.reset()
		this.interval = setInterval(() => {
			if (this.state.ticker < this.props.times) {
				this.setState(({ ticker }) => ({ticker: ticker + 1}))
			}else{
				clearInterval(this.interval)
			}
		}, this.props.interval)
	}

	reset = () => {
		this.setState({ticker: 0})
		clearInterval(this.interval)
	}

	render() {
		return (
			<div>
				<span style={{fontSize: 100}}>{this.state.ticker}</span>       
				<button onClick={this.tick}>Tick!</button>
				<button onClick={this.reset}>Reset</button>
			</div>
		);
	}
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<Ticker times={5} interval={1000} />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Toggle

Renders a toggle component.

Initialize `state.isToggleOn` to `false`, bind the `handleClick` method to the component's context.
Use an object, `style`, to hold the styles for individual components and their states.
Create a method, `handleClick`, which uses `Component.prototype.setState` to change the component's `state.toggleOn`.
In the `render()` method, destructure `state` and `style`, create a `<button>` that alters the component's `state` and determine the appearance of the content based on `state.isToggleOn`, applying the appropriate CSS rules from the `style` object.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    this.style = {
      on: {
        backgroundColor: 'green'
      },
      off: {
        backgroundColor: 'grey'
      }
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    const { isToggleOn } = this.state;
    const { on, off } = this.style;

    return (
      <button
        onClick={this.handleClick}
        style={isToggleOn ? on : off}
      >
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

<details>
<summary>Examples</summary>

```jsx
ReactDOM.render(<Toggle />, document.getElementById('root'));
```
</details>

<br>[⬆ Back to top](#table-of-contents)

### Tooltip

Renders a tooltip component.

Set the `state` of the component to `show: false` initially, define an object, `style`, to hold the styles for individual components and their states.
Create a method, `toggleTooltip`, which uses `this.setState` to change the state's `show` property from `true` to `false` and vice versa.
Bind `showTooltip` and `hideTooltip` to the component's context with the respective values of `true` and `false`.
In the `render()` method, compute if the tooltip should be shown or hidden, render the content of the tooltip and bind the `onMouseEnter` and `onMouseLeave` events to `showTooltip` and `hideTooltip` respectively.
 
```jsx
class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.style = {
      tooltip: {
        position: 'relative',
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        visibility: "hidden",
        width: "fit-content",
        padding: 5,
        borderRadius: 5
      },
      tooltipArrow: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: "rgba(0,0,0,0.7) transparent transparent",
      },
      visible: {
        visibility: "visible"
      },
    };
    this.showTooltip = this.toggleTooltip.bind(this, true);
    this.hideTooltip = this.toggleTooltip.bind(this, false);
  }

  toggleTooltip = tooltipState => {
    this.setState({
      show: tooltipState
    });
  };

  render() {
    const { children, text, ...rest } = this.props;
    const { show } = this.state;
    const { visible, tooltip, tooltipArrow } = this.style;
    const showTooltip = show ? visible : {};
    return (
      <div>
        <div style={{ ...tooltip, ...showTooltip }}>
          {text}
          <span style={tooltipArrow}/>
        </div>
        <div {...rest} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
          {children}
        </div>
      </div>
    );
  }
}
```

<details>
<summary>Examples</summary>

```jsx
 ReactDOM.render(
     <Tooltip text='Simple tooltip'>
       <button>Hover me!</button>
     </Tooltip>,
     document.getElementById('root')
 );
```
</details>

<br>[⬆ Back to top](#table-of-contents)


-----

*This repository is a work in progress. If you want to contribute, please check the open issues to see where and how you can help out!*

*This README is built using [markdown-builder](https://github.com/30-seconds/markdown-builder).*
