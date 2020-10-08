---
title: URLToDoc
tags: url, web-scrapping, DOM, Advanced
---

Convert any remote url to a HTMLDocument object.

- The function URLToDoc accepts a valid url as an argument.
- A proxy server has been used to resolve CORS error.
- Makes a get request to the provided url through the proxy using the fetch api.
- Creates a DOMParser object and use the html content received in the previous step.
- The function is asnychronous, hence it returns a promise which resolves to a remote document object and rejects with appropriate error.

```js
const URLToDoc = async (URL) => {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com'
    let response = await fetch(`${CORS_PROXY}/${URL}`)
    let htmlContent = await response.text()

    let domParser = new DOMParser()
    let document = domParser.parseFromString(htmlContent, 'text/html')
    return document
}
```

```js
URLToDoc('https://hacktoberfest.digitalocean.com')
    .then(remoteDocument => {
        console.log(remoteDocument)
    }) // HTMLDocument

URLToDoc('https://hacktoberfest.digitalocean.com')
    .then(remoteDocument => {
        let rulesElement = remoteDocument.querySelector('#rules')
        console.log(rulesElement)
    }) // HTMLHeadingElement
       // <h2 class="title is-2" id="rules"><a href="#rules">Rules</a></h2>

// Example scrapper function
const webScrapper = async (websiteUrl) => {
    const remoteDocument = await URLToDoc(websiteUrl)
    /*
        Scrapping goes here
    */
}
```