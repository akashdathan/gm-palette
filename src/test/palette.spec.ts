import * as Types from '../types';
import * as path from 'path';
import { Palette } from '../palette';

const sample = path.join(__dirname, '../../', 'samples', 'sample-6.jpg');
const notAFile = 'notAFile.jpg';

/* tslint:disable no-unused-expression */
describe('Dominant Color', () => {
  it('should return a Promise with an Rgb object', async () => {
    const result = await Palette.dominantColor(sample) as Types.Rgb;
    expect(result).toHaveProperty('r');
    expect(result).toHaveProperty('g');
    expect(result).toHaveProperty('b');

    expect(result.r).not.toBeNaN();
    expect(result.g).not.toBeNaN();
    expect(result.b).not.toBeNaN();
  });

  it('should throw an error on file not found', () => {
    expect(Palette.dominantColor(notAFile)).rejects.toEqual(new Error('Palette: Image not found.'));
  });
});

describe('Palette', () => {
  it('should return a Promise with an Array of Rgb objects', async () => {
    const result = await Palette.palette(sample, 3) as Types.Rgb[];
    expect(result.length).toEqual(3);
    for (const val of result) {
      expect(val).toHaveProperty('r');
      expect(val).toHaveProperty('g');
      expect(val).toHaveProperty('b');
    }
  });

  it('should use the default colorCount if none is passed', async () => {
    const result = await Palette.palette(sample) as Types.Rgb[];
    expect(result.length).toEqual(5);
  });

  it('should throw an error on file not found', () => {
    expect(Palette.palette(notAFile)).rejects.toEqual(new Error('Palette: Image not found.'));
  });
});
