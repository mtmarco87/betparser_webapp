import { BookmakerInfo as BookmakerInfo } from './BookmakerInfo';
import { BetsUtils } from '../utils/bets.utils';
import { QuoteGroupType } from './QuoteGroupType';
import { QuoteType } from './QuoteType';
import { KeyValue } from '@angular/common';
import { SureBet } from './SureBet';
import { BookmakerEnum } from './Bookmaker.enum';


export class Match {
    Name: string;
    Team1: string;
    Team2: string;
    StartDate: string;
    StartTime: string;
    RealTime: string;
    Result: string;
    children: BookmakerInfo[];

    // Cache objects
    private cachedMaxQuotes: KeyValue<string, KeyValue<string[], number>>[] = [];

    constructor(Name: string = null, Team1: string = null, Team2: string = null, StartDate: string = null, StartTime: string = null,
        RealTime: string = null, Result: string = null, children: BookmakerInfo[] = []) {
        this.Name = Name;
        this.Team1 = Team1;
        this.Team2 = Team2;
        this.StartDate = StartDate;
        this.StartTime = StartTime;
        this.RealTime = RealTime;
        this.Result = Result;
        this.children = children;
    }

    public getStartDateTime(): string {
        return this.StartDate + (this.StartTime !== null && this.StartTime != BetsUtils.NotAvailable ? ' ' + this.StartTime : '');
    }

    public isRealTime(): boolean {
        return this.RealTime !== null && this.RealTime !== BetsUtils.NotAvailable &&
            this.Result !== null && this.Result !== BetsUtils.NotAvailable;
    }

    public getMaxQuote(quoteGroupType: QuoteGroupType, quoteType: QuoteType): KeyValue<string[], number> {
        let maxQuote: KeyValue<string[], number> = null;

        const cacheKey = quoteGroupType.Name + '-' + quoteType.Name;
        const cachedMaxQuote = this.cachedMaxQuotes.find(x => x.key === cacheKey);
        if (cachedMaxQuote === undefined || cachedMaxQuote === null) {
            maxQuote = { key: [], value: null };

            this.children.forEach(bmInfo => {
                const quote = bmInfo.getQuote(quoteGroupType, quoteType);
                if (quote === null) {
                    return;
                }
                else if (quote.isAvailable && quote.Value > maxQuote.value) {
                    maxQuote.value = quote.Value;
                    maxQuote.key = [bmInfo.Bookmaker];
                }
                else if (quote.isAvailable && quote.Value === maxQuote.value) {
                    maxQuote.key.push(bmInfo.Bookmaker);
                }
            });

            this.cachedMaxQuotes.push({ key: cacheKey, value: maxQuote });
        }
        else {
            maxQuote = cachedMaxQuote.value;
        }

        return maxQuote;
    }

    public getOddsInverseSum(quoteGroupType: QuoteGroupType): number {
        let oddsInverseSum: number = null;

        try {
            for (let i = 0; i < quoteGroupType.subTypes.length; i++) {
                const quoteType = quoteGroupType.subTypes[i];
                const maxQuoteOfType = this.getMaxQuote(quoteGroupType, quoteType).value;
                if (maxQuoteOfType === null) {
                    return null;
                }
                oddsInverseSum += (1 / maxQuoteOfType);
            }
            oddsInverseSum = Math.round(oddsInverseSum * 100) / 100;
        } catch (error) {
            console.error("Error calculating the '" + quoteGroupType.Name + "' Odds Invers Sum: " + error);
        }

        return oddsInverseSum;
    }

    public getMarginPercentage(quoteGroupType: QuoteGroupType): number {
        let marginPercentage: number = null;

        const oddsInverseSum = this.getOddsInverseSum(quoteGroupType);
        if (oddsInverseSum !== null) {
            marginPercentage = Math.round((1 - oddsInverseSum) * 100);
        }

        return marginPercentage;
    }

