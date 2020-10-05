---
title: parseYoutubeUrl
tags: youtube,URL parsing,intermediate
---

Returns the youtube video id for given youtube url

- Supports following youtube urls:
    - `http://www.youtube.com/watch?v=NpEaa2P7qZI&feature=feedrec_grec_index`
    - `http://www.youtube.com/v/NpEaa2P7qZI?fs=1&amp;hl=en_US&amp;rel=0`
    - `http://www.youtube.com/watch?v=NpEaa2P7qZI#t=0m10s`
    - `http://www.youtube.com/embed/NpEaa2P7qZI?rel=0`
    - `http://www.youtube.com/watch?v=NpEaa2P7qZI`
    - `http://youtu.be/NpEaa2P7qZI`
    
- Uses regex to parse url.

```js
const parseYoutubeUrl = (url) => {
    let regex = /^.*((youtu.be\/)|(\/\w\/)|(v\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regex);
    return (match&&match[7].length==11)? match[7] : false;
}
```

```js
parseYoutubeUrl('http://www.youtube.com/watch?v=NpEaa2P7qZI'); // 'NpEaa2P7qZI'
```