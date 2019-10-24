import { BookmakerQuote } from './BookmakerQuote';
import { QuoteGroupType } from './QuoteGroupType';

export class BookmakerQuoteGroup {
    Name: string;
    quotes: BookmakerQuote[] = [];

    constructor(Name: string, quotes: BookmakerQuote[] = []) {
        this.Name = Name;
        this.quotes = quotes;
    }

    addQuote(quote: BookmakerQuote) {
        if (quote !== undefined && quote !== null) {
            this.quotes.push(quote);
        }
    }

    public static safeCreate(quoteGroupType: QuoteGroupType, quoteGroupValues: number[]): BookmakerQuoteGroup {
        if (!QuoteGroupType.isValid(quoteGroupType)
            || quoteGroupValues === undefined
            || quoteGroupValues === null
            || quoteGroupType.subTypes.length !== quoteGroupValues.length) {
            return null;
        }

        const quoteGroup = new BookmakerQuoteGroup(quoteGroupType.Name);
        for (let i = 0; i < quoteGroupType.subTypes.length; i++) {
            const quoteType = quoteGroupType.subTypes[i];
            quoteGroup.addQuote(BookmakerQuote.safeCreate(quoteType, quoteGroupValues[i]));
        }

        return quoteGroup;
    }
}
