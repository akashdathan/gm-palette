export type rgb = {
  r : number
  g : number
  b : number
}

export type palette = rgb[]
export type InputImage = NodeJS.ReadableStream | Buffer | string

export interface callback {
  (error: any, data?: any): any
}

