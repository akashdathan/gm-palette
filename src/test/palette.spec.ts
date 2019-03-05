/*------------------------------------------------------------------------------
   About      : Spec File for Testing.

   Created on : Mon Jan 22 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/

import { expect } from 'chai';
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
        expect(result1).to.have.property('r');
        expect(result1).to.have.property('g');
        expect(result1).to.have.property('b');

        const result2 = await dominantColor(sample2) as Types.Rgb;
        expect(result2).to.have.property('r');
        expect(result2).to.have.property('g');
        expect(result2).to.have.property('b');

        expect(result2.r).to.not.be.NaN;
        expect(result2.g).to.not.be.NaN;
        expect(result2.b).to.not.be.NaN;
    });
  });
});

describe('Palette', () => {
  describe('Success', () => {
    it('Array of r, g, b to exist in the response', async () => {
      const result1 = await palette(sample1, 3) as Types.Rgb[];

      expect(result1.length).to.equal(3);

      for (const val of result1) {
        expect(val).to.have.property('r');
        expect(val).to.have.property('g');
        expect(val).to.have.property('b');
      }

      const result2 = await palette(sample2, 3) as Types.Rgb[];

      expect(result2.length).to.equal(3);

      for (const val of result2) {
        expect(val).to.have.property('r');
        expect(val).to.have.property('g');
        expect(val).to.have.property('b');

        expect(val.r).to.not.be.NaN;
        expect(val.g).to.not.be.NaN;
        expect(val.b).to.not.be.NaN;
      }
    });
  });
});
