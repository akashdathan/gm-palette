import { runPalette } from '../cli';
import * as path from 'path';
import * as Types from '../types';

const sample = path.resolve(__dirname, '../../', 'samples', 'sample-image.jpg');

describe('Cli', () => {
  let logSpy: any;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
  });
  it('Array of r, g, b to exist in the response', async () => {
    const result = await runPalette(sample, {}) as Types.Rgb[];
    for (const val of result) {
      expect(val).toHaveProperty('r');
      expect(val).toHaveProperty('g');
      expect(val).toHaveProperty('b');
    }
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it('should use the passed colorCount', async () => {
    const result = await runPalette(sample, {colorCount: 3}) as Types.Rgb[];
    expect(result.length).toEqual(3);
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it('r, g, b to exist in the response', async () => {
    const result = await runPalette(sample, {dominant: true}) as Types.Rgb;
    expect(result).toHaveProperty('r');
    expect(result).toHaveProperty('g');
    expect(result).toHaveProperty('b');
    expect(logSpy).toHaveBeenCalledWith(result);
  });
});
