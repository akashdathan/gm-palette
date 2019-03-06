import * as runner from '../cli';
import * as path from 'path';
import * as Types from '../types';

const sample = path.resolve(__dirname, '../../', 'samples', 'sample-image.jpg');
const encoded = 'data:image/gif;base64,R0lGODlhAQABAIABAEMsZgAAACwAAAAAAQABAAACAkQBAA==';

describe('runPalette', () => {
  let logSpy: any;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
  });
  it('should return an Array of Rgb objects and log it', async () => {
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

  it('should return an Rgb object and log it', async () => {
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

describe('runGif', () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
  });
  it('should return a base64 string representing the 1x1px GIF and log it', async () => {
    const result = await runner.runGif(sample);
    expect(result).toEqual(encoded);
    expect(logSpy).toHaveBeenCalledWith(result);
  });

  it('should throw an error on file path not passed', () => {
    expect(runner.runGif('')).rejects.toEqual(new Error('File path is required'));
  });
});

describe('Cli', () => {
  const argv = [
    '',
    '',
    sample,
  ];

  it('should return an Array of Rgb objects', async () => {
    const result = await runner.cli(argv) as Types.Rgb[];
    for (const val of result) {
      expect(val).toHaveProperty('r');
      expect(val).toHaveProperty('g');
      expect(val).toHaveProperty('b');
    }
  });

  it('should return an Rgb object', async () => {
    const dominantArgv = [
      ...argv,
      '-d',
    ];
    const result = await runner.cli(dominantArgv) as Types.Rgb;
    expect(result).toHaveProperty('r');
    expect(result).toHaveProperty('g');
    expect(result).toHaveProperty('b');
  });

  it('should return a base64 string representing the 1x1px GIF', async () => {
    const gifArgv = [
      ...argv,
      '-g',
    ];
    const result = await runner.cli(gifArgv) as string;
    expect(result).toEqual(encoded);
  });
});
