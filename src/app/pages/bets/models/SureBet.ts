import { QuoteGroupType } from './QuoteGroupType';
import { KeyValue } from '@angular/common';


export class SureBet {
    MatchName: string;
    StartDateTime: string;
    OddsInverseSum: number;
    MarginPercentage: number;
    Type: QuoteGroupType;
    Quotes: KeyValue<string[], number>[] = [];

    constructor(MatchName?: string, StartDateTime?: string, OddsInverseSum?: number, MarginPercentage?: number, 
        Type?: QuoteGroupType, Quotes: KeyValue<string[], number>[] = []) {
        this.MatchName = MatchName;
        this.StartDateTime = StartDateTime;
        this.OddsInverseSum = OddsInverseSum;
        this.MarginPercentage = MarginPercentage;
        this.Type = Type;
        this.Quotes = Quotes;
    }
}