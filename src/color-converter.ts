import { Rgb } from './types';

export class ColorConverter {
  private static componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  static rgbToHex(rgb: Rgb, withHash = true): string {
    return (withHash ? '#' : '') +
      ColorConverter.componentToHex(rgb.r) +
      ColorConverter.componentToHex(rgb.g) +
      ColorConverter.componentToHex(rgb.b);
  }

  static hexToRgb(hex: string): Rgb | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }
}
