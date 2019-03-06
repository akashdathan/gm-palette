import * as runner from '../cli';
import * as path from 'path';
import * as Types from '../types';

const sample = path.resolve(__dirname, '../../', 'samples', 'sample-image.jpg');

describe('runPalette', () => {
  let logSpy: any;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
  });
  it('Array of r, g, b to exist in the response', async () => {
    const result = await runner.runPalette(sample, {}) as Types.Rgb[];
    for (const val of result) {
      expect(val).toHaveProperty('r');
      expect(val).toHaveProperty('g');
      expect(val).toHaveProperty('b');
    }
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it('should use the passed colorCount', async () => {
    const result = await runner.runPalette(sample, {colorCount: 3}) as Types.Rgb[];
    expect(result.length).toEqual(3);
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it('r, g, b to exist in the response', async () => {
    const result = await runner.runPalette(sample, {dominant: true}) as Types.Rgb;
    expect(result).toHaveProperty('r');
    expect(result).toHaveProperty('g');
    expect(result).toHaveProperty('b');
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it('should throw an error if no filePath is provided', () => {
    expect(runner.runPalette('', {})).rejects.toEqual(new Error('File path is required'));
  });
});

describe('Cli', () => {
  const argv = [
    '',
    '',
    sample,
  ];

  let runSpy: any;

  beforeEach(() => {
    runSpy = jest.spyOn(runner, 'runPalette');
  });

  it('Array of r, g, b to exist in the response', async () => {
    const result = await runner.cli(argv) as Types.Rgb[];
    for (const val of result) {
      expect(val).toHaveProperty('r');
      expect(val).toHaveProperty('g');
      expect(val).toHaveProperty('b');
    }
  });
});
