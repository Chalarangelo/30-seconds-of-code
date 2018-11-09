### Modal/Dialog

Renders a dialog component with modal.

This is a simple React ModalDialog Component that is called and controlled through events.


Benefits from the CustomEvent API,this ModalDialog component supports single instance usage.We just need import `Dialog` once time,and can call the dialog everywhere.Every time we wanna show the dialog,we just call the static function `Dialog.show`.Passing our jsx templates and data as the parameter and then the dialog will show with the data and templates rendered.

After the component mounted,Dialog binds a custom event called `modal` to document element.The event handler defined in our component named `modalHandler`.It accepts and renders the data passed by users.When document node captured a `modal` event,`modalHandler` works.

Before the component unmounted,Dialog removes the custom event from document element in case of memory leaks.

Dialog exposed the `show` method via using `static` reserved keyword so that we can call it through Dialog class.The `show` method accepts a object parameter that contains three properties: `title`, `closeOnClick`, and `content`.

* `title` is the text you wanna show as the title of the dialog,passed as a String.
* `closeOnClick` is a boolean to determine if the modal should close when clicked on(true), or only when the X button is pressed(false).
* `content` is a jsx element.Dialog will render it.You can pass any content you want to show in the dialog.

See the live demo on [stackblitz.com](https://stackblitz.com/edit/react-7yg2gr).

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
        closeOnClick: false,
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
<Dialog />

// every time you wanna call the dialog
// content is a jsx element
Dialog.show({
  title: 'Test',
  closeOnClick: true,
  content: <img src="https://github.com/zhongdeming428/30-seconds-of-react/raw/master/logo.png"/>
});  
```

<!-- tags: props,children,class -->

<!-- expertise: 1 -->
