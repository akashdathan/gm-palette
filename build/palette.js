"use strict";
/*------------------------------------------------------------------------------
   About      : Dominant color and palette using Imagemagick
   
   Created on : Sat Jan 13 2018
   Author     : Akash Dathan
------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream = require("stream");
const gm = require("gm");
const lo = require("lodash");
class Palette {
    static palette(image, colorCount, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palette = yield Palette.getTopColors(image, colorCount || 10);
                if (callback)
                    callback(undefined, palette);
                else
                    return palette;
            }
            catch (error) {
                if (callback)
                    callback(error, undefined);
                else
                    throw (error);
            }
        });
    }
    static dominantColor(image, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palette = yield Palette.getTopColors(image, 1), dominantColor = palette[0];
                if (callback)
                    callback(undefined, dominantColor);
                else
                    return dominantColor;
            }
            catch (error) {
                if (callback)
                    callback(error, undefined);
                else
                    throw (error);
            }
        });
    }
    static getTopColors(image, colorCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const HIST_START = 'comment={', HIST_END = '\x0A}\x0A\x0C\x0A';
            const strData = yield new Promise((resolve, reject) => {
                gm(image)
                    .noProfile()
                    .colors(colorCount)
                    .stream('histogram', (error, stdout, stderr) => {
                    if (error)
                        reject(error);
                    const writeStream = new stream.PassThrough();
                    let strData = '';
                    writeStream.on('data', (data) => { strData = strData + data.toString(); });
                    writeStream.on('end', () => { resolve(strData); });
                    writeStream.on('error', (error) => { reject(error); });
                    stdout.pipe(writeStream);
                });
            });
            const beginIndex = strData.indexOf(HIST_START) + HIST_START.length + 1, endIndex = strData.indexOf(HIST_END), cData = strData.slice(beginIndex, endIndex).split('\n');
            if (beginIndex === -1 || endIndex === -1)
                throw (new Error(`PALETTE_DETECTION_FAILED: Image not found.`));
            return lo.compact(lo.map(cData, Palette.parseHistogramLine));
        });
    }
    static parseHistogramLine(xs) {
        xs = xs.trim().split(':');
        if (xs.length !== 2)
            return;
        const colors = xs[1].split('(')[1].split(')')[0].split(',');
        if (!colors || !Array.isArray(colors))
            return;
        return {
            r: Number(colors[0]),
            g: Number(colors[1]),
            b: Number(colors[2])
        };
    }
}
exports.Palette = Palette;
//# sourceMappingURL=palette.js.map