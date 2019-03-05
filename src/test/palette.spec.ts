/*------------------------------------------------------------------------------
   About      : Spec File for Testing.

   Created on : Mon Jan 22 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/

import {
  dominantColor,
  palette,
} from '../index';
import * as Types from '../types';
import * as path from 'path';

const sample1 = path.join(__dirname, '../../', 'sample-image.jpg');
const sample2 = path.join(__dirname, '../../', 'sample-6.jpg');

/* tslint:disable no-unused-expression */
describe('Dominant Color', () => {
  describe('Success', () => {
    it('r, g, b to exist in the response', async () => {
        const result1 = await dominantColor(sample1) as Types.Rgb;
        expect(result1).toHaveProperty('r');
        expect(result1).toHaveProperty('g');
        expect(result1).toHaveProperty('b');

        const result2 = await dominantColor(sample2) as Types.Rgb;
        expect(result2).toHaveProperty('r');
        expect(result2).toHaveProperty('g');
        expect(result2).toHaveProperty('b');

        expect(result2.r).not.toBeNaN();
        expect(result2.g).not.toBeNaN();
        expect(result2.b).not.toBeNaN();
    });

    it('should call the callback as second argument', (done) => {
      dominantColor(sample1, (err, result) => {
        expect(result).toHaveProperty('r');
        expect(result).toHaveProperty('g');
        expect(result).toHaveProperty('b');
        done();
      });
    });
  });
});

describe('Palette', () => {
  describe('Success', () => {
    it('Array of r, g, b to exist in the response', async () => {
      const result1 = await palette(sample1, 3) as Types.Rgb[];

      expect(result1.length).toEqual(3);

      for (const val of result1) {
        expect(val).toHaveProperty('r');
        expect(val).toHaveProperty('g');
        expect(val).toHaveProperty('b');
      }

      const result2 = await palette(sample2, 3) as Types.Rgb[];

      expect(result2.length).toEqual(3);

      for (const val of result2) {
        expect(val).toHaveProperty('r');
        expect(val).toHaveProperty('g');
        expect(val).toHaveProperty('b');

        expect(val.r).not.toBeNaN();
        expect(val.g).not.toBeNaN();
        expect(val.b).not.toBeNaN();
      }
    });

    it('should use default colorCount value if second argument is not provided', async () => {
      const result = await palette(sample1) as Types.Rgb[];
      expect(result.length).toEqual(5);
    });

    it('should call the callback as second argument', (done) => {
      palette(sample1, (err, result) => {
        expect(result.length).toEqual(5);
        done();
      });
    });

    it('should call the callback as third argument', (done) => {
      palette(sample1, 3, (err, result) => {
        expect(result.length).toEqual(3);
        done();
      });
    });
  });
});
