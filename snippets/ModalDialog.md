### Modal/Dialog

Renders a dialog component with modal.

This is a simple React ModalDialog Component.It owns 4 props: `show`、`close`、`title` and `clickModal2Hide`.

* `close` prop defines the method for closing the dialog.
* `title` prop determines the title of the dialog.
* `closeOnClick` prop determines whether we can close the dialog via clicking on modal.

Create 3 methods and bind them to component:

* `close` used to call the `close` prop to close the dialog.
* `modalClick` used to define the click event handler of the modal.When `clickModal2Hide` prop passed as `true`,the `modalClick` will close the dialog when modal clicked.
* `dialogClick` used to stop propagation of the modal click event.You can define more logics in this method.

Use `children` prop to get the content of the dialog passed by Component User.Render the content in `dialog-content` class div.

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
class Dialog extends React.Component {
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
        content: ''
      },
      visible: false
    };
    this.close = this.close.bind(this);
    this.modalClick = this.modalClick.bind(this);
  }
  render() {
    return <div className="modal" onClick={this.modalClick} style={{ display: this.state.visible ? '' : 'none'}}>
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
      visible: false
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
    if (this.props.closeOnClick) this.close();
  }
}
```

```jsx
// add to render function
<Dialog clickModal2Hide={true} show={true}/>

// every time you wanna call the dialog
// content is a jsx element
ModalDialog.show({
  title: 'Test', 
  content: <img src="https://github.com/zhongdeming428/30-seconds-of-react/raw/master/logo.png"/>
});  
```

<!-- tags: props,children,class -->

<!-- expertise: 1 -->
