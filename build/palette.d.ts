import * as Types from './types';
export declare class Palette {
    static palette(image: Types.InputImage, colorCount?: number, callback?: Types.callback): Promise<Types.palette | undefined>;
    static dominantColor(image: Types.InputImage, callback?: Types.callback): Promise<Types.rgb | undefined>;
    private static getTopColors;
    private static parseHistogramLine;
}
