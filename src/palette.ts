/*------------------------------------------------------------------------------
   About      : Dominant color and palette using Imagemagick

   Created on : Sat Jan 13 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/

import { Rgb, Callback, InputImage, ColorPalette } from './types';
import stream from 'stream';
import gm from 'gm';

export class Palette {

  static async palette(image: InputImage, colorOrCb?: number | Callback, callback?: Callback): Promise<Rgb[] | void> {
    const colorCount = typeof colorOrCb === 'number' ? colorOrCb : 5;
    let cb: Callback | undefined = callback;
    if (typeof colorOrCb === 'function') {
      cb = colorOrCb;
    }
    try {
      const palette = await Palette.getTopColors(image, colorCount);
      if (!palette) {
        throw new Error(`PALETTE_DETECTION_FAILED`);
      }

      if (cb) {
        cb(undefined, palette);
      } else {
        return palette;
      }
    } catch (error) {
      if (cb) {
        cb(error, undefined);
      } else {
        throw(error);
      }
    }
  }

  static async dominantColor(image: InputImage, callback?: Callback): Promise<Rgb | void> {
    try {
      const palette = await Palette.getTopColors(image, 1);
      if (!palette || !palette.length) {
        throw new Error(`PALETTE_DETECTION_FAILED`);
      }

      const dominantColor = palette[0];

      if (callback) {
        callback(undefined, dominantColor);
      } else {
        return dominantColor;
      }
    } catch (error) {
      if (callback) {
        callback(error, undefined);
      } else {
        throw(error);
      }
    }
  }

  private static async getTopColors(image: InputImage, colorCount: number): Promise<ColorPalette> {
    const HIST_START: string = 'comment={';
    const HIST_END: string = '\x0A}';

    const strData = await new Promise((resolve, reject) => {
      gm(image)
      .noProfile()
      .colors(colorCount)
      .stream('histogram', (error: any, stdout: any, stderr: any) => {
        if (error) {
          reject(error);
        }
        const writeStream = new stream.PassThrough();
        let stringData: string = '';

        writeStream.on('data', (data: any) => { stringData = stringData + data.toString(); });
        writeStream.on('end', () => { resolve(stringData); });
        writeStream.on('error', (err: any) => { reject(err); });
        stdout.pipe(writeStream);
      });
    }) as string;

    const beginIndex: number = strData.indexOf(HIST_START) + HIST_START.length + 1;
    const endIndex: number = strData.indexOf(HIST_END);
    const cData: string[] = strData.slice(beginIndex, endIndex).split('\n');

    if (cData.length > 8) {
      cData.splice(0, cData.length - 8);
    }
    if (beginIndex === -1 || endIndex === -1) {
      throw(new Error(`PALETTE_DETECTION_FAILED: Image not found.`));
    }

    return cData.map(Palette.parseHistogramLine).filter(Boolean) as Rgb[];
  }

  private static parseHistogramLine(xs: any): Rgb | undefined {
    xs = xs.trim().split(':');
    if (xs.length !== 2) {
      return;
    }

    const colors = xs[1].split('(')[1].split(')')[0].split(',');

    if (!colors || !Array.isArray(colors) || colors.length < 3) {
      return;
    }

    return {
      r : Number(colors[0]),
      g : Number(colors[1]),
      b : Number(colors[2]),
    };
  }
}
