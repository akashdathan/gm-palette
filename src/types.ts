/*------------------------------------------------------------------------------
   About      : Types Used
   
   Created on : Sat Jan 13 2018
   Author     : Akash Dathan
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/

export type rgb = {
  r : number
  g : number
  b : number
}

export type palette    = rgb[]
export type InputImage = NodeJS.ReadableStream | Buffer | string

export interface callback {
  (error: any, data: any): any
}

