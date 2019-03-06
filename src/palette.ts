/*------------------------------------------------------------------------------
   About      : Dominant color and palette using Imagemagick

   Created on : Sat Jan 13 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/

import { Rgb, InputImage, ColorPalette } from './types';
import stream from 'stream';
import gm from 'gm';

export class Palette {

  static async palette(image: InputImage, colorCount: number = 5): Promise<Rgb[]> {
    const palette = await Palette.getTopColors(image, colorCount);
    if (!palette) {
      throw new Error(`Palette: palette detection failed`);
    }
    return palette;
  }

  static async dominantColor(image: InputImage): Promise<Rgb> {
    const palette = await Palette.getTopColors(image, 1);
    if (!palette || !palette.length) {
      throw new Error(`Palette: palette detection failed`);
    }
    return palette[0];
  }

  private static async getTopColors(image: InputImage, colorCount: number): Promise<ColorPalette> {
    const HIST_START: string = 'comment={';
    const HIST_END: string = '\x0A}';

    const strData = await new Promise((resolve, reject) => {
      gm(image)
      .noProfile()
      .resize(250, 250)
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
      throw(new Error(`Palette: Image not found.`));
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
