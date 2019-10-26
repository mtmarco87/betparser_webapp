import { QuoteType } from './QuoteType';

export class BookmakerQuote {
    Name: string;
    Value: number;
    isAvailable: boolean;

    constructor(Name: string, Value: number, isAvailable: boolean = true) {
        this.Name = Name;
        this.Value = Value;
        this.isAvailable = isAvailable;
    }

    public static safeCreate(quoteType: QuoteType, Value: number): BookmakerQuote {
        if (!QuoteType.isValid(quoteType)) {
            return null;
        }

        let quote: BookmakerQuote = null;
        if(Value === undefined || Value === null || isNaN(Value)){
            quote = new BookmakerQuote(quoteType.Name, -1, false);
        }
        else{
            quote = new BookmakerQuote(quoteType.Name, Value);
        }

        return quote;
    }
}