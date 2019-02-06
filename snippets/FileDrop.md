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

```jsx
ReactDOM.render(<FileDrop handleDrop={console.log}/>, document.getElementById('root'));
```

<!-- tags: visual,input,state,class -->

<!-- expertise: 2 -->
