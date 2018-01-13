import * as Types from './types';
export declare class Palette {
    static palette(image: Types.InputImage, colorCount?: number, callback?: Types.callback): Promise<Types.rgb[] | undefined>;
    static dominantColor(image: Types.InputImage, callback?: Types.callback): Promise<Types.rgb | undefined>;
    private static getTopColors(image, colorCount);
    private static parseHistogramLine(xs);
}
