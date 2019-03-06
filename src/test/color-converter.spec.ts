import { ColorConverter } from '../color-converter';

describe('ColorConverter', () => {
  const whiteHexWoHas = 'ffffff';
  const whiteHex = '#ffffff';
  const shortWhiteHex = '#fff';
  const whiteRgb = {r: 255, g: 255, b: 255};

  const redHex = '#660d0d';
  const redRgb = {r: 102, g: 13, b: 13};

  describe('rgbToHex', () => {
    it('should return an hex color string from a passed Rgb object', () => {
      expect(ColorConverter.rgbToHex(whiteRgb)).toEqual(whiteHex);
      expect(ColorConverter.rgbToHex(redRgb)).toEqual(redHex);
    });

    it('should return an hex color string without the starting # from a passed Rgb object', () => {
      expect(ColorConverter.rgbToHex(whiteRgb, false)).toEqual(whiteHexWoHas);
    });
  });

  describe('hexToRgb', () => {
    it('should return an Rgb object from a hex color string', () => {
      expect(ColorConverter.hexToRgb(whiteHex)).toEqual(whiteRgb);
    });

    it('should return an Rgb object from a short hex color string', () => {
      expect(ColorConverter.hexToRgb(shortWhiteHex)).toEqual(whiteRgb);
    });

    it('should return null if the passed string is not a valid hex color string', () => {
      expect(ColorConverter.hexToRgb('notAColor')).toBeNull();
    });
  });
});
