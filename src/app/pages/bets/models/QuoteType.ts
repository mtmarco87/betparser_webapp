import { KeyValue } from '@angular/common';

export class QuoteType {
    DbKey: string;
    Name: string;

    static type1: QuoteType = new QuoteType('Quote1', '1');
    static typeX: QuoteType = new QuoteType('QuoteX', 'X');
    static type2: QuoteType = new QuoteType('Quote2', '2');
    static type1X: QuoteType = new QuoteType('Quote1X', '1X');
    static type2X: QuoteType = new QuoteType('Quote2X', '2X');
    static type12: QuoteType = new QuoteType('Quote12', '12');
    static typeGoal: QuoteType = new QuoteType('QuoteGoal', 'Goal');
    static typeNoGoal: QuoteType = new QuoteType('QuoteNoGoal', 'No Goal');
    static typeU05: QuoteType = new QuoteType('QuoteU05', 'Under 0.5');
    static typeO05: QuoteType = new QuoteType('QuoteO05', 'Over 0.5');
    static typeU15: QuoteType = new QuoteType('QuoteU15', 'Under 1.5');
    static typeO15: QuoteType = new QuoteType('QuoteO15', 'Over 1.5');
    static typeU25: QuoteType = new QuoteType('QuoteU25', 'Under 2.5');
    static typeO25: QuoteType = new QuoteType('QuoteO25', 'Over 2.5');
    static typeU35: QuoteType = new QuoteType('QuoteU35', 'Under 3.5');
    static typeO35: QuoteType = new QuoteType('QuoteO35', 'Over 3.5');
    static typeU45: QuoteType = new QuoteType('QuoteU45', 'Under 4.5');
    static typeO45: QuoteType = new QuoteType('QuoteO45', 'Over 4.5');

    constructor(DbKey: string, Name){
        this.DbKey = DbKey;
        this.Name = Name;    
    }

    static isValid(type: QuoteType) {
        for (const key in QuoteType) {
            if (QuoteType[key] instanceof QuoteType && type === (QuoteType[key] as QuoteType)) {
                return true;
            }
        }

        return false;
    }
}