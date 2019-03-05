# gm-palette
Dominant color and palette using graphicsmagick.

[![NPM version](http://img.shields.io/npm/v/gm-palette.svg?style=flat-square)](https://www.npmjs.org/package/gm-palette) [![NPM license](http://img.shields.io/npm/l/gm-palette.svg?style=flat-square)](https://www.npmjs.org/package/gm-palette)

![orf](./sample-image.jpg)

[npm-url]: https://npmjs.org/package/gm-palette

## Getting started
First download and install [GraphicsMagick](http://www.graphicsmagick.org/). In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:

```bash
$ brew install graphicsmagick
```

then use npm to install the module:

```bash
$ npm install gm-palette
```
 

## Features

* Retrieve dominant color and palette.
* GIF format supported.
* Provide the count of palette colors to obtain.
* The input can be path to image, buffer or a readable stream


## Basic Usage

```js

const gmPalette = require('gm-palette')

//If callback is not provided, Promise is returned.
gmPalette.dominantColor('path/to/image.jpg', (error, data) => {
  if(error) console.log('Error', error)
  console.log('Result : ', data)

  //{ r: 54, g: 56, b: 62 }
})

//If callback is not provided, Promise is returned.
gmPalette.dominantColor('/path/to/animated.gif[0]', (error, data) => {
  if(error) console.log('Error', error)
  console.log('Result : ', data)

  //{ r: 54, g: 56, b: 62 }
})


const count = 10 // Required number of palette colors.
//If callback is not provided, Promise is returned.
gmPalette.palette('path/to/image.jpg', count,  (error, data) => { 
  // If count is not provided, a default value of 10 is taken.
  if(error) console.log('Error', error)
  console.log('Result : ', data)
  /*
  [ 
    { r: 28, g: 31, b: 38 },
    { r: 59, g: 61, b: 66 },
    { r: 62, g: 64, b: 69 },
    { r: 64, g: 63, b: 70 },
    { r: 65, g: 65, b: 63 },
    { r: 72, g: 72, b: 78 },
    { r: 122, g: 124, b: 130 },
    { r: 125, g: 128, b: 132 },
    { r: 155, g: 156, b: 159 },
    { r: 214, g: 215, b: 217 }
  ]
  */
})

gmPalette.palette('/path/to/animated.gif[0]', count,  (error, data) => { 
  // If count is not provided, a default value of 10 is taken.
  if(error) console.log('Error', error)
  console.log('Result : ', data)
  /*
  [ 
    { r: 28, g: 31, b: 38 },
    { r: 59, g: 61, b: 66 },
    { r: 62, g: 64, b: 69 },
    { r: 64, g: 63, b: 70 },
    { r: 65, g: 65, b: 63 },
    { r: 72, g: 72, b: 78 },
    { r: 122, g: 124, b: 130 },
    { r: 125, g: 128, b: 132 },
    { r: 155, g: 156, b: 159 },
    { r: 214, g: 215, b: 217 }
  ]
  */
})


```

## Buffer

```js

const gmPalette   = require('gm-palette'),
      imageBuffer = require('fs').readFileSync('/path/to/image.jpg'),
      count       = 10


//If callback is not provided, Promise is returned.
gmPalette.dominantColor(imageBuffer, (error, data) => {
  if(error) console.log('Error', error)
  console.log('Result : ', data)

  //{ r: 54, g: 56, b: 62 }
})

//If callback is not provided, Promise is returned.
gmPalette.palette(imageBuffer, count,  (error, data) => { 
  // If count is not provided, a default value of 10 is taken.
  if(error) console.log('Error', error)
  console.log('Result : ', data)
  /*
  [ 
    { r: 28, g: 31, b: 38 },
    { r: 59, g: 61, b: 66 },
    { r: 62, g: 64, b: 69 },
    { r: 64, g: 63, b: 70 },
    { r: 65, g: 65, b: 63 },
    { r: 72, g: 72, b: 78 },
    { r: 122, g: 124, b: 130 },
    { r: 125, g: 128, b: 132 },
    { r: 155, g: 156, b: 159 },
    { r: 214, g: 215, b: 217 }
  ]
  */
})


```

## Stream

```js

const gmPalette      = require('gm-palette'),
      readableStream = fs.createReadStream('/path/to/my/img.jpg'),
      count          = 10

//If callback is not provided, Promise is returned.
gmPalette.dominantColor(readableStream, (error, data) => {
  if(error) console.log('Error', error)
  console.log('Result : ', data)

  //{ r: 54, g: 56, b: 62 }
})

//If callback is not provided, Promise is returned.
gmPalette.palette(readableStream, count,  (error, data) => { 
  // If count is not provided, a default value of 10 is taken.
  if(error) console.log('Error', error)
  console.log('Result : ', data)
  /*
  [ 
    { r: 28, g: 31, b: 38 },
    { r: 59, g: 61, b: 66 },
    { r: 62, g: 64, b: 69 },
    { r: 64, g: 63, b: 70 },
    { r: 65, g: 65, b: 63 },
    { r: 72, g: 72, b: 78 },
    { r: 122, g: 124, b: 130 },
    { r: 125, g: 128, b: 132 },
    { r: 155, g: 156, b: 159 },
    { r: 214, g: 215, b: 217 }
  ]
  */
})


```
