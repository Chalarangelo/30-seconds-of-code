### Modal/Dialog

Renders a dialog component with modal.

This is a simple React ModalDialog Component.It owns 4 props: `show`、`close`、`title` and `clickModal2Hide`.

* `show` prop determines the initial state of the dialog(show/hide).It can influence the `display` css property of `modal` class div.E
* `close` prop defines the method for closing the dialog.
* `title` prop determines the title of the dialog.
* `clickModal2Hide` prop determines whether we can close the dialog via clicking on modal.

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
      this.close = this.close.bind(this);
      this.modalClick = this.modalClick.bind(this);
      this.dialogClick = this.dialogClick.bind(this);
    }
    render() {
      return <div className="modal" onClick={this.modalClick} style={{ display: this.props.show ? '' : 'none'}}>
        <div className="dialog" onClick={this.dialogClick}>
          <div className="dialog-title">{ this.props.title }<span className="dialog-close" onClick={this.close}>+</span></div>
          <div className="dialog-content">
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    }
    close() {
      this.props.close();
    }
    modalClick() {
      if (this.props.clickModal2Hide) {
        this.close();
      }
    }
    dialogClick(e) {
      e.stopPropagation();
    }
  }
```

```jsx
  let ModalDialog = <Dialog show={this.state.visible} title="Test" clickModal2Hide={true} close={()=>{this.setState({visible: false})}}>
                      <img src="https://github.com/30-seconds/30-seconds-of-react/blob/master/logo.png?raw=true"></img>
                    </Dialog>;
  ReactDOM.render(<ModalDialog />, Node);
```

<!-- tags: props,children,class -->

<!-- expertise: 1 -->
