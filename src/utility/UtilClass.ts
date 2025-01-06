export class UtilClass {
    static sortByString(a: string, b: string) {
        return a.localeCompare(b);
    }

    static sortByNumber(a: number, b: number) {
        return a - b;
    }

    static sortByDate(a: Date, b: Date) {
        return a.getTime() - b.getTime();
    }
}
