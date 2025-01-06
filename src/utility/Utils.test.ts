import '@testing-library/jest-dom';
import { UtilClass } from './UtilClass';



describe('Utils class', () => {
    describe('sortByString', () => {
        it('should sort strings alphabetically', () => {
            const strings = ['banana', 'apple', 'cherry'];
            const sorted = [...strings].sort(UtilClass.sortByString);
            expect(sorted).toEqual(['apple', 'banana', 'cherry']);
        });

        it('should handle identical strings', () => {
            const strings = ['test', 'test'];
            const sorted = [...strings].sort(UtilClass.sortByString);
            expect(sorted).toEqual(['test', 'test']);
        });
    });

    describe('sortByNumber', () => {
        it('should sort numbers in ascending order', () => {
            const numbers = [3, 1, 2];
            const sorted = [...numbers].sort(UtilClass.sortByNumber);
            expect(sorted).toEqual([1, 2, 3]);
        });

        it('should handle identical numbers', () => {
            const numbers = [5, 5, 5];
            const sorted = [...numbers].sort(UtilClass.sortByNumber);
            expect(sorted).toEqual([5, 5, 5]);
        });
    });

    describe('sortByDate', () => {
        it('should sort dates in ascending order', () => {
            const date1 = new Date('2023-01-01');
            const date2 = new Date('2023-02-01');
            const date3 = new Date('2022-12-01');
            const dates = [date1, date2, date3];
            const sorted = [...dates].sort(UtilClass.sortByDate);
            expect(sorted).toEqual([date3, date1, date2]);
        });

        it('should handle identical dates', () => {
            const date1 = new Date('2023-03-01');
            const date2 = new Date('2023-03-01');
            const dates = [date1, date2];
            const sorted = [...dates].sort(UtilClass.sortByDate);
            expect(sorted).toEqual([date1, date2]);
        });
    });
});
export {};