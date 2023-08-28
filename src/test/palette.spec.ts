import { dominantColor, palette } from '../index'
import * as path from 'path'


describe("Tests", () => {
    it("r, g, b to exist in the response", async () => {
        const result = await dominantColor(path.join(__dirname, '../../sample-image.jpg'))

        expect(result).toHaveProperty('r')
        expect(result).toHaveProperty('g')
        expect(result).toHaveProperty('b')
    })

    it("Array of r, g, b to exist in the response", async () => {
        const result = await palette(path.join(__dirname, '../../sample-image.jpg'), 3)

        console.info(path.join(__dirname, './sample-image.jpg'))

        expect(result?.length).toEqual(3)

        for(const val of result || []) {
            expect(val).toHaveProperty('r')
            expect(val).toHaveProperty('g')
            expect(val).toHaveProperty('b')
        }
    })
})


