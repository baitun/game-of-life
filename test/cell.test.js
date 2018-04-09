const Cell = require('../lib/cell');

describe('Cell', () => {
    describe('constructor', () => {
        test('creates a new cell at specified location', () => {
            let cell = new Cell(1, 1);

            expect(cell._row).toBe(1);
            expect(cell._col).toBe(1);
        });

        test('creates a live cell', () => {
            let cell = new Cell(1, 1, true);

            expect(cell._alive).toBe(true);
        });

        test('uses the default value `false` for `alive` property', () => {
            let cell = new Cell(1, 1);

            expect(cell._alive).toBe(false);
        });
    });

    describe('isAlive', () => {
        test('returns the value of `_alive`', () => {
            let liveCell = new Cell(1, 1, true);
            let deadCell = new Cell(1, 1, false);

            expect(liveCell.isAlive).toBe(true);
            expect(deadCell.isAlive).toBe(false);
        });
    });
});