import { InputImage, Rgb } from './types';
import { Palette } from './palette';
import { Stream } from 'stream';
import { ColorConverter } from './color-converter';

export class GifGenerator {
  protected base64Prefix = 'data:image/gif;base64,';
  protected header = Buffer.from('474946383961', 'hex');
  protected logicalScreenDescriptor = Buffer.from('01000100800100', 'hex');
  protected imageDescriptor = Buffer.from('2c000000000100010000', 'hex');
  protected imageData = Buffer.from('0202440100', 'hex');
  protected trailer = '3b';

  constructor(
    protected source?: InputImage | Rgb,
  ) {}

  async createGIF(src?: InputImage | Rgb): Promise<any> {
    const source = src || this.source;
    let rgbObj: Rgb;
    if (typeof source === 'string' && source.indexOf('#') === 0) {
      rgbObj = ColorConverter.hexToRgb(source) as Rgb;
    } else if (source instanceof Stream || Buffer.isBuffer(source) || typeof source === 'string') {
      rgbObj = await Palette.dominantColor(source as InputImage);
    } else {
      rgbObj = source as Rgb;
    }
    if (!rgbObj) {
      throw new Error(`GifGenerator: Failed to retrieve RGB object from source: ${source ? source.toString() : null}`);
    }

    return this.generateBase64String(rgbObj);
  }

  private generateBase64String(rgbObj: Rgb): string {
    const gif = [
      this.header,
      this.logicalScreenDescriptor,
      Buffer.from([rgbObj.r, rgbObj.g, rgbObj.b]),
      Buffer.from([0, 0, 0]),
      this.imageDescriptor,
      this.imageData,
    ];
    return `${this.base64Prefix}${Buffer.concat(gif).toString('base64')}`;
  }

}
