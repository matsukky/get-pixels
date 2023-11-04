get-pixels
==========
This fork [get-pixels](https://github.com/scijs/get-pixels) update and replace ``request`` due of the end of support of it. Written in 100% JavaScript, works ONLY in node.js and has no external native dependencies.

Currently the following file formats are supported:

* `PNG`
* `JPEG`
* `GIF`

Example
=======

```javascript
var getPixels = require("@matsukky/get-pixels")

getPixels("lena.png", function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }
  console.log("got pixels", pixels.shape.slice())
})
```

Install
=======

    npm install @matsukky/get-pixels
