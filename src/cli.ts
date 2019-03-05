import commander from 'commander';
import { Palette } from './palette';
import { Rgb } from './types';

/* tslint:disable no-console */
export function cli(argv: any) {
  return new Promise((resolve, reject) => {
    let filePath: string = '';
    const program = new commander.Command('palette');
    program
    .arguments('<file>')
    .description('Output the image palette')
    .option('-d --dominant', 'Dominant color only')
    .option('-c --colorCount', 'How many colors to output')
    .action((file: string) => {
      filePath = file;
    })
    .parse(argv);

    if (!filePath) {
      return reject(new Error('File path is required'));
    }
    let promise: Promise<Rgb | Rgb[] | undefined>;

    if (program.dominant) {
      promise = Palette.dominantColor(filePath);
    } else {
      const colorCount = program.colorCount || null;
      promise = Palette.palette(filePath, colorCount);
    }
    return promise.then(value => {
      console.log(value);
      resolve(value);
    }).catch(reject);
  });
}