    public isSureBet(quoteGroupType: QuoteGroupType): boolean {
        let isSureBet = false;

        const oddsInverseSum = this.getOddsInverseSum(quoteGroupType);
        if (oddsInverseSum !== null) {
            isSureBet = oddsInverseSum < 1;
        }

        return isSureBet;
    }

    public hasSureBet(): boolean {
        let hasSureBet = false;
        QuoteGroupType.defaultTypes.forEach(quoteGroupType => {
            hasSureBet = hasSureBet || this.isSureBet(quoteGroupType);
        });

        return hasSureBet;
    }

    public getSureBets(): SureBet[] {
        const sureBets: SureBet[] = [];

        if (this.hasSureBet()) {
            QuoteGroupType.defaultTypes.forEach(quoteGroupType => {
                if (this.isSureBet(quoteGroupType)) {
                    const sureBet = new SureBet(this.Name, this.getStartDateTime(), this.getOddsInverseSum(quoteGroupType),
                        this.getMarginPercentage(quoteGroupType), quoteGroupType);
                    const quotes: KeyValue<string[], number>[] = [];
                    for (let i = 0; i < quoteGroupType.subTypes.length; i++) {
                        const quoteType = quoteGroupType.subTypes[i];
                        quotes.push(this.getMaxQuote(quoteGroupType, quoteType));
                    }
                    sureBet.Quotes = quotes;

                    sureBets.push(sureBet);
                }
            });
        }

        return sureBets;
    }

    public static createFromDb(dbMatch: any): Match {
        let match: Match = new Match();

        if (dbMatch !== null && Object.keys(dbMatch).length > 0) {
            const dbMatchByBookmaker = dbMatch[Object.keys(dbMatch)[0]];

            if (dbMatchByBookmaker !== undefined && dbMatchByBookmaker.Team1 !== undefined && dbMatchByBookmaker.Team2 !== undefined) {
                match.Name = BetsUtils.getMatchFullName(dbMatchByBookmaker.Team1, dbMatchByBookmaker.Team2);
                match.Team1 = dbMatchByBookmaker.Team1;
                match.Team2 = dbMatchByBookmaker.Team2;
            }

            if (dbMatchByBookmaker !== undefined && dbMatchByBookmaker.StartDate !== undefined) {
                match.StartDate = BetsUtils.dateToString(BetsUtils.parseMatchDate(dbMatchByBookmaker.StartDate));
            }

            if (dbMatchByBookmaker !== undefined && dbMatchByBookmaker.StartTime !== undefined) {
                match.StartTime = dbMatchByBookmaker.StartTime;
            }

            if (dbMatchByBookmaker !== undefined && dbMatchByBookmaker.RealTime !== undefined) {
                match.RealTime = dbMatchByBookmaker.RealTime;
            }

            if (dbMatchByBookmaker !== undefined && dbMatchByBookmaker.Result !== undefined) {
                match.Result = dbMatchByBookmaker.Result;
            }

            Object.keys(BookmakerEnum).forEach((bookmakerName) => {
                let child: BookmakerInfo = null;
                if (dbMatch.hasOwnProperty(bookmakerName)) {
                    let dbMatchByBookmaker = dbMatch[bookmakerName];
                    child = BookmakerInfo.createFromDb(dbMatchByBookmaker);
                }
                else {
                    child = BookmakerInfo.createEmpty(bookmakerName);
                }

                if (child !== null) {
                    match.children.push(child);
                }
            });

            // If there is no name or no child it is an invalid match
            if (match.Name === null || match.children.length === 0) {
                match = null;
            }
        }

        return match;
    }

    public static createManyFromDb(dbMatchesWithDate: any[]): Match[] {
        let matches: Match[] = [];

        dbMatchesWithDate.forEach(dbMatch => {
            const match = Match.createFromDb(dbMatch.payload.val());
            if (match !== null) {
                matches.push(match);
            }
        });

        return matches;
    }
}