import { BookmakerQuote } from './BookmakerQuote';
import { BetsUtils } from '../utils/bets.utils';

export class Match {
    Name: string;
    Team1: string;
    Team2: string;
    StartDate: string;
    StartTime: string;
    RealTime: string;
    Result: string;
    children: BookmakerQuote[];

    constructor(Name: string, Team1: string, Team2: string, StartDate: string, StartTime: string,
        RealTime: string, Result: string, children: BookmakerQuote[]) {
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
        return this.RealTime !== null && this.RealTime !== BetsUtils.NotAvailable && this.Result !== null && this.Result !== BetsUtils.NotAvailable;
    }

    public getMaxQuote(quoteType: string): number {
        let maxQuote = 0;
        this.children.forEach(child => {
            if (child['Quote' + quoteType] > maxQuote) {
                maxQuote = child['Quote' + quoteType];
            }
        });

        return maxQuote;
    }

    public getMaxQuoteAndBookmaker(quoteType: string): Array<any> {
        let maxQuote = 0;
        let maxQuoteBookmaker = '';
        this.children.forEach(child => {
            if (child['Quote' + quoteType] > maxQuote) {
                maxQuote = child['Quote' + quoteType];
                maxQuoteBookmaker = child.Bookmaker;
            }
        });

        return [maxQuote, maxQuoteBookmaker];
    }

    public getOddsInverseSum(): number {
        let oddsInverseSum: number = null;

        try {
            oddsInverseSum = (1 / this.getMaxQuote('1')) + (1 / this.getMaxQuote('X')) + (1 / this.getMaxQuote('2'));
            oddsInverseSum = Math.round(oddsInverseSum * 100) / 100;
        } catch (error) {
            console.error("Error calculating the Odds Invers Sum: " + error);
        }

        return oddsInverseSum;
    }

    public isSureBet(): boolean {
        let isSureBet = false;

        if (this.getOddsInverseSum() !== null) {
            isSureBet = this.getOddsInverseSum() < 1;
        }

        return isSureBet;
    }

    public getSureBetPercent(): string {
        let sureBetPercent: number = null;

        if (this.getOddsInverseSum() !== null) {
            sureBetPercent = Math.round((1 - this.getOddsInverseSum()) * 100);
        }

        return sureBetPercent + '%';
    }

    public static createFromDb(dbMatch: any): Match {
        let match: Match = null;

        let Name = null;
        let Team1 = null;
        let Team2 = null;
        let StartDate = null;
        let StartTime = null;
        let RealTime = null;
        let Result = null;
        const children: BookmakerQuote[] = [];

        for (const bookmakerName in dbMatch) {
            if (dbMatch.hasOwnProperty(bookmakerName)) {
                let dbMatchByBookmaker = dbMatch[bookmakerName];
                if ((Name === null || Team1 === null || Team2 === null) &&
                    dbMatchByBookmaker.Team1 !== undefined && dbMatchByBookmaker.Team2 !== undefined) {
                    Name = BetsUtils.getMatchFullName(dbMatchByBookmaker.Team1, dbMatchByBookmaker.Team2);
                    Team1 = dbMatchByBookmaker.Team1;
                    Team2 = dbMatchByBookmaker.Team2;
                }

                if (StartDate === null && dbMatchByBookmaker.StartDate !== undefined) {
                    StartDate = BetsUtils.getDateString(BetsUtils.getMatchDate(dbMatchByBookmaker.StartDate));
                }

                if (StartTime === null && dbMatchByBookmaker.StartTime !== undefined) {
                    StartTime = dbMatchByBookmaker.StartTime;
                }

                if (RealTime === null && dbMatchByBookmaker.RealTime !== undefined) {
                    RealTime = dbMatchByBookmaker.RealTime;
                }

                if (Result === null && dbMatchByBookmaker.Result !== undefined) {
                    Result = dbMatchByBookmaker.Result;
                }

                const child = BookmakerQuote.createFromDb(dbMatchByBookmaker);
                if (child !== null) {
                    children.push(child);
                }
            }
        }

        if (Name !== null && children.length > 0) {
            match = new Match(Name, Team1, Team2, StartDate, StartTime, RealTime, Result, children);
        }

        return match;
    }

    public static createManyFromDb(dbMatches: any): Match[] {
        let matches: Match[] = [];

        for (const matchName in dbMatches) {
            if (dbMatches.hasOwnProperty(matchName)) {
                const match = Match.createFromDb(dbMatches[matchName]);
                if (match !== null) {
                    matches.push(match);
                }
            }
        }

        return matches;
    }
}