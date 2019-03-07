# gm-palette
Dominant color and palette using graphicsmagick.

[![Build Status](https://travis-ci.com/Davide-Gheri/gm-palette.svg?branch=master)](https://travis-ci.com/Davide-Gheri/gm-palette)
[![Coverage Status](https://coveralls.io/repos/github/Davide-Gheri/gm-palette/badge.svg?branch=master)](https://coveralls.io/github/Davide-Gheri/gm-palette?branch=master)
[![npm version](https://badge.fury.io/js/%40davidegheri%2Fgm-palette.svg)](https://badge.fury.io/js/%40davidegheri%2Fgm-palette) 
[![NPM license](http://img.shields.io/npm/l/@davidegheri/gm-palette.svg?style=flat)](https://www.npmjs.org/package/@davidegheri/gm-palette) 
[![Greenkeeper badge](https://badges.greenkeeper.io/Davide-Gheri/gm-palette.svg)](https://greenkeeper.io/)

![orf](./samples/sample-image.jpg)

## Getting started
First download and install [GraphicsMagick](http://www.graphicsmagick.org/). In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:

```bash
$ brew install graphicsmagick
```

then use npm to install the module:

```bash
$ npm install @davidegheri/gm-palette
```
 

## Features

* Retrieve dominant color and palette.
* GIF format supported.
* Provide the count of palette colors to obtain.
* The input can be path to image, buffer or a readable stream
* CLI script

## Basic Usage

```js

const gmPalette = require('@davidegehri/gm-palette')

//If callback is not provided, Promise is returned.
gmPalette.dominantColor('path/to/image.jpg', (error, data) => {
  if (error) {
      console.log('Error', error);
  }
  console.log('Result: ', data);

  //{ r: 54, g: 56, b: 62 }
});

//If callback is not provided, Promise is returned.
gmPalette.dominantColor('/path/to/animated.gif[0]', (error, data) => {
  if (error) {
      console.log('Error', error);
  }
  console.log('Result: ', data);

  //{ r: 54, g: 56, b: 62 }
});


const count = 10; // Optional number of palette colors, default 5
//If callback is not provided, Promise is returned.
gmPalette.palette('path/to/image.jpg', count,  (error, data) => { 
  // If count is not provided, a default value of 10 is taken.
  if (error) {
      console.log('Error', error);
  }
  console.log('Result: ', data);
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
});

```

## Buffer

```js

const gmPalette = require('@davidegheri/gm-palette'),
      imageBuffer = require('fs').readFileSync('/path/to/image.jpg'),
      count = 10;


//If callback is not provided, Promise is returned.
gmPalette.dominantColor(imageBuffer, (error, data) => {
  if (error) {
      console.log('Error', error);
  }
  console.log('Result: ', data);

  //{ r: 54, g: 56, b: 62 }
});

//If callback is not provided, Promise is returned.
gmPalette.palette(imageBuffer, count,  (error, data) => { 
  if (error) {
      console.log('Error', error);
  }
  console.log('Result: ', data);
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

const gmPalette = require('@davidegheri/gm-palette'),
      readableStream = fs.createReadStream('/path/to/my/img.jpg');

//If callback is not provided, Promise is returned.
gmPalette.dominantColor(readableStream, (error, data) => {
  if (error) {
      console.log('Error', error);
  }
  console.log('Result : ', data);

  //{ r: 54, g: 56, b: 62 }
})

//If callback is not provided, Promise is returned.
gmPalette.palette(readableStream, (error, data) => {
  if (error) {
      console.log('Error', error);
  }
  console.log('Result : ', data);
  /*
  [ 
    { r: 28, g: 31, b: 38 },
    { r: 59, g: 61, b: 66 },
    { r: 62, g: 64, b: 69 },
    { r: 64, g: 63, b: 70 },
    { r: 65, g: 65, b: 63 },
  ]
  */
})

```

## GIF
You can get a base64 encoded string representing a 1x1px GIF filled with the dominant color
```js
const gmPalette = require('@davidegheri/gm-palette');

//If callback is not provided, Promise is returned.
gmPalette.dominantColorGIF('path/to/image.jpg', (error, data) => {
    if (error) {
        console.log('Error', error);
    }
    console.log('Result: ', data);
    
    // data:image/gif;base64,R0lGODlhAQABAIABAEMsZgAAACwAAAAAAQABAAACAkQBAA==
})
``` 

## Cli

**gm-palette** comes also with a handy Cli script:
```bash
$ npm i -g @davidegheri/gm-palette

$ gm-palette path/to/img.jpg

# [ 
#  { r: 28, g: 31, b: 38 },
#  { r: 59, g: 61, b: 66 },
#  { r: 62, g: 64, b: 69 },
#  { r: 64, g: 63, b: 70 },
#  #{ r: 65, g: 65, b: 63 },
# ]
```
To get the dominant color only:
```bash
$ gm-palette path/to/img.jpg --dominant
# or
$ gm-palette path/to/img.jpg -d

# { r: 54, g: 56, b: 62 }
```
To get the base64 encoded GIF:
```bash
$ gm-palette path/to/img.jpg --gif
# or
$ gm-palette path/to/img.jpg -g

# data:image/gif;base64,R0lGODlhAQABAIABAEMsZgAAACwAAAAAAQABAAACAkQBAA==
```
