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

#### Notes:
* This component includes a lot of CSS, which might conflict with other CSS in your project. It is recomended for the modal to be a direct child of the body tag.
* A more up-to-date method with lower compatibility is to use [Portals](https://reactjs.org/docs/portals.html) in React 16+.

<!-- tags: visual,static,children,state,class -->

<!-- expertise: 1 -->
