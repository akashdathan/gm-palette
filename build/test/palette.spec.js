"use strict";
/*------------------------------------------------------------------------------
   About      : Spec File for Testing.
   
   Created on : Mon Jan 22 2018
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
const chai_1 = require("chai");
const index_1 = require("../index");
describe("Dominant Color", () => {
    describe("Success", () => {
        it("r, g, b to exist in the response", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.dominantColor('./sample-image.jpg');
            chai_1.expect(result).to.have.property('r');
            chai_1.expect(result).to.have.property('g');
            chai_1.expect(result).to.have.property('b');
        }));
    });
});
describe("Palette", () => {
    describe("Success", () => {
        it("Array of r, g, b to exist in the response", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.palette('./sample-image.jpg', 3);
            chai_1.expect(result.length).to.equal(3);
            for (const val of result) {
                chai_1.expect(val).to.have.property('r');
                chai_1.expect(val).to.have.property('g');
                chai_1.expect(val).to.have.property('b');
            }
        }));
    });
});
//# sourceMappingURL=palette.spec.js.map