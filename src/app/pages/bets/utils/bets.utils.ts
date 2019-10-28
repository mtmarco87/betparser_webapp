import * as moment from 'moment';
import { BookmakerEnum } from '../models/Bookmaker.enum';

export class BetsUtils {
    static readonly AppDateFormat = 'DD/MM/YYYY';
    static readonly DbDateFormat = 'YYYY_MM_DD';
    static readonly MatchNameDivider = ' - ';
    static readonly NotAvailable = "N/A";

    public static parseMatchDate(matchDateStr: string, format: string = this.DbDateFormat): moment.Moment {
        let date = null;
        try {
            date = moment(matchDateStr, format);
        } catch (error) {
            console.error("Error parsing Match Date: " + error);
        }

        return date;
    }

    public static formatMatchDate(date: moment.Moment, format: string = BetsUtils.AppDateFormat) {
        let dateStr: string = "";

        if (date !== null && date.isValid) {
            dateStr = date.format(format);
        }

        return dateStr;
    }
    
    public static safeParseFloat(value: string): number {
        let floatValue: number = null;
        try {
            floatValue = parseFloat(value);
        } catch (error) {
            console.error("Error extracting a Quote Float value: " + error);
        }

        return floatValue;
    }

    public static getMatchFullName(team1: string, team2: string): string {
        return team1 + BetsUtils.MatchNameDivider + team2;
    }    

    public static getBookmakerFullName(bookmaker: string) {
        const bmFullName = BookmakerEnum[bookmaker];
        if (bmFullName) {
            bookmaker = bmFullName;
        }

        return bookmaker;
    }
}