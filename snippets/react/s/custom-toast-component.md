---
title: Custom toast component
type: snippet
language: react
tags: [components,context]
cover: blue-notification
dateModified: 2023-06-30T22:16:34+02:00
---

Creates a custom toast Notification which is showed when ever the user calls it.

- the timeout can be set in useEffect of toast.jsx
- both `type` and `message` of the state should be present for the toast to render 
- styling is done through tailwind here although you can use your own styling here

### To create the component
create toast.jsx in desired location, here it is created in `src/components`
```jsx
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { ToastContext } from "../contexts"
const Toast = forwardRef((props,ref) => {
    const [active,setActive] = useState(false)
    const {toastMsg,setToastMsg} = useContext(ToastContext)

    useEffect(()=>{
        if(toastMsg.message) setActive(true)
    },[toastMsg])

    useEffect(()=>{
        if(active) setTimeout(()=>{
            setActive(false);
            setToastMsg({type:"",message:""})
        },5000)
    },[active])

    return(
        <section ref={ref} className={`${active?"translate-y-[30px]":"translate-y-[-40px]"} z-50 duration-500 toast-wrapper min-w-fit w-screen max-w-[300px] rounded absolute top-[-20px] left-1/2 -translate-x-1/2`}>
            <div className={`p-2 w-full text-center px-4 rounded-xl shadow-sm ${toastMsg.type=="success"?"bg-green-600 text-dark shadow-green-200":"bg-secondary text-red-500 shadow-red-300"}`}>{toastMsg.message}</div>
        </section>
    )
})

export default Toast;
```

create toastcontext and send the toastRef and setToastMsg as provider values. ToastMsg is an optional parameter here.<br/>
here context is created inside `src/contexts` location
```jsx
import { createContext, useState, useRef, useEffect } from "react";
import Toast from "../components/toastMsg";

const ToastContext = createContext(Object.create(null))

function ToastProvider(props){
    const toastRef = useRef(null)
    const [toastMsg,setToastMsg] = useState({message:"",type:""})
    
    return(
    <ToastContext.Provider value={{toastRef,setToastMsg,toastMsg}}>
        <Toast ref={toastRef}></Toast>
        {props.children}
    </ToastContext.Provider>
    )
}

export default ToastProvider
export {ToastContext}
```

Now wrap the App component with ToastContext
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider,UserProvider } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

```
### To use the toast component 
- call the setToastMsg imported from toastContext
```jsx
import { ToastContext } from "../../contexts";

function Componet(){
    const {setToastMsg} = useContext(ToastContext)
    function someExecutable(){
        /* Some code to be executed */
        setToastMsg({type:"error",message:`this is a message`})
        /* Some code to be executed */
    }
}
```