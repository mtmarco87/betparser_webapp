import { formatDate } from '@angular/common';

export class BetsUtils {
    static readonly DateDivider = '_';
    static readonly DateOutStrFormat = 'dd/MM/yyyy';
    static readonly MatchNameDivider = ' - ';
    static readonly NotAvailable = "N/A";

    public static getMatchDate(matchDateStr: string): Date {
        let date = null;

        const dateParts = matchDateStr.split(BetsUtils.DateDivider);
        if (dateParts.length >= 3) {
            try {
                const year: number = parseInt(dateParts[0], 10);
                const month: number = parseInt(dateParts[1], 10) - 1;
                const day = parseInt(dateParts[2], 10);
                date = new Date(year, month, day);
            } catch (error) {
                console.error("Error parsing Match Date: " + error);
            }
        }
        else {
            console.error("Error parsing Match Date: invalid date format");
        }

        return date;
    }

    public static getDateString(date: Date) {
        let dateStr: string = "";

        if (date !== null) {
            dateStr = formatDate(date, BetsUtils.DateOutStrFormat, 'en');
        }

        return dateStr;
    }

    public static getMatchFullName(team1: string, team2: string): string {
        return team1 + BetsUtils.MatchNameDivider + team2;
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
}