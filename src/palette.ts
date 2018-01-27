/*------------------------------------------------------------------------------
   About      : Dominant color and palette using Imagemagick
   
   Created on : Sat Jan 13 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/

import * as Types                                from './types'
import * as stream                               from 'stream'
import * as gm                                   from 'gm'
import * as lo                                   from 'lodash'

export class Palette {

  static async palette(image : Types.InputImage, colorCount ?: number, callback ?: Types.callback) {
    try {
      const palette = await Palette.getTopColors(image, colorCount || 10)
      if(!palette) throw(new Error(`PALETTE_DETECTION_FAILED`))

      if(callback) callback(undefined, palette)
      else return palette
    } catch(error) {
      if(callback) callback(error, undefined)
      else throw(error)
    }
  }

  static async dominantColor(image : Types.InputImage, callback ?: Types.callback) {
    try {
      const palette = await Palette.getTopColors(image, 1)
      if(!palette || !palette.length) throw(new Error(`PALETTE_DETECTION_FAILED`))

      const dominantColor = palette[0]
        
      if(callback) callback(undefined, dominantColor)
      else return dominantColor
    } catch(error) {
      if(callback) callback(error, undefined)
      else throw(error)
    }
  }

  private static async getTopColors(image : Types.InputImage, colorCount : number) : Promise<Types.palette> {
    const HIST_START = 'comment={',
          HIST_END   = '\x0A}'

    const strData = await new Promise((resolve, reject) => {
      gm(image)
      .noProfile()
      .colors(colorCount)
      .stream('histogram', (error : any, stdout : any, stderr : any) => {
        if(error) reject(error)
        const writeStream = new stream.PassThrough()
        let   strData     = ''
        
        writeStream.on('data', (data: any) => {strData = strData + data.toString()})
        writeStream.on('end', () => {resolve (strData)})
        writeStream.on('error', (error: any) => {reject(error)})
        stdout.pipe(writeStream)
      }) 
    }) as string
    
    const beginIndex = strData.indexOf(HIST_START) + HIST_START.length + 1,
          endIndex   = strData.indexOf(HIST_END),
          cData      = strData.slice(beginIndex, endIndex).split('\n')
  
    if(cData.length > 8) cData.splice(0, cData.length - 8)
    if(beginIndex === -1 || endIndex === -1) throw(new Error(`PALETTE_DETECTION_FAILED: Image not found.`))

    return lo.compact(lo.map(cData, Palette.parseHistogramLine))
  }

  private static parseHistogramLine(xs : any) : Types.rgb | undefined { 
    xs = xs.trim().split(':')
    if(xs.length !== 2) return
  
    const colors = xs[1].split('(')[1].split(')')[0].split(',')

    if(!colors || !Array.isArray(colors)) return

    return {
      r : Number(colors[0]),
      g : Number(colors[1]),
      b : Number(colors[2])
    }
  }
}