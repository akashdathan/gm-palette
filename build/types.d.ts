/// <reference types="node" />
export declare type rgb = {
    r: number;
    g: number;
    b: number;
};
export declare type palette = rgb[];
export declare type InputImage = NodeJS.ReadableStream | Buffer | string;
export interface callback {
    (error: any, data: any): any;
}
