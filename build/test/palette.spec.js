"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const path = require("path");
describe("Tests", () => {
    it("r, g, b to exist in the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.dominantColor)(path.join(__dirname, '../../sample-image.jpg'));
        expect(result).toHaveProperty('r');
        expect(result).toHaveProperty('g');
        expect(result).toHaveProperty('b');
    }));
    it("Array of r, g, b to exist in the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.palette)(path.join(__dirname, '../../sample-image.jpg'), 3);
        console.info(path.join(__dirname, './sample-image.jpg'));
        expect(result === null || result === void 0 ? void 0 : result.length).toEqual(3);
        for (const val of result || []) {
            expect(val).toHaveProperty('r');
            expect(val).toHaveProperty('g');
            expect(val).toHaveProperty('b');
        }
    }));
});
//# sourceMappingURL=palette.spec.js.map