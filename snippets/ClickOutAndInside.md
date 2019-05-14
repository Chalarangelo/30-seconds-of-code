### ClickInside and ClickOutside

Two handy hooks to handle the click outside and inside event on the wrapped component.

* Create customized hooks that take in a `ref` component(node) and a `callback` function to hanlde the customized `click` event
* Use the `React.useEffect()` hook to append and clean up the `click` event.
* Use the `React.useRef()` hook to create a `ref` for your click component and pass it to `useClickInside` and `useClickOutside` hooks.

```css
.click-box {
  border: 2px dashed orangered;
  height: 200px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  border: 2px solid blue;
  padding: 16px;
}
```

```jsx
const useClickInside = (ref, callback) => {
  const handleClick = e => {
    //use the node contains to verify if we click inside
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };

  //clean up using useEffect
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    //use the node contains to verify if we click outside
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  // clean up using useEffect
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

function ClickBox({onClickOutside,onClickInside}) {
  const clickRef = useRef();
  useClickOutside(clickRef, onClickOutside);
  useClickInside(clickRef, onClickInside);
  return (
    <div className="click-box" ref={clickRef}>
      <p>Hello Click Me Inside!</p>
    </div>
  );
}
```

```jsx
ReactDOM.render(<ClickBox onClickOutside={()=> alert("click outside")} onClickInside={()=> alert("click inside")}/>,document.getElementById('root'))
```