import { GifGenerator } from '../gif-generator';
import * as path from 'path';
import * as fs from 'fs';

const sample1 = path.resolve(__dirname, '../../', 'samples', 'sample-image.jpg');
const sample2 = path.resolve(__dirname, '../../', 'samples', 'sample-6.jpg');

const hexRed = '#660d0d';
const redRgb = {r: 102, g: 13, b: 13};

describe('GifGenerator', () => {
  it('should use the filePath passed in the constructor', async () => {
    const result = await (new GifGenerator(sample1)).createGIF();
    expect(typeof result).toEqual('string');
  });

  it('should use the filePath passed in the createGIF method', async () => {
    const result = await (new GifGenerator(sample1)).createGIF(sample2);
    expect(typeof result).toEqual('string');
  });

  it('should use an hex color string as source', async () => {
    const result = await (new GifGenerator()).createGIF(hexRed);
    expect(typeof result).toEqual('string');
  });

  it('should use a Buffer as source', async () => {
    const buf = fs.readFileSync(sample1);
    const result = await (new GifGenerator()).createGIF(buf);
    expect(typeof result).toEqual('string');
  });

  it('should use a Stream as source', async () => {
    const stream = fs.createReadStream(sample1);
    const result = await (new GifGenerator()).createGIF(stream);
    expect(typeof result).toEqual('string');
  });

  it('should use an Rgb object as source', async () => {
    const result = await (new GifGenerator()).createGIF(redRgb);
    expect(typeof result).toEqual('string');
  });

  it('should throw if no source is passed', () => {
    expect((new GifGenerator()).createGIF()).rejects.toEqual(new Error(`GifGenerator: Failed to retrieve RGB object from source: null`));
  });
});
