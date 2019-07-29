import commander from 'commander';
import { Palette } from './palette';
import { Rgb } from './types';
import { GifGenerator } from './gif-generator';

/* tslint:disable no-console */
export function runPalette(filePath: string, {dominant, colorCount}: {dominant?: boolean; colorCount?: number}): Promise<Rgb | Rgb[] | void> {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      return reject(new Error('File path is required'));
    }
    let promise: Promise<Rgb | Rgb[] | void>;
    if (dominant) {
      promise = Palette.dominantColor(filePath);
    } else {
      promise = Palette.palette(filePath, colorCount || 5);
    }
    promise
    .then(value => {
      console.log(value);
      resolve(value);
    }).catch(reject);
  });
}

export function runGif(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      return reject(new Error('File path is required'));
    }
    const GifGen = new GifGenerator();
    GifGen.createGIF(filePath)
    .then(value => {
      console.log(value);
      resolve(value);
    }).catch(reject);
  });
}

export function cli(argv: any): Promise<Rgb | Rgb[] | string | void> {
  let filePath: string = '';
  const program = new commander.Command('palette');
  program
  .arguments('<file>')
  .description('Output the image palette')
  .option('-d --dominant', 'Dominant color only')
  .option('-c --colorCount <c>', 'How many colors to output')
  .option('-g --gif', 'Output as Base64 GIF')
  .action((file: string) => {
    filePath = file;
  })
  .parse(argv);

  if (program.gif) {
    return runGif(filePath);
  }
  return runPalette(filePath, {
    dominant: program.dominant,
    colorCount: program.colorCount,
  });
}
