<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/core</h1>
</div>

The main Jimp class. This class can be extended with types and bitmap manipulation functions. Out of the box it does not support any image type.

## Available Methods

### Jimp

The Jimp class constructor.

### addConstants

Add constant or static methods to the Jimp constructor.

```js
addConstants({
  MIME_SPECIAL: 'image/special'
});
```

### addJimpMethods

Add a bitmap manipulation method to Jimp constructor. These method should return this so that the function can be chain-able.

```js
addJimpMethods({
  cropCrazy: function() {
    // Your custom image manipulation method

    return this;
  }
})

const image = await Jimp.read(...);

image.resize(10, Jimp.AUTO),
  .cropCrazy();

await image.writeAsync('test.png');
```

### addType

Add a image mime type to Jimp constructor. First argument is a mime type and the second is an array of file extension for that type.

```js
addType('image/special', ['spec', 'special']);
```
