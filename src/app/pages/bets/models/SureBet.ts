export class SureBet {
    MatchName: string;
    StartDateTime: string;
    Quote1: number;
    Bookmaker1: string;
    QuoteX: number;
    BookmakerX: string;
    Quote2: number;
    Bookmaker2: string;
    OddsInverseSum: number;
    MarginPercentage: string;

    constructor(MatchName?: string, StartDateTime?: string, Quote1?: number, Bookmaker1?: string,
        QuoteX?: number, BookmakerX?: string, Quote2?: number, Bookmaker2?: string, OddsInverseSum?: number,
        MarginPercentage?: string) {
        this.MatchName = MatchName;
        this.StartDateTime = StartDateTime;
        this.Quote1 = Quote1;
        this.Bookmaker1 = Bookmaker1;
        this.QuoteX = QuoteX;
        this.BookmakerX = BookmakerX;
        this.Quote2 = Quote2;
        this.Bookmaker2 = Bookmaker2;
        this.OddsInverseSum = OddsInverseSum;
        this.MarginPercentage = MarginPercentage;
    }
}