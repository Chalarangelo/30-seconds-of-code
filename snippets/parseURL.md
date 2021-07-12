---
title: parseURL
tags: string,browser,regexp,advanced
firstSeen: 2021-07-12T16:53:02Z
---

Parse an URL.

- Use a trick of &#60;a&#62; tag.
- Return an object with elements in the URL.
- Parse protocol, host, port, query, etc.

```js
const parseURL = url =>{
  let a =  document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':',''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
    hash: a.hash.replace('#',''),
    path: a.pathname.replace(/^([^\/])/,'/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
    segments: a.pathname.replace(/^\//,'').split('/'),
    params: (function(){
      let ret = {},
        seg = a.search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })()
  };
}
```

```js
parseURL('http://www.example.com/helloworld/p/?one=1&two=2'); 
/* 
{
  file: ""
  hash: ""
  host: "www.cnblogs.com"
  params: {one: "1", two: "2"}
  path: "/wayou/p/"
  port: ""
  protocol: "http"
  query: "?one=1&two=2"
  relative: "/wayou/p/?one=1&two=2"
  segments: (3) ["wayou", "p", ""]
  source: "http://www.cnblogs.com/wayou/p/?one=1&two=2"
}
*/
```
