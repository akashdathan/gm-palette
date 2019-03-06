import { GifGenerator } from '../gif-generator';
import * as path from 'path';
import * as fs from 'fs';

const sample1 = path.resolve(__dirname, '../../', 'samples', 'sample-image.jpg');
const encoded1 = 'data:image/gif;base64,R0lGODlhAQABAIABAEMsZgAAACwAAAAAAQABAAACAkQBAA==';

const sample2 = path.resolve(__dirname, '../../', 'samples', 'sample-6.jpg');
const encoded2 = 'data:image/gif;base64,R0lGODlhAQABAIABAJCLcQAAACwAAAAAAQABAAACAkQBAA==';

const hexWhite = '#ffffff';
const whiteRgb = {r: 255, g: 255, b: 255};
const encodedWhite = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBAA==';

const hexRed = '#660d0d';
const redRgb = {r: 102, g: 13, b: 13};
const encodedRed = 'data:image/gif;base64,R0lGODlhAQABAIABAGYNDQAAACwAAAAAAQABAAACAkQBAA==';

describe('GifGenerator', () => {
  it('should use the filePath passed in the constructor', async () => {
    const result = await (new GifGenerator(sample1)).createGIF();
    expect(result).toEqual(encoded1);
  });

  it('should use the filePath passed in the createGIF method', async () => {
    const result = await (new GifGenerator(sample1)).createGIF(sample2);
    expect(result).toEqual(encoded2);
  });

  it('should use an hex color string as source', async () => {
    const result1 = await (new GifGenerator()).createGIF(hexRed);
    expect(result1).toEqual(encodedRed);

    const result2 = await (new GifGenerator()).createGIF(hexWhite);
    expect(result2).toEqual(encodedWhite);
  });

  it('should use a Buffer as source', async () => {
    const buf = fs.readFileSync(sample1);
    const result = await (new GifGenerator()).createGIF(buf);
    expect(result).toEqual(encoded1);
  });

  it('should use a Stream as source', async () => {
    const stream = fs.createReadStream(sample1);
    const result = await (new GifGenerator()).createGIF(stream);
    expect(result).toEqual(encoded1);
  });

  it('should use an Rgb object as source', async () => {
    const result1 = await (new GifGenerator()).createGIF(redRgb);
    expect(result1).toEqual(encodedRed);

    const result2 = await (new GifGenerator()).createGIF(whiteRgb);
    expect(result2).toEqual(encodedWhite);
  });

  it('should throw if no source is passed', () => {
    expect((new GifGenerator()).createGIF()).rejects.toEqual(new Error(`GifGenerator: Failed to retrieve RGB object from source: null`));
  });
});
