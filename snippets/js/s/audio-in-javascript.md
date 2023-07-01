---
title: "Adding sound in JavaScript"
type: snippet
language: javascript
tags: [audio,html,javascript]
author: Vivek Kumar
cover: drums
dateModified: 2023-06-26T15:06:45Z
---

The simplest way to add audio to your HTML file is through the use of Javascript's Audio() constructor.To achieve this you can follow the steps below:

- Create an audio object,
- attach the audio object an event.

```html
<body>  
    <button id="play">Play</button>
    <script src="index.js"></script>
</body>
```

```js
var audio=new Audio('./crash.mp3');   // specify audio file-path or and url
const ele=document.querySelector("button");
ele.addEventListener("click",function(){
    audio.play();
    console.log("audio file")
})
```
Another way to achieve the same is through the use of HTML audio tag.

```html
<body>  
   <audio id="audio" autopaly loop controls src="./crash.mp3"></audio>
</body>
```
```js
var audio=document.querySelector("#audio");
audio.play();
```
 - The audio tag attribute autoplay indicates that when our audio file is called within our Javascript file it will begin playing in the browser automatically.
 -Loop indicates that the audio file will loop back to the beginning of the audio clip indefinitely when finished.
 -Controls create controls in the browser which allow the user to adjust volume, seeking, and other audio playback features.



