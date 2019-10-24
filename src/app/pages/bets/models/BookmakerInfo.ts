import { BetsUtils } from '../utils/bets.utils';
import { BookmakerQuoteGroup } from './BookmakerQuoteGroup';
import { BookmakerQuote } from './BookmakerQuote';
import { QuoteGroupType } from './QuoteGroupType';


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

        return quoteGroup;
    }

    getQuote(quoteGroupType: QuoteGroupType, quoteType: string): BookmakerQuote {
        let quote = null;
        
        const bmQuoteGroup = this.quoteGroups.find(quoteGroup => quoteGroup.Name === quoteGroupType.Name);
        if (bmQuoteGroup !== null) {
            quote = bmQuoteGroup.quotes.find(quote => quote.Name === quoteType);
        }

        return quote;
    }

    getQuoteValue(quote: BookmakerQuote): any {
        let quoteValue = BetsUtils.NotAvailable;

        if (quote !== null && quote.isAvailable) {
            quoteValue = quote.Value.toString();
        }

        return quoteValue;
    }

    public static createFromDb(dbMatchByBookmaker: any): BookmakerInfo {
        const bookmakerInfo: BookmakerInfo = new BookmakerInfo(dbMatchByBookmaker.Bookmaker);

        // Quotes Extraction
        const Quote1 = BetsUtils.safeParseFloat(dbMatchByBookmaker.Quote1);
        const QuoteX = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteX);
        const Quote2 = BetsUtils.safeParseFloat(dbMatchByBookmaker.Quote2);
        const Quote1X = BetsUtils.safeParseFloat(dbMatchByBookmaker.Quote1X);
        const Quote2X = BetsUtils.safeParseFloat(dbMatchByBookmaker.Quote2X);
        const Quote12 = BetsUtils.safeParseFloat(dbMatchByBookmaker.Quote12);
        const QuoteGoal = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteGoal);
        const QuoteNoGoal = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteNoGoal);
        const QuoteU05 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteU05);
        const QuoteO05 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteO05);
        const QuoteU15 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteU15);
        const QuoteO15 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteO15);
        const QuoteU25 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteU25);
        const QuoteO25 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteO25);
        const QuoteU35 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteU35);
        const QuoteO35 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteO35);
        const QuoteU45 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteU45);
        const QuoteO45 = BetsUtils.safeParseFloat(dbMatchByBookmaker.QuoteO45);

        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.type1X2, [Quote1, QuoteX, Quote2]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeDoubleChance, [Quote1X, Quote2X, Quote12]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeGoalNoGoal, [QuoteGoal, QuoteNoGoal]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeUO05, [QuoteU05, QuoteO05]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeUO15, [QuoteU15, QuoteO15]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeUO25, [QuoteU25, QuoteO25]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeUO35, [QuoteU35, QuoteO35]));
        bookmakerInfo.addQuoteGroup(BookmakerQuoteGroup.safeCreate(QuoteGroupType.typeUO45, [QuoteU45, QuoteO45]));

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