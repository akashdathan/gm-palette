/*------------------------------------------------------------------------------
   About      : Types Used

   Created on : Sat Jan 13 2018
   Author     : Akash Dathan

   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export type ColorPalette = Rgb[];
export type InputImage = NodeJS.ReadableStream | Buffer | string;

export type Callback = (error: any, data: any) => void;
