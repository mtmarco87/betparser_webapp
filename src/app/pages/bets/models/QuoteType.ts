export class QuoteType {
    static type1: string = '1';
    static typeX: string = 'X';
    static type2: string = '2';
    static type1X: string = '1X';
    static type2X: string = '2X';
    static type12: string = '12';
    static typeGoal: string = 'Goal';
    static typeNoGoal: string = 'No Goal';
    static typeU05: string = 'Under 0.5';
    static typeO05: string = 'Over 0.5';
    static typeU15: string = 'Under 1.5';
    static typeO15: string = 'Over 1.5';
    static typeU25: string = 'Under 2.5';
    static typeO25: string = 'Over 2.5';
    static typeU35: string = 'Under 3.5';
    static typeO35: string = 'Over 3.5';
    static typeU45: string = 'Under 4.5';
    static typeO45: string = 'Over 4.5';

    static isValid(type: string) {
        for (const key in QuoteType) {
            if (type === QuoteType[key]) {
                return true;
            }
        }

        return false;
    }
}