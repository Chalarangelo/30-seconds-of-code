### FileDrop

Renders a file drag and drop component for a single file.

Create a ref called `dropRef` for this component.
Use the `React.useState()` hook to create the `drag` and `filename` variables, initialized to `false` and `''` respectively.
The variables `dragCounter` and `drag` are used to determine if a file is being dragged, while `filename` is used to store the dropped file's name.

Create the `handleDrag`, `handleDragIn`, `handleDragOut` and `handleDrop` methods to handle drag and drop functionality,  bind them to the component's context.
Each of the methods will handle a specific event, the listeners for which are created and removed in the `React.useEffect()` hook and its attached `cleanup()` method.
`handleDrag` prevents the browser from opening the dragged file, `handleDragIn` and `handleDragOut` handle the dragged file entering and exiting the component, while `handleDrop` handles the file being dropped and passes it to `props.handleDrop`.
Return an appropriately styled `<div>` and use `drag` and `filename` to determine its contents and style. 
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
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return function cleanup() {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  });

  return (
    <div
      ref={dropRef}
      className={
        drag ? "filedrop drag" : filename ? "filedrop ready" : "filedrop"
      }
    >
      {filename && !drag ? <div>{filename}</div> : <div>Drop files here!</div>}
    </div>
  );
}
```

```jsx
ReactDOM.render(<FileDrop handleDrop={console.log}/>, document.getElementById('root'));
```

<!-- tags: visual,input,state,effect -->

<!-- expertise: 2 -->
