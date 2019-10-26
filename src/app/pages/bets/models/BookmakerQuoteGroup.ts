import { BookmakerQuote } from './BookmakerQuote';
import { QuoteGroupType } from './QuoteGroupType';
import { BetsUtils } from '../utils/bets.utils';

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

    public static safeCreate(quoteGroupType: QuoteGroupType, dbMatchByBookmaker: any): BookmakerQuoteGroup {
        if (!QuoteGroupType.isValid(quoteGroupType)) {
            return null;
        }

        const quoteGroup = new BookmakerQuoteGroup(quoteGroupType.Name);
        for (let i = 0; i < quoteGroupType.subTypes.length; i++) {
            const quoteType = quoteGroupType.subTypes[i];
            const quoteValue = BetsUtils.safeParseFloat(dbMatchByBookmaker[quoteType.DbKey]);
            quoteGroup.addQuote(BookmakerQuote.safeCreate(quoteType, quoteValue));
        }

        return quoteGroup;
    }
}
