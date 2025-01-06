import Util from './Util';

describe('Util class', () => {
    describe('sortByString', () => {
        test('sorts strings alphabetically', () => {
            const result = ['banana', 'apple', 'cherry'].sort(Util.sortByString);
            expect(result).toEqual(['apple', 'banana', 'cherry']);
        });
    });

    describe('sortByNumber', () => {
        test('sorts numbers in ascending order', () => {
            const result = [5, 2, 9, 1].sort(Util.sortByNumber);
            expect(result).toEqual([1, 2, 5, 9]);
        });

        test('works with negative numbers', () => {
            const result = [-10, 0, 5, -2].sort(Util.sortByNumber);
            expect(result).toEqual([-10, -2, 0, 5]);
        });
    });

    describe('sortByDate', () => {
        test('sorts dates in ascending order', () => {
            const date1 = new Date('2023-01-01');
            const date2 = new Date('2023-01-02');
            const date3 = new Date('2023-01-03');
            const result = [date3, date1, date2].sort(Util.sortByDate);
            expect(result).toEqual([date1, date2, date3]);
        });

        test('handles identical dates', () => {
            const date1 = new Date('2023-01-01');
            const date2 = new Date('2023-01-01');
            const result = [date2, date1].sort(Util.sortByDate);
            expect(result).toEqual([date1, date2]);
        });
    });
});
