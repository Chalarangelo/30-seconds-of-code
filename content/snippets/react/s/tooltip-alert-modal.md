---
title: Tooltips, alerts and modals in React
shortTitle: Tooltip, alert & modal
language: react
tags: [components,state,effect,children]
cover: yellow-white-mug-2
excerpt: Dialog components like tooltips, alerts and modals are essential for user interaction. Learn how to create them in React.
listed: true
dateModified: 2024-06-16
---

Dialog components like tooltips, alerts and modals are essential for user interaction. They provide feedback, warnings and additional information to users. While a little more involved to implement, they're nothing that React can't handle.

## Tooltip

For a simple **tooltip** component, you'll need to use the `useState()` hook to manage the state of the tooltip. The tooltip should be displayed when the user **hovers** over the element and hidden when the user moves the cursor away. For that purpose, you can use the `onMouseEnter` and `onMouseLeave` events.

```css
.tooltip-container {
  position: relative;
}

.tooltip-box {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  top: calc(100% + 5px);
  display: none;
}

.tooltip-box.visible {
  display: block;
}

.tooltip-arrow {
  position: absolute;
  top: -10px;
  left: 50%;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
}
```

```jsx
const Tooltip = ({ children, text, ...rest }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="tooltip-container">
      <div className={show ? 'tooltip-box visible' : 'tooltip-box'}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Tooltip text="Simple tooltip">
    <button>Hover me!</button>
  </Tooltip>
);
```

## Alert

In order to create an **alert** component, you'll need to manage the state of the alert. This state involves the `isShown` state to determine if the alert should be displayed and the `isLeaving` state to handle the closing animation.

The alert should be displayed when the component is rendered and hidden after a certain amount of time. You can use the `useState()` hook to manage the state and the `useEffect()` hook to handle the timeout with the help of `setTimeout()`.

Additionally, we need to define a `closeAlert()` function to handle the closing of the alert. This function will set the `isLeaving` state to `true`, wait for the specified **timeout**, and then set the `isShown` state to `false`.

```css
@keyframes leave {
  0% { opacity: 1 }
  100% { opacity: 0 }
}

.alert {
  padding: 0.75rem 0.5rem;
  margin-bottom: 0.5rem;
  text-align: left;
  padding-right: 40px;
  border-radius: 4px;
  font-size: 16px;
  position: relative;
}

.alert.warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert.leaving {
  animation: leave 0.5s forwards;
}

.alert .close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.75rem;
  color: #333;
  border: 0;
  height: 100%;
  cursor: pointer;
  background: none;
  font-weight: 600;
  font-size: 16px;
}

.alert .close::after {
  content: 'x';
}
```

```jsx
const Alert = ({ isDefaultShown = false, timeout = 250, type, message }) => {
  const [isShown, setIsShown] = React.useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = React.useState(false);

  let timeoutId = null;

  React.useEffect(() => {
    setIsShown(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDefaultShown, timeout, timeoutId]);

  const closeAlert = () => {
    setIsLeaving(true);
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return (
    isShown && (
      <div
        className={`alert ${type} ${isLeaving ? 'leaving' : ''}`}
        role="alert"
      >
        <button className="close" onClick={closeAlert} />
        {message}
      </div>
    )
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Alert type="info" message="This is info" />
);
```

## Modal dialog

**Modal dialogs** essentially block the user from interacting with the rest of the application until they are closed. They are used for important messages, warnings, or additional information. For the modal dialog, CSS will do a lot of the heavy lifting.

However, you'll also need to use the `useEffect()` hook to handle the `keydown` event. This event will close the modal when the user presses the `Escape` key. The modal should be displayed when the `isVisible` prop is `true` and hidden when it's `false`.

```css
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;
}

.modal-dialog {
  width: 100%;
  max-width: 550px;
  background: white;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: slide-in;
  animation-duration: 0.5s;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.modal-header {
  border-bottom: 1px solid #dbdbdb;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #dbdbdb;
  justify-content: flex-end;
}

.modal-close {
  cursor: pointer;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
}

.modal-body {
  overflow: auto;
}

.modal-content {
  padding: 1rem;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in {
  from {
    transform: translateY(-150px);
  }
  to {
    transform: translateY(0);
  }
}
```

```jsx
const Modal = ({ isVisible = false, title, content, footer, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

const App = () => {
  const [isModal, setModal] = React.useState(false);
  return (
    <>
      <button onClick={() => setModal(true)}>Click Here</button>
      <Modal
        isVisible={isModal}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```
