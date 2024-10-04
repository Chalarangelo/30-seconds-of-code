---
title: File drag and drop area
language: react
tags: [components,input,state,effect,event]
cover: man-red-sunset
excerpt: Create a file drag and drop React component for a single file.
listed: true
dateModified: 2024-06-11
---

Drag and drop areas for **file selection** are arguably the superior way to handle file uploads. They provide a more intuitive and user-friendly experience compared to traditional file input fields. In React, you can create a file drag and drop component that allows users to drop a file into a designated area.

First off, you'll need to create a **ref** to bind to the component's wrapper. This ref will be used to handle the drag and drop events. You'll also need to create **state variables**, via the use of the `useState()` hook, to manage the drag state and the filename of the dropped file. The drag state is used to determine if a file is being dragged, while the filename is used to store the name of the dropped file.

Next, you'll create methods to handle the drag and drop **events**. The `handleDrag` method prevents the browser from opening the dragged file, while `handleDragIn` and `handleDragOut` handle the dragged file entering and exiting the component. The `handleDrop` method handles the file being dropped and passes it to the `onDrop` callback.

Finally, you'll use the `useEffect()` hook to handle each of the drag and drop events using the previously created methods. The component will **render** a `<div>` that changes its appearance based on the drag state and the presence of a dropped file. If a file is dropped, the component will display the filename; otherwise, it will display a message prompting the user to drop a file.

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
const FileDrop = ({ onDrop }) => {
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
      onDrop(e.dataTransfer.files[0]);
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
    return () => {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  });

  return (
    <div
      ref={dropRef}
      className={
        drag ? 'filedrop drag' : filename ? 'filedrop ready' : 'filedrop'
      }
    >
      {filename && !drag ? <div>{filename}</div> : <div>Drop a file here!</div>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <FileDrop onDrop={console.log} />
);
```
