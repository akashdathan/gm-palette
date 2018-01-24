/*------------------------------------------------------------------------------
   About      : Spec File for Testing.
   
   Created on : Mon Jan 22 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/


import {expect}                                  from 'chai'
import {
          dominantColor,
          palette
       }                                         from '../index'
import * as Types                                from '../types'
import * as path                                 from 'path'


describe("Dominant Color", () => {
  describe("Success", () => {
    it("r, g, b to exist in the response", async () => {
        const result = await dominantColor(path.join(__dirname, '../../sample-image.jpg')) as Types.rgb
        expect(result).to.have.property('r')
        expect(result).to.have.property('g')
        expect(result).to.have.property('b')
    })
  })
})

describe("Palette", () => {
  describe("Success", () => {
    it("Array of r, g, b to exist in the response", async () => {
      const result = await palette(path.join(__dirname, '../../sample-image.jpg'), 3) as Types.rgb[]

      expect(result.length).to.equal(3)

      for(const val of result) {
        expect(val).to.have.property('r')
        expect(val).to.have.property('g')
        expect(val).to.have.property('b')
      }
    })
  })
})


