import {
  dominantColorGIF,
  dominantColor,
  palette,
} from '../api';
import * as PaletteM from '../palette';
import * as GifGeneratorM from '../gif-generator';
import * as path from 'path';

jest.mock('../palette', () => ({
  __esModule: true,
  Palette: {
    palette: jest.fn((src: string) => Promise.resolve(src)),
    dominantColor: jest.fn((src: string) => Promise.resolve(src)),
  },
}));

const mockCreateGIF = jest.fn(() => Promise.resolve());

jest.mock('../gif-generator', () => ({
  __esModule: true,
  GifGenerator: jest.fn().mockImplementation(() => ({
    createGIF: mockCreateGIF,
  })),
}));

const source = path.join(__dirname, '../../', 'sources/sample-image.jpg');

describe('palette', () => {
  it('should call Palette.palette', async () => {
    await palette(source, 10);
    expect(PaletteM.Palette.palette).toHaveBeenCalledWith(source, 10);
  });

  it('should call Palette.palette wth default colorCount', async () => {
    await palette(source);
    expect(PaletteM.Palette.palette).toHaveBeenCalledWith(source, 5);
  });

  it('should call the callback as second argument', (done) => {
    palette(source, (err, value) => {
      expect(PaletteM.Palette.palette).toHaveBeenCalledWith(source, 5);
      done();
    });
  });

  it('should call the callback as third argument', (done) => {
    palette(source, 10, (err, value) => {
      expect(PaletteM.Palette.palette).toHaveBeenCalledWith(source, 10);
      done();
    });
  });

  it('should throw on rejection', () => {
    (PaletteM.Palette.palette as any).mockImplementationOnce(() => Promise.reject(new Error('Mock error')));

    return expect(palette(source)).rejects.toEqual(new Error('Mock error'));
  });

  it('should call the callback with the error on rejection', (done) => {
    (PaletteM.Palette.palette as any).mockImplementationOnce(() => Promise.reject(new Error('Mock error')));
    palette(source, (err, value) => {
      expect(err).toEqual(new Error('Mock error'));
      done();
    });
  });
});

describe('dominantColor', () => {
  it('should call Palette.dominantColor', async () => {
    await dominantColor(source);
    expect(PaletteM.Palette.dominantColor).toHaveBeenCalledWith(source);
  });

  it('should call the callback', (done) => {
    dominantColor(source, (err, value) => {
      expect(PaletteM.Palette.dominantColor).toHaveBeenCalledWith(source);
      done();
    });
  });

  it('should throw on rejection', () => {
    (PaletteM.Palette.dominantColor as any).mockImplementationOnce(() => Promise.reject(new Error('Mock error')));

    return expect(dominantColor(source)).rejects.toEqual(new Error('Mock error'));
  });

  it('should call the callback with the error on rejection', (done) => {
    (PaletteM.Palette.dominantColor as any).mockImplementationOnce(() => Promise.reject(new Error('Mock error')));
    dominantColor(source, (err, value) => {
      expect(err).toEqual(new Error('Mock error'));
      done();
    });
  });
});

describe('dominantColorGIF', () => {
  it('should instantiate GifGenerator and call GifGenerator.createGIF', async () => {
    await dominantColorGIF(source);
    expect(GifGeneratorM.GifGenerator).toHaveBeenCalledWith(source);
    expect(mockCreateGIF).toHaveBeenCalled();
  });

  it('should call the callback', (done) => {
    dominantColorGIF(source, (err, value) => {
      expect(GifGeneratorM.GifGenerator).toHaveBeenCalledWith(source);
      expect(mockCreateGIF).toHaveBeenCalled();
      done();
    });
  });

  it('should throw on rejection', () => {
    mockCreateGIF.mockImplementationOnce(() => Promise.reject(new Error('Mock error')));
    return expect(dominantColorGIF(source)).rejects.toEqual(new Error('Mock error'));
  });

  it('should call the callback with the error on rejection ', (done) => {
    mockCreateGIF.mockImplementationOnce(() => Promise.reject(new Error('Mock error')));
    dominantColorGIF(source, (err, value) => {
      expect(err).toEqual(new Error('Mock error'));
      done();
    });
  });
});
