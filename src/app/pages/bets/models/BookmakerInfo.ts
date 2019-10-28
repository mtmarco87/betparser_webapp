import { BetsUtils } from '../utils/bets.utils';
import { BookmakerQuoteGroup } from './BookmakerQuoteGroup';
import { BookmakerQuote } from './BookmakerQuote';
import { QuoteGroupType } from './QuoteGroupType';
import { QuoteType } from './QuoteType';


export class BookmakerInfo {
    Bookmaker: string;
    quoteGroups: BookmakerQuoteGroup[] = [];

    constructor(Bookmaker: string, quoteGroups: BookmakerQuoteGroup[] = []) {
        this.Bookmaker = Bookmaker;
        this.quoteGroups = quoteGroups;
    }

    addQuoteGroup(quoteGroup: BookmakerQuoteGroup) {
        if (quoteGroup !== undefined && quoteGroup !== null) {
            this.quoteGroups.push(quoteGroup);
        }
    }

    getQuoteGroup(quoteGroupType: QuoteGroupType): BookmakerQuoteGroup {
        const quoteGroup = this.quoteGroups.find(quoteGroup => quoteGroup.Name === quoteGroupType.Name);
        return quoteGroup === undefined ? null : quoteGroup;
    }

    getQuote(quoteGroupType: QuoteGroupType, quoteType: QuoteType): BookmakerQuote {
        let quote = null;

        const bmQuoteGroup = this.quoteGroups.find(quoteGroup => quoteGroup.Name === quoteGroupType.Name);
        if (bmQuoteGroup !== undefined && bmQuoteGroup !== null) {
            quote = bmQuoteGroup.quotes.find(quote => quote.Name === quoteType.Name);
        }

        return quote;
    }

    getQuoteValue(quote: BookmakerQuote): any {
        let quoteValue = BetsUtils.NotAvailable;

        if (quote !== null && quote.isAvailable) {
            quoteValue = quote.Value.toFixed(2);
        }

        return quoteValue;
    }

    hasQuotesAvailable() {
        return this.quoteGroups.some(qg => { return qg.quotes.some(q => { return q.isAvailable; }); });
    }

    public static createEmpty(bookmakerName): BookmakerInfo {
        // Here we fake create a new BookmakerInfo with no quotes under it
        return this.createFromDb({ Bookmaker: bookmakerName });
    }

    public static createFromDb(dbMatchByBookmaker: any): BookmakerInfo {
        const bookmakerInfo: BookmakerInfo = new BookmakerInfo(BetsUtils.getBookmakerFullName(dbMatchByBookmaker.Bookmaker));

        // Quotes Extraction
        QuoteGroupType.defaultTypes.forEach((quoteGroupType) => {
            bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(quoteGroupType, dbMatchByBookmaker));
        });

        return bookmakerInfo;
    }

    public static createManyFromDb(dbMatch: any): BookmakerInfo[] {
        const bookmakerInfos: BookmakerInfo[] = [];

        for (const bookmakerName in dbMatch) {
            if (dbMatch.hasOwnProperty(bookmakerName)) {
                const bookmakerInfo = BookmakerInfo.createFromDb(dbMatch[bookmakerName]);
                if (bookmakerInfo !== null) {
                    bookmakerInfos.push(bookmakerInfo);
                }
            }
        }

        return bookmakerInfos;
    }
}