---
title: Mapping data structures to React components
shortTitle: Data mapping components
language: react
tags: [components,array,object,state,recursion]
cover: interior-14
excerpt: Ever wanted to transform an array into a table or an object into a tree view? Here are some React components that can help you do just that.
listed: true
dateModified: 2024-06-18
---

Have you ever wanted to quickly transform an array into a table or an object into a tree view? One of the benefits of React is that you can easily map data structures to components, even customizing them to your needs.

## Data list

The simplest mapping is an **array of primitives** to a **list** of elements. All you really need is `Array.prototype.map()` to render each item as a `<li>` element. In addition to that, you should use a `key` prop to help React identify each item. Finally, wrap the result in an `<ol>` or `<ul>` element, depending on whether you want an ordered or unordered list.

```jsx
const DataList = ({ isOrdered = false, data }) => {
  const list = data.map((val, i) => <li key={`${i}_${val}`}>{val}</li>);
  return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
};

const names = ['John', 'Paul', 'Mary'];

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <DataList data={names} />
    <DataList data={names} isOrdered />
  </>
);
```

## Data table

A very similar use-case is mapping an **array of primitives** to a **table**. The process is almost identical, but this time you render each item as a `<tr>` element with two `<td>` children. The first `<td>` contains the index of the item, while the second one contains the item itself.

```jsx
const DataTable = ({ data }) => {
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
};

const people = ['John', 'Jesse'];

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataTable data={people} />
);
```

## Object table view

For more complex structures, such as **arrays of objects**, you'll need a more sophisticated component. Instead of rendering each item as a `<tr>` element, you'll need to render each object as a `<tr>` element with a `<td>` for each key in the object. This way, you can create a **table** with rows dynamically created from an array of objects and a list of property names.

To get the keys and iterate over them, you'll combine `Object.keys()`, `Array.prototype.filter()`, `Array.prototype.includes()`, and `Array.prototype.reduce()`. This will produce a `filteredData` array, containing all objects with the keys specified in `propertyNames`.

> [!CAUTION]
>
> This component does not work with **nested objects** and will break if there are nested objects inside any of the properties specified in `propertyNames`.

```jsx
const MappedTable = ({ data, propertyNames }) => {
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
};

const people = [
  { name: 'John', surname: 'Smith', age: 42 },
  { name: 'Adam', surname: 'Smith', gender: 'male' }
];
const propertyNames = ['name', 'surname', 'age'];

ReactDOM.createRoot(document.getElementById('root')).render(
  <MappedTable data={people} propertyNames={propertyNames} />
);
```

## Expandable object tree view

Finally, you can create a **tree view** component that can display **nested objects**. This component uses **recursion** to render nested objects as nested `<TreeView>` components. The `TreeView` component takes a `data` prop, which is an object to render, and an optional `name` prop, which is the name of the object.

Using the value of the `isToggled` state variable, the component can **toggle** the visibility of the nested object. The `isParentToggled` prop is used to pass the state of the parent object to the child object, allowing the child object to be toggled when the parent object is toggled.

For each key in the object, the component checks if the value is an object. If it is, it renders a nested `<TreeView>` component. Otherwise, it renders a `<p>` element with the key and value of the object.


```css
.tree-element {
  margin: 0 0 0 4px;
  position: relative;
}

.tree-element.is-child {
  margin-left: 16px;
}

div.tree-element::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 1px;
  height: calc(100% - 48px);
  border-left: 1px solid gray;
}

p.tree-element {
  margin-left: 16px;
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
const TreeView = ({
  data,
  toggled = true,
  name = null,
  isLast = true,
  isChildElement = false,
  isParentToggled = true
}) => {
  const [isToggled, setIsToggled] = React.useState(toggled);
  const isDataArray = Array.isArray(data);

  return (
    <div
      className={`tree-element ${isParentToggled && 'collapsed'} ${
        isChildElement && 'is-child'
      }`}
    >
      <span
        className={isToggled ? 'toggler' : 'toggler closed'}
        onClick={() => setIsToggled(!isToggled)}
      />
      {name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>}
      {isDataArray ? '[' : '{'}
      {!isToggled && '...'}
      {Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object' ? (
          <TreeView
            key={`${name}-${v}-${i}`}
            data={data[v]}
            isLast={i === a.length - 1}
            name={isDataArray ? null : v}
            isChildElement
            isParentToggled={isParentToggled && isToggled}
          />
        ) : (
          <p
            key={`${name}-${v}-${i}`}
            className={isToggled ? 'tree-element' : 'tree-element collapsed'}
          >
            {isDataArray ? '' : <strong>{v}: </strong>}
            {data[v]}
            {i === a.length - 1 ? '' : ','}
          </p>
        )
      )}
      {isDataArray ? ']' : '}'}
      {!isLast ? ',' : ''}
    </div>
  );
};

const data = {
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <TreeView data={data} name="data" />
);
```
