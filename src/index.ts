import { Palette } from './palette';
import { Callback, InputImage, Rgb } from './types';
import { GifGenerator } from './gif-generator';
export { cli } from './cli';

export function dominantColor(image: InputImage, callback?: Callback): Promise<Rgb | void> {
  return Palette.dominantColor(image).then(value => {
    if (callback) {
      return callback(null, value);
    }
    return value;
  }).catch(err => {
    if (callback) {
      return callback(err, null);
    }
    throw err;
  });
}

export function palette(image: InputImage, colorOrCb?: number | Callback, callback?: Callback): Promise<Rgb[] | void> {
  const colorCount = typeof colorOrCb === 'number' ? colorOrCb : 5;
  return Palette.palette(image, colorCount).then(value => {
    if (callback) {
      return callback(null, value);
    }
    return value;
  }).catch(err => {
    if (callback) {
      return callback(err, null);
    }
    throw err;
  });
}

export async function dominantColorGIF(image: InputImage, callback?: Callback): Promise<string | void> {
  const rgb = await Palette.dominantColor(image);
  const GifGen = new GifGenerator(rgb);
  return GifGen.createGIF()
    .then(value => {
      if (callback) {
        return callback(null, value);
      }
      return value;
    }).catch(err => {
      if (callback) {
        return callback(err, null);
      }
      throw err;
  });
}
