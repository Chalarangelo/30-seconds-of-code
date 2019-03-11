### Modal

Renders a Modal component, controllable through events.

`keydownHandler`, is a method which handles all the Keyboard events.

The Modal Component has following attributes:

- `isVisible`, Boolean describing if the modal should be shown or not.(Required)
- `title`, String describing title of Modal.(Required)
- `content`, JSX elements to be rendered in modal body.(Required)
- `footer`, JSX elements to be rendered in modal footer. (optional)
- `onClose`,  Function that will be called when Modal needs to be closed like when escape key is pressed.(Required)



```css
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  width: 100%;
  z-index: 9999;  
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;
}

.modal-dialog{
  width: 100%;
  max-width: 550px;
  background: white;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow:hidden;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: slide-in;
  animation-duration: 0.5s;
}

.modal-header,.modal-footer{
  display: flex;
  align-items: center;
  padding: 1rem;
}
.modal-header{
  border-bottom: 1px solid #dbdbdb;
  justify-content: space-between;
}
.modal-footer{
  border-top: 1px solid #dbdbdb;
  justify-content: flex-end;
}
.modal-close{
  cursor: pointer;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
}
.modal-body{
  overflow: auto;
}
.modal-content{
  padding: 1rem;
}

@keyframes appear {
  from {opacity: 0;}
  to {opacity: 1;}
}
@keyframes slide-in {
  from {transform: translateY(-150px);}
  to { transform: translateY(0);}
}
```


```jsx
function Modal(props){
  const { isVisible, title, content, footer, onClose } = props;

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  });

  function keydownHandler({ key }) {
    switch (key) {
      case 'Escape':  onClose(); break;
      default:
    }
  }

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{ content }</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}
```

```jsx
//Add the component to render function

ReactDOM.render(
  <Modal 
    isVisible={false}
    title= "Modal Title"
    content={<p>The content goes here</p>}
    footer={<button>Cancel</button>}        
    onClose ={()=> } //Add action to hide modal
/>,
  document.getElementById('root')
);
```
