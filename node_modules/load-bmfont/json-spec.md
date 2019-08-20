The spec for the JSON output is consistent with the rest of the [BMFont file spec](http://www.angelcode.com/products/bmfont/doc/file_format.html).

Here is what a typical output looks like, omitting the full list of glyphs/kernings for brevity.

```json
{
  "pages": [
    "sheet.png"
  ],
  "chars": [
    {
      "id": 10,
      "x": 281,
      "y": 9,
      "width": 0,
      "height": 0,
      "xoffset": 0,
      "yoffset": 24,
      "xadvance": 8,
      "page": 0,
      "chnl": 0
    },
    {
      "id": 32,
      "x": 0,
      "y": 0,
      "width": 0,
      "height": 0,
      "xoffset": 0,
      "yoffset": 0,
      "xadvance": 9,
      "page": 0,
      "chnl": 0
    },
    ...
  ],
  "kernings": [
    {
      "first": 34,
      "second": 65,
      "amount": -2
    },
    {
      "first": 34,
      "second": 67,
      "amount": 1
    },
    ...
  ],
  "info": {
    "face": "Nexa Light",
    "size": 32,
    "bold": 0,
    "italic": 0,
    "charset": "",
    "unicode": 1,
    "stretchH": 100,
    "smooth": 1,
    "aa": 2,
    "padding": [
      0,
      0,
      0,
      0
    ],
    "spacing": [
      0,
      0
    ]
  },
  "common": {
    "lineHeight": 32,
    "base": 24,
    "scaleW": 1024,
    "scaleH": 2048,
    "pages": 1,
    "packed": 0,
    "alphaChnl": 0,
    "redChnl": 0,
    "greenChnl": 0,
    "blueChnl": 0
  }
}
```