get-pixels
==========
This fork of [get-pixels](https://github.com/scijs/get-pixels) update and replace the ``request`` module, due of the end of support of it. 
# ⚠️ Works ONLY in node.js

Currently the following file formats are supported:

* `PNG`
* `JPEG`
* `GIF` (partially supported)

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
