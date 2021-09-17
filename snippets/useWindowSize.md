---
title: useWindowSize
tags: react,hooks,intermediate
firstSeen: 2021-09-17T11:14:13.447Z
---

Create Hooks to get the current size of the browser window.


- Use the useWindowSize snippet to get the current size of the browser window.
- Use the useState() hook to initialize the values.
- Use the useEffect() hook to set the width and height when window size is changed.
- Return the windowSize state variable.
  
  
```js
// React 

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
 
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};
```

```js
// Example

import { useState, useEffect } from "react";
const App = () => {
  const size = useWindowSize();
  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```