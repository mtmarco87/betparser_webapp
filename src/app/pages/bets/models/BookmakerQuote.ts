export class BookmakerQuote {
    Bookmaker: string;
    Quote1: number;
    QuoteX: number;
    Quote2: number;

    constructor(Bookmaker: string, Quote1: number, QuoteX: number, Quote2: number) {
        this.Bookmaker = Bookmaker;
        this.Quote1 = Quote1;
        this.QuoteX = QuoteX;
        this.Quote2 = Quote2;
    }

    public static createFromDb(dbMatchByBookmaker: any): BookmakerQuote {
        let bookmakerQuote: BookmakerQuote = null;

        try {
            const Quote1 = parseFloat(dbMatchByBookmaker.Quote1);
            const QuoteX = parseFloat(dbMatchByBookmaker.QuoteX);
            const Quote2 = parseFloat(dbMatchByBookmaker.Quote2);
            if (!isNaN(Quote1) && !isNaN(QuoteX) && !isNaN(Quote2)) {
                bookmakerQuote = new BookmakerQuote(dbMatchByBookmaker.Bookmaker, Quote1, QuoteX, Quote2);
            }
        } catch (error) {
            console.error("Error extracting a single Bookmaker Quote array: " + error);
        }

        return bookmakerQuote;
    }

    public static createManyFromDb(dbMatch: any): BookmakerQuote[] {
        const bookmakerQuotes: BookmakerQuote[] = [];

        for (const bookmakerName in dbMatch) {
            if (dbMatch.hasOwnProperty(bookmakerName)) {
                const bookmakerQuote = BookmakerQuote.createFromDb(dbMatch[bookmakerName]);
                if (bookmakerQuote !== null) {
                    bookmakerQuotes.push(bookmakerQuote);
                }
            }
        }

        return bookmakerQuotes;
    }
}